import {
  AdaptiveDifficulty,
  CompetencyLevel,
  MathTopic,
  QuizAttemptDoc,
  QuizQuestion,
  StudentAnswerRecord,
  StudentClass,
} from '../types/quiz';

export function evaluateAnswer(
  question: QuizQuestion,
  selection: {
    pg?: number;
    mcma?: number[];
    bs?: (boolean | null)[];
  }
): { isCorrect: boolean; partialScore: number } {
  if (question.type === 'pg') {
    const isCorrect = selection.pg === question.correctOptionIndex;
    return { isCorrect, partialScore: isCorrect ? 1 : 0 };
  }

  if (question.type === 'mcma') {
    const expected = [...(question.correctMcmaIndices || [])].sort();
    const chosen = [...(selection.mcma || [])].sort();
    const isExact =
      expected.length === chosen.length &&
      expected.every((val, idx) => val === chosen[idx]);

    // Compute balanced partial score for educative analytics (exact = 1)
    if (isExact) return { isCorrect: true, partialScore: 1 };
    const totalStatements = question.mcmaStatements?.length || 4;
    let matches = 0;
    for (let i = 0; i < totalStatements; i++) {
      const shouldBeChecked = expected.includes(i);
      const isChecked = chosen.includes(i);
      if (shouldBeChecked === isChecked) matches++;
    }
    return { isCorrect: false, partialScore: Number((matches / totalStatements).toFixed(2)) };
  }

  // Benar / Salah (3 pernyataan)
  const expectedBs = question.correctBsAnswers || [];
  const chosenBs = selection.bs || [];
  let matches = 0;
  for (let i = 0; i < expectedBs.length; i++) {
    if (chosenBs[i] === expectedBs[i]) matches++;
  }
  const isExact = matches === expectedBs.length && expectedBs.length > 0;
  return {
    isCorrect: isExact,
    partialScore: expectedBs.length > 0 ? Number((matches / expectedBs.length).toFixed(2)) : 0,
  };
}

export function computeNextAdaptiveState(
  currentDifficulty: AdaptiveDifficulty,
  consecutiveCorrect: number,
  consecutiveWrong: number,
  lastIsCorrect: boolean
): {
  nextDifficulty: AdaptiveDifficulty;
  nextStreakCorrect: number;
  nextStreakWrong: number;
  shifted?: 'up' | 'down';
} {
  if (lastIsCorrect) {
    const newStreak = consecutiveCorrect + 1;
    if (newStreak >= 2) {
      if (currentDifficulty === 'Dasar') {
        return {
          nextDifficulty: 'Menengah',
          nextStreakCorrect: 0,
          nextStreakWrong: 0,
          shifted: 'up',
        };
      }
      if (currentDifficulty === 'Menengah') {
        return {
          nextDifficulty: 'Mahir',
          nextStreakCorrect: 0,
          nextStreakWrong: 0,
          shifted: 'up',
        };
      }
    }
    return {
      nextDifficulty: currentDifficulty,
      nextStreakCorrect: newStreak,
      nextStreakWrong: 0,
    };
  } else {
    const newWrong = consecutiveWrong + 1;
    if (newWrong >= 2) {
      if (currentDifficulty === 'Mahir') {
        return {
          nextDifficulty: 'Menengah',
          nextStreakCorrect: 0,
          nextStreakWrong: 0,
          shifted: 'down',
        };
      }
      if (currentDifficulty === 'Menengah') {
        return {
          nextDifficulty: 'Dasar',
          nextStreakCorrect: 0,
          nextStreakWrong: 0,
          shifted: 'down',
        };
      }
    }
    return {
      nextDifficulty: currentDifficulty,
      nextStreakCorrect: 0,
      nextStreakWrong: newWrong,
    };
  }
}

export function pickNextAdaptiveQuestion(
  allQuestions: QuizQuestion[],
  answeredIds: number[],
  targetDifficulty: AdaptiveDifficulty,
  studentClass: StudentClass
): QuizQuestion | null {
  const remaining = allQuestions.filter((q) => !answeredIds.includes(q.id));
  if (remaining.length === 0) return null;

  // Prefer matching targetDifficulty, keeping balanced progression across topics
  const exactMatches = remaining.filter((q) => q.difficulty === targetDifficulty);
  if (exactMatches.length > 0) {
    // Rotate slightly by class so 9A & 9B experience organic topic alternation
    const idx = studentClass === '9B' && exactMatches.length > 1 ? 1 : 0;
    return exactMatches[idx];
  }

  // Fallback to nearest difficulty tier
  const order: AdaptiveDifficulty[] =
    targetDifficulty === 'Dasar'
      ? ['Dasar', 'Menengah', 'Mahir']
      : targetDifficulty === 'Mahir'
      ? ['Mahir', 'Menengah', 'Dasar']
      : ['Menengah', 'Dasar', 'Mahir'];

  for (const tier of order) {
    const candidate = remaining.find((q) => q.difficulty === tier);
    if (candidate) return candidate;
  }

  return remaining[0];
}

function calcTopicPercent(records: StudentAnswerRecord[], topic: MathTopic): number {
  const items = records.filter((r) => r.topic === topic);
  if (items.length === 0) return 0;
  const sum = items.reduce((acc, r) => acc + r.partialScore, 0);
  return Math.round((sum / items.length) * 100);
}

function calcCompetencyPercent(
  records: StudentAnswerRecord[],
  comp: CompetencyLevel
): number {
  const items = records.filter((r) => r.competency === comp);
  if (items.length === 0) return 0;
  const sum = items.reduce((acc, r) => acc + r.partialScore, 0);
  return Math.round((sum / items.length) * 100);
}

export function buildAttemptMetrics(params: {
  ownerUid: string;
  studentName: string;
  studentClass: StudentClass;
  studentAbsentNo: string;
  records: StudentAnswerRecord[];
  adaptiveLevel: AdaptiveDifficulty;
  durationSeconds: number;
  totalQuestions: number;
  isCompleted: boolean;
}): Omit<QuizAttemptDoc, 'createdAt' | 'updatedAt'> {
  const { records, totalQuestions } = params;
  const totalPartial = records.reduce((acc, r) => acc + r.partialScore, 0);
  const score = Math.round((totalPartial / totalQuestions) * 100);
  const correctCount = records.filter((r) => r.isCorrect).length;

  return {
    ownerUid: params.ownerUid,
    studentName: params.studentName.trim().slice(0, 80),
    studentClass: params.studentClass,
    studentAbsentNo: params.studentAbsentNo.trim().slice(0, 10) || '-',
    status: params.isCompleted ? 'completed' : 'in_progress',
    adaptiveLevel: params.adaptiveLevel,
    currentQuestionIndex: Math.min(records.length, totalQuestions),
    answeredCount: records.length,
    correctCount,
    score,
    scoreSpldv: calcTopicPercent(records, 'SPLDV'),
    scoreJaring: calcTopicPercent(records, 'Jaring-Jaring'),
    scoreBrsd: calcTopicPercent(records, 'BRSD'),
    scoreLingkaran: calcTopicPercent(records, 'Lingkaran'),
    scoreBrsl: calcTopicPercent(records, 'BRSL'),
    scoreMemahami: calcCompetencyPercent(records, 'Memahami'),
    scoreMengaplikasikan: calcCompetencyPercent(records, 'Mengaplikasikan'),
    scoreMenalar: calcCompetencyPercent(records, 'Menalar'),
    pgCorrect: records.filter((r) => r.type === 'pg' && r.isCorrect).length,
    mcmaCorrect: records.filter((r) => r.type === 'mcma' && r.isCorrect).length,
    bsCorrect: records.filter((r) => r.type === 'bs' && r.isCorrect).length,
    durationSeconds: Math.max(0, Math.round(params.durationSeconds)),
    answersSummary: records
      .slice(0, 35)
      .map((r) => `${r.questionId}:${r.isCorrect ? 1 : 0}`),
  };
}
