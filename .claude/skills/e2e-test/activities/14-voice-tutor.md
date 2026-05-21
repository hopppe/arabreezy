# 14 — Voice Tutor (OpenAI Realtime + WebRTC)

**Source:** `src/activities/Chat/VoiceChatScreen.js`
**ai-backend:** `/api/realtime/session` (mints an ephemeral OpenAI client_secret)
**Supabase:** none
**Native deps:** `react-native-webrtc`, `expo-audio` recording — NOT Expo Go compatible.

## Pre-state
- Activities tab → Voice tutor card. After swipe up by 300: (100, 600).
- Microphone permission granted (or first run will prompt).

## Happy path

1. VoiceChatScreen renders. Header: "Voice tutor — Hold a real Arabic conversation — speak naturally, the tutor listens and replies." Top-right: "Done".
2. Mic icon in a circle. Caption: "Tap start to begin".
3. Orange "Start conversation" button at (200, 810).
4. Tap Start → "Connecting…" appears (calls `/api/realtime/session`, gets ephemeral token, does SDP handshake direct with OpenAI Realtime).
5. **First time:** OS prompts "Arabreezy Would Like to Access the Microphone" → tap Allow at (274, 525).
6. Within ~3 seconds: "Live — talk away" appears in green. Bottom controls become Mute (110, 810) + End conversation (orange, 290, 810).
7. Speak (or play Arabic audio near the Mac mic). The tutor responds in voice through the Mac speakers.
8. Tap End conversation → "Session ended" + a fresh "Start conversation" button to retry.
9. Tap Done (355, 90) to exit to Activities.

## Assertions
- UI: must reach "Live — talk away" state. If stuck on "Connecting…" → realtime handshake failed.
- ai-backend: `/api/realtime/session` 200 with a `client_secret` body. Verify with curl:
  ```bash
  curl -i -X POST http://localhost:8787/api/realtime/session \
    -H "Authorization: Bearer dummy" -H "Content-Type: application/json" -d '{}'
  ```
  (Works with `ALLOW_ANON=true`.)

## Failure paths
- Stuck on "Connecting…": check OpenAI key, `OPENAI_REALTIME_MODEL=gpt-realtime-mini`, and that the device's network can reach `https://api.openai.com/v1/realtime`.
- No audio: mic permission not granted; speakers muted; or `react-native-webrtc` native module not linked (the build must be a dev build, NOT Expo Go).
- Crash on Start: rebuild — `--config-plugins/react-native-webrtc` must be linked. Run `npx expo install --fix` and rebuild.

## Recovery
- Mic reset: `xcrun simctl privacy <UDID> reset microphone com.arabreezy.app`.
