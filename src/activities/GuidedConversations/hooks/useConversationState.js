import { useState, useCallback } from 'react';
import { MESSAGE_TYPES } from '../constants';

// Owns the conversation-side state. Audio recording lives in useAudioRecording.
// A message is { id, type, content, english?, timestamp }.
//   content = Arabic script (for AI + user)
//   english = optional English gloss (AI replies usually have one)
export default function useConversationState() {
  const [messages, setMessages] = useState([]);
  const [conversationStarted, setConversationStarted] = useState(false);
  const [translations, setTranslations] = useState({});
  const [translatingMessageId, setTranslatingMessageId] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const [conversationStartTime, setConversationStartTime] = useState(null);
  const [showFinishButton, setShowFinishButton] = useState(false);
  const [completionData, setCompletionData] = useState(null);
  const [aiCompletionTriggered, setAiCompletionTriggered] = useState(false);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playingMessageId, setPlayingMessageId] = useState(null);

  const addMessage = useCallback((content, type = MESSAGE_TYPES.USER, additionalData = {}) => {
    const newMessage = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      content,
      type,
      timestamp: new Date().toISOString(),
      ...additionalData,
    };
    setMessages((prev) => [...prev, newMessage]);
    return newMessage;
  }, []);

  const clearMessages = useCallback(() => setMessages([]), []);

  const resetConversation = useCallback(() => {
    setMessages([]);
    setConversationStarted(false);
    setTranslations({});
    setTranslatingMessageId(null);
    setSuggestions([]);
    setConversationStartTime(null);
    setShowFinishButton(false);
    setCompletionData(null);
    setIsPlaying(false);
    setPlayingMessageId(null);
    setAiCompletionTriggered(false);
    setIsGeneratingFeedback(false);
  }, []);

  return {
    messages,
    conversationStarted,
    translations,
    translatingMessageId,
    suggestions,
    conversationStartTime,
    showFinishButton,
    completionData,
    isPlaying,
    playingMessageId,
    aiCompletionTriggered,
    isGeneratingFeedback,

    setMessages,
    setConversationStarted,
    setTranslations,
    setTranslatingMessageId,
    setSuggestions,
    setConversationStartTime,
    setShowFinishButton,
    setCompletionData,
    setIsPlaying,
    setPlayingMessageId,
    setAiCompletionTriggered,
    setIsGeneratingFeedback,

    addMessage,
    clearMessages,
    resetConversation,
    MESSAGE_TYPES,
  };
}
