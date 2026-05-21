import { useState, useRef, useEffect, useCallback } from 'react';
import { Alert } from 'react-native';
import { useMicRecorder, ensureMicPermission } from '../../../services/recording';
import {
  MIN_HOLD_DURATION_MS,
  MIN_RECORDING_DURATION_MS,
  MAX_RECORDING_DURATION_MS,
} from '../constants';

// Press-and-hold recorder. Mirrors the English app's state machine:
//   handlePressIn  → request permission → start recorder → flip isRecording
//   handlePressOut → if hold < 400ms → ignore (quick tap)
//                  → if rec < 500ms  → ignore + show "press and hold" reminder
//                  → otherwise stop, hand the file URI to onStopRecording.
//
// We synchronise React state (re-renders) with refs (synchronous reads) so
// quick presses don't race the state update.
export default function useAudioRecording() {
  const recorder = useMicRecorder();

  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSTTLoading, setShowSTTLoading] = useState(false);
  const [showPressHoldReminder, setShowPressHoldReminder] = useState(false);

  const isRecordingRef = useRef(false);
  const isInitializingRef = useRef(false);
  const isQuickTapRef = useRef(false);
  const pressStartTimeRef = useRef(0);
  const recordingStartTimeRef = useRef(0);
  const autoStopTimerRef = useRef(null);
  const deferredStopRef = useRef(null);
  const onStopRecordingRef = useRef(null);

  useEffect(() => {
    return () => {
      if (autoStopTimerRef.current) {
        clearTimeout(autoStopTimerRef.current);
        autoStopTimerRef.current = null;
      }
    };
  }, []);

  const setRecordingState = useCallback((next) => {
    isRecordingRef.current = next;
    setIsRecording(next);
  }, []);

  const cleanupExistingRecording = useCallback(async () => {
    try {
      if (autoStopTimerRef.current) {
        clearTimeout(autoStopTimerRef.current);
        autoStopTimerRef.current = null;
      }
      try {
        await recorder.stop();
      } catch (_) {
        // recorder may not be in a stoppable state — non-fatal
      }
      setRecordingState(false);
      setIsProcessing(false);
      setShowSTTLoading(false);
      deferredStopRef.current = null;
      isInitializingRef.current = false;
    } catch (err) {
      console.warn('[guided-convo] cleanup failed:', err?.message);
    }
  }, [recorder, setRecordingState]);

  const handlePressIn = useCallback(
    async (onStartRecording, onStopRecording) => {
      if (isInitializingRef.current) return;

      onStopRecordingRef.current = onStopRecording;
      isQuickTapRef.current = false;
      deferredStopRef.current = null;
      pressStartTimeRef.current = Date.now();
      isInitializingRef.current = true;

      try {
        const granted = await ensureMicPermission();
        if (!granted) {
          isInitializingRef.current = false;
          Alert.alert(
            'Microphone permission required',
            'Enable microphone access in Settings to practise speaking Arabic.'
          );
          return;
        }

        if (isQuickTapRef.current) {
          isInitializingRef.current = false;
          return;
        }

        await recorder.prepareToRecordAsync();
        if (isQuickTapRef.current) {
          isInitializingRef.current = false;
          return;
        }

        recorder.record();
        recordingStartTimeRef.current = Date.now();
        setRecordingState(true);

        autoStopTimerRef.current = setTimeout(() => {
          if (isRecordingRef.current) {
            Alert.alert(
              'Recording stopped',
              'Recording is limited to 30 seconds — try a shorter turn.'
            );
            // eslint-disable-next-line no-use-before-define
            handlePressOut(onStopRecordingRef.current);
          }
        }, MAX_RECORDING_DURATION_MS);

        isInitializingRef.current = false;

        if (deferredStopRef.current) {
          const deferred = deferredStopRef.current;
          deferredStopRef.current = null;
          await new Promise((r) => setTimeout(r, 250));
          // eslint-disable-next-line no-use-before-define
          await handlePressOut(typeof deferred === 'function' ? deferred : onStopRecording);
          return;
        }

        onStartRecording?.();
      } catch (err) {
        console.warn('[guided-convo] startRecording failed:', err?.message);
        isInitializingRef.current = false;
        setRecordingState(false);
        setIsProcessing(false);
        setShowSTTLoading(false);
      }
    },
    [recorder, setRecordingState]
  );

  const handlePressOut = useCallback(
    async (onStopRecording) => {
      try {
        if (!isRecordingRef.current) {
          const holdDuration = Date.now() - pressStartTimeRef.current;
          if (holdDuration < MIN_HOLD_DURATION_MS) {
            isQuickTapRef.current = true;
            if (autoStopTimerRef.current) {
              clearTimeout(autoStopTimerRef.current);
              autoStopTimerRef.current = null;
            }
            return;
          }
          deferredStopRef.current = onStopRecording || true;
          return;
        }

        setRecordingState(false);
        setIsProcessing(true);
        if (autoStopTimerRef.current) {
          clearTimeout(autoStopTimerRef.current);
          autoStopTimerRef.current = null;
        }

        const recordingDuration = Date.now() - recordingStartTimeRef.current;

        if (recordingDuration < MIN_RECORDING_DURATION_MS) {
          isQuickTapRef.current = true;
          setIsProcessing(false);
          setShowSTTLoading(false);
          try {
            await recorder.stop();
          } catch (_) {
            // expected on short tap
          }
          setShowPressHoldReminder(true);
          return;
        }

        await recorder.stop();
        const uri = recorder.uri;

        setShowSTTLoading(true);
        if (uri && onStopRecording) {
          await onStopRecording({ uri, name: `recording_${Date.now()}.m4a`, type: 'audio/m4a' });
        }
        setIsProcessing(false);
      } catch (err) {
        console.warn('[guided-convo] stopRecording failed:', err?.message);
        setRecordingState(false);
        setIsProcessing(false);
        setShowSTTLoading(false);
      }
    },
    [recorder, setRecordingState]
  );

  return {
    isRecording,
    isProcessing,
    showSTTLoading,
    showPressHoldReminder,

    setIsRecording,
    setIsProcessing,
    setShowSTTLoading,
    setShowPressHoldReminder,

    cleanupExistingRecording,
    handlePressIn,
    handlePressOut,
  };
}
