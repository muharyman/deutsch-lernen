import { useEffect, useState } from 'react';
import type { Level, MaterialProgressState } from '../types';
import { getAllMaterialLessons, getMaterialChapters } from '../data/curriculum';

const STORAGE_KEY = 'german-material-progress-v1';

function readProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed as MaterialProgressState : {};
  } catch {
    return {};
  }
}

function isLessonComplete(progress: MaterialProgressState, lessonId: string) {
  const item = progress[lessonId];
  return Boolean(item?.read && item?.practiced);
}

export function useMaterialProgress() {
  const [progress, setProgress] = useState<MaterialProgressState>(readProgress);

  useEffect(
    function persistProgress() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    },
    [progress]
  );

  function setLessonStatus(lessonId: string, field: 'read' | 'practiced', done: boolean) {
    setProgress((current) => {
      const previous = current[lessonId] ?? {};
      const nextItem = { ...previous, [field]: done };
      const complete = Boolean(nextItem.read && nextItem.practiced);

      if (complete && !nextItem.completedAt) {
        nextItem.completedAt = new Date().toISOString();
      }

      if (!complete) {
        delete nextItem.completedAt;
      }

      if (!nextItem.read && !nextItem.practiced) {
        const next = { ...current };
        delete next[lessonId];
        return next;
      }

      return { ...current, [lessonId]: nextItem };
    });
  }

  function getLevelSummary(level: Level) {
    const lessons = getMaterialChapters(level).flatMap((chapter) => chapter.lessons);
    const completed = lessons.filter((lesson) => isLessonComplete(progress, lesson.id)).length;
    const read = lessons.filter((lesson) => progress[lesson.id]?.read).length;
    const practiced = lessons.filter((lesson) => progress[lesson.id]?.practiced).length;

    return {
      level,
      total: lessons.length,
      read,
      practiced,
      completed,
      pct: lessons.length ? Math.round((completed / lessons.length) * 100) : 0,
    };
  }

  const allLessons = getAllMaterialLessons();
  const completedTotal = allLessons.filter((lesson) => isLessonComplete(progress, lesson.id)).length;
  const nextLesson = allLessons.find((lesson) => !isLessonComplete(progress, lesson.id)) ?? allLessons[0] ?? null;

  return {
    progress,
    completedTotal,
    totalLessons: allLessons.length,
    overallPct: allLessons.length ? Math.round((completedTotal / allLessons.length) * 100) : 0,
    nextLesson,
    getLevelSummary,
    setLessonStatus,
  };
}
