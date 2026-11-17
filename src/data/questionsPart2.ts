import { QuizQuestion } from '../types/quiz';

export const QUESTIONS_PART_2: QuizQuestion[] = [
  // ===================== 3. BRSD (Bagian 2: Q19–Q21) =====================
  {
    id: 19,
    code: 'BRSD-19',
    topic: 'BRSD',
    type: 'mcma',
    competency: 'Menalar',
    difficulty: 'Mahir',
    stimulusTitle: 'Gudang Gabah Koperasi Tani Mekar Jaya Wanaraya',
    stimulusText:
      'Koperasi Tani Mekar Jaya di Kecamatan Wanaraya membangun sebuah gudang penyimpanan gabah kering berkapasitas besar untuk menampung hasil panen anggota. Bangunan gudang tersebut berbentuk gabungan dua bangun ruang: bagian dinding bawah berupa balok berukuran panjang 10 meter, lebar 8 meter, dan tinggi dinding 4 meter; sedangkan bagian atapnya tepat di atas balok berbentuk prisma segitiga sama kaki dengan lebar alas segitiga 8 meter, tinggi segitiga atap 3 meter, dan panjang atap memanjang 10 meter mengikuti panjang gudang. Pengurus koperasi hendak menghitung kapasitas ruang udara gudang sekaligus kebutuhan lembaran seng untuk kedua bidang miring atap tersebut.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Struktur Gudang Gabungan Balok & Prisma',
      subtitle: 'Ukuran Dinding Bawah dan Atap Prisma',
      caption: 'Balok (10 m × 8 m × 4 m) dan atap prisma segitiga (alas 8 m, tinggi atap 3 m).',
      solidKind: 'gabungan_balok_prisma',
      dimensions: [
        { label: 'Balok (p × l × t₁)', value: '10 m × 8 m × 4 m' },
        { label: 'Tinggi atap (t₂)', value: '3 m' },
      ],
    },
    questionText:
      'Pilihlah SEMUA pernyataan yang BENAR mengenai ukuran ruang dan atap gudang gabah Wanaraya tersebut:',
    mcmaStatements: [
      'Volume ruang bagian bawah gudang yang berbentuk balok adalah 320 m³.',
      'Volume total ruang gabungan seluruh gudang adalah 440 m³.',
      'Panjang sisi miring atap segitiga gudang tersebut adalah 6 meter.',
      'Luas total kedua bidang atap miring yang perlu dipasangi seng adalah 100 m².',
    ],
    correctMcmaIndices: [0, 1, 3],
    correctAppreciation:
      'Luar biasa! Penalaranmu dalam memecah bangunan gudang menjadi balok dan prisma segitiga sangat cermat.',
    explanationShort:
      'V balok = 10 × 8 × 4 = 320 m³. V prisma atap = (1/2 × 8 × 3) × 10 = 120 m³, sehingga V total = 440 m³. Setengah lebar atap = 4 m dan tinggi atap = 3 m menghasilkan sisi miring √(4² + 3²) = 5 m. Jadi luas 2 bidang atap = 2 × (5 × 10) = 100 m².',
    wrongCorrectionGuide:
      'Perhatikan bahwa lebar atap 8 m terbagi dua simetris menjadi 4 m ke kiri dan 4 m ke kanan sebelum memakai rumus Pythagoras.',
    languageMeaningNote:
      'Frasa "kedua bidang miring atap" hanya mengacu pada dua persegi panjang miring di sisi kanan dan kiri atap, bukan segitiga depan-belakang atau langit-langit datar.',
  },
  {
    id: 20,
    code: 'BRSD-20',
    topic: 'BRSD',
    type: 'bs',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Akuarium Biologi Kelas 9B SMPN 1 Wanaraya',
    stimulusText:
      'Di sudut ruang kelas 9B SMPN 1 Wanaraya terdapat sebuah akuarium kaca bening berbentuk balok yang digunakan siswa untuk mengamati ekosistem ikan hias air tawar khas sungai lokal. Ukuran bagian dalam akuarium tersebut adalah panjang 80 cm, lebar 40 cm, dan tinggi 50 cm. Agar ikan tetap hidup sehat, bebas berenang, dan tidak melompat keluar, siswa piket mengisi akuarium tersebut dengan air bersih hingga mencapai ketinggian tepat tiga perempat (3/4) dari tinggi penuh akuarium. Ketua kelas 9B kemudian mencatat volume air yang telah terisi dan mengecek sisa ruang kosong di bagian atas akuarium tersebut.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Akuarium Balok Kelas 9B',
      subtitle: 'Ketinggian Pengisian 3/4 Bagian',
      caption: 'Dimensi dalam: p = 80 cm, l = 40 cm, t = 50 cm (terisi 3/4 tinggi).',
      solidKind: 'balok',
      dimensions: [
        { label: 'Ukuran dalam', value: '80 × 40 × 50 cm' },
        { label: 'Isi air saat ini', value: '3/4 tinggi penuh' },
      ],
    },
    questionText:
      'Tentukan Benar atau Salah untuk setiap pernyataan terkait volume air dalam akuarium kelas 9B!',
    bsStatements: [
      'Kapasitas volume penuh akuarium tersebut adalah 160 liter.',
      'Volume air yang berada di dalam akuarium saat terisi 3/4 bagian adalah 120 liter.',
      'Jika siswa menuangkan tambahan 45 liter air lagi ke dalam akuarium itu, air tidak akan meluap keluar.',
    ],
    correctBsAnswers: [true, true, false],
    correctAppreciation:
      'Bagus! Kamu teliti menghitung kapasitas penuh, bagian pecahan terisi, dan sisa ruang tampungnya.',
    explanationShort:
      'Volume penuh = 80 × 40 × 50 = 160.000 cm³ = 160 liter. Terisi 3/4 bagian = 3/4 × 160 = 120 liter. Sisa ruang kosong tinggal 160 - 120 = 40 liter, sehingga tambahan 45 liter pasti meluap 5 liter.',
    wrongCorrectionGuide:
      'Bandingkan volume air tambahan (45 liter) dengan sisa ruang kosong akuarium (40 liter) agar tidak terkecoh oleh kata negatif "tidak akan meluap".',
    languageMeaningNote:
      'Kalimat negasi "tidak akan meluap keluar" menuntut kondisi volume tambahan ≤ sisa ruang kosong. Karena 45 > 40, kalimat tersebut bernilai Salah.',
  },
  {
    id: 21,
    code: 'BRSD-21',
    topic: 'BRSD',
    type: 'bs',
    competency: 'Menalar',
    difficulty: 'Mahir',
    stimulusTitle: 'Produksi Kubus Mainan Kayu UMKM Sidomulyo',
    stimulusText:
      'Pengrajin kayu kreatif di Desa Sidomulyo, Kecamatan Wanaraya, membuat balok-balok mainan edukatif anak PAUD dari potongan balok kayu pinus utuh pilihan. Sebuah balok kayu besar yang sudah diserut halus memiliki ukuran panjang 60 cm, lebar 40 cm, dan tinggi 30 cm. Pengrajin tersebut kemudian memotong seluruh balok kayu besar itu secara presisi menggunakan gergaji mesin menjadi kubus-kubus kecil pejal dengan panjang rusuk 10 cm tanpa ada kayu tersisa. Sebelum seluruh kubus kecil tersebut diampelas dan dicat warna-warni, pengrajin membandingkan volume dan total luas permukaan antara balok awal dan gabungan seluruh kubus kecil hasil pemotongan.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Balok Kayu Induk Sebelum Dipotong',
      subtitle: 'Ukuran 60 cm × 40 cm × 30 cm',
      caption: 'Akan dipotong habis menjadi kubus kecil berusuk 10 cm.',
      solidKind: 'balok',
      dimensions: [
        { label: 'Balok induk', value: '60 × 40 × 30 cm' },
        { label: 'Kubus potongan', value: 'rusuk 10 cm' },
      ],
    },
    questionText:
      'Evaluasilah kebenaran (Benar atau Salah) dari setiap pernyataan penalaran berikut!',
    bsStatements: [
      'Banyaknya kubus kecil berusuk 10 cm yang terbentuk dari balok induk adalah 72 buah.',
      'Jumlah volume seluruh 72 kubus kecil sama persis dengan volume balok induk, yakni 72.000 cm³.',
      'Jumlah total luas permukaan seluruh 72 kubus kecil sama dengan luas permukaan balok kayu semula.',
    ],
    correctBsAnswers: [true, true, false],
    correctAppreciation:
      'Mantap sekali! Kamu paham bahwa memotong benda menjaga kekekalan volume, tetapi memunculkan bidang permukaan baru.',
    explanationShort:
      'Jumlah kubus = (60/10) × (40/10) × (30/10) = 6 × 4 × 3 = 72 buah. Total volume tetap 72 × 1.000 = 72.000 cm³. Namun luas permukaan awal balok = 2(2.400 + 1.800 + 1.200) = 10.800 cm², sedangkan total luas permukaan 72 kubus = 72 × 600 = 43.200 cm² (4 kali lipat!).',
    wrongCorrectionGuide:
      'Ingat bahwa setiap kali sebuah balok dibelah, sisi dalam yang tadinya tersembunyi terbuka menjadi permukaan baru, sehingga luas permukaan total bertambah drastis.',
    languageMeaningNote:
      'Frasa "jumlah total luas permukaan seluruh 72 kubus" berarti menjumlahkan luas permukaan luar masing-masing kubus setelah terpisah, bukan saat masih menyatu sebagai balok.',
  },

  // ===================== 4. LINGKARAN (7 SOAL: 4 PG, 1 MCMA, 2 BS) =====================
  {
    id: 22,
    code: 'LING-22',
    topic: 'Lingkaran',
    type: 'pg',
    competency: 'Memahami',
    difficulty: 'Dasar',
    stimulusTitle: 'Taman Bundaran Simpang Empat Kecamatan Wanaraya',
    stimulusText:
      'Di pusat Kecamatan Wanaraya terdapat Taman Bundaran indah berbentuk lingkaran sempurna dengan titik pusat O tepat di tempat berdirinya tiang lampu taman utama. Pada suatu sore yang sejuk, petugas tata taman merancang jalur setapak lurus menghubungkan dua bangku taman A dan B yang terletak tepat di tepi keliling lingkaran, namun jalur AB tersebut tidak melewati titik pusat O. Untuk memasang saluran kabel lampu taman dari titik pusat O menuju jalur setapak AB secara paling singkat, petugas menarik garis lurus OC yang tegak lurus terhadap ruas garis AB. Gambar denah taman digunakan siswa untuk mengenali unsur lingkaran.',
    visual: {
      kind: 'geometry_circle',
      title: 'Denah Unsur Taman Bundaran Wanaraya',
      subtitle: 'Titik Pusat O, Garis AB, dan Garis Tegak Lurus OC',
      caption: 'Garis AB menghubungkan dua titik di tepi lingkaran; OC tegak lurus AB.',
      circleKind: 'tali_busur_apotema',
      circleLabels: {
        center: 'O',
        extra: 'OC ⊥ AB',
      },
    },
    questionText:
      'Berdasarkan denah lingkaran tersebut, apakah nama unsur lingkaran bagi ruas garis AB dan ruas garis OC secara berturut-turut?',
    options: [
      'AB adalah diameter dan OC adalah jari-jari',
      'AB adalah tali busur dan OC adalah apotema',
      'AB adalah busur dan OC adalah juring',
      'AB adalah apotema dan OC adalah tali busur',
    ],
    correctOptionIndex: 1,
    correctAppreciation:
      'Tepat! Kamu mengenal unsur-unsur lingkaran dengan sangat jelas dan akurat.',
    explanationShort:
      'Ruas garis lurus yang menghubungkan dua titik pada keliling lingkaran disebut tali busur (AB). Jarak terpendek dari titik pusat O yang ditarik tegak lurus ke tali busur disebut apotema (OC).',
    wrongCorrectionGuide:
      'Diameter harus melewati titik pusat O, sedangkan pada cerita tertulis jalur AB tidak melewati O, maka AB adalah tali busur.',
    languageMeaningNote:
      'Kata "secara berturut-turut" mengharuskan urutan jawaban pertama merujuk ke AB (tali busur) dan jawaban kedua merujuk ke OC (apotema), tidak boleh terbalik.',
  },
  {
    id: 23,
    code: 'LING-23',
    topic: 'Lingkaran',
    type: 'pg',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Jam Dinding Ikonik Pendopo Kecamatan Wanaraya',
    stimulusText:
      'Pendopo Kecamatan Wanaraya memiliki jam dinding besar berbentuk lingkaran berpusat di titik O yang menjadi acuan waktu seluruh kegiatan warga sekitar. Dalam proyek pembelajaran geometri kelas 9, siswa mengamati posisi tiga titik penanda khusus pada tepi lingkaran jam tersebut, yakni titik A, B, dan C. Titik A dan B membentuk sudut pusat ∠AOB yang besarnya terukur tepat 108° pada bagian atas lingkaran. Sementara itu, titik C terletak pada busur besar di bagian bawah lingkaran sehingga terbentuk sudut keliling ∠ACB yang menghadap ke busur kecil AB yang persis sama dengan sudut pusat ∠AOB tersebut.',
    visual: {
      kind: 'geometry_circle',
      title: 'Skema Sudut Pusat dan Sudut Keliling',
      subtitle: 'Menghadap Busur AB yang Sama',
      caption: 'Diketahui ∠AOB = 108°; tentukan besar sudut keliling ∠ACB.',
      circleKind: 'sudut_pusat_keliling',
      circleLabels: {
        center: 'O',
        angleA: '108°',
        angleB: '?',
      },
    },
    questionText:
      'Berdasarkan sifat hubungan sudut pusat dan sudut keliling, berapakah besar sudut keliling ∠ACB?',
    options: ['36°', '54°', '72°', '108°'],
    correctOptionIndex: 1,
    correctAppreciation:
      'Hebat! Kamu menerapkan teorema sudut keliling sama dengan setengah sudut pusat secara tepat.',
    explanationShort:
      'Karena ∠AOB (sudut pusat) dan ∠ACB (sudut keliling) menghadap busur yang sama (busur AB), maka ∠ACB = 1/2 × ∠AOB = 1/2 × 108° = 54°.',
    wrongCorrectionGuide:
      'Jangan keliru mengalikan dua; sudut keliling selalu lebih kecil (tepat setengah) daripada sudut pusat yang menghadap busur yang sama.',
    languageMeaningNote:
      'Frasa "menghadap busur yang sama" merupakan syarat mutlak berlakunya rumus ∠keliling = ½ × ∠pusat.',
  },
  {
    id: 24,
    code: 'LING-24',
    topic: 'Lingkaran',
    type: 'pg',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    isListeningFocus: true,
    stimulusTitle: 'Juring Taman Bunga Bougenville Desa Kolam Kanan',
    stimulusText:
      'Desa Kolam Kanan di Kecamatan Wanaraya membangun taman bunga berbentuk lingkaran penuh dengan panjang jari-jari 21 meter untuk memperindah area sekitar balai desa. Pemerintah desa membagi lahan lingkaran tersebut menjadi beberapa sektor berbentuk juring untuk menanam jenis tanaman hias yang berbeda warna. Sektor khusus bunga bougenville merah muda menempati bagian juring lingkaran dengan besar sudut pusat tepat 120°. Petugas pertamanan berencana menanami seluruh permukaan juring bougenville tersebut dengan rumput gajah mini sebagai dasar taman sebelum menaruh pot bunga. Gunakan nilai pi = 22/7 untuk menghitung luas sektor taman bougenville yang akan ditanami rumput tersebut.',
    visual: {
      kind: 'geometry_circle',
      title: 'Peta Sektor Juring Taman Bunga',
      subtitle: 'Jari-Jari 21 m & Sudut Pusat 120°',
      caption: 'Area juring 120° akan ditanami rumput gajah mini.',
      circleKind: 'busur_juring',
      circleLabels: {
        center: 'O',
        angleA: '120°',
        radius: 'r = 21 m',
      },
    },
    questionText:
      'Berdasarkan paparan audio dan denah, berapakah luas juring taman yang akan ditanami rumput pada sektor bunga bougenville?',
    options: ['154 m²', '308 m²', '462 m²', '616 m²'],
    correctOptionIndex: 2,
    correctAppreciation:
      'Tepat sekali! Kamu sigap menghitung luas juring menggunakan pecahan sudut pusat 120°/360°.',
    explanationShort:
      'Luas juring = (120° / 360°) × (22/7) × 21 × 21 = (1/3) × 22 × 3 × 21 = 22 × 21 = 462 m².',
    wrongCorrectionGuide:
      'Jangan menghitung panjang busur (44 m) atau menggunakan sudut 90° (seperempat lingkaran); 120°/360° disederhanakan menjadi 1/3.',
    languageMeaningNote:
      'Kata "luas sektor taman" mengacu pada luas daerah juring (bidang di dalam lingkaran yang dibatasi dua jari-jari dan busur), bukan panjang pagar tepinya.',
  },
  {
    id: 25,
    code: 'LING-25',
    topic: 'Lingkaran',
    type: 'pg',
    competency: 'Menalar',
    difficulty: 'Mahir',
    stimulusTitle: 'Sabuk Katrol Mesin Penggilingan Padi Wanaraya',
    stimulusText:
      'Di tempat penggilingan padi milik Bapak Darmawan di Desa Wanaraya, sebuah mesin diesel menggerakkan roda penggiling menggunakan dua katrol berbentuk lingkaran yang dihubungkan oleh sabuk penggerak karet pada garis singgung persekutuan luar. Kedua katrol dipasang sejajar pada rangka besi dengan jarak antar kedua titik pusat katrol P dan Q sebesar 25 cm. Katrol utama yang terhubung ke poros mesin diesel memiliki jari-jari lebih besar, yaitu 12 cm, sedangkan katrol kedua di poros pemutar berjari-jari 5 cm. Teknisi mesin ingin mengetahui panjang bagian lurus sabuk antara kedua titik singgung pada permukaan katrol tersebut.',
    visual: {
      kind: 'geometry_circle',
      title: 'Skema Garis Singgung Persekutuan Luar',
      subtitle: 'Dua Katrol Penggilingan Padi',
      caption: 'Jarak pusat PQ = 25 cm, R = 12 cm, dan r = 5 cm.',
      circleKind: 'garis_singgung_luar',
      circleLabels: {
        radius: 'R=12, r=5',
        extra: 'd = 25 cm',
      },
    },
    questionText:
      'Berapakah panjang garis singgung persekutuan luar (bagian lurus sabuk) antara kedua katrol tersebut?',
    options: ['18 cm', '20 cm', '24 cm', '26 cm'],
    correctOptionIndex: 2,
    correctAppreciation:
      'Luar biasa! Kamu berhasil menerapkan rumus garis singgung persekutuan luar dan mengenali tripel Pythagoras 7-24-25.',
    explanationShort:
      'Panjang garis singgung persekutuan luar l = √(d² - (R - r)²) = √(25² - (12 - 5)²) = √(625 - 49) = √576 = 24 cm.',
    wrongCorrectionGuide:
      'Untuk garis singgung persekutuan LUAR, jari-jari besar dikurangi jari-jari kecil (12 - 5 = 7 cm), bukan dijumlahkan (12 + 5 = 17 cm).',
    languageMeaningNote:
      'Istilah "persekutuan luar" menunjukkan sabuk tidak menyilang di tengah antar katrol, melainkan menyentuh sisi luar kedua lingkaran sehingga selisih jari-jari (R - r) yang dipakai.',
  },
  {
    id: 26,
    code: 'LING-26',
    topic: 'Lingkaran',
    type: 'mcma',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Lintasan Lari Lapangan Lingkaran Desa Wanaraya',
    stimulusText:
      'Lapangan olahraga komunitas warga di Kecamatan Wanaraya memiliki lintasan lari tepi berbentuk lingkaran penuh dengan panjang diameter lapangan tepat 70 meter. Pada pelajaran Pendidikan Jasmani, Olahraga, dan Kesehatan (PJOK), siswa kelas 9A mengikuti tes kebugaran jasmani dengan berlari mengelilingi tepi lintasan lingkaran tersebut sebanyak 3 putaran penuh secara konstan. Sementara itu, seluruh area rumput hijau yang berada di dalam lingkaran lintasan akan dipangkas rapi oleh petugas pemeliharaan desa pada akhir minggu. Gunakan pi = 22/7 untuk membantu guru PJOK mengevaluasi total jarak lari siswa dan menghitung luas area rumput lapangan.',
    visual: {
      kind: 'geometry_circle',
      title: 'Lapangan Lari Lingkaran Wanaraya',
      subtitle: 'Diameter 70 m · Target 3 Putaran',
      caption: 'Lintasan tepi sepanjang keliling lingkaran dengan diameter 70 m.',
      circleKind: 'unsur_dasar',
      circleLabels: {
        center: 'O',
        radius: 'd = 70 m',
      },
    },
    questionText:
      'Pilihlah SEMUA pernyataan yang BENAR mengenai lapangan lingkaran dan jarak lari siswa kelas 9A:',
    mcmaStatements: [
      'Panjang jari-jari lapangan lingkaran tersebut adalah 35 meter.',
      'Jarak lintasan untuk 1 kali putaran penuh adalah 220 meter.',
      'Total jarak yang ditempuh siswa setelah berlari 3 putaran penuh adalah 440 meter.',
      'Luas area rumput hijau di dalam lintasan lingkaran adalah 3.850 m².',
    ],
    correctMcmaIndices: [0, 1, 3],
    correctAppreciation:
      'Hebat! Kamu mampu membedakan perhitungan keliling putaran dan luas lingkaran dengan sangat rapi.',
    explanationShort:
      'r = 70/2 = 35 m. Keliling 1 putaran = (22/7) × 70 = 220 m. Untuk 3 putaran = 3 × 220 = 660 m (bukan 440 m). Luas lingkaran = (22/7) × 35 × 35 = 3.850 m².',
    wrongCorrectionGuide:
      'Periksa kembali perkalian 3 putaran × 220 meter; angka 440 meter hanya untuk 2 putaran.',
    languageMeaningNote:
      'Kata "diameter" menyatakan garis tengah penuh, sehingga untuk menghitung luas (πr²) harus dibagi dua terlebih dahulu menjadi jari-jari 35 m.',
  },
  {
    id: 27,
    code: 'LING-27',
    topic: 'Lingkaran',
    type: 'bs',
    competency: 'Memahami',
    difficulty: 'Dasar',
    stimulusTitle: 'Jembatan Segiempat Kolam Bundar Wisata Wanaraya',
    stimulusText:
      'Di tengah kolam ikan hias berbentuk lingkaran pada Taman Wisata Wanaraya dibangun empat dermaga kayu kecil yang terhubung oleh jembatan lurus membentuk bangun segiempat ABCD. Keempat titik sudut A, B, C, dan D berada tepat menempel di tepi keliling lingkaran kolam sehingga membentuk sebuah segiempat tali busur. Ketika siswa kelas 9 mengukur sudut-sudut jembatan menggunakan busur derajat besar saat praktik lapangan matematika, diketahui bahwa besar sudut dalam ∠A adalah 75° dan besar sudut dalam ∠B di sebelahnya adalah 102°. Siswa diminta melengkapi perhitungan dua besar sudut lainnya secara tepat tanpa harus mengukur ulang.',
    visual: {
      kind: 'geometry_circle',
      title: 'Segiempat Tali Busur ABCD pada Kolam',
      subtitle: 'Keempat Titik Sudut di Keliling Lingkaran',
      caption: 'Diketahui ∠A = 75° dan ∠B = 102° pada segiempat tali busur ABCD.',
      circleKind: 'segiempat_tali_busur',
      circleLabels: {
        angleA: '75°',
        angleB: '102°',
      },
    },
    questionText:
      'Tentukan Benar atau Salah untuk setiap pernyataan mengenai segiempat tali busur ABCD!',
    bsStatements: [
      'Jumlah besar sudut ∠A dan sudut ∠C yang saling berhadapan adalah tepat 180°.',
      'Besar sudut dalam ∠C pada jembatan segiempat tersebut adalah 105°.',
      'Besar sudut dalam ∠D pada jembatan segiempat tersebut adalah 88°.',
    ],
    correctBsAnswers: [true, true, false],
    correctAppreciation:
      'Cerdas! Sifat sudut berhadapan pada segiempat tali busur berjumlah 180° sudah kamu kuasai dengan baik.',
    explanationShort:
      'Pada segiempat tali busur ABCD, pasangan sudut berhadapan (∠A + ∠C dan ∠B + ∠D) masing-masing berjumlah 180°. Maka ∠C = 180° - 75° = 105° (Benar), dan ∠D = 180° - 102° = 78° (sehingga 88° adalah Salah).',
    wrongCorrectionGuide:
      'Kurangkan 180° dengan 102° secara teliti (180 - 102 = 78, bukan 88).',
    languageMeaningNote:
      'Istilah "segiempat tali busur" hanya berlaku jika KEEMPAT titik sudut segiempat tepat berada di keliling lingkaran, dengan urutan titik A-B-C-D melingkar berurutan sehingga A berhadapan dengan C dan B berhadapan dengan D.',
  },
  {
    id: 28,
    code: 'LING-28',
    topic: 'Lingkaran',
    type: 'bs',
    competency: 'Menalar',
    difficulty: 'Mahir',
    stimulusTitle: 'Bersepeda Menuju SMPN 1 Wanaraya',
    stimulusText:
      'Setiap pagi sebelum bel masuk berbunyi, Rina berangkat dari rumahnya di Desa Simpang Jaya menuju SMPN 1 Wanaraya dengan mengayuh sepeda melintasi jalan desa beraspal datar sejauh 880 meter. Rina telah mengukur bahwa diameter luar roda sepedanya termasuk ketebalan ban adalah tepat 56 cm. Selama perjalanan menuju gerbang sekolah, roda sepeda berputar menggelinding lurus secara konstan tanpa selip di permukaan jalan beraspal. Dalam tugas proyek matematika terapan, guru meminta Rina menganalisis hubungan antara diameter roda, keliling lintasan satu putaran penuh, dan banyaknya putaran roda selama menempuh jarak 880 meter tersebut (gunakan pi = 22/7).',
    visual: {
      kind: 'wanaraya_infographic',
      title: 'Data Perjalanan Sepeda Rina ke Sekolah',
      subtitle: 'Analisis Roda dan Jarak Tempuh',
      caption: 'Diameter roda 56 cm dan jarak lurus ke sekolah 880 meter.',
      infographicItems: [
        { label: 'Diameter Roda (d)', value: '56 cm', unit: 'π = 22/7' },
        { label: 'Jarak Rumah–Sekolah', value: '880 meter', unit: '88.000 cm' },
      ],
    },
    questionText:
      'Tentukan Benar atau Salah untuk setiap pernyataan analisis gerak roda sepeda Rina berikut!',
    bsStatements: [
      'Panjang keliling roda sepeda Rina untuk satu kali putaran penuh adalah 176 cm.',
      'Sepanjang perjalanan sejauh 880 meter tersebut, roda berputar tepat sebanyak 500 kali.',
      'Jika Rina memakai roda berjari-jari dua kali lebih besar untuk jarak 880 meter yang sama, banyak putaran roda juga akan menjadi dua kali lipat lebih banyak.',
    ],
    correctBsAnswers: [true, true, false],
    correctAppreciation:
      'Hebat! Kamu memahami perbandingan berbalik nilai antara ukuran roda dan jumlah putaran.',
    explanationShort:
      'Keliling roda = (22/7) × 56 = 176 cm. Banyak putaran = 88.000 cm / 176 cm = 500 putaran. Jika jari-jari menjadi 2 kali lebih besar, kelilingnya menjadi 2 kali lebih besar sehingga jumlah putaran justru berkurang setengahnya menjadi 250 kali (bukan 2× lebih banyak).',
    wrongCorrectionGuide:
      'Jangan lupa menyamakan satuan 880 meter menjadi 88.000 cm sebelum dibagi keliling 176 cm, dan bayangkan roda besar menempuh jarak lebih jauh per putaran.',
    languageMeaningNote:
      'Secara logika bahasa dan matematika, hubungan antara keliling roda dan banyak putaran pada jarak tetap adalah berbalik nilai: makin besar rodanya, makin sedikit putarannya.',
  },

  // ===================== 5. BRSL (7 SOAL: 3 PG, 2 MCMA, 2 BS) =====================
  {
    id: 29,
    code: 'BRSL-29',
    topic: 'BRSL',
    type: 'pg',
    competency: 'Memahami',
    difficulty: 'Dasar',
    stimulusTitle: 'Drum Pupuk Organik Cair Petani Wanaraya',
    stimulusText:
      'Kelompok Tani Harapan Maju di Kecamatan Wanaraya memproduksi pupuk organik cair (POC) berkualitas dari limbah buah dan dedaunan kebun lokal. Pupuk cair hasil fermentasi alami tersebut disimpan ke dalam drum plastik tertutup berbentuk tabung tegak berwarna biru. Berdasarkan label spesifikasi pabrik, drum plastik tersebut memiliki ukuran jari-jari alas bagian dalam sebesar 35 cm dan tinggi bagian dalam drum tepat 100 cm. Untuk merencanakan pengemasan ulang ke dalam botol-botol kecil berukuran 1 liter sebelum didistribusikan ke petani sekitar, ketua kelompok tani ingin mengetahui kapasitas volume total satu drum apabila terisi penuh. Gunakan nilai pi = 22/7.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Drum Pupuk Cair Tabung Wanaraya',
      subtitle: 'Ukuran Jari-Jari & Tinggi Dalam',
      caption: 'Jari-jari dalam r = 35 cm dan tinggi t = 100 cm.',
      solidKind: 'tabung',
      dimensions: [
        { label: 'Jari-jari (r)', value: '35 cm' },
        { label: 'Tinggi (t)', value: '100 cm' },
        { label: 'Nilai π', value: '22/7' },
      ],
    },
    questionText:
      'Berapakah volume maksimum pupuk organik cair (dalam satuan liter) yang dapat ditampung oleh satu drum tersebut?',
    options: ['110 liter', '220 liter', '385 liter', '770 liter'],
    correctOptionIndex: 2,
    correctAppreciation:
      'Tepat! Kamu mahir menghitung volume tabung dan mengonversi cm³ ke liter dengan benar.',
    explanationShort:
      'Volume = (22/7) × 35 × 35 × 100 = 22 × 5 × 35 × 100 = 385.000 cm³. Karena 1 liter = 1.000 cm³, volumenya adalah 385 liter.',
    wrongCorrectionGuide:
      'Pastikan kamu membagi hasil dalam cm³ dengan 1.000 (bukan 100) untuk mengubahnya ke liter.',
    languageMeaningNote:
      'Kata "kapasitas total apabila terisi penuh" merujuk pada volume ruang dalam tabung (πr²t), bukan luas permukaan luar drum.',
  },
  {
    id: 30,
    code: 'BRSL-30',
    topic: 'BRSL',
    type: 'pg',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Tumpeng Syukuran Panen Desa Wanaraya',
    stimulusText:
      'Dalam acara syukuran panen desa di halaman Kantor Kecamatan Wanaraya, warga bergotong royong membuat nasi tumpeng raksasa berbentuk kerucut tegak yang diletakkan di atas nampan anyaman bambu lebar. Ukuran tumpeng tersebut dirancang memiliki diameter alas 28 cm dan tinggi kerucut tepat 48 cm. Agar nasi tumpeng tetap hangat dan rapi sebelum acara doa dimulai, panitia konsumsi menutup seluruh permukaan sisi miring kerucut tumpeng menggunakan lembaran daun pisang muda yang dibentuk melingkar menutupi selimut kerucut saja tanpa bagian alas bawahnya. Gunakan nilai pi = 22/7 untuk menghitung kebutuhan luas minimal daun pisang penutup selimut kerucut tersebut.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Tumpeng Kerucut Syukuran Wanaraya',
      subtitle: 'Diameter Alas 28 cm & Tinggi 48 cm',
      caption: 'Hanya bagian selimut kerucut yang dibungkus daun pisang (π = 22/7).',
      solidKind: 'kerucut',
      dimensions: [
        { label: 'Diameter (d)', value: '28 cm (r = 14 cm)' },
        { label: 'Tinggi (t)', value: '48 cm' },
      ],
    },
    questionText:
      'Berapakah luas minimal daun pisang yang dibutuhkan untuk menutupi bagian selimut kerucut tumpeng tersebut?',
    options: ['1.760 cm²', '2.112 cm²', '2.200 cm²', '2.816 cm²'],
    correctOptionIndex: 2,
    correctAppreciation:
      'Keren! Kamu menghitung garis pelukis dengan Pythagoras lalu menerapkannya ke rumus luas selimut kerucut dengan tepat.',
    explanationShort:
      'r = 28 / 2 = 14 cm, t = 48 cm. Garis pelukis s = √(14² + 48²) = √(196 + 2.304) = √2.500 = 50 cm. Luas selimut kerucut = π r s = (22/7) × 14 × 50 = 44 × 50 = 2.200 cm².',
    wrongCorrectionGuide:
      'Jangan menggunakan tinggi t = 48 cm langsung ke rumus π r s; kamu wajib mencari garis pelukis s = 50 cm terlebih dahulu menggunakan Pythagoras.',
    languageMeaningNote:
      'Frasa "menutupi selimut kerucut saja tanpa bagian alas bawahnya" secara tegas membatasi perhitungan hanya pada rumus π r s, bukan π r (r + s).',
  },
  {
    id: 31,
    code: 'BRSL-31',
    topic: 'BRSL',
    type: 'pg',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    isListeningFocus: true,
    stimulusTitle: 'Bola Latihan Tim Sepak Bola SMPN 1 Wanaraya',
    stimulusText:
      'Tim sepak bola kebanggaan SMPN 1 Wanaraya rutin berlatih teknik di lapangan kecamatan setiap sore sebagai persiapan menghadapi turnamen antar sekolah se-kabupaten. Pelatih olahraga memeriksa beberapa bola baru yang terbuat dari kulit sintetis tahan air agar nyaman digunakan meskipun rumput lapangan sedikit basah. Berdasarkan standar ukuran latihan kelompok usia SMP, bola tersebut berbentuk bola sempurna dengan panjang diameter tepat 21 cm. Bagian permukaan luar bola terdiri atas panel-panel kulit sintetis yang dijahit rapat membentuk satu kesatuan permukaan bola penuh. Gunakan pi = 22/7 untuk menghitung luas total bahan kulit sintetis pembuat permukaan satu buah bola.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Spesifikasi Bola Latihan SMPN 1 Wanaraya',
      subtitle: 'Diameter Bola 21 cm',
      caption: 'Hitung luas seluruh permukaan kulit luar bola dengan π = 22/7.',
      solidKind: 'bola',
      dimensions: [
        { label: 'Diameter (d)', value: '21 cm' },
        { label: 'Nilai π', value: '22/7' },
      ],
    },
    questionText:
      'Berdasarkan informasi yang kamu dengarkan, berapakah luas permukaan kulit sintetis pada satu buah bola tersebut?',
    options: ['693 cm²', '1.039,5 cm²', '1.386 cm²', '2.772 cm²'],
    correctOptionIndex: 2,
    correctAppreciation:
      'Hebat! Kamu mendengarkan ukuran diameter dengan cermat dan menghitung luas permukaan bola secara akurat.',
    explanationShort:
      'Luas permukaan bola = 4 π r² = π d² = (22/7) × 21 × 21 = 22 × 3 × 21 = 1.386 cm².',
    wrongCorrectionGuide:
      'Jika muncul angka 5.544 cm², berarti kamu memasukkan diameter d = 21 sebagai jari-jari r ke dalam rumus 4πr². Ingat bahwa r = d / 2 = 10,5 cm.',
    languageMeaningNote:
      'Perhatikan istilah "diameter 21 cm" berlawanan dengan "jari-jari 21 cm". Rumus langsung menggunakan diameter adalah π d², sedangkan memakai jari-jari adalah 4 π r².',
  },
  {
    id: 32,
    code: 'BRSL-32',
    topic: 'BRSL',
    type: 'mcma',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Silo Pengering Jagung Gapoktan Wanaraya',
    stimulusText:
      'Gabungan Kelompok Tani (Gapoktan) di Wanaraya memiliki silo penyimpanan biji jagung modern yang terbuat dari pelat baja tahan karat. Bentuk silo merupakan gabungan dua bangun ruang sisi lengkung: bagian badan utama di bawah berbentuk tabung tegak berjari-jari 7 meter dengan tinggi tabung 10 meter, dan tepat di atasnya menyatu atap berbentuk kerucut dengan jari-jari alas yang sama (7 meter) serta tinggi kerucut 24 meter. Bagian dalam tabung dan kerucut menyatu penuh sebagai satu ruang simpan tanpa ada sekat tengah. Gunakan pi = 22/7 untuk mengevaluasi kapasitas ruang simpan dan luas pelat luar silo.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Silo Gabungan Tabung dan Kerucut',
      subtitle: 'Jari-Jari Sama r = 7 m',
      caption: 'Tinggi tabung = 10 m, tinggi kerucut = 24 m, alas kerucut berhimpit dengan tutup tabung.',
      solidKind: 'gabungan_tabung_kerucut',
      dimensions: [
        { label: 'Jari-jari (r)', value: '7 m' },
        { label: 'Tinggi tabung', value: '10 m' },
        { label: 'Tinggi kerucut', value: '24 m' },
      ],
    },
    questionText:
      'Pilihlah SEMUA pernyataan yang BENAR mengenai silo penyimpanan jagung Gapoktan Wanaraya:',
    mcmaStatements: [
      'Panjang garis pelukis atap kerucut silo tersebut adalah 25 meter.',
      'Volume total ruang gabungan di dalam silo adalah 2.772 m³.',
      'Luas selimut bagian dinding tabung saja adalah 220 m².',
      'Luas gabungan selimut dinding tabung dan selimut atap kerucut bagian luar adalah 990 m².',
    ],
    correctMcmaIndices: [0, 1, 3],
    correctAppreciation:
      'Luar biasa! Kamu sangat terampil menganalisis gabungan volume dan luas selimut tabung-kerucut.',
    explanationShort:
      'Garis pelukis kerucut s = √(7² + 24²) = 25 m. V tabung = (22/7)×7²×10 = 1.540 m³; V kerucut = 1/3×(22/7)×7²×24 = 1.232 m³; V total = 2.772 m³. Luas selimut tabung = 2×(22/7)×7×10 = 440 m² (bukan 220); Luas selimut kerucut = (22/7)×7×25 = 550 m². Jumlah keduanya = 440 + 550 = 990 m².',
    wrongCorrectionGuide:
      'Cek rumus keliling alas tabung 2πr = 44 m, sehingga luas selimut tabung = 44 × 10 = 440 m², bukan 220 m².',
    languageMeaningNote:
      'Kata "tanpa sekat tengah" dan "gabungan selimut dinding tabung dan selimut atap kerucut" menegaskan bahwa dua lingkaran alas di tengah tidak ikut dihitung pada luas sisi luar.',
  },
  {
    id: 33,
    code: 'BRSL-33',
    topic: 'BRSL',
    type: 'mcma',
    competency: 'Menalar',
    difficulty: 'Mahir',
    stimulusTitle: 'Pengecatan Kubah Musala SMPN 1 Wanaraya',
    stimulusText:
      'Panitia pembangunan sekolah berencana mengecat ulang seluruh bagian luar kubah musala SMPN 1 Wanaraya agar tampak cerah dan tahan bocor menghadapi musim penghujan. Kubah musala tersebut tersusun dari gabungan leher bawah berbentuk tabung tanpa alas dan tanpa tutup berjari-jari 7 meter dengan tinggi dinding leher 3 meter, serta bagian atasnya berupa kubah setengah bola berjari-jari yang sama (7 meter). Bagian dasar bawah leher tabung terbuka langsung menuju langit-langit atap beton musala sehingga tidak dicat. Gunakan nilai pi = 22/7 untuk menghitung total kebutuhan cat tahan air bagi permukaan luar kubah musala tersebut.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Kubah Gabungan Tabung & Setengah Bola',
      subtitle: 'Jari-Jari 7 m · Tinggi Leher Tabung 3 m',
      caption: 'Bagian luar yang dicat meliputi dinding selimut tabung dan lengkung setengah bola.',
      solidKind: 'gabungan_tabung_setengah_bola',
      dimensions: [
        { label: 'Jari-jari (r)', value: '7 m' },
        { label: 'Tinggi leher (t)', value: '3 m' },
      ],
    },
    questionText:
      'Pilihlah SEMUA pernyataan yang BENAR mengenai pengecatan bagian luar kubah musala tersebut:',
    mcmaStatements: [
      'Luas selimut bagian dinding leher tabung yang dicat adalah 132 m².',
      'Luas permukaan lengkung luar setengah bola kubah adalah 308 m².',
      'Total luas seluruh permukaan luar yang akan dicat adalah 594 m².',
      'Jika 1 kaleng cat dapat melapisi bidang seluas 22 m², dibutuhkan tepat 20 kaleng cat untuk seluruh permukaan luar tersebut.',
    ],
    correctMcmaIndices: [0, 1, 3],
    correctAppreciation:
      'Sempurna! Penalaranmu dalam menghindari jebakan luas alas tersembunyi serta menghitung kebutuhan kaleng cat patut diacungi jempol.',
    explanationShort:
      'Luas selimut tabung = 2 × (22/7) × 7 × 3 = 132 m². Luas lengkung 1/2 bola = 2 × (22/7) × 7² = 308 m². Total luas dicat = 132 + 308 = 440 m² (bukan 594 m²). Banyak kaleng cat = 440 / 22 = 20 kaleng.',
    wrongCorrectionGuide:
      'Angka 594 m² muncul jika seseorang menambahkan luas lingkaran dasar (154 m²) atau memakai rumus luas setengah bola pejal 3πr². Karena bagian dalam berongga dan terbuka ke atap, gunakan 2πr² saja.',
    languageMeaningNote:
      'Frasa "tabung tanpa alas dan tanpa tutup" serta "bagian dasar terbuka" menjelaskan bahwa tidak ada permukaan lingkaran datar yang dicat, melainkan hanya dua selimut lengkung.',
  },
  {
    id: 34,
    code: 'BRSL-34',
    topic: 'BRSL',
    type: 'bs',
    competency: 'Mengaplikasikan',
    difficulty: 'Menengah',
    stimulusTitle: 'Usaha Es Kelapa Muda di Alun-Alun Wanaraya',
    stimulusText:
      'Pak Rahmat berjualan es kelapa muda segar di dekat Alun-Alun Wanaraya setiap siang hari. Untuk menjaga kesegaran minuman, Pak Rahmat menyimpan stok es kelapa di dalam wadah termos pendingin berbentuk tabung berjari-jari dalam 14 cm dan tinggi 30 cm. Saat melayani pembeli, es kelapa dituangkan ke dalam gelas kemasan unik berbentuk kerucut terbalik dengan jari-jari mulut gelas 7 cm dan kedalaman gelas 15 cm. Pada suatu siang yang cerah, termos tabung terisi penuh sampai batas atas. Pak Rahmat ingin menghitung perkiraan banyak gelas kerucut penuh yang bisa dijual dari satu termos (gunakan pi = 22/7).',
    visual: {
      kind: 'wanaraya_infographic',
      title: 'Perbandingan Wadah Es Kelapa Pak Rahmat',
      subtitle: 'Termos Tabung vs Gelas Kerucut',
      caption: 'Data ukuran bagian dalam termos tabung dan satu gelas kerucut (π = 22/7).',
      infographicItems: [
        { label: 'Termos Tabung', value: 'r = 14 cm, t = 30 cm', unit: 'Terisi penuh' },
        { label: 'Gelas Kerucut', value: 'r = 7 cm, t = 15 cm', unit: 'Diisi penuh' },
      ],
    },
    questionText:
      'Tentukan Benar atau Salah untuk setiap pernyataan terkait volume termos dan gelas es kelapa tersebut!',
    bsStatements: [
      'Volume penuh termos es berbentuk tabung tersebut adalah 18.480 cm³.',
      'Volume satu gelas es berbentuk kerucut tersebut adalah 770 cm³.',
      'Dari satu termos penuh, es kelapa muda dapat dituang penuh ke dalam tepat 16 gelas kerucut tanpa sisa.',
    ],
    correctBsAnswers: [true, true, false],
    correctAppreciation:
      'Cermat sekali! Kamu berhasil menghitung volume tabung, volume kerucut, sekaligus membandingkan rasio keduanya.',
    explanationShort:
      'V termos = (22/7) × 14² × 30 = 616 × 30 = 18.480 cm³. V gelas kerucut = 1/3 × (22/7) × 7² × 15 = 154 × 5 = 770 cm³. Banyak gelas = 18.480 / 770 = 24 gelas (bukan 16 gelas).',
    wrongCorrectionGuide:
      'Cek pembagian 18.480 ÷ 770: karena jari-jari tabung 2× lipat (luas alas 4×) dan tinggi 2× lipat (total 8× tabung kecil), ditambah faktor 1/3 pada kerucut, rasionya adalah 8 × 3 = 24 gelas.',
    languageMeaningNote:
      'Kata "tepat 16 gelas kerucut tanpa sisa" menuntut hasil pembagian Volume Termos ÷ Volume Gelas sama persis dengan 16; karena hasilnya 24, pernyataan ketiga Salah.',
  },
  {
    id: 35,
    code: 'BRSL-35',
    topic: 'BRSL',
    type: 'bs',
    competency: 'Menalar',
    difficulty: 'Mahir',
    stimulusTitle: 'Percobaan Hukum Archimedes di Lab IPA SMPN 1 Wanaraya',
    stimulusText:
      'Dalam kegiatan praktikum gabungan Matematika dan IPA di laboratorium SMPN 1 Wanaraya, siswa kelas 9 menyelidiki kenaikan permukaan air akibat benda padat yang ditenggelamkan. Mereka menyiapkan sebuah gelas ukur besar berbentuk tabung dengan jari-jari alas dalam 10 cm yang diisi air jernih setinggi 15 cm. Selanjutnya, ke dalam tabung tersebut dimasukkan secara perlahan 3 buah bola besi pejal yang identik, masing-masing berjari-jari 3 cm. Ketiga bola besi tersebut tenggelam seluruhnya ke dasar tabung dan tidak ada satu tetes air pun yang tumpah keluar. Siswa diminta memprediksi perubahan ketinggian air dalam nilai pi eksak.',
    visual: {
      kind: 'geometry_solid_3d',
      title: 'Tabung Ukur & 3 Bola Besi Praktikum IPA',
      subtitle: 'Kenaikan Permukaan Air',
      caption: 'Tabung (r = 10 cm, tinggi air awal = 15 cm) dimasuki 3 bola besi (r = 3 cm).',
      solidKind: 'tabung',
      dimensions: [
        { label: 'Jari-jari tabung', value: '10 cm' },
        { label: 'Tinggi air awal', value: '15 cm' },
        { label: '3 Bola besi', value: 'masing-masing r = 3 cm' },
      ],
    },
    questionText:
      'Evaluasilah kebenaran (Benar atau Salah) dari setiap kesimpulan praktikum berikut!',
    bsStatements: [
      'Volume gabungan ketiga bola besi yang dimasukkan ke dalam tabung adalah tepat 108π cm³.',
      'Kenaikan tinggi permukaan air di dalam tabung setelah ketiga bola tenggelam adalah 1,08 cm.',
      'Tinggi permukaan air akhir di dalam tabung setelah ketiga bola dimasukkan menjadi 18 cm.',
    ],
    correctBsAnswers: [true, true, false],
    correctAppreciation:
      'Luar biasa! Kamu berhasil menyamakan volume tiga bola dengan volume silinder air yang naik secara eksak.',
    explanationShort:
      'Volume 1 bola = 4/3 × π × 3³ = 36π cm³, sehingga 3 bola = 108π cm³. Kenaikan air Δt = Volume 3 bola / (π × r_tabung²) = 108π / (100π) = 1,08 cm. Jadi tinggi akhir air adalah 15 + 1,08 = 16,08 cm (bukan 18 cm).',
    wrongCorrectionGuide:
      'Ingat bahwa perubahan tinggi air bukan ditambah jari-jari bola (3 cm), melainkan setara dengan volume bola dibagi luas alas tabung (π × 10² = 100π cm²).',
    languageMeaningNote:
      'Bedakan kata "kenaikan tinggi permukaan air" (Δt = 1,08 cm) dengan "tinggi permukaan air akhir" (tinggi awal + kenaikan = 16,08 cm).',
  },
];
