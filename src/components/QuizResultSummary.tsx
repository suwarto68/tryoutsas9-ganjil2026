import React from 'react';
import {
  Award,
  BarChart3,
  CheckCircle2,
  Cloud,
  CloudOff,
  LogIn,
  RotateCcw,
} from 'lucide-react';
import { QuizAttemptDoc } from '../types/quiz';
import { User } from 'firebase/auth';

interface QuizResultSummaryProps {
  metrics: Omit<QuizAttemptDoc, 'createdAt' | 'updatedAt'>;
  user: User | null;
  cloudSynced: boolean;
  onSyncNowWithGoogle: () => Promise<void>;
  onRestart: () => void;
  onOpenDashboard: () => void;
}

export const QuizResultSummary: React.FC<QuizResultSummaryProps> = ({
  metrics,
  user,
  cloudSynced,
  onSyncNowWithGoogle,
  onRestart,
  onOpenDashboard,
}) => {
  const formatDuration = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m} menit ${s} detik`;
  };

  const topicRows = [
    { name: '1. Sistem Persamaan Linier Dua Variabel (SPLDV)', score: metrics.scoreSpldv },
    { name: '2. Jaring-Jaring Bangun Ruang Sisi Datar & Lengkung', score: metrics.scoreJaring },
    { name: '3. Bangun Ruang Sisi Datar (Luas, Volume & Gabungan)', score: metrics.scoreBrsd },
    { name: '4. Lingkaran (Unsur, Sudut, Juring & Garis Singgung)', score: metrics.scoreLingkaran },
    { name: '5. Bangun Ruang Sisi Lengkung (Luas, Volume & Gabungan)', score: metrics.scoreBrsl },
  ];

  const competencyRows = [
    { name: 'Memahami (L1 · 20%)', score: metrics.scoreMemahami },
    { name: 'Mengaplikasikan (L2 · 50%)', score: metrics.scoreMengaplikasikan },
    { name: 'Menalar (L3 · 30%)', score: metrics.scoreMenalar },
  ];

  const predicate =
    metrics.score >= 85
      ? 'Sangat Memuaskan'
      : metrics.score >= 75
      ? 'Baik & Siap SAS'
      : metrics.score >= 60
      ? 'Cukup Baik, Terus Berlatih'
      : 'Perlu Penguatan Konsep';

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Main Result Header Card */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-sky-700">
              <Award className="w-4 h-4" />
              Try Out SAS Matematika Selesai · Kelas {metrics.studentClass}
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Hasil Asesmen: {metrics.studentName}
            </h1>
            <p className="text-sm text-slate-600">
              Predikat: <span className="font-bold text-slate-900">{predicate}</span> ·
              Level Adaptif Akhir:{' '}
              <span className="font-bold text-sky-700">{metrics.adaptiveLevel}</span> ·
              Waktu: <span className="tabular-nums">{formatDuration(metrics.durationSeconds)}</span>
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-2xl px-7 py-5 text-center shrink-0">
            <div className="text-xs font-semibold text-sky-700">Nilai Akhir</div>
            <div className="text-4xl font-bold text-sky-900 font-math tabular-nums mt-1">
              {metrics.score}
            </div>
            <div className="text-xs text-slate-600 mt-1 tabular-nums">
              {metrics.correctCount} dari 35 benar penuh
            </div>
          </div>
        </div>

        {/* Cloud Sync Status */}
        <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {cloudSynced && user ? (
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-700">
              <Cloud className="w-4 h-4" />
              Nilai telah tersinkron otomatis ke Cloud Database Dasbor Guru ({user.email}).
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 w-full justify-between bg-amber-50 border border-amber-200 rounded-xl p-3.5">
              <div className="inline-flex items-center gap-2 text-xs font-medium text-amber-900">
                <CloudOff className="w-4 h-4 text-amber-700 shrink-0" />
                Nilai baru tersimpan di perangkat ini. Masuk dengan Google agar nilaimu terkirim ke Dasbor Guru!
              </div>
              <button
                type="button"
                onClick={onSyncNowWithGoogle}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-lg whitespace-nowrap shrink-0 cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5" />
                Kirim ke Cloud Sekarang
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <section className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-base font-bold text-slate-900">
            <BarChart3 className="w-5 h-5 text-sky-600" />
            Capaian per Materi Matematika
          </div>
          <div className="space-y-3.5">
            {topicRows.map((row) => (
              <div key={row.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-medium text-slate-700">{row.name}</span>
                  <span className="font-bold text-slate-900 font-math tabular-nums">
                    {row.score}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      row.score >= 75
                        ? 'bg-emerald-500'
                        : row.score >= 55
                        ? 'bg-sky-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${row.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
          <div>
            <h2 className="text-base font-bold text-slate-900 mb-3">
              Capaian Tingkat Kompetensi
            </h2>
            <div className="space-y-3">
              {competencyRows.map((c) => (
                <div
                  key={c.name}
                  className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <span className="text-xs font-semibold text-slate-700">{c.name}</span>
                  <span className="text-sm font-bold text-slate-900 font-math tabular-nums">
                    {c.score}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-2.5">
              Ketepatan per Bentuk Soal
            </h3>
            <div className="grid grid-cols-3 gap-2.5 text-center">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="text-xs text-slate-500">PG (17)</div>
                <div className="text-base font-bold text-slate-900 font-math tabular-nums mt-0.5">
                  {metrics.pgCorrect}/17
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="text-xs text-slate-500">MCMA (8)</div>
                <div className="text-base font-bold text-slate-900 font-math tabular-nums mt-0.5">
                  {metrics.mcmaCorrect}/8
                </div>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                <div className="text-xs text-slate-500">B/S (10)</div>
                <div className="text-base font-bold text-slate-900 font-math tabular-nums mt-0.5">
                  {metrics.bsCorrect}/10
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onRestart}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 text-sm font-semibold rounded-xl cursor-pointer transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Ulangi / Peserta Baru
        </button>

        <button
          type="button"
          onClick={onOpenDashboard}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold rounded-xl cursor-pointer transition-colors"
        >
          <CheckCircle2 className="w-4 h-4" />
          Lihat Rekap di Dasbor
        </button>
      </div>
    </main>
  );
};
