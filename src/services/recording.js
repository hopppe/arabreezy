// Microphone recording for the Pronunciation activity. Wraps expo-audio's
// AudioRecorder. Returns the saved file URI on stop, which the caller can
// play back via audio.play(uri).
//
// Permission flow: requestPermissionsAsync() must be called before recording.
// We do that lazily inside start().

import {
  AudioModule,
  RecordingPresets,
  useAudioRecorder,
} from 'expo-audio';
import {
  isAiBackendConfigured,
  postMultipart,
} from '../config/aiBackend';

// Hook variant — preferred for components.
export function useMicRecorder() {
  return useAudioRecorder(RecordingPresets.HIGH_QUALITY);
}

export async function ensureMicPermission() {
  const status = await AudioModule.requestRecordingPermissionsAsync();
  return !!status?.granted;
}

// Transcribe a recording via the AI backend's whisper proxy.
// Returns the transcribed Arabic text, or null if unavailable / failed.
export async function transcribe(uri, { language = 'ar' } = {}) {
  if (!isAiBackendConfigured || !uri) return null;
  try {
    const form = new FormData();
    form.append('file', { uri, name: 'audio.m4a', type: 'audio/m4a' });
    form.append('language', language);
    const json = await postMultipart('/api/stt', form);
    return json?.text || null;
  } catch (err) {
    console.warn('[stt] proxy failed:', err?.message);
    return null;
  }
}
