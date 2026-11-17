import React, { useState } from 'react';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Cloud,
  GraduationCap,
  Headphones,
  LogIn,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { StudentClass } from '../types/quiz';
import { User } from 'firebase/auth';

interface WelcomeIdentityViewProps {
  user: User | null;
  authReady: boolean;
  onGoogleLogin: () => Promise<void>;
  sfxEnabled: boolean;
  ttsEnabled: boolean;
  onToggleSfx: () => void;
  onToggleTts: () => void;
  onStartQuiz: (identity: {
    name: string;
    studentClass: StudentClass;
    absentNo: string;
  }) => void;
  onOpenTeacherDashboard: () => void;
  hasSavedLocalSession: boolean;
  onResumeLocalSession: () => void;
}

export const WelcomeIdentityView: React.FC<WelcomeIdentityViewProps> = ({
  user,
  authReady,
  onGoogleLogin,
  sfxEnabled,
  ttsEnabled,
  onToggleSfx,
  onToggleTts,
  onStartQuiz,
  onOpenTeacherDashboard,
  hasSavedLocalSession,
  onResumeLocalSession,
}) => {
  const [name, setName] = useState(user?.displayName || '');
  const [studentClass, setStudentClass] = useState<StudentClass>('9A');
  const [absentNo, setAbsentNo] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (trimmed.length < 2) {
      setErrorMsg('Tuliskan nama lengkapmu terlebih dahulu (minimal 2 huruf).');
      return;
    }
    if (trimmed.length > 80) {
      setErrorMsg('Nama terlalu panjang (maksimal 80 karakter).');
      return;
    }
    setErrorMsg('');
    onStartQuiz({
      name: trimmed,
      studentClass,
      absentNo: absentNo.trim() || '-',
    });
  };

  const handleLoginClick = async () => {
    setLoggingIn(true);
    try {
      const res = await onGoogleLogin();
      void res;
    } finally {
      setLoggingIn(false);
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Student Identity Form */}
        <section className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="text-xs font-semibold text-sky-700 tracking-wide mb-2">
              SMPN 1 Wanaraya · Kelas 9A &amp; 9B
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight mb-3">
              Try Out Persiapan SAS Matematika
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Lengkapi identitas dirimu sebelum memulai 35 soal adaptif kontekstual
              Wanaraya. Tingkat kesulitan soal akan menyesuaikan kemampuanmu secara
              otomatis.
            </p>

            {hasSavedLocalSession && (
              <div className="mb-5 p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-center justify-between gap-3">
                <div className="text-xs text-amber-900">
                  <div className="font-semibold">Sesi kuis sebelumnya tersimpan</div>
                  <div className="text-amber-700 mt-0.5">
                    Lanjutkan progresmu tanpa mengulang dari awal.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onResumeLocalSession}
                  className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer transition-colors"
                >
                  Lanjutkan
                </button>
              </div>
            )}

            {/* Cloud Sync Status / Google Sign-In */}
            <div className="mb-5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
              {user ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Cloud className="w-4 h-4 text-emerald-600 shrink-0" />
                    <div className="min-w-0">
                      <div className="text-xs font-semibold text-slate-800 truncate">
                        Sinkronisasi Cloud Aktif ({user.email})
                      </div>
                      <div className="text-xs text-slate-500">
                        Nilai terkirim real-time ke Dasbor Guru.
                      </div>
                    </div>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-600 leading-relaxed">
                    <span className="font-semibold text-slate-800">
                      Hubungkan Akun Google
                    </span>{' '}
                    agar nilaimu langsung tersinkron ke Dasbor Guru lintas perangkat.
                  </div>
                  <button
                    type="button"
                    disabled={!authReady || loggingIn}
                    onClick={handleLoginClick}
                    className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 cursor-pointer transition-colors disabled:opacity-50"
                  >
                    <LogIn className="w-3.5 h-3.5 text-sky-600" />
                    {loggingIn ? 'Menghubungkan...' : 'Masuk Google'}
                  </button>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="student-name"
                  className="block text-sm font-semibold text-slate-800 mb-1.5"
                >
                  Nama Lengkap Siswa
                </label>
                <input
                  id="student-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Muhammad Rizky Pratama"
                  maxLength={80}
                  className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="block text-sm font-semibold text-slate-800 mb-1.5">
                    Pilih Kelas
                  </span>
                  <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl">
                    {(['9A', '9B'] as StudentClass[]).map((cls) => (
                      <button
                        key={cls}
                        type="button"
                        onClick={() => setStudentClass(cls)}
                        className={`py-2 text-sm font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                          studentClass === cls
                            ? 'bg-sky-600 text-white shadow-xs'
                            : 'text-slate-700 hover:bg-white'
                        }`}
                      >
                        Kelas {cls}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="student-absent"
                    className="block text-sm font-semibold text-slate-800 mb-1.5"
                  >
                    Nomor Absen
                  </label>
                  <input
                    id="student-absent"
                    type="text"
                    value={absentNo}
                    onChange={(e) => setAbsentNo(e.target.value)}
                    placeholder="Contoh: 14"
                    maxLength={10}
                    className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 font-math focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
                </div>
              </div>

              {/* Audio & Speech Controls */}
              <div className="pt-1">
                <span className="block text-xs font-semibold text-slate-600 mb-2">
                  Pengaturan Audio Interaktif (Opsional ON/OFF)
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={onToggleSfx}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                      sfxEnabled
                        ? 'bg-sky-50 border-sky-200 text-sky-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                      {sfxEnabled ? (
                        <Volume2 className="w-4 h-4 text-sky-600" />
                      ) : (
                        <VolumeX className="w-4 h-4 text-slate-400" />
                      )}
                      Efek Suara
                    </span>
                    <span>{sfxEnabled ? 'ON' : 'OFF'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onToggleTts}
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-colors cursor-pointer ${
                      ttsEnabled
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-slate-50 border-slate-200 text-slate-500'
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
                      <Headphones
                        className={`w-4 h-4 ${
                          ttsEnabled ? 'text-amber-600' : 'text-slate-400'
                        }`}
                      />
                      Narasi Soal
                    </span>
                    <span>{ttsEnabled ? 'ON' : 'OFF'}</span>
                  </button>
                </div>
              </div>

              {errorMsg && (
                <p className="text-xs font-medium text-rose-600">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Mulai Try Out SAS (35 Soal)
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Khusus Guru / Pengawas:</span>
            <button
              type="button"
              onClick={onOpenTeacherDashboard}
              className="font-semibold text-sky-700 hover:underline cursor-pointer whitespace-nowrap"
            >
              Buka Dasbor Rekap Nilai
            </button>
          </div>
        </section>

        {/* Right: Hero Visual & Exam Structure Overview */}
        <section className="lg:col-span-7 flex flex-col gap-6">
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex-1 flex flex-col">
            <div className="relative aspect-16/9 w-full bg-sky-50 overflow-hidden">
              {!heroImgFailed ? (
                <img
                  src="/src/assets/images/wanaraya_math_hero_1794923515972.jpg"
                  alt="Siswa SMP Wanaraya berdiskusi geometri dan grafik matematika"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgFailed(true)}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-sky-50">
                  <GraduationCap className="w-12 h-12 text-sky-600 mb-2" />
                  <div className="text-sm font-bold text-slate-800">
                    Try Out SAS Matematika SMPN 1 Wanaraya
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between gap-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-2">
                  Cakupan Materi &amp; Komposisi Asesmen
                </h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Setiap butir soal dilengkapi teks bacaan kontekstual daerah sekitar
                  Wanaraya (~100 kata), visual grafik/infografis/geometri tanpa
                  petunjuk jawaban, serta umpan balik edukatif langsung.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                  <div className="text-xs font-medium text-slate-500">Bentuk Soal</div>
                  <div className="text-sm font-bold text-slate-900 mt-1 tabular-nums">
                    17 PG · 8 MCMA · 10 B/S
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                  <div className="text-xs font-medium text-slate-500">
                    Level Kompetensi
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-1 tabular-nums">
                    20% L1 · 50% L2 · 30% L3
                  </div>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
                  <div className="text-xs font-medium text-slate-500">
                    Kesulitan Otomatis
                  </div>
                  <div className="text-sm font-bold text-slate-900 mt-1">
                    Adaptif Kelas 9A &amp; 9B
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 mb-2">
                  <BookOpen className="w-4 h-4 text-sky-600" />
                  5 Topik Inti SAS Matematika Kelas 9:
                </div>
                <div className="text-xs text-slate-600 leading-relaxed">
                  1. Sistem Persamaan Linier Dua Variabel (SPLDV) · 2. Jaring-Jaring
                  Bangun Ruang Sisi Datar &amp; Lengkung · 3. Luas &amp; Volume Bangun
                  Ruang Sisi Datar (Gabungan) · 4. Lingkaran · 5. Luas &amp; Volume Bangun
                  Ruang Sisi Lengkung (Gabungan).
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
