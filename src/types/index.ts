export type Level = 'A1' | 'A2' | 'B1' | 'B2';

export interface Week {
  num: number;
  theme: string;
  level: Level;
}

export interface DayPlan {
  day: string;
  time: string;
  tasks: string[];
}

export interface Flashcard {
  de: string;
  id: string;
  example?: { de: string; id: string };
}

export interface FlashcardSet {
  label: string;
  level: Level;
  week: number;
  cards: Flashcard[];
}

export interface DialogLine {
  role: string;
  de: string;
  id: string;
}

export interface Dialog {
  week: number;
  level: Level;
  title: string;
  scene: string;
  lines: DialogLine[];
  vocab: { de: string; id: string }[];
}

export interface Resource {
  name: string;
  desc: string;
  level: string;
  free: boolean;
  url: string;
  type: 'podcast' | 'video' | 'app';
}

export interface TrackerState {
  [weekKey: string]: { [dayKey: string]: boolean };
}

export interface DailyWord {
  word: string;
  article?: string;
  meaning_id: string;
  example_de: string;
  example_id: string;
  level?: Level;
}

export interface ConversationLine {
  role: string;
  de: string;
  id: string;
}

export interface GrammarNote {
  title: string;
  explanation: string;
  pattern?: string;
  examples?: string[];
}

export interface PracticeQuestion {
  type: 'multiple_choice' | 'short_answer';
  prompt: string;
  choices?: string[];
  answer: string;
  explanation: string;
}

export interface KeyExpression {
  de: string;
  id: string;
}

export interface DailyConversation {
  level?: Level;
  title: string;
  situation: string;
  lines: ConversationLine[];
  grammarNotes: GrammarNote[];
  keyExpressions: KeyExpression[];
  practice: PracticeQuestion[];
}

export interface DailyLessonPayload {
  date: string;
  theme: string;
  conversations: DailyConversation[];
  words: DailyWord[];
  source?: 'gemini' | 'static';
  cachedAt?: string;
}

export interface DailyTrackerState {
  [date: string]: boolean;
}

export interface MaterialExercise {
  type: 'multiple_choice' | 'short_answer' | 'sentence_order' | 'speaking' | 'writing';
  prompt: string;
  choices?: string[];
  answer?: string;
  explanation: string;
}

export interface MaterialVocabulary {
  de: string;
  id: string;
  example: string;
}

export interface MaterialLesson {
  id: string;
  level: Level;
  chapter: number;
  title: string;
  minutes: number;
  summary: string;
  grammarFocus: string[];
  keyPhrases: KeyExpression[];
  vocabulary: MaterialVocabulary[];
  examples: string[];
  exercises: MaterialExercise[];
}

export interface MaterialChapter {
  id: string;
  level: Level;
  number: number;
  title: string;
  goal: string;
  lessons: MaterialLesson[];
}

export interface MaterialProgressItem {
  read?: boolean;
  practiced?: boolean;
  completedAt?: string;
}

export interface MaterialProgressState {
  [lessonId: string]: MaterialProgressItem;
}
