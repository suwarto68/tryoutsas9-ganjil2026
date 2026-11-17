import React, { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import {
  auth,
  db,
  handleFirestoreError,
  loginWithGoogle,
  logoutGoogle,
  OperationType,
  testFirestoreConnection,
} from './firebase';
import { ErrorBoundary } from './components/ErrorBoundary';
import { WelcomeIdentityView } from './components/WelcomeIdentityView';
import { QuizWorkspace } from './components/QuizWorkspace';
import { QuizResultSummary } from './components/QuizResultSummary';
import { TeacherDashboard } from './components/TeacherDashboard';
import { QUIZ_QUESTIONS, TOTAL_QUESTIONS } from './data/questions';
import {
  AdaptiveDifficulty,
  QuizAttemptDoc,
  QuizQuestion,
  StudentAnswerRecord,
  StudentClass,
} from './types/quiz';
import {
  buildAttemptMetrics,
  pickNextAdaptiveQuestion,
} from './utils/adaptiveEngine';
import {
  playCompleteSound,
  playSelectSound,
  stopNarration,
  unlockAudioEngine,
} from './utils/audioEngine';

type AppScreen = 'welcome' | 'quiz' | 'result' | 'dashboard';

interface PersistedSession {
  attemptId: string;
  studentName: string;
  studentClass: StudentClass;
  studentAbsentNo: string;
  records: StudentAnswerRecord[];
  adaptiveLevel: AdaptiveDifficulty;
  consecutiveCorrect: number;
  consecutiveWrong: number;
  currentQuestionId: number;
  elapsedSeconds: number;
  completed: boolean;
  cloudCreated: boolean;
  cloudCompleted: boolean;
}

const LOCAL_STORAGE_KEY = 'wanaraya_sas_quiz_state_v1';

function generateAttemptId(): string {
  const rand = Math.random().toString(36).slice(2, 10);
  return `att_${Date.now()}_${rand}`;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [screen, setScreen] = useState<AppScreen>('welcome');

  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [ttsEnabled, setTtsEnabled] = useState(false);

  const [session, setSession] = useState<PersistedSession | null>(null);
  const [savedLocalSession, setSavedLocalSession] = useState<PersistedSession | null>(
    null
  );
  const timerRef = useRef<number | null>(null);

  // Boot Firestore check + Auth listener
  useEffect(() => {
    testFirestoreConnection();
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthReady(true);
    });
    return () => unsub();
  }, []);

  // Load any saved local session on boot
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as PersistedSession;
        if (parsed && parsed.attemptId && Array.isArray(parsed.records)) {
          setSavedLocalSession(parsed);
        }
      }
    } catch {
      // Ignore corrupt storage
    }
  }, []);

  // Persist active session locally
  useEffect(() => {
    if (!session) return;
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(session));
      setSavedLocalSession(session.completed ? null : session);
    } catch {
      // Ignore quota errors
    }
  }, [session]);

  // Quiz elapsed timer
  useEffect(() => {
    if (screen !== 'quiz' || !session || session.completed) {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = window.setInterval(() => {
      setSession((prev) =>
        prev && !prev.completed
          ? { ...prev, elapsedSeconds: prev.elapsedSeconds + 1 }
          : prev
      );
    }, 1000);

    return () => {
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [screen, session?.attemptId, session?.completed]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (err) {
      console.error('Google Sign-In error:', err);
    }
  };

  const handleLogout = async () => {
    stopNarration();
    await logoutGoogle();
  };

  const syncSessionToFirestore = async (
    targetSession: PersistedSession,
    firebaseUser: User,
    markCompleted: boolean
  ) => {
    const metrics = buildAttemptMetrics({
      ownerUid: firebaseUser.uid,
      studentName: targetSession.studentName,
      studentClass: targetSession.studentClass,
      studentAbsentNo: targetSession.studentAbsentNo,
      records: targetSession.records,
      adaptiveLevel: targetSession.adaptiveLevel,
      durationSeconds: targetSession.elapsedSeconds,
      totalQuestions: TOTAL_QUESTIONS,
      isCompleted: markCompleted,
    });

    const docPath = `quiz_attempts/${targetSession.attemptId}`;
    const docRef = doc(db, 'quiz_attempts', targetSession.attemptId);

    if (!targetSession.cloudCreated) {
      try {
        await setDoc(docRef, {
          ...metrics,
          status: 'in_progress',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        targetSession.cloudCreated = true;
      } catch (error) {
        handleFirestoreError(error, OperationType.CREATE, docPath);
      }
    }

    if (markCompleted || targetSession.records.length > 0) {
      try {
        await updateDoc(docRef, {
          ...metrics,
          status: markCompleted ? 'completed' : 'in_progress',
          updatedAt: serverTimestamp(),
        });
        if (markCompleted) {
          targetSession.cloudCompleted = true;
        }
      } catch (error) {
        handleFirestoreError(error, OperationType.UPDATE, docPath);
      }
    }
  };

  const handleStartQuiz = async (identity: {
    name: string;
    studentClass: StudentClass;
    absentNo: string;
  }) => {
    unlockAudioEngine();
    playSelectSound(sfxEnabled);
    const initialDifficulty: AdaptiveDifficulty = 'Menengah';
    const firstQ =
      pickNextAdaptiveQuestion(
        QUIZ_QUESTIONS,
        [],
        initialDifficulty,
        identity.studentClass
      ) || QUIZ_QUESTIONS[0];

    const newSession: PersistedSession = {
      attemptId: generateAttemptId(),
      studentName: identity.name,
      studentClass: identity.studentClass,
      studentAbsentNo: identity.absentNo,
      records: [],
      adaptiveLevel: initialDifficulty,
      consecutiveCorrect: 0,
      consecutiveWrong: 0,
      currentQuestionId: firstQ.id,
      elapsedSeconds: 0,
      completed: false,
      cloudCreated: false,
      cloudCompleted: false,
    };

    if (user) {
      await syncSessionToFirestore(newSession, user, false);
    }

    setSession(newSession);
    setScreen('quiz');
  };

  const handleResumeLocalSession = () => {
    if (!savedLocalSession) return;
    playSelectSound(sfxEnabled);
    setSession(savedLocalSession);
    setScreen(savedLocalSession.completed ? 'result' : 'quiz');
  };

  const handleSubmitAnswer = async (params: {
    record: StudentAnswerRecord;
    nextDifficulty: AdaptiveDifficulty;
    nextStreakCorrect: number;
    nextStreakWrong: number;
  }) => {
    if (!session) return;

    const updatedRecords = [...session.records, params.record];
    const updatedSession: PersistedSession = {
      ...session,
      records: updatedRecords,
      adaptiveLevel: params.nextDifficulty,
      consecutiveCorrect: params.nextStreakCorrect,
      consecutiveWrong: params.nextStreakWrong,
    };

    setSession(updatedSession);

    if (user && !updatedSession.cloudCompleted) {
      await syncSessionToFirestore(updatedSession, user, false);
      setSession((prev) =>
        prev ? { ...prev, cloudCreated: updatedSession.cloudCreated } : prev
      );
    }
  };

  const handleAdvanceNext = async () => {
    if (!session) return;
    const answeredIds = session.records.map((r) => r.questionId);
    const nextQ = pickNextAdaptiveQuestion(
      QUIZ_QUESTIONS,
      answeredIds,
      session.adaptiveLevel,
      session.studentClass
    );

    if (!nextQ) {
      playCompleteSound(sfxEnabled);
      const completedSession: PersistedSession = {
        ...session,
        completed: true,
      };
      setSession(completedSession);
      if (user) {
        await syncSessionToFirestore(completedSession, user, true);
        setSession((prev) =>
          prev
            ? {
                ...prev,
                cloudCreated: completedSession.cloudCreated,
                cloudCompleted: completedSession.cloudCompleted,
              }
            : prev
        );
      }
      setScreen('result');
      return;
    }

    setSession((prev) =>
      prev ? { ...prev, currentQuestionId: nextQ.id } : prev
    );
  };

  const handleSyncNowWithGoogle = async () => {
    try {
      const cred = await loginWithGoogle();
      if (cred.user && session) {
        const cloned = { ...session };
        await syncSessionToFirestore(cloned, cred.user, cloned.completed);
        setSession(cloned);
      }
    } catch (err) {
      console.error('Sync after quiz failed:', err);
    }
  };

  const handleRestartQuiz = () => {
    stopNarration();
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setSavedLocalSession(null);
    setSession(null);
    setScreen('welcome');
  };

  const currentQuestion: QuizQuestion | undefined = session
    ? QUIZ_QUESTIONS.find((q) => q.id === session.currentQuestionId)
    : undefined;

  const resultMetrics: Omit<QuizAttemptDoc, 'createdAt' | 'updatedAt'> | null =
    session
      ? buildAttemptMetrics({
          ownerUid: user?.uid || 'local_student',
          studentName: session.studentName,
          studentClass: session.studentClass,
          studentAbsentNo: session.studentAbsentNo,
          records: session.records,
          adaptiveLevel: session.adaptiveLevel,
          durationSeconds: session.elapsedSeconds,
          totalQuestions: TOTAL_QUESTIONS,
          isCompleted: session.completed,
        })
      : null;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        {/* Strict 3-Zone Top Bar Contract */}
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
            {/* Zone 1: Brand Title */}
            <button
              type="button"
              onClick={() => {
                stopNarration();
                setScreen('welcome');
              }}
              className="text-base sm:text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer font-display"
            >
              Try Out SAS Wanaraya
            </button>

            {/* Zone 2: Concise Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
              <button
                type="button"
                onClick={() => {
                  stopNarration();
                  setScreen('welcome');
                }}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  screen === 'welcome' ? 'text-sky-700 font-semibold' : ''
                }`}
              >
                Beranda
              </button>
              <button
                type="button"
                onClick={() => {
                  if (session && !session.completed) {
                    setScreen('quiz');
                  } else if (session && session.completed) {
                    setScreen('result');
                  } else {
                    setScreen('welcome');
                  }
                }}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  screen === 'quiz' || screen === 'result'
                    ? 'text-sky-700 font-semibold'
                    : ''
                }`}
              >
                Kuis Siswa
              </button>
              <button
                type="button"
                onClick={() => {
                  stopNarration();
                  setScreen('dashboard');
                }}
                className={`hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  screen === 'dashboard' ? 'text-sky-700 font-semibold' : ''
                }`}
              >
                Dasbor Guru
              </button>
            </nav>

            {/* Zone 3: 1 Primary Action */}
            <div className="flex items-center gap-3 shrink-0">
              {user ? (
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Keluar Akun
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  className="px-4 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Masuk Google
                </button>
              )}
            </div>
          </div>

          {/* Mobile quick nav */}
          <div className="md:hidden border-t border-slate-100 px-4 py-2 flex items-center justify-around text-xs font-medium text-slate-600">
            <button
              type="button"
              onClick={() => {
                stopNarration();
                setScreen('welcome');
              }}
              className={`py-1 px-2 whitespace-nowrap ${
                screen === 'welcome' ? 'text-sky-700 font-bold' : ''
              }`}
            >
              Beranda
            </button>
            <button
              type="button"
              onClick={() => {
                if (session && !session.completed) setScreen('quiz');
                else if (session && session.completed) setScreen('result');
                else setScreen('welcome');
              }}
              className={`py-1 px-2 whitespace-nowrap ${
                screen === 'quiz' || screen === 'result'
                  ? 'text-sky-700 font-bold'
                  : ''
              }`}
            >
              Kuis Siswa
            </button>
            <button
              type="button"
              onClick={() => {
                stopNarration();
                setScreen('dashboard');
              }}
              className={`py-1 px-2 whitespace-nowrap ${
                screen === 'dashboard' ? 'text-sky-700 font-bold' : ''
              }`}
            >
              Dasbor Guru
            </button>
          </div>
        </header>

        {/* Active View */}
        <div className="flex-1">
          {screen === 'welcome' && (
            <WelcomeIdentityView
              user={user}
              authReady={authReady}
              onGoogleLogin={handleGoogleLogin}
              sfxEnabled={sfxEnabled}
              ttsEnabled={ttsEnabled}
              onToggleSfx={() => {
                unlockAudioEngine();
                setSfxEnabled((v) => {
                  const next = !v;
                  if (next) playSelectSound(true);
                  return next;
                });
              }}
              onToggleTts={() => {
                unlockAudioEngine();
                setTtsEnabled((v) => {
                  if (v) stopNarration();
                  return !v;
                });
              }}
              onStartQuiz={handleStartQuiz}
              onOpenTeacherDashboard={() => setScreen('dashboard')}
              hasSavedLocalSession={Boolean(
                savedLocalSession && !savedLocalSession.completed
              )}
              onResumeLocalSession={handleResumeLocalSession}
            />
          )}

          {screen === 'quiz' && session && currentQuestion && (
            <QuizWorkspace
              studentName={session.studentName}
              studentClass={session.studentClass}
              currentQuestion={currentQuestion}
              questionNumber={Math.min(
                session.records.length +
                  (session.records.some((r) => r.questionId === currentQuestion.id)
                    ? 0
                    : 1),
                TOTAL_QUESTIONS
              )}
              totalQuestions={TOTAL_QUESTIONS}
              adaptiveLevel={session.adaptiveLevel}
              consecutiveCorrect={session.consecutiveCorrect}
              consecutiveWrong={session.consecutiveWrong}
              elapsedSeconds={session.elapsedSeconds}
              sfxEnabled={sfxEnabled}
              ttsEnabled={ttsEnabled}
              onToggleSfx={() => {
                unlockAudioEngine();
                setSfxEnabled((v) => {
                  const next = !v;
                  if (next) playSelectSound(true);
                  return next;
                });
              }}
              onToggleTts={() => {
                unlockAudioEngine();
                setTtsEnabled((v) => {
                  if (v) stopNarration();
                  return !v;
                });
              }}
              onSubmitAnswer={handleSubmitAnswer}
              onAdvanceNext={handleAdvanceNext}
            />
          )}

          {screen === 'result' && session && resultMetrics && (
            <QuizResultSummary
              metrics={resultMetrics}
              user={user}
              cloudSynced={session.cloudCompleted}
              onSyncNowWithGoogle={handleSyncNowWithGoogle}
              onRestart={handleRestartQuiz}
              onOpenDashboard={() => setScreen('dashboard')}
            />
          )}

          {screen === 'dashboard' && (
            <TeacherDashboard
              user={user}
              authReady={authReady}
              onGoogleLogin={handleGoogleLogin}
              onBackToQuiz={() => setScreen('welcome')}
            />
          )}
        </div>

        <footer className="border-t border-slate-200 bg-white py-4 px-4 text-center text-xs text-slate-500">
          Asesmen Persiapan Sumatif Akhir Semester (SAS) Matematika Kelas 9 · SMPN 1
          Wanaraya
        </footer>
      </div>
    </ErrorBoundary>
  );
}
