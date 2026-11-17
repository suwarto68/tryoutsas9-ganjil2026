export type StudentClass = '9A' | '9B';

export type QuestionType = 'pg' | 'mcma' | 'bs';

export type MathTopic =
  | 'SPLDV'
  | 'Jaring-Jaring'
  | 'BRSD'
  | 'Lingkaran'
  | 'BRSL';

export type CompetencyLevel = 'Memahami' | 'Mengaplikasikan' | 'Menalar';

export type AdaptiveDifficulty = 'Dasar' | 'Menengah' | 'Mahir';

export type VisualKind =
  | 'wanaraya_chart_bar'
  | 'wanaraya_chart_line'
  | 'wanaraya_infographic'
  | 'geometry_net_grid'
  | 'geometry_solid_3d'
  | 'geometry_circle';

export interface ChartDatum {
  label: string;
  value: number;
  secondaryValue?: number;
}

export interface InfographicItem {
  label: string;
  value: string;
  unit?: string;
}

export interface NetGridOption {
  label: string;
  cells: [number, number][]; // [row, col] on a 5x5 grid
  shapeName: string;
}

export interface StimulusVisualConfig {
  kind: VisualKind;
  title: string;
  subtitle?: string;
  caption: string;
  // For charts
  xLabel?: string;
  yLabel?: string;
  seriesNames?: [string, string?];
  chartData?: ChartDatum[];
  // For infographics
  infographicItems?: InfographicItem[];
  infographicHighlight?: string;
  // For geometry_net_grid (neutral reference or 4 neutral unhighlighted candidates)
  netPattern?: 'kubus_referensi' | 'balok_referensi' | 'tabung_referensi' | 'kerucut_referensi' | 'limas_referensi' | 'prisma_referensi' | 'pilihan_4_jaring';
  netCandidates?: NetGridOption[];
  // For geometry_solid_3d
  solidKind?:
    | 'kubus'
    | 'balok'
    | 'prisma_segitiga'
    | 'limas_segiempat'
    | 'gabungan_kubus_limas'
    | 'gabungan_balok_prisma'
    | 'tabung'
    | 'kerucut'
    | 'bola'
    | 'gabungan_tabung_kerucut'
    | 'gabungan_tabung_setengah_bola';
  dimensions?: { label: string; value: string }[];
  // For geometry_circle
  circleKind?:
    | 'unsur_dasar'
    | 'sudut_pusat_keliling'
    | 'busur_juring'
    | 'tali_busur_apotema'
    | 'garis_singgung_luar'
    | 'segiempat_tali_busur';
  circleLabels?: {
    center?: string;
    angleA?: string;
    angleB?: string;
    radius?: string;
    extra?: string;
  };
}

export interface QuizQuestion {
  id: number;
  code: string;
  topic: MathTopic;
  type: QuestionType;
  competency: CompetencyLevel;
  difficulty: AdaptiveDifficulty;
  isListeningFocus?: boolean;
  stimulusTitle: string;
  stimulusText: string; // ~100 words Wanaraya contextual passage
  visual: StimulusVisualConfig;
  questionText: string;
  // For PG (17 questions): 4 options, single index 0..3
  options?: string[];
  correctOptionIndex?: number;
  // For MCMA (8 questions): 4 statements, array of true indices
  mcmaStatements?: string[];
  correctMcmaIndices?: number[];
  // For Benar/Salah (10 questions): 3 statements, array of 3 booleans
  bsStatements?: string[];
  correctBsAnswers?: boolean[];
  // Educative feedback
  correctAppreciation: string;
  explanationShort: string;
  wrongCorrectionGuide: string;
  languageMeaningNote: string;
}

export interface StudentAnswerRecord {
  questionId: number;
  topic: MathTopic;
  type: QuestionType;
  competency: CompetencyLevel;
  isCorrect: boolean;
  partialScore: number; // 0 to 1 (1 for full correct)
  selectedPg?: number;
  selectedMcma?: number[];
  selectedBs?: (boolean | null)[];
  timestamp: number;
}

export interface QuizAttemptDoc {
  id?: string;
  ownerUid: string;
  studentName: string;
  studentClass: StudentClass;
  studentAbsentNo: string;
  status: 'in_progress' | 'completed';
  adaptiveLevel: AdaptiveDifficulty;
  currentQuestionIndex: number;
  answeredCount: number;
  correctCount: number;
  score: number;
  scoreSpldv: number;
  scoreJaring: number;
  scoreBrsd: number;
  scoreLingkaran: number;
  scoreBrsl: number;
  scoreMemahami: number;
  scoreMengaplikasikan: number;
  scoreMenalar: number;
  pgCorrect: number;
  mcmaCorrect: number;
  bsCorrect: number;
  durationSeconds: number;
  answersSummary: string[];
  createdAt?: unknown;
  updatedAt?: unknown;
}
