// Re-export MESSAGE_TYPES from shared conversation components
export { MESSAGE_TYPES } from '../../components/conversation/constants';

export const CONVERSATION_STATES = {
  IDLE: 'idle',
  STARTING: 'starting',
  ACTIVE: 'active',
  COMPLETING: 'completing',
  COMPLETED: 'completed',
};

export const COMPLETION_REASONS = {
  NATURAL_ENDING: 'natural_ending',
  MANUAL_FINISH: 'manual_finish',
  TIME_LIMIT: 'time_limit',
};

// Token the AI appends to its final turn to signal a natural end.
export const END_CONVERSATION_TOKEN = '[END_CONVERSATION]';

// Minimum hold (ms) before a press is treated as a real recording instead of
// a quick tap. Matches the English app's tuning.
export const MIN_RECORDING_DURATION_MS = 500;
export const MIN_HOLD_DURATION_MS = 400;
export const MAX_RECORDING_DURATION_MS = 30000;
