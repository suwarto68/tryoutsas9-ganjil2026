import { QUESTIONS_PART_1 } from './questionsPart1';
import { QUESTIONS_PART_2 } from './questionsPart2';
import { QuizQuestion } from '../types/quiz';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  ...QUESTIONS_PART_1,
  ...QUESTIONS_PART_2,
];

export const TOTAL_QUESTIONS = QUIZ_QUESTIONS.length; // 35
