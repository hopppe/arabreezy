// JSDoc typedefs documenting the shape of the data served by the local backend.
// These mirror what a real API should eventually return.

/**
 * @typedef {Object} Word
 * @property {string} id                Unique across all dialects (e.g. 'w_hello')
 * @property {string} script            Arabic-script form
 * @property {string} transliteration   Latin-script pronunciation aid
 * @property {string} english           Gloss
 * @property {number} level             1..10
 * @property {string} [notes]           Optional usage notes
 * @property {string} [audio]           Optional audio file path
 */

/**
 * @typedef {Object} LessonDialogueTurn
 * @property {'a'|'b'} speaker
 * @property {string}  wordRef          Word id referenced by this turn
 * @property {string}  [note]
 */

/**
 * @typedef {Object} LessonCheckQuestion
 * @property {string} wordId
 * @property {string} prompt
 */

/**
 * @typedef {Object} Lesson
 * @property {string} id
 * @property {number} level             1..10
 * @property {string} title
 * @property {string} intro
 * @property {string[]} focalWordIds    Words this lesson teaches
 * @property {LessonDialogueTurn[]} dialogue
 * @property {LessonCheckQuestion[]} check
 */

/**
 * @typedef {Object} ConversationOption
 * @property {string}  text
 * @property {string}  translation
 * @property {string}  nextStepId
 * @property {boolean} correct
 * @property {string}  [feedback]
 */

/**
 * @typedef {Object} ConversationStep
 * @property {string}  id
 * @property {'partner'|'user'} speaker
 * @property {string}  [text]
 * @property {string}  [translation]
 * @property {string}  [prompt]
 * @property {ConversationOption[]} [options]
 * @property {string}  [next]
 * @property {boolean} [end]
 */

/**
 * @typedef {Object} Conversation
 * @property {string} id
 * @property {number} level
 * @property {string} title
 * @property {string} description
 * @property {string[]} focalWordIds
 * @property {ConversationStep[]} steps
 * @property {string} completionMessage
 */

/**
 * @typedef {Object} UserProgress
 * @property {string}  userId
 * @property {'saudi'|'levantine'|'fusha'} dialect
 * @property {number}  level
 * @property {string|null} currentLessonId
 * @property {string[]} lessonsCompleted
 * @property {Record<string, WordProgress>} wordProgress
 * @property {PlacementResult} placement
 */

/**
 * @typedef {Object} WordProgress
 * @property {'new'|'learning'|'review'|'known'} status
 * @property {number} easeFactor
 * @property {number} interval       Days
 * @property {string} nextReviewAt   ISO datetime
 * @property {number} lapses
 * @property {number} reviewsCount
 */

/**
 * @typedef {Object} PlacementResult
 * @property {boolean}      completed
 * @property {number}       score
 * @property {string|null}  placedAt
 * @property {number|null}  placedLevel
 */

export {};
