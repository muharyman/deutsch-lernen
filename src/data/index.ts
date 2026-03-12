import type { Level, Week, DayPlan, FlashcardSet, Dialog } from '../types';
import { A1_WEEKS, A1_DAILY_PLANS, A1_FLASHCARD_SETS, A1_DIALOGS } from './a1';
import { A2_WEEKS, A2_DAILY_PLANS, A2_FLASHCARD_SETS, A2_DIALOGS } from './a2';
import { B1_WEEKS, B1_DAILY_PLANS, B1_FLASHCARD_SETS, B1_DIALOGS } from './b1';
import { B2_WEEKS, B2_DAILY_PLANS, B2_FLASHCARD_SETS, B2_DIALOGS } from './b2';

export function getWeeks(level: Level): Week[] {
  switch (level) {
    case 'A1': return A1_WEEKS;
    case 'A2': return A2_WEEKS;
    case 'B1': return B1_WEEKS;
    case 'B2': return B2_WEEKS;
  }
}

export function getDailyPlans(level: Level): Record<number, DayPlan[]> {
  switch (level) {
    case 'A1': return A1_DAILY_PLANS;
    case 'A2': return A2_DAILY_PLANS;
    case 'B1': return B1_DAILY_PLANS;
    case 'B2': return B2_DAILY_PLANS;
  }
}

export function getFlashcardSets(level: Level): FlashcardSet[] {
  switch (level) {
    case 'A1': return A1_FLASHCARD_SETS;
    case 'A2': return A2_FLASHCARD_SETS;
    case 'B1': return B1_FLASHCARD_SETS;
    case 'B2': return B2_FLASHCARD_SETS;
  }
}

export function getDialogs(level: Level): Dialog[] {
  switch (level) {
    case 'A1': return A1_DIALOGS;
    case 'A2': return A2_DIALOGS;
    case 'B1': return B1_DIALOGS;
    case 'B2': return B2_DIALOGS;
  }
}
