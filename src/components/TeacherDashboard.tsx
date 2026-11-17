import React, { useEffect, useMemo, useState } from 'react';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import {
  Check,
  Copy,
  FileSpreadsheet,
  FileText,
  FileType2,
  LogIn,
  Search,
  Trash2,
  Users,
} from 'lucide-react';
import {
  db,
  handleFirestoreError,
  OperationType,
  PRIMARY_TEACHER_EMAIL,
} from '../firebase';
import { QuizAttemptDoc } from '../types/quiz';
import {
  exportAttemptsToExcel,
  exportAttemptsToPdf,
  exportAttemptsToWord,
} from '../utils/exportReports';

interface TeacherDashboardProps {
  user: User | null;
  authReady: boolean;
  onGoogleLogin: () => Promise<void>;
  onBackToQuiz: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  user,
  authReady,
  onGoogleLogin,
  onBackToQuiz,
}) => {
  const [attempts, setAttempts] = useState<QuizAttemptDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [classFilter, setClassFilter] = useState<'ALL' | '9A' | '9B'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [exportingWord, setExportingWord] = useState(false);

  const isPrimaryTeacher =
    Boolean(user?.email) &&
    user?.email?.toLowerCase() === PRIMARY_TEACHER_EMAIL.toLowerCase();

  useEffect(() => {
    if (!authReady) return;
    if (!user) {
      setAttempts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const colRef = collection(db, 'quiz_attempts');
    const q = isPrimaryTeacher
      ? query(colRef, orderBy('updatedAt', 'desc'))
      : query(colRef, where('ownerUid', '==', user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const rows: QuizAttemptDoc[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<QuizAttemptDoc, 'id'>),
        }));
        if (!isPrimaryTeacher) {
          rows.sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
        }
        setAttempts(rows);
        setLoading(false);
      },
      (error) => {
        setLoading(false);
        handleFirestoreError(error, OperationType.LIST, 'quiz_attempts');
      }
    );

    return () => unsubscribe();
  }, [authReady, user, isPrimaryTeacher]);

  const filteredAttempts = useMemo(() => {
    return attempts.filter((a) => {
      const matchClass = classFilter === 'ALL' || a.studentClass === classFilter;
      const matchName =
        !searchTerm.trim() ||
        a.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.studentAbsentNo.toLowerCase().includes(searchTerm.toLowerCase());
      return matchClass && matchName;
    });
  }, [attempts, classFilter, searchTerm]);

  const stats = useMemo(() => {
    const total = filteredAttempts.length;
    const completed = filteredAttempts.filter((a) => a.status === 'completed').length;
    const avg =
      total > 0
        ? (
            filteredAttempts.reduce((acc, a) => acc + (a.score || 0), 0) / total
          ).toFixed(1)
        : '0.0';
    const highest =
      total > 0 ? Math.max(...filteredAttempts.map((a) => a.score || 0)) : 0;
    const cls9a = attempts.filter((a) => a.studentClass === '9A');
    const cls9b = attempts.filter((a) => a.studentClass === '9B');
    const avg9a =
      cls9a.length > 0
        ? (cls9a.reduce((acc, a) => acc + a.score, 0) / cls9a.length).toFixed(1)
        : '-';
    const avg9b =
      cls9b.length > 0
        ? (cls9b.reduce((acc, a) => acc + a.score, 0) / cls9b.length).toFixed(1)
        : '-';

    return { total, completed, avg, highest, avg9a, avg9b };
  }, [filteredAttempts, attempts]);

  const handleCopyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    } catch {
      // Fallback ignored
    }
  };

  const handleDeleteAttempt = async (id?: string) => {
    if (!id || !isPrimaryTeacher) return;
    setDeletingId(id);
    try {
      await deleteDoc(doc(db, 'quiz_attempts', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `quiz_attempts/${id}`);
    } finally {
      setDeletingId(null);
    }
  };

  const handleWordExport = async () => {
    setExportingWord(true);
    try {
      await exportAttemptsToWord(filteredAttempts, classFilter);
    } finally {
      setExportingWord(false);
    }
  };

  if (!authReady) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-10 text-center text-sm text-slate-600">
          Menyiapkan koneksi Cloud Database...
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dasbor Guru Real-Time SMPN 1 Wanaraya
          </h1>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Masuk dengan akun Google Guru (<span className="font-semibold">{PRIMARY_TEACHER_EMAIL}</span>)
            untuk memantau nilai siswa Kelas 9A &amp; 9B secara real-time lintas
            perangkat dan mengunduh laporan Excel, PDF, serta Word.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={onGoogleLogin}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold rounded-xl cursor-pointer transition-colors"
            >
              <LogIn className="w-4 h-4" />
              Masuk Akun Google
            </button>
            <button
              type="button"
              onClick={onBackToQuiz}
              className="px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold rounded-xl cursor-pointer transition-colors"
            >
              Kembali ke Halaman Siswa
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Export Toolbar */}
      <section className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div>
          <div className="text-xs font-semibold text-sky-700 mb-1">
            Sinkronisasi Cloud Real-Time · {isPrimaryTeacher ? 'Mode Guru Pengampu' : 'Mode Riwayat Pribadi'}
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            Dasbor Rekap Nilai Try Out SAS Kelas 9
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {isPrimaryTeacher
              ? 'Data diperbarui otomatis saat siswa di kelas 9A & 9B mengerjakan soal dari perangkat masing-masing.'
              : `Anda masuk sebagai ${user.email}. Untuk melihat rekap seluruh siswa 9A & 9B, gunakan akun guru ${PRIMARY_TEACHER_EMAIL}.`}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopyShareLink}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl cursor-pointer whitespace-nowrap"
          >
            {copiedLink ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                Tautan Disalin
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-sky-600" />
                Salin Link Kuis
              </>
            )}
          </button>

          <button
            type="button"
            disabled={filteredAttempts.length === 0}
            onClick={() => exportAttemptsToExcel(filteredAttempts, classFilter)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Unduh Excel
          </button>

          <button
            type="button"
            disabled={filteredAttempts.length === 0}
            onClick={() => exportAttemptsToPdf(filteredAttempts, classFilter)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            <FileText className="w-3.5 h-3.5" />
            Unduh PDF
          </button>

          <button
            type="button"
            disabled={filteredAttempts.length === 0 || exportingWord}
            onClick={handleWordExport}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white text-xs font-bold rounded-xl cursor-pointer disabled:cursor-not-allowed whitespace-nowrap"
          >
            <FileType2 className="w-3.5 h-3.5" />
            {exportingWord ? 'Menyiapkan...' : 'Unduh Word'}
          </button>
        </div>
      </section>

      {/* KPI Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500 font-medium">Total Peserta</div>
          <div className="text-2xl font-bold text-slate-900 font-math tabular-nums mt-1">
            {stats.total}
          </div>
          <div className="text-xs text-slate-500 mt-0.5 tabular-nums">
            {stats.completed} selesai
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500 font-medium">Rata-Rata Pilihan</div>
          <div className="text-2xl font-bold text-sky-700 font-math tabular-nums mt-1">
            {stats.avg}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Skala 0–100</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500 font-medium">Nilai Tertinggi</div>
          <div className="text-2xl font-bold text-emerald-700 font-math tabular-nums mt-1">
            {stats.highest}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Capaian terbaik</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4">
          <div className="text-xs text-slate-500 font-medium">Rata-Rata Kelas 9A</div>
          <div className="text-2xl font-bold text-slate-900 font-math tabular-nums mt-1">
            {stats.avg9a}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Kelas 9A</div>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 col-span-2 lg:col-span-1">
          <div className="text-xs text-slate-500 font-medium">Rata-Rata Kelas 9B</div>
          <div className="text-2xl font-bold text-slate-900 font-math tabular-nums mt-1">
            {stats.avg9b}
          </div>
          <div className="text-xs text-slate-500 mt-0.5">Kelas 9B</div>
        </div>
      </section>

      {/* Filter & Search Bar + Table */}
      <section className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Segmented Class Filter */}
          <div className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-xl self-start">
            {(
              [
                { key: 'ALL', label: 'Semua Kelas' },
                { key: '9A', label: 'Kelas 9A' },
                { key: '9B', label: 'Kelas 9B' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setClassFilter(tab.key)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  classFilter === tab.key
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Cari nama atau no. absen..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {loading ? (
          <div className="p-12 text-center text-sm text-slate-500">
            Memuat data real-time dari Cloud Firestore...
          </div>
        ) : filteredAttempts.length === 0 ? (
          <div className="p-12 text-center space-y-2">
            <div className="text-sm font-semibold text-slate-800">
              Belum ada data nilai siswa yang masuk
            </div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Bagikan tautan aplikasi ini kepada siswa kelas 9A dan 9B. Setiap
              jawaban siswa yang masuk Google akan muncul otomatis di tabel ini.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                  <th className="py-3 px-4">No</th>
                  <th className="py-3 px-4">Nama Siswa</th>
                  <th className="py-3 px-4">Kelas</th>
                  <th className="py-3 px-4">Absen</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4 text-right">Nilai</th>
                  <th className="py-3 px-4 text-right">Progres</th>
                  <th className="py-3 px-4 text-right">SPLDV</th>
                  <th className="py-3 px-4 text-right">Jaring</th>
                  <th className="py-3 px-4 text-right">BRSD</th>
                  <th className="py-3 px-4 text-right">Lingk.</th>
                  <th className="py-3 px-4 text-right">BRSL</th>
                  {isPrimaryTeacher && <th className="py-3 px-4 text-right">Aksi</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredAttempts.map((a, idx) => (
                  <tr key={a.id || idx} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-math tabular-nums text-slate-500">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-900 whitespace-nowrap">
                      {a.studentName}
                    </td>
                    <td className="py-3 px-4 text-slate-700 font-math">{a.studentClass}</td>
                    <td className="py-3 px-4 text-slate-600 font-math tabular-nums">
                      {a.studentAbsentNo}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span
                        className={`text-xs font-semibold ${
                          a.status === 'completed'
                            ? 'text-emerald-700'
                            : 'text-amber-700'
                        }`}
                      >
                        {a.status === 'completed' ? 'Selesai' : 'Berlangsung'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-700 whitespace-nowrap">
                      {a.adaptiveLevel}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-slate-900 font-math tabular-nums">
                      {a.score}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-600 font-math tabular-nums">
                      {a.answeredCount}/35
                    </td>
                    <td className="py-3 px-4 text-right text-slate-700 font-math tabular-nums">
                      {a.scoreSpldv}%
                    </td>
                    <td className="py-3 px-4 text-right text-slate-700 font-math tabular-nums">
                      {a.scoreJaring}%
                    </td>
                    <td className="py-3 px-4 text-right text-slate-700 font-math tabular-nums">
                      {a.scoreBrsd}%
                    </td>
                    <td className="py-3 px-4 text-right text-slate-700 font-math tabular-nums">
                      {a.scoreLingkaran}%
                    </td>
                    <td className="py-3 px-4 text-right text-slate-700 font-math tabular-nums">
                      {a.scoreBrsl}%
                    </td>
                    {isPrimaryTeacher && (
                      <td className="py-3 px-4 text-right">
                        <button
                          type="button"
                          disabled={deletingId === a.id}
                          onClick={() => handleDeleteAttempt(a.id)}
                          title="Hapus data percobaan"
                          className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
};
