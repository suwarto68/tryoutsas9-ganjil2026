import { QuizQuestion } from '../types/quiz';

export const QUESTIONS_PART_1: QuizQuestion[] = [
  // ===================== 1. SPLDV (7 SOAL: 4 PG, 1 MCMA, 2 BS) =====================
  {
    id: 1,
    code: 'SPLDV-01',
    topic: 'SPLDV',
    type: 'pg',
    competency: 'Memahami',
    difficulty: 'Dasar',
    stimulusTitle: 'Paket Buah Segar Pasar Agropolitan Wanaraya',
    stimulusText:
      'Setiap hari Minggu pagi, warga Kecamatan Wanaraya ramai mengunjungi Pasar Agropolitan untuk membeli buah segar hasil kebun petani lokal di sekitar desa. Ibu Sari berjualan dua jenis buah unggulan daerah, yaitu jeruk siam Wanaraya yang manis dan salak pondoh segar. Untuk memudahkan pembeli, Ibu Sari menyediakan paket hemat khusus tanpa menuliskan harga satuan masing-masing buah pada papan harga. Pada pagi itu, Pak Budi membeli Paket Hemat A yang berisi 2 kg jeruk siam dan 1 kg salak dengan membayar Rp35.000. Sementara itu, Ibu Lina membeli Paket Hemat B berisi 1 kg jeruk siam dan 2 kg salak seharga Rp31.000.',
    visual: {
      kind: 'wanaraya_infographic',
      title: 'Daftar Paket Buah Kios Ibu Sari Wanaraya',
      subtitle: 'Data Pembelian Minggu Pagi',
      caption: 'Informasi paket belanja tanpa menampilkan harga per kilogram.',
      infographicItems: [
        { label: 'Paket Hemat A', value: '2 kg Jeruk + 1 kg Salak', unit: 'Rp35.000' },
        { label: 'Paket Hemat B', value: '1 kg Jeruk + 2 kg Salak', unit: 'Rp31.000' },
        { label: 'Variabel x', value: 'Harga 1 kg Jeruk Siam', unit: 'dalam Rupiah' },
        { label: 'Variabel y', value: 'Harga 1 kg Salak', unit: 'dalam Rupiah' },
      ],
    },
    questionText:
      'Jika x menyatakan harga 1 kg jeruk siam dan y menyatakan harga 1 kg salak (dalam rupiah), model sistem persamaan linear dua variabel yang tepat sesuai informasi tersebut adalah ...',
    options: [
      '2x + y = 35.000 dan x + 2y = 31.000',
      'x + 2y = 35.000 dan 2x + y = 31.000',
      '2x + 2y = 35.000 dan x + y = 31.000',
      '2x - y = 35.000 dan x - 2y = 31.000',
    ],
    correctOptionIndex: 0,
    correctAppreciation:
      'Tepat sekali! Kamu berhasil menerjemahkan situasi jual-beli Pasar Wanaraya menjadi model matematika yang akurat.',
    explanationShort:
      'Paket A berisi 2 kg jeruk (2x) ditambah 1 kg salak (y) senilai 35.000, sehingga 2x + y = 35.000. Paket B berisi 1 kg jeruk (x) ditambah 2 kg salak (2y) senilai 31.000, sehingga x + 2y = 31.000.',
    wrongCorrectionGuide:
      'Perhatikan pasangan koefisien dan nama buahnya agar tidak tertukar antara x dan y.',
    languageMeaningNote:
      'Secara makna kalimat, frasa "2 kg jeruk dan 1 kg salak" berarti penjumlahan dua kali variabel jeruk (2x) dengan satu kali variabel salak (y), bukan pengurangan atau dibalik.',
  },
  {
    id: 2,
    code: 'SPLDV-02',
    topic: 'SPLDV',
    type: 'pg',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Belanja Alat Tulis di Koperasi SMPN 1 Wanaraya',
    stimulusText:
      'Menjelang pelaksanaan Sumatif Akhir Semester (SAS), Koperasi Siswa SMPN 1 Wanaraya menyiapkan perlengkapan alat tulis lengkap bagi seluruh siswa kelas 9A dan 9B. Pengurus koperasi piket mencatat transaksi dua siswa yang datang pada jam istirahat pertama di depan ruang koperasi. Raka membeli 3 buku tulis sampul batik khas daerah dan 2 bolpoin tinta biru dengan total pembayaran Rp22.000. Tidak lama berselang, Dinda membeli 2 buku tulis yang sama beserta 3 bolpoin yang sama dan membayar Rp18.000. Sebagian laba penjualan koperasi tersebut rencananya akan digunakan untuk menambah koleksi buku bacaan matematika di pojok literasi kelas.',
    visual: {
      kind: 'wanaraya_chart_bar',
      title: 'Rekap Transaksi Alat Tulis Koperasi Sekolah',
      subtitle: 'Jumlah Barang Terbeli per Siswa',
      caption: 'Grafik jumlah buku tulis dan bolpoin yang dibeli Raka dan Dinda.',
      xLabel: 'Nama Pembeli',
      yLabel: 'Jumlah Unit',
      seriesNames: ['Buku Tulis (Rp22rb total Raka)', 'Bolpoin (Rp18rb total Dinda)'],
      chartData: [
        { label: 'Raka (Rp22.000)', value: 3, secondaryValue: 2 },
        { label: 'Dinda (Rp18.000)', value: 2, secondaryValue: 3 },
      ],
    },
    questionText:
      'Jika Bagas ingin membeli 1 buku tulis dan 4 bolpoin di koperasi tersebut, berapakah uang yang harus dibayarkan Bagas?',
    options: ['Rp12.000', 'Rp14.000', 'Rp15.000', 'Rp16.000'],
    correctOptionIndex: 1,
    correctAppreciation:
      'Hebat! Penyelesaian SPLDV dengan metode eliminasi dan substitusi sudah kamu kuasai dengan sangat baik.',
    explanationShort:
      'Dari 3b + 2p = 22.000 dan 2b + 3p = 18.000, jika dijumlahkan menjadi 5b + 5p = 40.000 atau b + p = 8.000. Dengan eliminasi diperoleh harga buku b = Rp6.000 dan bolpoin p = Rp2.000. Maka 1 buku + 4 bolpoin = 6.000 + 4(2.000) = Rp14.000.',
    wrongCorrectionGuide:
      'Cek kembali langkah eliminasi saat menyamakan koefisien buku atau bolpoin agar tanda positif-negatifnya tidak keliru.',
    languageMeaningNote:
      'Perhatikan kata hubung "dan" pada pertanyaan "1 buku tulis dan 4 bolpoin", artinya kamu harus menghitung nilai b terlebih dahulu, nilai p, lalu menjumlahkan 1b + 4p.',
  },
  {
    id: 3,
    code: 'SPLDV-03',
    topic: 'SPLDV',
    type: 'pg',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    isListeningFocus: true,
    stimulusTitle: 'Peternakan Terpadu Desa Sidomulyo Wanaraya',
    stimulusText:
      'Pak Hendra mengelola peternakan terpadu di Desa Sidomulyo, Kecamatan Wanaraya, yang memadukan kandang itik petelur dan kandang kambing kacang secara bersih. Pada sore hari saat memberi pakan rumput dan dedak, keponakan Pak Hendra yang duduk di kelas 9B membantu menghitung seluruh ternak yang berada di halaman kandang terbuka. Dari hasil pencatatan sementara sebelum ternak masuk kandang, diketahui jumlah seluruh kepala itik dan kambing di halaman tersebut adalah 24 ekor. Ketika menghitung jumlah kakinya dari pagar kayu kandang, tercatat seluruh kaki itik dan kambing berjumlah 64 kaki. Kedua jenis ternak berada dalam kondisi sehat.',
    visual: {
      kind: 'wanaraya_infographic',
      title: 'Catatan Sensus Kandang Desa Sidomulyo',
      subtitle: 'Fakta Lapangan Peternakan Pak Hendra',
      caption: 'Data sensus jumlah kepala dan jumlah total kaki hewan ternak.',
      infographicItems: [
        { label: 'Jenis Ternak 1', value: 'Itik Petelur', unit: '2 kaki/ekor' },
        { label: 'Jenis Ternak 2', value: 'Kambing Kacang', unit: '4 kaki/ekor' },
        { label: 'Total Seluruh Ternak', value: '24', unit: 'ekor' },
        { label: 'Total Seluruh Kaki', value: '64', unit: 'kaki' },
      ],
    },
    questionText:
      'Berdasarkan informasi yang kamu simak, berapakah selisih banyak itik dan banyak kambing di halaman kandang Pak Hendra?',
    options: ['6 ekor', '8 ekor', '10 ekor', '12 ekor'],
    correctOptionIndex: 1,
    correctAppreciation:
      'Luar biasa! Kamu cermat mendengarkan informasi sekaligus teliti mencari selisih kedua variabel.',
    explanationShort:
      'Misalkan itik = i dan kambing = k. Persamaan: i + k = 24 dan 2i + 4k = 64 (sederhanakan menjadi i + 2k = 32). Kurangkan kedua persamaan: k = 8 ekor kambing, sehingga i = 24 - 8 = 16 ekor itik. Selisihnya adalah 16 - 8 = 8 ekor.',
    wrongCorrectionGuide:
      'Jangan terburu-buru memilih 8 karena mengira itu jumlah kambing; pastikan kamu sudah menghitung jumlah itik (16) lalu dikurangi jumlah kambing (8).',
    languageMeaningNote:
      'Kata "selisih" dalam bahasa Indonesia dan matematika bermakna pengurangan antara nilai yang lebih besar dan nilai yang lebih kecil (|banyak itik - banyak kambing|), bukan sekadar menyebut jumlah salah satu hewan.',
  },
  {
    id: 4,
    code: 'SPLDV-04',
    topic: 'SPLDV',
    type: 'pg',
    competency: 'Menalar',
    difficulty: 'Mahir',
    stimulusTitle: 'Perbandingan Jasa Angkut Panen Padi Wanaraya',
    stimulusText:
      'Setelah musim panen padi di lahan pasang surut Wanaraya berakhir, Kelompok Tani Karya Mulya hendak menyewa jasa mobil pikap untuk mengangkut karung gabah kering ke gudang penyimpanan di kota terdekat sejauh 15 km. Terdapat dua penyedia jasa angkut lokal di sekitar Wanaraya dengan skema tarif berbeda. Jasa Angkut Merpati menetapkan tarif dasar tetap Rp50.000 ditambah biaya perjalanan Rp8.000 per kilometer. Sementara itu, Jasa Angkut Rajawali menetapkan tarif dasar tetap Rp80.000 ditambah biaya perjalanan Rp5.000 per kilometer. Ketua kelompok tani ingin membandingkan tarif keduanya agar dapat memilih jasa angkut paling hemat biaya untuk jarak 15 km tersebut.',
    visual: {
      kind: 'wanaraya_chart_line',
      title: 'Grafik Tarif Jasa Angkut Gabah Wanaraya (0–12 km)',
      subtitle: 'Perbandingan Kenaikan Biaya Awal',
      caption: 'Grafik menunjukkan tren biaya hingga jarak 12 km; analisis diperlukan untuk jarak 15 km.',
      xLabel: 'Jarak (km)',
      yLabel: 'Biaya (Ribu Rp)',
      seriesNames: ['Jasa Merpati', 'Jasa Rajawali'],
      chartData: [
        { label: '0 km', value: 50, secondaryValue: 80 },
        { label: '4 km', value: 82, secondaryValue: 100 },
        { label: '8 km', value: 114, secondaryValue: 120 },
        { label: '12 km', value: 146, secondaryValue: 140 },
      ],
    },
    questionText:
      'Manakah kesimpulan yang paling tepat mengenai pilihan jasa angkut paling hemat untuk jarak 15 km?',
    options: [
      'Jasa Merpati lebih hemat sebesar Rp15.000 dibandingkan Jasa Rajawali',
      'Jasa Rajawali lebih hemat sebesar Rp15.000 dibandingkan Jasa Merpati',
      'Jasa Rajawali lebih hemat sebesar Rp20.000 dibandingkan Jasa Merpati',
      'Kedua jasa memiliki total biaya yang sama persis pada jarak 15 km',
    ],
    correctOptionIndex: 1,
    correctAppreciation:
      'Brilian! Kemampuan menalarmu dalam membaca fungsi linear dan membandingkan skema tarif sangat mengesankan.',
    explanationShort:
      'Pada jarak 15 km: Biaya Merpati = 50.000 + 8.000(15) = 50.000 + 120.000 = Rp170.000. Biaya Rajawali = 80.000 + 5.000(15) = 80.000 + 75.000 = Rp155.000. Jadi Jasa Rajawali lebih hemat Rp170.000 - Rp155.000 = Rp15.000.',
    wrongCorrectionGuide:
      'Jangan terkecoh oleh tarif awal Merpati yang lebih murah di jarak pendek (0–9 km). Hitung ulang nilai total tepat di x = 15 km.',
    languageMeaningNote:
      'Frasa "lebih hemat sebesar..." berarti memilih biaya akhir yang nilainya lebih kecil, lalu menghitung selisih penghematannya terhadap biaya yang lebih mahal.',
  },
  {
    id: 5,
    code: 'SPLDV-05',
    topic: 'SPLDV',
    type: 'mcma',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Tiket Masuk Taman Edukasi Alam Wanaraya',
    stimulusText:
      'Desa Wisata Wanaraya baru saja meresmikan Taman Edukasi Alam yang dilengkapi wahana perahu dayung keluarga dan taman bunga anggrek. Pada akhir pekan lalu yang cerah, pengelola taman mencatat penjualan tiket dalam dua sesi berbeda untuk mengevaluasi pemasukan kas desa. Pada sesi pagi, tercatat terjual 40 tiket pengunjung dewasa dan 60 tiket anak-anak dengan total pemasukan bersih Rp1.400.000. Selanjutnya pada sesi siang, tercatat terjual 20 tiket pengunjung dewasa dan 50 tiket anak-anak dengan total pemasukan Rp900.000. Panitia pengelola wisata ingin memastikan rincian harga satuan tiket dewasa maupun anak-anak untuk penyusunan laporan keuangan bulanan desa.',
    visual: {
      kind: 'wanaraya_chart_bar',
      title: 'Penjualan Tiket Taman Edukasi Wanaraya',
      subtitle: 'Rekapitulasi Sesi Pagi dan Siang',
      caption: 'Perbandingan jumlah pengunjung dewasa dan anak-anak pada dua sesi.',
      xLabel: 'Sesi Kunjungan',
      yLabel: 'Jumlah Tiket',
      seriesNames: ['Tiket Dewasa', 'Tiket Anak-anak'],
      chartData: [
        { label: 'Pagi (Rp1,4 jt)', value: 40, secondaryValue: 60 },
        { label: 'Siang (Rp900 rb)', value: 20, secondaryValue: 50 },
      ],
    },
    questionText:
      'Pilihlah SEMUA pernyataan yang BENAR mengenai tarif tiket Taman Edukasi Alam Wanaraya (jawaban benar lebih dari satu):',
    mcmaStatements: [
      'Harga 1 tiket pengunjung dewasa adalah Rp20.000.',
      'Harga 1 tiket pengunjung anak-anak adalah Rp12.000.',
      'Selisih harga tiket dewasa dan tiket anak-anak adalah Rp10.000.',
      'Jika sebuah keluarga terdiri atas 2 orang dewasa dan 3 anak-anak, total biaya tiketnya adalah Rp70.000.',
    ],
    correctMcmaIndices: [0, 2, 3],
    correctAppreciation:
      'Sempurna! Kamu berhasil memeriksa keempat pernyataan dan memilih tepat tiga pernyataan yang bernilai benar.',
    explanationShort:
      'Dari 40d + 60a = 1.400.000 (atau 2d + 3a = 70.000) dan 20d + 50a = 900.000 (atau 2d + 5a = 90.000), diperoleh 2a = 20.000 sehingga a = Rp10.000 dan d = Rp20.000. Maka pernyataan 1, 3, dan 4 benar.',
    wrongCorrectionGuide:
      'Pastikan kamu menguji setiap pernyataan satu per satu setelah menemukan harga tiket anak Rp10.000 dan tiket dewasa Rp20.000.',
    languageMeaningNote:
      'Pada soal pilihan ganda kompleks (MCMA), kata "SEMUA pernyataan yang BENAR" mewajibkan kamu mengecek kebenaran tiap kalimat secara mandiri, karena satu angka keliru membuat seluruh pernyataan bernilai salah.',
  },
  {
    id: 6,
    code: 'SPLDV-06',
    topic: 'SPLDV',
    type: 'bs',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Sentra Kue Tradisional PKK Wanaraya',
    stimulusText:
      'Kelompok Ibu-Ibu PKK di Kecamatan Wanaraya memproduksi kue tradisional khas Kalimantan Selatan, yakni kue bingka kentang dan kue apem selong, untuk dipasarkan saat acara pertemuan dan rapat kecamatan. Pada hari Jumat pagi, pesanan pertama dari Kantor Camat Wanaraya terdiri atas 5 kotak kue bingka dan 3 kotak kue apem dengan total tagihan Rp115.000. Pada hari Sabtu pagi, pesanan kedua dari Puskesmas Wanaraya terdiri atas 2 kotak kue bingka dan 4 kotak kue apem dengan total tagihan Rp74.000. Seluruh kotak kemasan memiliki ukuran, isi, serta harga satuan yang standar dan sama di kedua hari tersebut.',
    visual: {
      kind: 'wanaraya_infographic',
      title: 'Nota Pesanan Kue PKK Wanaraya',
      subtitle: 'Pesanan Instansi Kecamatan',
      caption: 'Ringkasan dua nota transaksi pembelian kue bingka dan kue apem.',
      infographicItems: [
        { label: 'Nota Jumat (Camat)', value: '5 Bingka + 3 Apem', unit: 'Rp115.000' },
        { label: 'Nota Sabtu (Puskesmas)', value: '2 Bingka + 4 Apem', unit: 'Rp74.000' },
      ],
    },
    questionText:
      'Tentukan nilai kebenaran (Benar atau Salah) untuk setiap pernyataan berikut berdasarkan harga kue PKK Wanaraya!',
    bsStatements: [
      'Harga 1 kotak kue bingka adalah Rp17.000.',
      'Harga 1 kotak kue apem lebih mahal daripada harga 1 kotak kue bingka.',
      'Jika Ibu Rina membeli 1 kotak bingka dan 2 kotak apem, ia harus membayar Rp37.000.',
    ],
    correctBsAnswers: [true, false, true],
    correctAppreciation:
      'Bagus sekali! Analisis SPLDV serta evaluasi tiap pernyataan Benar/Salah kamu lakukan dengan teliti.',
    explanationShort:
      'Dengan 5b + 3a = 115.000 dan 2b + 4a = 74.000, eliminasi menghasilkan a = Rp10.000 dan b = Rp17.000. Jadi bingka lebih mahal dari apem (pernyataan 2 Salah), dan 1(17.000) + 2(10.000) = Rp37.000.',
    wrongCorrectionGuide:
      'Periksa hasil substitusi b = 17.000 dan a = 10.000 ke dalam kalimat perbandingan pada pernyataan kedua.',
    languageMeaningNote:
      'Frasa "lebih mahal daripada" bermakna tanda pertidaksamaan lebih besar (>). Karena 10.000 tidak lebih besar dari 17.000, pernyataan kedua bernilai Salah.',
  },
  {
    id: 7,
    code: 'SPLDV-07',
    topic: 'SPLDV',
    type: 'bs',
    competency: 'Menalar',
    difficulty: 'Mahir',
    stimulusTitle: 'Kisah Petani Jeruk Pak Ahmad dan Budi di Wanaraya',
    stimulusText:
      'Pak Ahmad merupakan salah satu petani perintis kebun jeruk siam manis di Desa Kolam Kanan, Kecamatan Wanaraya. Putranya yang bernama Budi kini duduk di bangku kelas 9 SMPN 1 Wanaraya dan sering membantu ayahnya mencatat perkembangan panen jeruk setiap akhir minggu. Dalam sebuah obrolan santai saat beristirahat di gubuk kebun sambil menikmati udara sore, Pak Ahmad memberikan teka-teki matematika tentang usia kepada Budi. Pak Ahmad berkata bahwa tepat lima tahun yang lalu, usianya adalah empat kali usia Budi saat itu. Sementara itu, apabila usia mereka berdua dijumlahkan pada tahun ini, hasilnya adalah tepat 55 tahun.',
    visual: {
      kind: 'wanaraya_infographic',
      title: 'Teka-Teki Usia Keluarga Tani Wanaraya',
      subtitle: 'Hubungan Usia Dua Waktu Berbeda',
      caption: 'Ringkasan dua kondisi waktu: lima tahun lalu dan saat ini.',
      infographicItems: [
        { label: 'Kondisi Saat Ini', value: 'Usia Ayah + Usia Budi', unit: '= 55 tahun' },
        { label: 'Lima Tahun Lalu', value: 'Usia Ayah - 5', unit: '= 4 × (Usia Budi - 5)' },
      ],
    },
    questionText:
      'Evaluasilah setiap pernyataan berikut dan tentukan apakah bernilai Benar atau Salah!',
    bsStatements: [
      'Usia Budi pada saat ini adalah 14 tahun.',
      'Selisih usia Pak Ahmad dan Budi selalu tetap 27 tahun di masa kapan pun.',
      'Lima tahun yang akan datang, usia Pak Ahmad tepat tiga kali usia Budi.',
    ],
    correctBsAnswers: [true, true, false],
    correctAppreciation:
      'Luar biasa! Kamu mampu menalar pergeseran waktu dalam persamaan linear dengan sangat tajam.',
    explanationShort:
      'A + B = 55 dan (A - 5) = 4(B - 5) => A - 4B = -15. Maka 5B = 70 => B = 14 tahun dan A = 41 tahun. Selisih usia selalu 41 - 14 = 27 tahun. Lima tahun lagi: A = 46 dan B = 19 (3 × 19 = 57 ≠ 46, sehingga salah).',
    wrongCorrectionGuide:
      'Ingat bahwa saat waktu bertambah 5 tahun, usia KEDUA orang sama-sama bertambah 5 tahun, sehingga selisih usia tetap sama, namun rasio perkaliannya berubah.',
    languageMeaningNote:
      'Perhatikan penanda kala waktu "lima tahun yang lalu" (dikurangi 5 pada kedua variabel) dan "lima tahun yang akan datang" (ditambah 5 pada kedua variabel).',
  },

  // ===================== 2. JARING-JARING (7 SOAL: 3 PG, 2 MCMA, 2 BS) =====================
  {
    id: 8,
    code: 'JAR-08',
    topic: 'Jaring-Jaring',
    type: 'pg',
    competency: 'Memahami',
    difficulty: 'Dasar',
    stimulusTitle: 'Kemasan Keripik Pisang UMKM Karya Wanaraya',
    stimulusText:
      'Kelompok usaha siswa kelas 9A SMPN 1 Wanaraya bekerja sama dengan pelaku UMKM setempat membuat rancangan kotak kemasan keripik pisang renyah berbentuk kubus. Sebelum mencetak kotak dalam jumlah banyak menggunakan karton dupleks tebal, para siswa terlebih dahulu menguji empat pola jaring-jaring datar yang digambar rapi di atas kertas berpetak. Setiap petak persegi pada kertas mewakili satu sisi kubus yang berukuran sama. Suatu pola dinyatakan layak dipakai sebagai kemasan apabila setelah dilipat sepanjang garis batas petak, keenam sisi persegi dapat membentuk bangun kubus tertutup sempurna tanpa ada sisi yang saling bertumpuk ataupun bagian yang terbuka.',
    visual: {
      kind: 'geometry_net_grid',
      title: 'Empat Rancangan Pola Kemasan Kotak (Kandidat A, B, C, D)',
      subtitle: 'Uji Lipat Jaring-Jaring 6 Persegi',
      caption: 'Keempat pola digambarkan netral; tentukan pola yang membentuk kubus tertutup.',
      netPattern: 'pilihan_4_jaring',
      netCandidates: [
        { label: 'Pola A', shapeName: 'Kandidat A', cells: [[0,1],[0,2],[1,1],[1,2],[2,1],[2,2]] },
        { label: 'Pola B', shapeName: 'Kandidat B', cells: [[0,1],[1,0],[1,1],[1,2],[1,3],[2,2]] },
        { label: 'Pola C', shapeName: 'Kandidat C', cells: [[0,1],[0,2],[1,0],[1,1],[1,2],[1,3]] },
        { label: 'Pola D', shapeName: 'Kandidat D', cells: [[0,1],[1,0],[1,1],[1,2],[2,0],[2,1]] },
      ],
    },
    questionText:
      'Berdasarkan keempat pola pada gambar di atas, pola manakah yang merupakan jaring-jaring kubus yang tepat?',
    options: ['Pola A', 'Pola B', 'Pola C', 'Pola D'],
    correctOptionIndex: 1,
    correctAppreciation:
      'Cermat sekali! Kamu dapat membayangkan lipatan ruang 3 dimensi dari pola datar dengan tepat.',
    explanationShort:
      'Pola B menggunakan format 1-4-1: empat persegi sejajar membentuk empat sisi tegak yang melingkar, sedangkan satu persegi di atas dan satu di bawah menutup sisi atas dan alas.',
    wrongCorrectionGuide:
      'Pola yang memiliki gugus 2×2 persegi (seperti Pola A dan Pola D) pasti bertumpuk saat dilipat. Pola C memiliki dua tutup di sisi atas yang sama sehingga alasnya bolong.',
    languageMeaningNote:
      'Frasa "kubus tertutup sempurna tanpa ada sisi yang saling bertumpuk" menuntut 6 sisi harus menempati posisi 6 arah berbeda (bawah, atas, depan, belakang, kiri, kanan).',
  },
  {
    id: 9,
    code: 'JAR-09',
    topic: 'Jaring-Jaring',
    type: 'pg',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Celengan Tabung Daur Ulang Kelas 9A',
    stimulusText:
      'Dalam program sekolah adiwiyata dan pengelolaan sampah kreatif di Wanaraya, seluruh siswa kelas 9A mendapat tugas membuat celengan berbentuk tabung tertutup dari kertas karton tebal bekas kemasan. Pak Guru memberikan ukuran standar agar hasil karya seluruh siswa tampak seragam saat dipajang di rak pameran kelas. Setiap celengan tabung dirancang memiliki jari-jari alas 7 cm dan tinggi 20 cm. Sebelum menggunting lembaran karton, siswa harus menggambar jaring-jaring tabung terlebih dahulu, yakni dua lingkaran kongruen untuk alas dan tutup serta sebuah persegi panjang sebagai selimut tabung. Gunakan nilai pi = 22/7 untuk perhitungan panjang selimut tersebut.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Desain Ukuran Celengan Tabung',
      subtitle: 'Spesifikasi Karton Kelas 9A',
      caption: 'Ukuran jari-jari alas r = 7 cm dan tinggi tabung t = 20 cm.',
      solidKind: 'tabung',
      dimensions: [
        { label: 'Jari-jari (r)', value: '7 cm' },
        { label: 'Tinggi (t)', value: '20 cm' },
        { label: 'Nilai π', value: '22/7' },
      ],
    },
    questionText:
      'Berapakah ukuran panjang dan lebar persegi panjang yang harus dipotong sebagai selimut jaring-jaring tabung tersebut?',
    options: [
      'Panjang 22 cm dan lebar 20 cm',
      'Panjang 44 cm dan lebar 20 cm',
      'Panjang 44 cm dan lebar 14 cm',
      'Panjang 154 cm dan lebar 20 cm',
    ],
    correctOptionIndex: 1,
    correctAppreciation:
      'Bagus! Kamu memahami dengan tepat hubungan antara keliling lingkaran alas dan panjang selimut tabung.',
    explanationShort:
      'Panjang selimut tabung harus melingkari tepi alas secara tepat, sehingga panjangnya = keliling lingkaran = 2 × (22/7) × 7 = 44 cm, dan lebarnya = tinggi tabung = 20 cm.',
    wrongCorrectionGuide:
      'Hati-hati jangan tertukar antara rumus keliling lingkaran (2πr = 44 cm) dengan luas lingkaran (πr² = 154 cm²) atau setengah keliling (22 cm).',
    languageMeaningNote:
      'Istilah "selimut tabung" merujuk pada bagian sisi lengkung yang membungkus sisi tegak tabung; jika dibentangkan menjadi persegi panjang, sisi mendatarnya mengikuti keliling alas.',
  },
  {
    id: 10,
    code: 'JAR-10',
    topic: 'Jaring-Jaring',
    type: 'pg',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    isListeningFocus: true,
    stimulusTitle: 'Topi Kerucut Festival Panen Raya Wanaraya',
    stimulusText:
      'Menyambut Festival Panen Raya Kecamatan Wanaraya tahun ini, panitia meminta murid kelas 9 membuat topi hias berbentuk kerucut dari anyaman daun lontar tipis berlapis kertas warna cerah. Topi kerucut tersebut dibuat dari jaring-jaring berupa sebuah juring lingkaran dengan jari-jari 25 cm yang berperan sebagai panjang garis pelukis kerucut. Bagian lubang bawah topi membentuk lingkaran berjari-jari 10 cm agar pas di kepala para peserta pawai karnaval desa. Agar tepi bawah juring selimut bertemu sempurna dengan keliling lingkaran kepala tanpa ada celah ataupun kelebihan lipatan, penjahit anyaman harus memotong besar sudut pusat juring dengan sangat tepat.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Sketsa Topi Kerucut Panen Raya',
      subtitle: 'Ukuran Jari-Jari Alas & Garis Pelukis',
      caption: 'Alas topi r = 10 cm dan garis pelukis s = 25 cm.',
      solidKind: 'kerucut',
      dimensions: [
        { label: 'Jari-jari alas (r)', value: '10 cm' },
        { label: 'Garis pelukis (s)', value: '25 cm' },
      ],
    },
    questionText:
      'Berdasarkan keterangan audio dan gambar, berapakah besar sudut pusat juring lingkaran yang harus dipotong sebagai selimut topi kerucut?',
    options: ['120°', '144°', '150°', '180°'],
    correctOptionIndex: 1,
    correctAppreciation:
      'Mantap! Perbandingan keliling alas kerucut terhadap keliling juring lingkaran besar sudah kamu kuasai.',
    explanationShort:
      'Panjang busur juring = keliling alas = 2π(10) = 20π cm. Keliling lingkaran penuh berjari-jari s = 25 cm adalah 2π(25) = 50π cm. Sudut pusat juring = (20π / 50π) × 360° = (2/5) × 360° = 144°.',
    wrongCorrectionGuide:
      'Ingat perbandingan sudut pusat juring kerucut: α / 360° = r / s, bukan s / r.',
    languageMeaningNote:
      'Garis pelukis (s) pada kerucut berfungsi sebagai jari-jari lingkaran besar pembentuk juring selimut saat kerucut dibentangkan menjadi jaring-jaring.',
  },
  {
    id: 11,
    code: 'JAR-11',
    topic: 'Jaring-Jaring',
    type: 'mcma',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Papan Nama Meja Guru Prisma Segitiga Wanaraya',
    stimulusText:
      'Pengurus OSIS SMPN 1 Wanaraya membuat papan nama meja untuk ruang guru berbentuk prisma segitiga sama sisi dari bahan mika karton yang kokoh. Panjang ketiga sisi segitiga sama sisi pada penampang samping adalah 8 cm, sedangkan panjang papan nama ke samping yang berperan sebagai tinggi prisma adalah 15 cm. Sebelum dirakit menggunakan lem akrilik bening, seorang anggota OSIS menggambar sketsa jaring-jaring lengkap prisma segitiga tersebut di atas selembar karton manila berukuran besar agar tidak ada bagian yang terbuang percuma. Guru pembina meminta siswa memeriksa ulang komponen jaring-jaring tersebut sebelum mulai memotong dengan penggaris besi.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Model Papan Nama Prisma Segitiga',
      subtitle: 'Ukuran Alas Segitiga Sama Sisi & Tinggi Prisma',
      caption: 'Sisi alas segitiga sama sisi = 8 cm dan panjang prisma = 15 cm.',
      solidKind: 'prisma_segitiga',
      dimensions: [
        { label: 'Sisi segitiga alas', value: '8 cm' },
        { label: 'Tinggi prisma', value: '15 cm' },
      ],
    },
    questionText:
      'Pilihlah SEMUA pernyataan yang BENAR mengenai jaring-jaring prisma segitiga papan nama tersebut:',
    mcmaStatements: [
      'Jaring-jaring tersusun atas 2 segitiga sama sisi dan 3 persegi panjang yang kongruen.',
      'Setiap persegi panjang pada bagian selimut berukuran 15 cm × 8 cm.',
      'Jika dibentangkan utuh, terdapat tepat 6 bidang sisi pada jaring-jaring prisma segitiga.',
      'Jika ketiga persegi panjang diletakkan berjajar memanjang pada sisi 8 cm, lebar total gabungannya tepat sama dengan keliling segitiga alas (24 cm).',
    ],
    correctMcmaIndices: [0, 1, 3],
    correctAppreciation:
      'Hebat! Pemahamanmu tentang struktur jaring-jaring prisma segitiga sangat matang.',
    explanationShort:
      'Prisma segitiga memiliki 5 sisi (2 segitiga alas-tutup dan 3 persegi panjang selimut berukuran 15 × 8 cm). Tiga persegi panjang berjajar selebar 3 × 8 = 24 cm, sama dengan keliling segitiga alas.',
    wrongCorrectionGuide:
      'Periksa jumlah sisi prisma segitiga: alas (1) + tutup (1) + sisi tegak (3) = 5 sisi, bukan 6 sisi.',
    languageMeaningNote:
      'Kata "kongruen" berarti memiliki bentuk dan ukuran yang sama persis. Karena alasnya segitiga sama sisi (8 cm), ketiga sisi tegaknya pasti kongruen.',
  },
  {
    id: 12,
    code: 'JAR-12',
    topic: 'Jaring-Jaring',
    type: 'mcma',
    competency: 'Menalar',
    difficulty: 'Mahir',
    stimulusTitle: 'Dadu Edukasi Matematika Kelas 9B SMPN 1 Wanaraya',
    stimulusText:
      'Dalam rangka lomba literasi numerasi antar kelas di SMPN 1 Wanaraya, siswa kelas 9B merancang dadu raksasa dari kardus bekas tebal dengan menuliskan angka 1 sampai 6 pada enam petak jaring-jaring kubus. Pada gambar rancangan datar di papan tulis, petak bernomor 2, 3, 4, dan 5 disusun berderet mendatar secara berurutan dari kiri ke kanan. Petak bernomor 1 menempel tepat di sisi atas petak nomor 3, sedangkan petak bernomor 6 menempel tepat di sisi bawah petak nomor 4. Sebelum melipat jaring-jaring menjadi dadu utuh, seluruh anggota tim diminta memprediksi posisi berhadapan setiap angka dengan cermat.',
    visual: {
      kind: 'geometry_net_grid',
      title: 'Pola Jaring-Jaring Dadu Bernomor 1–6',
      subtitle: 'Tata Letak Nomor Sebelum Dilipat',
      caption: 'Petak 2-3-4-5 berderet mendatar, petak 1 di atas 3, petak 6 di bawah 4.',
      netPattern: 'kubus_referensi',
    },
    questionText:
      'Jika sisi bernomor 3 dijadikan sebagai ALAS kubus pada lantai, pilihlah SEMUA pernyataan yang BENAR:',
    mcmaStatements: [
      'Sisi yang menjadi tutup atas kubus adalah sisi bernomor 5.',
      'Sisi bernomor 1 dan 6 saling berhadapan sebagai sisi tegak depan dan belakang.',
      'Sisi bernomor 2 dan 4 akan bersebelahan dan membentuk sudut siku-siku.',
      'Keempat sisi bernomor 1, 2, 4, dan 6 seluruhnya bersentuhan tepi dengan sisi alas nomor 3.',
    ],
    correctMcmaIndices: [0, 1, 3],
    correctAppreciation:
      'Luar biasa! Daya tilik ruang dan penalaran spasialmu sangat akurat.',
    explanationShort:
      'Pada deret 2-3-4-5, sisi berselang satu saling berhadapan: 3 berhadapan dengan 5 (tutup atas), 2 berhadapan dengan 4 (kiri-kanan), serta 1 berhadapan dengan 6 (depan-belakang). Jadi 2 dan 4 tidak bersebelahan.',
    wrongCorrectionGuide:
      'Bayangkan petak 3 tetap diam di lantai: petak 2 naik ke kiri, petak 4 naik ke kanan, petak 5 melipat ke atas menjadi tutup, sehingga 2 dan 4 berada di sisi berlawanan.',
    languageMeaningNote:
      'Perhatikan perbedaan "berhadapan" (sejajar dan berseberangan) dan "bersebelahan" (bertemu pada satu rusuk membentuk sudut 90°).',
  },
  {
    id: 13,
    code: 'JAR-13',
    topic: 'Jaring-Jaring',
    type: 'bs',
    competency: 'Memahami',
    difficulty: 'Dasar',
    stimulusTitle: 'Miniatur Atap Pendopo Balai Desa Wanaraya',
    stimulusText:
      'Untuk proyek maket arsitektur tradisional daerah dalam pelajaran prakarya, siswa kelas 9 membuat miniatur atap pendopo Balai Desa Wanaraya yang berbentuk limas segiempat beraturan. Bagian dasar alas miniatur berbentuk persegi sempurna berukuran 14 cm × 14 cm, sedangkan keempat sisi miring atapnya berbentuk segitiga sama kaki yang ukurannya identik satu sama lain. Sebelum menempelkan bagian-bagian atap tersebut menggunakan lem kayu, siswa menggambar jaring-jaring limas segiempat utuh pada selembar kertas karton tebal berwarna cokelat muda. Melalui gambar jaring-jaring datar tersebut, siswa mempelajari hubungan antara jumlah bidang sisi, rusuk lipatan, serta titik puncak limas.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Bentuk Limas Segiempat Atap Pendopo',
      subtitle: 'Model Bangun Ruang Alas Persegi',
      caption: 'Visualisasi bentuk limas segiempat beraturan sebelum dibuka menjadi jaring-jaring.',
      solidKind: 'limas_segiempat',
      dimensions: [
        { label: 'Alas persegi', value: '14 cm × 14 cm' },
        { label: 'Sisi tegak', value: '4 segitiga sama kaki' },
      ],
    },
    questionText:
      'Tentukan Benar atau Salah untuk setiap pernyataan mengenai jaring-jaring limas segiempat beraturan tersebut!',
    bsStatements: [
      'Jaring-jaring limas segiempat tersusun atas 1 persegi dan 4 segitiga sama kaki yang kongruen.',
      'Pada jaring-jaring limas segiempat terdapat total 6 bidang datar.',
      'Ketika seluruh sisi tegak segitiga dilipat ke atas, keempat titik puncaknya bertemu di satu titik.',
    ],
    correctBsAnswers: [true, false, true],
    correctAppreciation:
      'Tepat! Kamu memahami ciri-ciri bangun ruang limas segiempat dan jaring-jaringnya dengan baik.',
    explanationShort:
      'Limas segiempat beraturan memiliki alas berbentuk persegi (1 bidang) dan 4 sisi tegak segitiga sama kaki kongruen, sehingga total bidangnya 5 (bukan 6). Saat dilipat, keempat puncak segitiga menyatu di titik puncak limas.',
    wrongCorrectionGuide:
      'Hitung kembali jumlah sisi limas segiempat: 1 alas + 4 sisi tegak = 5 sisi.',
    languageMeaningNote:
      'Kata "beraturan" pada "limas segiempat beraturan" bermakna alasnya berupa segi banyak beraturan (persegi) dan semua sisi tegaknya kongruen.',
  },
  {
    id: 14,
    code: 'JAR-14',
    topic: 'Jaring-Jaring',
    type: 'bs',
    competency: 'Menalar',
    difficulty: 'Mahir',
    stimulusTitle: 'Kotak Penyimpanan Alat Ukur Laboratorium IPA',
    stimulusText:
      'Laboratorium IPA SMPN 1 Wanaraya membutuhkan kotak penyimpanan alat ukur praktikum berbentuk balok dari papan tripleks tipis dengan ukuran panjang 12 cm, lebar 8 cm, dan tinggi 5 cm. Pak Teknisi meminta bantuan siswa kelas 9 merancang pola pemotongan jaring-jaring balok dalam satu lembar utuh agar mudah dilipat tanpa ada bagian yang terputus sebelum direkatkan. Karena panjang, lebar, dan tinggi balok semuanya memiliki ukuran berbeda, posisi setiap persegi panjang pada pola datar harus diatur dengan sangat cermat agar pasangan sisi yang berhadapan memiliki ukuran yang sama dan tidak bertabrakan saat dilipat.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Rancangan Balok Alat Ukur',
      subtitle: 'Tiga Dimensi Berbeda Ukuran',
      caption: 'Ukuran balok: p = 12 cm, l = 8 cm, dan t = 5 cm.',
      solidKind: 'balok',
      dimensions: [
        { label: 'Panjang (p)', value: '12 cm' },
        { label: 'Lebar (l)', value: '8 cm' },
        { label: 'Tinggi (t)', value: '5 cm' },
      ],
    },
    questionText:
      'Tentukan Benar atau Salah untuk setiap hasil penalaran mengenai jaring-jaring balok ukuran 12 × 8 × 5 cm tersebut!',
    bsStatements: [
      'Di dalam jaring-jaring balok tersebut terdapat 3 pasang persegi panjang yang masing-masing sepasang kongruen.',
      'Jika dua sisi berukuran 12 × 8 cm diletakkan saling berbagi satu rusuk (bersebelahan langsung) pada pola datar, balok tetap bisa ditutup sempurna.',
      'Banyaknya garis lipatan yang menghubungkan keenam sisi dalam satu pola jaring-jaring utuh tanpa putus adalah tepat 5 garis lipatan.',
    ],
    correctBsAnswers: [true, false, true],
    correctAppreciation:
      'Hebat sekali! Penalaranmu mengenai sisi sejajar dan jumlah lipatan jaring-jaring balok sangat tajam.',
    explanationShort:
      'Balok memiliki 3 pasang sisi kongruen (12×8, 12×5, 8×5). Dua sisi berukuran 12×8 harus saling berhadapan (tidak boleh bersebelahan langsung) karena sisi berhadapan tidak berbagi rusuk. Untuk menyatukan 6 sisi dalam satu pohon lipatan dibutuhkan tepat 6 - 1 = 5 garis lipatan.',
    wrongCorrectionGuide:
      'Bayangkan dua sisi 12×8 cm sebagai alas dan tutup: keduanya sejajar di bawah dan di atas, sehingga harus dipisahkan oleh minimal satu sisi tegak (tinggi 5 cm).',
    languageMeaningNote:
      'Frasa "berbagi satu rusuk" berarti dua bidang menempel langsung di tepi yang sama, yang otomatis menjadikannya berpotongan tegak lurus (bukan berhadapan).',
  },

  // ===================== 3. BRSD (7 SOAL: 3 PG, 2 MCMA, 2 BS — Bagian 1: Q15–Q18) =====================
  {
    id: 15,
    code: 'BRSD-15',
    topic: 'BRSD',
    type: 'pg',
    competency: 'Memahami',
    difficulty: 'Dasar',
    stimulusTitle: 'Bak Penampungan Air Bersih SMPN 1 Wanaraya',
    stimulusText:
      'Untuk menjaga ketersediaan air bersih bagi seluruh warga sekolah selama musim kemarau panjang di Wanaraya, SMPN 1 Wanaraya membangun bak penampungan air permanen di samping musala sekolah. Bagian dalam bak tersebut dirancang berbentuk kubus sempurna dengan panjang setiap rusuk bagian dalam tepat 120 cm (atau 1,2 meter). Petugas kebersihan sekolah secara rutin menguras dan mengisi penuh bak tersebut setiap akhir pekan agar air selalu jernih saat digunakan siswa berwudu maupun mencuci tangan. Guru matematika kelas 9 mengajak para siswa menghitung kapasitas tampung maksimum bak air tersebut dalam satuan liter.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Skema Bak Air Kubus SMPN 1 Wanaraya',
      subtitle: 'Ukuran Bagian Dalam Bak',
      caption: 'Panjang rusuk bagian dalam kubus s = 120 cm (1,2 m).',
      solidKind: 'kubus',
      dimensions: [
        { label: 'Rusuk dalam (s)', value: '120 cm (1,2 m)' },
        { label: 'Konversi', value: '1 dm³ = 1 liter' },
      ],
    },
    questionText:
      'Berapakah volume maksimum air yang dapat ditampung oleh bak berbentuk kubus tersebut?',
    options: ['1.440 liter', '1.728 liter', '1.200 liter', '2.160 liter'],
    correctOptionIndex: 1,
    correctAppreciation:
      'Tepat! Kamu mahir menghitung volume kubus sekaligus mengonversi satuan meter kubik ke liter.',
    explanationShort:
      'Rusuk s = 120 cm = 12 dm. Volume kubus = s³ = 12 × 12 × 12 = 1.728 dm³ = 1.728 liter.',
    wrongCorrectionGuide:
      'Jangan keliru mengalikan 12 × 12 × 10 menjadi 1.440 atau menghitung luas permukaan; volume kubus adalah s × s × s.',
    languageMeaningNote:
      'Istilah "volume maksimum" menanyakan daya tampung penuh bangun ruang (isi), di mana 1 liter setara tepat dengan 1 dm³ (atau 1.000 cm³).',
  },
  {
    id: 16,
    code: 'BRSD-16',
    topic: 'BRSD',
    type: 'pg',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Kolam Budidaya Ikan Patin Desa Karangrejo',
    stimulusText:
      'Kelompok pembudidaya ikan air tawar di Desa Karangrejo, Kecamatan Wanaraya, membangun sebuah kolam beton baru berbentuk balok untuk pembesaran ribuan bibit ikan patin unggul. Kolam tersebut memiliki ukuran bagian dalam: panjang 6 meter, lebar 4 meter, dan kedalaman tepat 1,5 meter. Agar kolam tidak mudah merembes dan mudah dibersihkan dari lumut hijau, seluruh permukaan bagian dalam dinding serta dasar kolam akan dilapisi keramik khusus kolam. Karena merupakan kolam ikan terbuka di luar ruangan, bagian atas kolam tentu tidak ditutup maupun dipasangi keramik. Kontraktor kolam membutuhkan perhitungan luas total bidang yang akan dikeramik.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Dimensi Kolam Ikan Patin Karangrejo',
      subtitle: 'Balok Terbuka Tanpa Tutup',
      caption: 'Panjang = 6 m, lebar = 4 m, dan kedalaman = 1,5 m (bagian atas terbuka).',
      solidKind: 'balok',
      dimensions: [
        { label: 'Panjang (p)', value: '6 m' },
        { label: 'Lebar (l)', value: '4 m' },
        { label: 'Kedalaman (t)', value: '1,5 m' },
      ],
    },
    questionText:
      'Berapakah luas total permukaan dalam kolam ikan patin yang akan dilapisi keramik?',
    options: ['48 m²', '54 m²', '64 m²', '78 m²'],
    correctOptionIndex: 1,
    correctAppreciation:
      'Keren! Kamu jeli memperhatikan kondisi kolam tanpa tutup sehingga tidak menghitung sisi atasnya.',
    explanationShort:
      'Luas permukaan tanpa tutup = (p × l) + 2(p × t) + 2(l × t) = (6 × 4) + 2(6 × 1,5) + 2(4 × 1,5) = 24 + 18 + 12 = 54 m².',
    wrongCorrectionGuide:
      'Jika kamu mendapat 78 m², itu berarti tutup atas (24 m²) ikut terhitung. Kurangi 24 m² karena kolam bersifat terbuka di bagian atas.',
    languageMeaningNote:
      'Perhatikan frasa "dinding dan dasar kolam" serta "bagian atas kolam tidak ditutup"—ini menandakan rumus luas permukaan balok hanya menggunakan 1 kali (p × l), bukan 2 kali.',
  },
  {
    id: 17,
    code: 'BRSD-17',
    topic: 'BRSD',
    type: 'pg',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    isListeningFocus: true,
    stimulusTitle: 'Tenda Posko Kesehatan Karang Taruna Wanaraya',
    stimulusText:
      'Saat kegiatan bakti sosial kesehatan warga di lapangan Kecamatan Wanaraya, pemuda Karang Taruna mendirikan tenda posko berbentuk prisma segitiga siku-siku dari bahan terpal tebal kedap air. Bagian pintu segitiga di depan dan dinding segitiga di belakang berukuran sama, yakni sisi alas mendatar 4 meter, sisi tegak 3 meter, dan sisi miring atap 5 meter. Sementara itu, panjang tenda dari depan ke belakang adalah 6 meter. Seluruh permukaan tenda tertutup rapat oleh kain terpal, meliputi alas terpal bagian bawah agar tidak lembap, kedua sisi atap miring, serta penutup segitiga bagian depan dan belakang.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Model Tenda Prisma Segitiga',
      subtitle: 'Ukuran Segitiga Siku-Siku 3-4-5 & Panjang 6 m',
      caption: 'Tenda tertutup seluruh bagian termasuk alas terpalnya.',
      solidKind: 'prisma_segitiga',
      dimensions: [
        { label: 'Segitiga (a, t, miring)', value: '4 m, 3 m, 5 m' },
        { label: 'Panjang tenda', value: '6 m' },
      ],
    },
    questionText:
      'Berdasarkan cerita yang kamu dengarkan, berapakah luas total kain terpal yang dibutuhkan untuk membuat tenda posko tersebut?',
    options: ['60 m²', '72 m²', '84 m²', '96 m²'],
    correctOptionIndex: 2,
    correctAppreciation:
      'Hebat! Kamu menyimak detail "seluruh permukaan termasuk alas bawah" dan menghitung luas prisma dengan tepat.',
    explanationShort:
      'Luas 2 segitiga = 2 × (1/2 × 3 × 4) = 12 m². Keliling segitiga = 3 + 4 + 5 = 12 m. Luas selimut (2 atap + alas) = 12 × 6 = 72 m². Total luas terpal = 12 + 72 = 84 m².',
    wrongCorrectionGuide:
      'Angka 72 m² hanya luas bagian selimut memanjang, belum ditambah luas dua segitiga depan dan belakang (12 m²).',
    languageMeaningNote:
      'Kata "meliputi alas terpal bagian bawah, kedua sisi atap, serta penutup segitiga depan dan belakang" berarti kamu menghitung luas permukaan prisma secara utuh.',
  },
  {
    id: 18,
    code: 'BRSD-18',
    topic: 'BRSD',
    type: 'mcma',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Tugu Simpang Tiga Desa Wanaraya',
    stimulusText:
      'Warga Desa Wanaraya bergotong royong merenovasi tugu penanda jalan utama di simpang tiga desa agar lebih rapi. Bentuk tugu terdiri atas bagian bawah berupa kubus pejal berukuran rusuk 10 dm yang bagian alas bawahnya menempel erat pada fondasi cor tanah, lalu di atasnya berdiri atap berbentuk limas segiempat beraturan dengan alas berhimpit tepat pada sisi atas kubus. Tinggi tegak limas dari bidang batas atas kubus hingga ke puncaknya adalah 12 dm. Agar tampak indah dan tahan cuaca hujan panas, seluruh permukaan luar tugu yang terlihat (4 dinding kubus dan 4 sisi miring limas) akan dicat.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Tugu Gabungan Kubus dan Limas',
      subtitle: 'Ukuran Rusuk Kubus & Tinggi Limas',
      caption: 'Rusuk kubus = 10 dm, tinggi tegak limas = 12 dm, bidang alas berhimpit tidak dicat.',
      solidKind: 'gabungan_kubus_limas',
      dimensions: [
        { label: 'Rusuk kubus (s)', value: '10 dm' },
        { label: 'Tinggi limas (t)', value: '12 dm' },
      ],
    },
    questionText:
      'Pilihlah SEMUA pernyataan yang BENAR mengenai volume dan luas permukaan luar tugu Wanaraya tersebut:',
    mcmaStatements: [
      'Volume bagian bawah tugu yang berbentuk kubus adalah 1.000 dm³.',
      'Volume total gabungan tugu tersebut adalah 1.400 dm³.',
      'Tinggi segitiga pada sisi miring atap limas adalah 15 dm.',
      'Luas permukaan bagian luar tugu yang akan dicat adalah 660 dm².',
    ],
    correctMcmaIndices: [0, 1, 3],
    correctAppreciation:
      'Luar biasa! Kamu berhasil menggabungkan konsep volume, teorema Pythagoras, dan luas permukaan bangun gabungan tanpa terjebak sisi yang berhimpit.',
    explanationShort:
      'V kubus = 10³ = 1.000 dm³; V limas = 1/3 × 100 × 12 = 400 dm³; V total = 1.400 dm³. Tinggi sisi miring limas = √(5² + 12²) = 13 dm (bukan 15). Luas cat = 4(10×10) + 4(1/2 × 10 × 13) = 400 + 260 = 660 dm².',
    wrongCorrectionGuide:
      'Gunakan setengah panjang rusuk kubus (10 / 2 = 5 dm) sebagai alas segitiga siku-siku dengan tinggi limas 12 dm untuk mencari tinggi sisi tegak limas (13 dm).',
    languageMeaningNote:
      'Frasa "berhimpit" dan "menempel erat pada fondasi tanah" memberi petunjuk penting bahwa dua bidang tutup kubus dan alas limas tidak masuk ke dalam luas permukaan luar yang dicat.',
  },
];
