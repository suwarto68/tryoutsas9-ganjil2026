import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  AlignmentType,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from 'docx';
import { QuizAttemptDoc } from '../types/quiz';

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}d`;
}

function formatStatus(status: QuizAttemptDoc['status']): string {
  return status === 'completed' ? 'Selesai' : 'Sedang Mengerjakan';
}

export function exportAttemptsToExcel(attempts: QuizAttemptDoc[], filterClass: string) {
  const rows = attempts.map((a, idx) => ({
    No: idx + 1,
    'Nama Siswa': a.studentName,
    Kelas: a.studentClass,
    'No. Absen': a.studentAbsentNo,
    Status: formatStatus(a.status),
    'Level Adaptif': a.adaptiveLevel,
    'Nilai Akhir': a.score,
    'Soal Terjawab': `${a.answeredCount}/35`,
    'Benar Penuh': a.correctCount,
    'PG Benar (17)': a.pgCorrect,
    'MCMA Benar (8)': a.mcmaCorrect,
    'B/S Benar (10)': a.bsCorrect,
    'SPLDV (%)': a.scoreSpldv,
    'Jaring-Jaring (%)': a.scoreJaring,
    'BRSD (%)': a.scoreBrsd,
    'Lingkaran (%)': a.scoreLingkaran,
    'BRSL (%)': a.scoreBrsl,
    'Memahami (%)': a.scoreMemahami,
    'Mengaplikasikan (%)': a.scoreMengaplikasikan,
    'Menalar (%)': a.scoreMenalar,
    Durasi: formatDuration(a.durationSeconds),
  }));

  const worksheet = XLSX.utils.json_to_sheet(rows);
  worksheet['!cols'] = [
    { wch: 5 },
    { wch: 24 },
    { wch: 8 },
    { wch: 10 },
    { wch: 18 },
    { wch: 14 },
    { wch: 12 },
    { wch: 14 },
    { wch: 12 },
    { wch: 14 },
    { wch: 15 },
    { wch: 14 },
    { wch: 11 },
    { wch: 16 },
    { wch: 10 },
    { wch: 14 },
    { wch: 10 },
    { wch: 14 },
    { wch: 18 },
    { wch: 13 },
    { wch: 12 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Rekap Nilai SAS');
  const suffix = filterClass === 'ALL' ? '9A_9B' : filterClass;
  XLSX.writeFile(workbook, `Rekap_TryOut_SAS_Matematika_${suffix}.xlsx`);
}

export function exportAttemptsToPdf(attempts: QuizAttemptDoc[], filterClass: string) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });

  doc.setFontSize(15);
  doc.text('Laporan Hasil Try Out SAS Matematika Kelas 9 - SMPN 1 Wanaraya', 14, 15);
  doc.setFontSize(10);
  const classLabel = filterClass === 'ALL' ? 'Kelas 9A & 9B' : `Kelas ${filterClass}`;
  const avgScore =
    attempts.length > 0
      ? (attempts.reduce((acc, a) => acc + a.score, 0) / attempts.length).toFixed(1)
      : '0';
  doc.text(
    `Filter: ${classLabel}   |   Jumlah Peserta: ${attempts.length} siswa   |   Rata-rata Nilai: ${avgScore}   |   Tanggal Cetak: ${new Date().toLocaleDateString('id-ID')}`,
    14,
    22
  );

  autoTable(doc, {
    startY: 27,
    styles: { fontSize: 8, cellPadding: 2.2 },
    headStyles: { fillColor: [2, 132, 199] },
    head: [
      [
        'No',
        'Nama Siswa',
        'Kelas',
        'Absen',
        'Status',
        'Level',
        'Nilai',
        'Benar',
        'SPLDV',
        'Jaring',
        'BRSD',
        'Lingk.',
        'BRSL',
        'Durasi',
      ],
    ],
    body: attempts.map((a, idx) => [
      idx + 1,
      a.studentName,
      a.studentClass,
      a.studentAbsentNo,
      formatStatus(a.status),
      a.adaptiveLevel,
      a.score,
      `${a.correctCount}/35`,
      `${a.scoreSpldv}%`,
      `${a.scoreJaring}%`,
      `${a.scoreBrsd}%`,
      `${a.scoreLingkaran}%`,
      `${a.scoreBrsl}%`,
      formatDuration(a.durationSeconds),
    ]),
  });

  const suffix = filterClass === 'ALL' ? '9A_9B' : filterClass;
  doc.save(`Laporan_TryOut_SAS_Matematika_${suffix}.pdf`);
}

export async function exportAttemptsToWord(
  attempts: QuizAttemptDoc[],
  filterClass: string
) {
  const classLabel = filterClass === 'ALL' ? 'Kelas 9A dan 9B' : `Kelas ${filterClass}`;
  const avgScore =
    attempts.length > 0
      ? (attempts.reduce((acc, a) => acc + a.score, 0) / attempts.length).toFixed(1)
      : '0';

  const headerCells = [
    'No',
    'Nama Siswa',
    'Kelas',
    'Absen',
    'Status',
    'Level',
    'Nilai',
    'Benar',
    'SPLDV',
    'Jaring',
    'BRSD',
    'Lingk.',
    'BRSL',
  ];

  const makeCell = (text: string, bold = false) =>
    new TableCell({
      children: [
        new Paragraph({
          children: [new TextRun({ text, bold, size: 18 })],
        }),
      ],
    });

  const tableRows = [
    new TableRow({
      children: headerCells.map((h) => makeCell(h, true)),
    }),
    ...attempts.map(
      (a, idx) =>
        new TableRow({
          children: [
            makeCell(String(idx + 1)),
            makeCell(a.studentName),
            makeCell(a.studentClass),
            makeCell(a.studentAbsentNo),
            makeCell(formatStatus(a.status)),
            makeCell(a.adaptiveLevel),
            makeCell(String(a.score)),
            makeCell(`${a.correctCount}/35`),
            makeCell(`${a.scoreSpldv}%`),
            makeCell(`${a.scoreJaring}%`),
            makeCell(`${a.scoreBrsd}%`),
            makeCell(`${a.scoreLingkaran}%`),
            makeCell(`${a.scoreBrsl}%`),
          ],
        })
    ),
  ];

  const wordDoc = new Document({
    sections: [
      {
        children: [
          new Paragraph({
            text: 'LAPORAN HASIL TRY OUT PERSIAPAN SAS MATEMATIKA',
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            text: `SMPN 1 Wanaraya — ${classLabel}`,
            heading: HeadingLevel.HEADING_2,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: `Total Peserta: ${attempts.length} siswa   |   Rata-rata Nilai: ${avgScore}   |   Tanggal Unduh: ${new Date().toLocaleDateString('id-ID')}`,
                size: 20,
              }),
            ],
            spacing: { after: 240, before: 120 },
          }),
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: tableRows,
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(wordDoc);
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const suffix = filterClass === 'ALL' ? '9A_9B' : filterClass;
  link.href = url;
  link.download = `Laporan_TryOut_SAS_Matematika_${suffix}.docx`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
