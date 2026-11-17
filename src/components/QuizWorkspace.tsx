import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  HelpCircle,
  PauseCircle,
  PlayCircle,
  Sparkles,
  Volume2,
  VolumeX,
  XCircle,
} from 'lucide-react';
import {
  AdaptiveDifficulty,
  QuizQuestion,
  StudentAnswerRecord,
  StudentClass,
} from '../types/quiz';
import { StimulusVisual } from './StimulusVisual';
import {
  isSpeechSupported,
  NarrationPhase,
  playCorrectSound,
  playLevelUpSound,
  playSelectSound,
  playWrongSound,
  speakFeedbackMessage,
  speakQuizContent,
  stopNarration,
  unlockAudioEngine,
} from '../utils/audioEngine';
import {
  computeNextAdaptiveState,
  evaluateAnswer,
} from '../utils/adaptiveEngine';

interface QuizWorkspaceProps {
  studentName: string;
  studentClass: StudentClass;
  currentQuestion: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  adaptiveLevel: AdaptiveDifficulty;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  elapsedSeconds: number;
  sfxEnabled: boolean;
  ttsEnabled: boolean;
  onToggleSfx: () => void;
  onToggleTts: () => void;
  onSubmitAnswer: (params: {
    record: StudentAnswerRecord;
    nextDifficulty: AdaptiveDifficulty;
    nextStreakCorrect: number;
    nextStreakWrong: number;
    shifted?: 'up' | 'down';
  }) => void;
  onAdvanceNext: () => void;
}

export const QuizWorkspace: React.FC<QuizWorkspaceProps> = ({
  studentName,
  studentClass,
  currentQuestion,
  questionNumber,
  totalQuestions,
  adaptiveLevel,
  consecutiveCorrect,
  consecutiveWrong,
  elapsedSeconds,
  sfxEnabled,
  ttsEnabled,
  onToggleSfx,
  onToggleTts,
  onSubmitAnswer,
  onAdvanceNext,
}) => {
  const [selectedPg, setSelectedPg] = useState<number | undefined>(undefined);
  const [selectedMcma, setSelectedMcma] = useState<number[]>([]);
  const [selectedBs, setSelectedBs] = useState<(boolean | null)[]>([
    null,
    null,
    null,
  ]);
  const [submittedResult, setSubmittedResult] = useState<{
    isCorrect: boolean;
    partialScore: number;
    shifted?: 'up' | 'down';
  } | null>(null);
  const [narrationPhase, setNarrationPhase] = useState<NarrationPhase>('idle');
  const [audioNotice, setAudioNotice] = useState<string | null>(null);

  // Reset local selection when question changes
  useEffect(() => {
    setSelectedPg(undefined);
    setSelectedMcma([]);
    setSelectedBs([null, null, null]);
    setSubmittedResult(null);
    setAudioNotice(null);
    stopNarration(setNarrationPhase);

    if (ttsEnabled && isSpeechSupported()) {
      const extraItems =
        currentQuestion.type === 'pg'
          ? currentQuestion.options
          : currentQuestion.type === 'mcma'
          ? currentQuestion.mcmaStatements
          : currentQuestion.bsStatements;

      const timer = window.setTimeout(() => {
        speakQuizContent({
          stimulusTitle: currentQuestion.stimulusTitle,
          stimulusText: currentQuestion.stimulusText,
          questionText: currentQuestion.questionText,
          questionType: currentQuestion.type,
          extraItems,
          onPhaseChange: setNarrationPhase,
          onError: (msg) => setAudioNotice(msg),
        });
      }, 260);
      return () => {
        window.clearTimeout(timer);
        stopNarration();
      };
    }
    return () => stopNarration();
  }, [currentQuestion.id]);

  // React to Narasi ON/OFF toggle while staying on current question
  useEffect(() => {
    if (!ttsEnabled) {
      stopNarration(setNarrationPhase);
      return;
    }
    if (submittedResult === null && isSpeechSupported()) {
      unlockAudioEngine();
      const extraItems =
        currentQuestion.type === 'pg'
          ? currentQuestion.options
          : currentQuestion.type === 'mcma'
          ? currentQuestion.mcmaStatements
          : currentQuestion.bsStatements;

      speakQuizContent({
        stimulusTitle: currentQuestion.stimulusTitle,
        stimulusText: currentQuestion.stimulusText,
        questionText: currentQuestion.questionText,
        questionType: currentQuestion.type,
        extraItems,
        onPhaseChange: setNarrationPhase,
        onError: (msg) => setAudioNotice(msg),
      });
    }
  }, [ttsEnabled]);

  const handleManualPlayNarration = () => {
    unlockAudioEngine();
    setAudioNotice(null);
    if (!isSpeechSupported()) {
      setAudioNotice('Browser Anda belum mendukung fitur narasi suara.');
      return;
    }
    if (narrationPhase !== 'idle') {
      stopNarration(setNarrationPhase);
      return;
    }
    const extraItems =
      currentQuestion.type === 'pg'
        ? currentQuestion.options
        : currentQuestion.type === 'mcma'
        ? currentQuestion.mcmaStatements
        : currentQuestion.bsStatements;

    speakQuizContent({
      stimulusTitle: currentQuestion.stimulusTitle,
      stimulusText: currentQuestion.stimulusText,
      questionText: currentQuestion.questionText,
      questionType: currentQuestion.type,
      extraItems,
      onPhaseChange: setNarrationPhase,
      onError: (msg) => setAudioNotice(msg),
    });
  };

  const canCheckAnswer = () => {
    if (submittedResult !== null) return false;
    if (currentQuestion.type === 'pg') return selectedPg !== undefined;
    if (currentQuestion.type === 'mcma') return selectedMcma.length > 0;
    return selectedBs.every((val) => val !== null);
  };

  const handleToggleMcma = (idx: number) => {
    if (submittedResult) return;
    playSelectSound(sfxEnabled);
    setSelectedMcma((prev) =>
      prev.includes(idx) ? prev.filter((item) => item !== idx) : [...prev, idx]
    );
  };

  const handleSelectBs = (rowIdx: number, val: boolean) => {
    if (submittedResult) return;
    playSelectSound(sfxEnabled);
    setSelectedBs((prev) => {
      const next = [...prev];
      next[rowIdx] = val;
      return next;
    });
  };

  const handleCheck = () => {
    if (!canCheckAnswer()) return;
    stopNarration(setNarrationPhase);

    const evalRes = evaluateAnswer(currentQuestion, {
      pg: selectedPg,
      mcma: selectedMcma,
      bs: selectedBs,
    });

    const adaptiveRes = computeNextAdaptiveState(
      adaptiveLevel,
      consecutiveCorrect,
      consecutiveWrong,
      evalRes.isCorrect
    );

    if (evalRes.isCorrect) {
      if (adaptiveRes.shifted === 'up') {
        playLevelUpSound(sfxEnabled);
      } else {
        playCorrectSound(sfxEnabled);
      }
      if (ttsEnabled) {
        speakFeedbackMessage(
          `${currentQuestion.correctAppreciation} ${currentQuestion.explanationShort}`,
          (msg) => setAudioNotice(msg)
        );
      }
    } else {
      playWrongSound(sfxEnabled);
      if (ttsEnabled) {
        speakFeedbackMessage(
          `Jawaban belum tepat. ${currentQuestion.wrongCorrectionGuide} ${currentQuestion.languageMeaningNote}`,
          (msg) => setAudioNotice(msg)
        );
      }
    }

    setSubmittedResult({
      isCorrect: evalRes.isCorrect,
      partialScore: evalRes.partialScore,
      shifted: adaptiveRes.shifted,
    });

    onSubmitAnswer({
      record: {
        questionId: currentQuestion.id,
        topic: currentQuestion.topic,
        type: currentQuestion.type,
        competency: currentQuestion.competency,
        isCorrect: evalRes.isCorrect,
        partialScore: evalRes.partialScore,
        selectedPg,
        selectedMcma,
        selectedBs,
        timestamp: Date.now(),
      },
      nextDifficulty: adaptiveRes.nextDifficulty,
      nextStreakCorrect: adaptiveRes.nextStreakCorrect,
      nextStreakWrong: adaptiveRes.nextStreakWrong,
      shifted: adaptiveRes.shifted,
    });
  };

  const handleNextClick = () => {
    stopNarration(setNarrationPhase);
    playSelectSound(sfxEnabled);
    onAdvanceNext();
  };

  const formatClock = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const progressPct = Math.round((questionNumber / totalQuestions) * 100);
  const typeLabel =
    currentQuestion.type === 'pg'
      ? 'Pilihan Ganda'
      : currentQuestion.type === 'mcma'
      ? 'Pilihan Ganda Kompleks (MCMA · 4 Pernyataan)'
      : 'Benar / Salah (3 Pernyataan)';

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Compact Workspace Toolbar */}
      <div className="bg-white border border-slate-200 rounded-2xl px-4 sm:px-6 py-3.5 mb-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm">
          <span className="font-bold text-slate-900 tabular-nums">
            Soal {questionNumber} dari {totalQuestions}
          </span>
          <span className="text-slate-300" aria-hidden="true">
            ·
          </span>
          <span className="text-slate-600">
            {studentName} (Kelas {studentClass})
          </span>
          <span className="text-slate-300" aria-hidden="true">
            ·
          </span>
          <span className="font-semibold text-sky-700">
            Level Adaptif: {adaptiveLevel}
          </span>
          <span className="text-slate-300" aria-hidden="true">
            ·
          </span>
          <span className="font-math text-slate-700 tabular-nums">
            {formatClock(elapsedSeconds)}
          </span>
        </div>

        {/* Audio & Speech Controls */}
        <div className="flex items-center gap-2 flex-wrap">
          {isSpeechSupported() && (
            <button
              type="button"
              onClick={handleManualPlayNarration}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                narrationPhase !== 'idle'
                  ? 'bg-sky-600 border-sky-600 text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {narrationPhase !== 'idle' ? (
                <>
                  <PauseCircle className="w-3.5 h-3.5" />
                  Hentikan Suara
                </>
              ) : (
                <>
                  <PlayCircle className="w-3.5 h-3.5 text-sky-600" />
                  Bacakan Soal
                </>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={onToggleSfx}
            aria-label="Toggle efek suara"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              sfxEnabled
                ? 'bg-sky-50 border-sky-200 text-sky-900'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            {sfxEnabled ? (
              <Volume2 className="w-3.5 h-3.5 text-sky-600" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
            )}
            SFX: {sfxEnabled ? 'ON' : 'OFF'}
          </button>

          <button
            type="button"
            onClick={onToggleTts}
            aria-label="Toggle narasi otomatis"
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
              ttsEnabled
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <Headphones
              className={`w-3.5 h-3.5 ${
                ttsEnabled ? 'text-amber-600' : 'text-slate-400'
              }`}
            />
            Narasi: {ttsEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Slim Progress Track */}
      <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-sky-600 transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {audioNotice && (
        <div className="mb-4 px-4 py-2.5 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-center justify-between gap-3">
          <span>{audioNotice}</span>
          <button
            type="button"
            onClick={() => setAudioNotice(null)}
            className="font-semibold text-amber-800 hover:underline shrink-0 cursor-pointer"
          >
            Tutup
          </button>
        </div>
      )}

      {/* Two-Column Educational Sandbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Zone: Stimulus Text + Wanaraya Visual */}
        <section className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="text-xs font-medium text-slate-500">
              {currentQuestion.topic} · Kompetensi: {currentQuestion.competency} ·{' '}
              {currentQuestion.difficulty}
            </div>
            {currentQuestion.isListeningFocus && (
              <button
                type="button"
                onClick={handleManualPlayNarration}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 hover:text-amber-950 cursor-pointer whitespace-nowrap"
              >
                <Headphones className="w-3.5 h-3.5" />
                {narrationPhase !== 'idle'
                  ? 'Sedang Membacakan (Klik untuk Stop)'
                  : 'Dengarkan lalu Jawab'}
              </button>
            )}
          </div>

          <div
            className={`rounded-xl p-4 sm:p-5 border transition-colors ${
              narrationPhase === 'reading_stimulus'
                ? 'bg-sky-50 border-sky-300'
                : 'bg-slate-50 border-slate-200'
            }`}
          >
            <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
              {currentQuestion.stimulusTitle}
            </h2>
            <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
              {currentQuestion.stimulusText}
            </p>
          </div>

          <StimulusVisual visual={currentQuestion.visual} />
        </section>

        {/* Right Zone: Question, Interactive Choices, & Educative Feedback */}
        <section className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-5">
          <div>
            <div className="text-xs font-semibold text-sky-700 mb-1.5">
              {typeLabel}
            </div>
            <h3
              className={`text-base sm:text-lg font-bold text-slate-900 leading-snug p-2 -mx-2 rounded-lg transition-colors ${
                narrationPhase === 'reading_question' ? 'bg-sky-50' : ''
              }`}
            >
              {currentQuestion.questionText}
            </h3>
          </div>

          {/* PG Options */}
          {currentQuestion.type === 'pg' && currentQuestion.options && (
            <div className="space-y-2.5">
              {currentQuestion.options.map((opt, idx) => {
                const letter = ['A', 'B', 'C', 'D'][idx];
                const isSelected = selectedPg === idx;
                const isCorrectOption = idx === currentQuestion.correctOptionIndex;

                let btnStyle =
                  'bg-white border-slate-200 text-slate-800 hover:border-sky-400 hover:bg-sky-50/40';
                if (submittedResult) {
                  if (isCorrectOption) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950';
                  } else if (isSelected && !isCorrectOption) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-200 text-slate-500';
                  }
                } else if (isSelected) {
                  btnStyle = 'bg-sky-50 border-sky-600 text-sky-950 ring-1 ring-sky-600';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={submittedResult !== null}
                    onClick={() => {
                      playSelectSound(sfxEnabled);
                      setSelectedPg(idx);
                    }}
                    className={`w-full min-h-[48px] px-4 py-3 border rounded-xl text-left flex items-center gap-3 transition-colors cursor-pointer disabled:cursor-default ${btnStyle}`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        isSelected && !submittedResult
                          ? 'bg-sky-600 text-white'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {letter}
                    </span>
                    <span className="text-sm font-medium leading-snug flex-1">
                      {opt}
                    </span>
                    {submittedResult && isCorrectOption && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {submittedResult && isSelected && !isCorrectOption && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* MCMA (4 Statements) */}
          {currentQuestion.type === 'mcma' && currentQuestion.mcmaStatements && (
            <div className="space-y-2.5">
              <div className="text-xs text-slate-500">
                Centang semua pernyataan yang bernilai benar (boleh lebih dari satu).
              </div>
              {currentQuestion.mcmaStatements.map((stmt, idx) => {
                const isChecked = selectedMcma.includes(idx);
                const shouldBeChecked =
                  currentQuestion.correctMcmaIndices?.includes(idx) || false;

                let cardStyle =
                  'bg-white border-slate-200 text-slate-800 hover:border-sky-400';
                if (submittedResult) {
                  if (shouldBeChecked) {
                    cardStyle = 'bg-emerald-50 border-emerald-500 text-emerald-950';
                  } else if (isChecked && !shouldBeChecked) {
                    cardStyle = 'bg-rose-50 border-rose-400 text-rose-950';
                  } else {
                    cardStyle = 'bg-slate-50 border-slate-200 text-slate-500';
                  }
                } else if (isChecked) {
                  cardStyle = 'bg-sky-50 border-sky-600 text-sky-950';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={submittedResult !== null}
                    onClick={() => handleToggleMcma(idx)}
                    className={`w-full min-h-[48px] px-4 py-3 border rounded-xl text-left flex items-start gap-3 transition-colors cursor-pointer disabled:cursor-default ${cardStyle}`}
                  >
                    <span
                      className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 text-xs font-bold ${
                        isChecked
                          ? 'bg-sky-600 border-sky-600 text-white'
                          : 'bg-white border-slate-300 text-transparent'
                      }`}
                    >
                      ✓
                    </span>
                    <span className="text-sm font-medium leading-snug flex-1">
                      {stmt}
                    </span>
                    {submittedResult && shouldBeChecked && (
                      <span className="text-xs font-semibold text-emerald-700 shrink-0">
                        Benar
                      </span>
                    )}
                    {submittedResult && isChecked && !shouldBeChecked && (
                      <span className="text-xs font-semibold text-rose-700 shrink-0">
                        Keliru
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Benar / Salah (3 Statements) */}
          {currentQuestion.type === 'bs' && currentQuestion.bsStatements && (
            <div className="space-y-3">
              {currentQuestion.bsStatements.map((stmt, idx) => {
                const chosen = selectedBs[idx];
                const expected = currentQuestion.correctBsAnswers?.[idx];
                const rowCorrect = submittedResult && chosen === expected;

                return (
                  <div
                    key={idx}
                    className={`p-4 border rounded-xl space-y-3 ${
                      submittedResult
                        ? rowCorrect
                          ? 'bg-emerald-50/70 border-emerald-300'
                          : 'bg-rose-50/70 border-rose-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="text-sm font-medium text-slate-900 leading-snug">
                      {idx + 1}. {stmt}
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="grid grid-cols-2 gap-2 flex-1 max-w-xs">
                        {[
                          { label: 'Benar', value: true },
                          { label: 'Salah', value: false },
                        ].map((choice) => {
                          const isChosen = chosen === choice.value;
                          return (
                            <button
                              key={choice.label}
                              type="button"
                              disabled={submittedResult !== null}
                              onClick={() => handleSelectBs(idx, choice.value)}
                              className={`min-h-[40px] px-4 py-2 rounded-lg border text-xs font-bold transition-colors cursor-pointer disabled:cursor-default whitespace-nowrap ${
                                isChosen
                                  ? 'bg-sky-600 border-sky-600 text-white'
                                  : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                              }`}
                            >
                              {choice.label}
                            </button>
                          );
                        })}
                      </div>

                      {submittedResult && (
                        <span
                          className={`text-xs font-bold whitespace-nowrap ${
                            rowCorrect ? 'text-emerald-700' : 'text-rose-700'
                          }`}
                        >
                          Kunci: {expected ? 'Benar' : 'Salah'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Action / Check Button */}
          {!submittedResult ? (
            <button
              type="button"
              disabled={!canCheckAnswer()}
              onClick={handleCheck}
              className="w-full py-3.5 px-6 bg-sky-600 hover:bg-sky-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer disabled:cursor-not-allowed"
            >
              Periksa Jawaban
            </button>
          ) : (
            <div className="space-y-4">
              {/* Educative Feedback Box */}
              <div
                className={`p-5 rounded-xl border space-y-3 ${
                  submittedResult.isCorrect
                    ? 'bg-emerald-50 border-emerald-200'
                    : 'bg-amber-50 border-amber-200'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {submittedResult.isCorrect ? (
                    <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <HelpCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <div
                      className={`text-sm font-bold ${
                        submittedResult.isCorrect
                          ? 'text-emerald-900'
                          : 'text-amber-950'
                      }`}
                    >
                      {submittedResult.isCorrect
                        ? currentQuestion.correctAppreciation
                        : submittedResult.partialScore > 0
                        ? 'Hampir Tepat! Sebagian pernyataanmu sudah benar — yuk sempurnakan.'
                        : 'Belum Tepat, Tidak Apa-Apa! Mari kita pelajari bersama.'}
                    </div>
                    {submittedResult.shifted && (
                      <div className="text-xs font-semibold text-sky-700 mt-1">
                        {submittedResult.shifted === 'up'
                          ? `Hebat! Tingkat adaptif naik ke level ${adaptiveLevel}.`
                          : `Sistem menyesuaikan ke level ${adaptiveLevel} untuk membantumu berlatih lebih mantap.`}
                      </div>
                    )}
                  </div>
                </div>

                <div className="text-sm text-slate-800 leading-relaxed bg-white/80 rounded-lg p-3.5 border border-slate-200/70">
                  <span className="font-bold text-slate-900">Pembahasan Ringkas: </span>
                  {currentQuestion.explanationShort}
                </div>

                {!submittedResult.isCorrect && (
                  <div className="space-y-2 text-xs text-slate-800 leading-relaxed bg-white/90 rounded-lg p-3.5 border border-amber-200">
                    <div>
                      <span className="font-bold text-amber-900">
                        Koreksi Membangun:{' '}
                      </span>
                      {currentQuestion.wrongCorrectionGuide}
                    </div>
                    <div>
                      <span className="font-bold text-sky-900">
                        Makna Tata Bahasa &amp; Kalimat Soal:{' '}
                      </span>
                      {currentQuestion.languageMeaningNote}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={handleNextClick}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer"
              >
                {questionNumber < totalQuestions
                  ? 'Lanjut ke Soal Berikutnya'
                  : 'Selesai & Lihat Hasil Try Out'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
