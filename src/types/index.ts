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
  level: Level;
}
