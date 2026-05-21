// OpenAI Realtime API over WebRTC. Voice-to-voice with an Arabic tutor.
//
// Architecture:
//   1. Hit our /api/realtime/session proxy to mint an ephemeral session key.
//      The proxy holds the OpenAI project key — only the short-lived
//      client_secret leaves the network to do the WebRTC handshake.
//   2. Open an RTCPeerConnection.
//   3. Add the local mic track via mediaDevices.getUserMedia.
//   4. Open a data channel "oai-events" for control messages.
//   5. SDP-offer to https://api.openai.com/v1/realtime?model=... using the
//      ephemeral secret as Bearer, set remote answer.
//   6. Wire remote audio track to the device speaker (RN-WebRTC auto-routes).
//   7. Surface event stream as a callback so the UI can render transcripts.
//
// Public surface:
//   const session = await connectRealtime({ instructions, voice, onEvent });
//   session.sendText('hello');          // optional text message
//   session.requestResponse();          // ask model to start speaking
//   session.mute(true|false);
//   await session.close();

import {
  RTCPeerConnection,
  mediaDevices,
} from 'react-native-webrtc';
import {
  isAiBackendConfigured,
  postJson,
} from '../config/aiBackend';

const REALTIME_BASE = 'https://api.openai.com/v1/realtime';

function defaultInstructions() {
  return (
    'You are a warm Arabic conversation partner speaking Saudi-dialect Arabic. ' +
    'Keep replies short (1–2 sentences). Speak Arabic; if the user is clearly ' +
    'struggling, fall back to a one-line English clarification then continue in ' +
    "Arabic. Match the learner's vocabulary level. Encourage them to keep talking."
  );
}

async function mintEphemeralSession({ instructions, voice }) {
  if (!isAiBackendConfigured) {
    throw new Error('AI backend not configured — set EXPO_PUBLIC_AI_BACKEND_URL');
  }
  const data = await postJson('/api/realtime/session', {
    instructions: instructions || defaultInstructions(),
    voice,
  });
  if (!data?.clientSecret || !data?.model) {
    throw new Error('Realtime session mint returned no client secret');
  }
  return { clientSecret: data.clientSecret, model: data.model };
}

export async function connectRealtime({
  instructions,
  voice = 'alloy',
  onEvent,
} = {}) {
  const { clientSecret, model } = await mintEphemeralSession({ instructions, voice });

  const pc = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
  });

  pc.ontrack = (event) => {
    onEvent?.({ type: 'remote_track', track: event.track });
  };

  const stream = await mediaDevices.getUserMedia({ audio: true });
  const localTrack = stream.getAudioTracks()[0];
  pc.addTrack(localTrack, stream);

  const dc = pc.createDataChannel('oai-events');
  dc.onopen = () => onEvent?.({ type: 'dc_open' });
  dc.onmessage = (e) => {
    try {
      const msg = JSON.parse(e.data);
      onEvent?.(msg);
    } catch (_) {
      // ignore malformed
    }
  };
  dc.onclose = () => onEvent?.({ type: 'dc_close' });

  const offer = await pc.createOffer();
  await pc.setLocalDescription(offer);

  const sdpRes = await fetch(`${REALTIME_BASE}?model=${encodeURIComponent(model)}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${clientSecret}`,
      'Content-Type': 'application/sdp',
    },
    body: offer.sdp,
  });
  if (!sdpRes.ok) {
    pc.close();
    throw new Error(`SDP exchange failed ${sdpRes.status}`);
  }
  const answerSdp = await sdpRes.text();
  await pc.setRemoteDescription({ type: 'answer', sdp: answerSdp });

  function send(event) {
    if (dc.readyState !== 'open') return;
    dc.send(JSON.stringify(event));
  }

  function sendText(text) {
    if (!text) return;
    send({
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [{ type: 'input_text', text }],
      },
    });
    requestResponse();
  }

  function requestResponse() {
    send({ type: 'response.create' });
  }

  function mute(muted) {
    if (localTrack) localTrack.enabled = !muted;
  }

  async function close() {
    try { send({ type: 'session.update', session: { turn_detection: null } }); } catch (_) {}
    try { dc.close(); } catch (_) {}
    try {
      stream.getTracks().forEach((t) => t.stop());
    } catch (_) {}
    try { pc.close(); } catch (_) {}
  }

  return { pc, dc, sendText, requestResponse, mute, close };
}

export function isRealtimeConfigured() {
  return isAiBackendConfigured;
}
