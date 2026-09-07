import type { ProjectTranslation } from "../localize";

export const otherTranslations: Record<string, ProjectTranslation> = {
  "food-delivery-eta-prediction": {
    title: "Prediksi ETA Pengantaran Makanan",
    description:
      "Memprediksi durasi pengantaran makanan untuk platform on-demand sampai MAE 3,21 menit dan R2 0,816, lalu menunjukkan lewat SHAP bahwa jarak bukan penyebab utama keterlambatan.",
    longDescription:
      "Sistem prediksi ETA untuk platform pengantaran bergaya ShopeeFood atau GoFood: pembersihan data operasional mentah, feature engineering geospasial dan temporal, tiga model tree-based yang dibandingkan, interpretasi SHAP, dan aplikasi Streamlit yang benar-benar bisa dipakai tim operasional untuk mensimulasikan ETA sepanjang hari.",
    caseStudy: {
      context:
        "Portofolio Data Science Logistik · ETA pengantaran makanan on-demand · Proyek individu ujung ke ujung, dari data operasional mentah sampai estimator yang siap dipakai.",
      problemHeading: "Latar Belakang Bisnis",
      problem: [
        "ETA yang meleset adalah salah satu sumber keluhan pelanggan terbesar di aplikasi pengantaran makanan, dan ia menyakitkan di kedua arah. Menjanjikan waktu terlalu singkat membuat pelanggan menunggu lebih lama dari yang dijanjikan: rating turun, komplain naik, beban CS bertambah, dan kompensasi voucher membengkak. Menjanjikan terlalu lama membuat pelanggan membatalkan sebelum memesan: konversi turun, utilisasi driver merosot, dan GMV per driver-hour ikut turun.",
        "Penyebabnya adalah ETA biasanya diestimasi dari jarak saja, karena itulah satu-satunya masukan yang dimiliki semua orang. Padahal jarak adalah proksi yang buruk untuk durasi begitu lalu lintas, cuaca, waktu persiapan dapur, dan perilaku driver ikut masuk ke dalam gambar.",
        "Tiga pertanyaan membingkai pekerjaan ini: berapa lama sebenarnya sebuah pesanan akan sampai mengingat jarak, cuaca, lalu lintas, dan jam pemesanan; faktor mana yang benar-benar mendorong keterlambatan; dan bagaimana menyajikan estimasi itu ke tim operasional secara interaktif alih-alih di dalam notebook.",
        "Solusinya adalah regresor LightGBM di atas 19 fitur rekayasa, diinterpretasikan dengan SHAP sehingga pendorongnya terlihat alih-alih diasumsikan, dan dikirim sebagai aplikasi Streamlit yang menampilkan rentang ETA alih-alih satu angka tunggal.",
      ],
      highlightLabels: ["MAE", "R2", "Tepat dalam 5 Menit", "Pesanan Dianalisis"],
      sections: {
        dataset: {
          heading: "Pemahaman Data",
          navLabel: "Data",
          body:
            "45.593 pengantaran historis dengan 20 kolom yang mencakup koordinat restoran dan pelanggan, profil driver, cuaca, kepadatan lalu lintas, jenis pesanan, dan durasi pengantaran aktual, ditambah 11.399 pesanan tanpa label untuk diprediksi. Dataset ini kotor dengan cara yang khas data operasional nyata, dan setiap masalahnya ditangani eksplisit alih-alih dibuang.",
          bullets: [
            "Spasi di ujung pada setiap kolom teks (nilai seperti \"0x4607 \" dan \"High \"), dibersihkan pada seluruh kolom object.",
            "Prefiks teks yang menempel pada nilai (\"conditions Sunny\"), dihapus berdasarkan prefiksnya.",
            "Targetnya sendiri membawa prefiks (\"(min) 24\"), sehingga angkanya diekstrak dan dikonversi ke float.",
            "Nilai kosong tersimpan sebagai string harfiah \"NaN \" alih-alih sebagai null, memengaruhi lebih dari 7.000 sel, dikonversi menjadi null sungguhan.",
            "Koordinat rusak: latitude −30,9 (kesalahan tanda, diperbaiki dengan abs) dan nilai di sekitar 0,01 (tidak valid, ditandai pada 3.640 baris).",
            "Rating dan usia di luar rentang wajar (rating 6,0, usia 15) dibatasi ke rentang valid lalu diimputasi.",
          ],
          captions: [
            "Ikhtisar EDA pada dataset pengantaran. Sebaran target, rincian kondisi, dan hubungan yang nanti muncul pada peringkat SHAP semuanya sudah terlihat di sini sebelum satu model pun dilatih.",
          ],
        },
        eda: {
          heading: "Eksplorasi Data",
          navLabel: "EDA",
          body:
            "Eksplorasi menyiapkan pertanyaan yang nanti dijawab analisis SHAP: apakah durasi pengantaran terutama fungsi dari seberapa jauh pesanan harus menempuh, atau dari kondisi yang dilaluinya.",
          bullets: [
            "Median waktu pengantaran adalah 26 menit, sehingga rata-rata galat sekitar 3 menit setara galat relatif sekitar 12%, cukup akurat untuk ditampilkan langsung ke pelanggan.",
            "Sebaran galatnya terpusat tetapi punya ekor yang terlihat: sebagian kecil pesanan membawa galat besar, dan kelompok itu menumpuk di jam sibuk serta cuaca ekstrem.",
            "Kepadatan lalu lintas memisahkan durasi jauh lebih tajam daripada band jarak, dan inilah tanda pertama bahwa jawaban intuitif (persempit radius layanan) akan menjadi lever yang salah.",
            "Jam pemesanan memperlihatkan puncak ganda yang diharapkan pada makan siang (11 sampai 14) dan makan malam (18 sampai 22), ketika antrean dapur dan kepadatan jalan datang bersamaan.",
          ],
        },
        preprocessing: {
          heading: "Praproses & Feature Engineering",
          body:
            "Sembilan belas fitur pada empat kelompok. Encoder di-fit setelah pembagian data latih dan uji sehingga nilai imputasi tidak pernah bocor mundur dari test set.",
          bullets: [
            "Geospasial: jarak great-circle Haversine antara restoran dan pelanggan, dihitung secara vectorized pada R = 6.371,0088 km, ditambah is_long_haul di atas 15 km. Haversine adalah garis lurus sementara jarak jalan riil biasanya 1,3 sampai 1,5 kali lebih panjang, tetapi model pohon mempelajari faktor detour itu sendiri dari data sehingga tidak perlu routing API berbayar.",
            "Temporal: order_hour, is_peak_hour (makan siang 11 sampai 14 atau makan malam 18 sampai 22), is_weekend, day_of_week, order_month_day sebagai proksi siklus gajian dan promo, serta prep_pickup_minutes sebagai proksi langsung beban dapur.",
            "Jam pemesanan yang hilang direkonstruksi dari waktu pickup dikurangi median pickup delay alih-alih dibuang, karena baris tersebut tetap membawa informasi valid di setiap kolom lain.",
            "Kondisi operasional di-encode dengan skala ordinal manual alih-alih LabelEncoder, sehingga urutannya membawa makna bisnis dan identik antara pelatihan dan aplikasi: lalu lintas Low(0) sampai Jam(3), cuaca Sunny(0) sampai Stormy(5), plus Festival, City, jenis pesanan, dan jenis kendaraan.",
            "Hub kota diekstrak dari prefiks ID driver: INDORES13DEL02 memberi INDO untuk Indore. Sinyal lokal gratis yang biasanya terbuang karena kolom ID dibuang secara default.",
          ],
        },
        modeling: {
          heading: "Pemodelan",
          navLabel: "Modeling",
          body:
            "Tiga model tree-based dilatih pada 19 fitur yang sama dengan split 80/20, dibandingkan pada empat metrik termasuk satu yang ditulis untuk tim operasional alih-alih untuk data scientist.",
          bullets: [
            "LightGBM: MAE 3,21 menit, RMSE 4,02, R2 0,816, dan 80,0% pesanan tepat dalam toleransi 5 menit.",
            "XGBoost: MAE 3,26, RMSE 4,09, R2 0,809, 78,9% tepat dalam 5 menit.",
            "Random Forest: MAE 3,42, RMSE 4,31, R2 0,788, 77,1% tepat dalam 5 menit.",
            "RMSE yang berada di atas MAE menandakan sejumlah kecil pesanan masih membawa galat besar. Penelusuran menemukan kelompok itu terkonsentrasi di jam sibuk dan cuaca ekstrem, yang menjadikannya target pertama iterasi model berikutnya alih-alih residual tanpa penjelasan.",
            "Metrik akurasi dalam 5 menit ada karena itulah satu angka yang bisa ditindaklanjuti seorang operations lead: empat dari lima pesanan mendarat di dalam toleransi yang benar-benar dirasakan pelanggan.",
          ],
          captions: [
            "Aktual terhadap prediksi durasi, dengan sebaran galat di sebelahnya. Galatnya terpusat mendekati nol dengan ekor yang ringan, dan galat negatif berarti ETA terlalu optimis, yaitu arah yang paling mahal bagi kepercayaan pelanggan.",
            "Kepentingan fitur LightGBM. Berguna sebagai lintasan pertama, tetapi jumlah split memihak fitur berkardinalitas tinggi, dan itulah alasan kesimpulan operasional di bawah ditarik dari SHAP.",
          ],
        },
        evaluation: {
          heading: "Interpretasi & Temuan Utama",
          navLabel: "Evaluasi",
          body:
            "SHAP dihitung pada test set dan dinyatakan dalam satuan menit, sehingga setiap pendorong keterlambatan bisa dibaca langsung sebagai waktu alih-alih sebagai skor kepentingan abstrak.",
          bullets: [
            "Kepadatan lalu lintas: dampak rata-rata 2,49 menit, faktor tunggal terbesar, dengan kondisi Jam menambah paling banyak.",
            "Usia driver: 2,45 menit, berfungsi sebagai proksi pengalaman dan gaya berkendara, bukan sebagai demografi.",
            "Rating driver: 2,21 menit, dengan rating lebih tinggi konsisten berasosiasi dengan pengantaran lebih cepat.",
            "Kondisi kendaraan: 1,88 menit, artinya kendaraan buruk adalah penalti waktu nyata dan perawatan armada adalah lever ETA.",
            "Jarak: 1,85 menit, penting tetapi hanya nomor lima. Kondisi jalan mengalahkan jarak.",
            "Cuaca 1,69 menit, dan multiple deliveries 0,81 menit, jadi batching memang menambah waktu tetapi tetap layak secara ekonomi.",
            "Temuan yang mengubah keputusan operasional: jarak bukan pendorong utama keterlambatan. Kepadatan lalu lintas dan kualitas driver (usia, rating, kondisi kendaraan) secara kolektif jauh lebih menentukan, yang berarti menyempitkan radius layanan bukan perbaikan paling efektif. Memperbaiki alokasi driver di jam macet dan menjaga kualitas armada memberi hasil lebih besar.",
          ],
          captions: [
            "Kepentingan SHAP dalam satuan menit. Menyatakan dampak dalam satuan target itulah yang memungkinkan seorang operations lead membandingkan perbaikan lalu lintas dengan program perawatan armada pada skala yang sama.",
            "SHAP beeswarm. Tiap titik adalah satu pesanan yang diwarnai menurut nilai fiturnya, memperlihatkan arah tiap efek dan seberapa konsisten ia di seluruh armada.",
          ],
        },
        impact: {
          heading: "Rekomendasi Penerapan",
          navLabel: "Dampak",
          body:
            "Model hanya separuh deliverable. Bagaimana angkanya disajikan ke pelanggan adalah separuh lainnya, dan itu mengubah hasil bisnis lebih besar daripada satu desimal MAE.",
          bullets: [
            "Tampilkan ke pelanggan ETA ditambah MAE sebagai batas atas, bukan prediksi titik. Sedikit pesimis lebih baik daripada janji yang meleset, dan ini praktik standar di industri pengantaran.",
            "Aplikasi Streamlit menerima jarak, cuaca, lalu lintas, dan jam pemesanan (plus profil driver dan batching sebagai opsional) lalu mengembalikan ETA dengan rentang realistis yang diturunkan dari MAE model.",
            "Badge faktor risiko menandai jam sibuk, kemacetan, cuaca buruk, long haul, dan batching berat, sehingga operator melihat mengapa sebuah estimasi tinggi alih-alih sekadar bahwa ia tinggi.",
            "Simulasi ETA sepanjang hari menunjukkan jam tercepat dan terlambat untuk pesanan yang sama, dan tampilan sensitivitas jarak menunjukkan berapa menit tambahan per kilometer.",
            "Fitur apa pun yang dibiarkan kosong pengguna otomatis memakai median data latih, sehingga model selalu menerima vektor fitur lengkap dan aplikasinya tidak pernah error pada masukan parsial.",
          ],
        },
        limitations: {
          heading: "Batasan & Peta Jalan",
          bullets: [
            "Haversine adalah jarak garis lurus. Menggantinya dengan jarak jalan riil dari OSRM atau distance matrix API adalah satu perbaikan berikutnya yang paling menjanjikan.",
            "Model memprediksi satu titik. Regresi kuantil dengan LightGBM akan memungkinkan aplikasi menyajikan rentang P50 sampai P90 yang diturunkan alih-alih diaproksimasi dari MAE.",
            "Belum ada fitur real-time: jumlah order aktif per restoran dan kepadatan driver per zona keduanya paling membantu justru pada kasus jam sibuk, tempat model saat ini paling lemah.",
            "Validasi memakai split acak. Split berbasis waktu akan meniru kondisi produksi lebih ketat.",
            "Setelah deployment, MAE perlu dipantau per kota dan per jam agar drift muncul di tempat kejadiannya alih-alih hanya di rata-rata global.",
          ],
        },
      },
    },
  },

  "insurance-claim-trend-prediction": {
    title: "Prediksi Tren Klaim Asuransi",
    description:
      "Membangun ensemble multiplikatif dua tahap dari enam algoritma dengan optimasi bobot SLSQP untuk memprediksi frekuensi, severity, dan total nilai klaim asuransi kesehatan, mencapai MAPE gabungan 4,40%.",
    longDescription:
      "Proyek kompetisi yang memprediksi klaim asuransi kesehatan individu pada tiga dimensi sekaligus. Arsitekturnya sengaja dua tahap dan multiplikatif (total = frekuensi dikali severity) karena data count dan data mata uang yang menceng kanan diatur faktor yang berbeda dan gagal dengan cara yang berbeda. Enam algoritma digabung per tahap dengan bobot yang dioptimasi SLSQP, divalidasi dengan walk-forward cross validation pada riwayat yang hanya 19 bulan.",
    caseStudy: {
      context:
        "Kompetisi Data Science · Mathematical Challenge Festival (MCF) ITB 2026 · Tim \"Fantastic Three\" · Ketua Tim.",
      problemHeading: "Latar Belakang Bisnis",
      problem: [
        "Klaim asuransi kesehatan individu di Indonesia naik 25,5% pada Januari sampai Juni 2025 dibanding periode yang sama tahun 2024. Lonjakan itu mendorong perusahaan asuransi menaikkan premi, yang pada gilirannya membuat perlindungan kesehatan makin tidak terjangkau publik, dan itu meruntuhkan tujuan asuransi itu sendiri sebagai pelindung dari guncangan finansial tak terduga.",
        "Penyebabnya adalah sebagian besar perusahaan asuransi baru mengetahui lonjakan klaim setelah lonjakan itu masuk ke pembukuan. Keputusan pencadangan dan penetapan harga diambil berdasarkan realisasi tahun lalu, sehingga saat trennya terlihat, pilihan yang tersisa semuanya mahal.",
        "Riset terdahulu sudah menerapkan machine learning pada risiko asuransi, tetapi hampir selalu pada satu dimensi saja. Model yang memprediksi frekuensi klaim, severity klaim, dan total nominal klaim asuransi kesehatan individu secara bersamaan masih sangat terbatas, padahal perusahaan asuransi membutuhkan ketiganya: frekuensi menggerakkan perencanaan kapasitas, severity menggerakkan desain manfaat, dan hasil kalinya menggerakkan pencadangan.",
        "Solusinya adalah prediksi yang cukup akurat pada ketiga dimensi sehingga perusahaan asuransi bisa bertindak lebih awal lewat seleksi risiko, pencegahan, dan perencanaan cadangan, menyerap kenaikan klaim sambil menjaga premi tetap terjangkau. Akurasi saja bukan deliverable-nya; keluarannya adalah serangkaian aksi bertanggal dan berpemicu yang bisa langsung dimasukkan perusahaan ke dalam kalender.",
      ],
      highlightLabels: [
        "MAPE Gabungan Terbaik",
        "Model Digabung",
        "Fitur Rekayasa",
        "Catatan Klaim Dianalisis",
      ],
      sections: {
        dataset: {
          heading: "Pemahaman Data",
          navLabel: "Dataset",
          body:
            "Dua sumber internal sepanjang 1 Januari 2024 sampai 31 Juli 2025: Data_Klaim.csv berisi 5.781 transaksi klaim kesehatan individu dan Data_Polis.csv berisi 4.096 polis aktif. Hanya klaim berstatus Paid yang dipakai, karena nominal klaim Pending belum final. Kode plan menyandikan cakupan pertanggungan: M-001 seluruh dunia, M-002 regional Asia, M-003 domestik Indonesia. Data eksternal berupa inflasi, sebaran rumah sakit, dan curah hujan dikumpulkan berdampingan sebagai kandidat regressor.",
          bullets: [
            "Setelah klaim digabungkan dengan data polis, 4.627 baris klaim pada 19 periode bulanan membentuk tabel pemodelan. Sembilan belas baris adalah data latih yang sangat kecil, dan kendala itulah yang menggerakkan hampir setiap keputusan pemodelan berikutnya.",
            "Nominal klaim yang disetujui menceng tajam ke kanan: median Rp14,5 juta berbanding rata-rata Rp55,0 juta, dengan nilai maksimum Rp2,2 miliar dan kemencengan mendekati 5,2. Klaim katastropik jarang terjadi tetapi sangat besar.",
            "Frekuensi klaim bulanan berkisar 208 sampai 302, sehingga frekuensi bersifat count-like dan terbatas sementara severity tidak terbatas dan menceng. Perbedaan itulah alasan keduanya dimodelkan terpisah.",
            "Nilai kosong pada Inpatient/Outpatient, tanggal pembayaran, lokasi rumah sakit, dan kode ICD diimputasi dengan modus atau kategori Unknown yang eksplisit. Tidak ditemukan baris duplikat.",
          ],
          captions: [
            "Ringkasan dataset setelah klaim digabung dengan polis: 4.627 baris klaim berbanding 4.096 pemegang polis unik sepanjang 19 bulan, Rp0,25 triliun disetujui, rata-rata Rp55,0 juta berbanding median Rp14,5 juta. Jarak antara rata-rata dan median adalah seluruh persoalan pemodelannya dalam satu baris.",
            "Audit nilai kosong per kolom, dijalankan sebelum imputasi apa pun sehingga perlakuan tiap kolom menjadi keputusan yang tercatat alih-alih perilaku bawaan yang senyap.",
          ],
        },
        eda: {
          heading: "Eksplorasi Data",
          navLabel: "EDA",
          body:
            "Eksplorasi harus menjawab dua pertanyaan sebelum satu model pun dilatih: seperti apa bentuk sebaran severity, dan apakah 19 bulan cukup memuat struktur musiman untuk layak dimodelkan.",
          bullets: [
            "Pencilan mencakup 11% klaim menurut aturan IQR. Semuanya ditangani dengan clipping pada persentil 98 alih-alih dihapus, karena klaim katastropik adalah sinyal nyata bagi model pencadangan sekalipun ia mendistorsi rata-rata.",
            "Length of Stay punya korelasi terkuat dengan nominal klaim pada 0,43, disusul klaim luar negeri pada 0,26 dan klaim inpatient pada 0,24.",
            "Analisis ICD menghasilkan temuan klinis paling berguna: diagnosis paling sering dan diagnosis paling mahal nyaris tidak beririsan. Kanker payudara (C50) memimpin dari sisi volume dengan 245 klaim, sementara penyakit vaskular perifer (I73.9) memimpin dari sisi severity pada rata-rata Rp648 juta. Program penekanan biaya yang hanya menyasar diagnosis umum akan melewatkan tempat uangnya sebenarnya pergi.",
            "Frekuensi dan severity bergerak berbeda sepanjang waktu, dan itu bukti langsung untuk pemisahan dua tahap alih-alih satu model total klaim.",
            "Dengan hanya 19 bulan, riwayatnya tidak cukup untuk komponen musiman tahunan yang kuat, sehingga musiman harus disandikan sebagai fitur alih-alih dipelajari model musiman.",
          ],
          captions: [
            "Sebaran nominal klaim. Ekor kanan yang panjang inilah yang memaksa transformasi log pada severity, dan yang menjadikan MAPE, bukan RMSE, sebagai metrik kompetisi yang tepat.",
            "Frekuensi, severity, dan total klaim bulanan. Ketiga deret itu tidak bergerak bersama, dan itulah argumen empiris untuk memprediksi frekuensi dan severity terpisah lalu mengalikannya kemudian.",
            "Heatmap musiman pada bulan-bulan yang terobservasi. Sembilan belas bulan berada di bawah dua siklus penuh, sehingga ini diperlakukan sebagai petunjuk untuk desain fitur alih-alih sebagai pola musiman yang bisa diandalkan model.",
            "Diagnosis paling sering berdampingan dengan yang paling mahal. Kedua daftar itu nyaris tidak beririsan, yang berarti intervensi berbasis volume dan berbasis biaya harus menyasar populasi pasien yang berbeda.",
            "Severity dipecah menurut kategori klaim, dan inilah yang mengubah prediksi severity menjadi percakapan desain manfaat yang bisa ditindaklanjuti alih-alih satu angka bulanan.",
            "Matriks korelasi antar fitur klaim, dipakai untuk menangkap variabel rekayasa yang redundan sebelum masuk ke model yang hanya dilatih pada 19 baris.",
          ],
        },
        preprocessing: {
          heading: "Praproses & Feature Engineering",
          navLabel: "Fitur",
          body:
            "Dua puluh delapan fitur pada lima kelompok, dibangun dari agregasi bulanan. Dengan 19 baris latih, setiap fitur tambahan adalah risiko overfitting yang nyata, sehingga tiap kelompok harus membuktikan dirinya sendiri.",
          bullets: [
            "Waktu: Month, Quarter, Time_Index, ditambah Month_Sin dan Month_Cos yang siklikal agar Desember dan Januari duduk bersebelahan alih-alih di ujung skala yang berlawanan.",
            "Penanda musiman: Is_Q1, Is_Q4, dan Is_Holiday_Month yang mencakup Tahun Baru, Idulfitri, dan Natal.",
            "Karakteristik klaim: Pct_Inpatient, Pct_Reimburse, Pct_Singapore, dan Avg_LOS, yang semuanya menggeser komposisi severity dari bulan ke bulan.",
            "Demografi dan plan: Avg_Age, Pct_Male, serta pembagian plan Pct_M001 / M002 / M003 yang menyandikan cakupan pertanggungan.",
            "Lag dan statistik bergulir: Frequency dan Severity pada lag 1, 2, dan 3, ditambah rolling mean serta rolling standard deviation pada jendela 2 dan 3 bulan. Inilah yang membawa momentum autoregresif yang tidak bisa dinyatakan dataset 19 baris dengan cara lain.",
            "Eksposur: Active_Policies per bulan dan claim rate turunannya. Layak dicatat secara jujur bahwa polis aktif datar di 4.096 sepanjang seluruh jendela, sehingga fitur eksposurnya nyaris tidak membawa varians dan kontribusinya kecil.",
            "Severity dimodelkan pada log1p, yang memampatkan kemencengan, menstabilkan varians, dan membuat galatnya berperilaku seperti galat persentase, sehingga loss-nya sejalan dengan MAPE yang dinilai kompetisi. Prediksinya dibalik dengan expm1.",
          ],
          captions: [
            "Fitur bulanan hasil rekayasa yang masuk ke model. Porsi inpatient turun dari 0,70 ke 0,48 sepanjang jendela sementara rata-rata usia pasien bergeser ke 60, dan polis aktif tetap datar di 4.096, yang menjelaskan mengapa eksposur akhirnya menyumbang begitu sedikit.",
            "Polis aktif terhadap claim rate turunannya. Dengan jumlah polis praktis konstan, claim rate menjadi salinan frekuensi yang diskalakan ulang alih-alih sinyal independen.",
          ],
        },
        approach: {
          heading: "Arsitektur Pemodelan",
          navLabel: "Pendekatan",
          body:
            "Keputusan arsitektur intinya: Total Klaim = Frekuensi Klaim dikali Severity Klaim, dengan tiap tahap diprediksi ensemble berbobotnya sendiri. Frekuensi mengikuti distribusi count antara 208 dan 302 per bulan; severity bersifat kontinu dan menceng kanan dengan rata-rata Rp55 juta berbanding simpangan baku Rp132 juta. Distribusi berbeda, pendorong berbeda, dan model terpisah yang jauh lebih mudah didiagnosis ketika salah satunya bermasalah.",
          bullets: [
            "Enam algoritma kandidat per tahap: Prophet, LightGBM, XGBoost, Ridge Regression, ElasticNet, dan Holt-Winters ETS. Masing-masing menyumbang sesuatu yang berbeda: Prophet menangani perubahan tren dan tahan terhadap pencilan, LightGBM menangkap interaksi fitur non-linear dan mengoptimasi MAPE secara langsung, Ridge dan ElasticNet menjadi baseline linear teregulasi yang menolak berhalusinasi pada 19 baris, dan ETS menangkap momentum murni dari riwayat targetnya sendiri tanpa membutuhkan fitur sama sekali.",
            "LightGBM sengaja dikecilkan mengikuti ukuran datanya: num_leaves 3, learning_rate 0,01, n_estimators 150, lambda_l1 0,5. Pada 19 baris bulanan, model pohon berukuran normal hanya akan menghafal data latihnya.",
            "Bobot ensemble dioptimasi dengan SLSQP (Sequential Least-Squares Programming) secara terpisah untuk frekuensi, severity, dan total, alih-alih ditetapkan manual. Tidak ada satu model pun yang diizinkan mendominasi lebih dari 60% prediksi mana pun.",
            "Total klaim dihitung sebagai perpaduan: alpha dikali (frekuensi dikali severity) ditambah (1 dikurangi alpha) dikali prediksi total langsung, dengan alpha ikut dioptimasi.",
            "Pengali severity sebesar 0,960 diterapkan untuk mengoreksi bias ke atas yang konsisten, dan itu memperbaiki MAPE gabungan menjadi 4,40%.",
            "Validasinya walk-forward: latih pada bulan 1 sampai 12 lalu uji pada 13, kemudian 1 sampai 13 uji 14, dan seterusnya melalui tujuh pembagian berjendela mengembang. Split acak akan membocorkan bulan masa depan ke pelatihan dan membuat skornya tanpa makna.",
          ],
          captions: [
            "Bobot yang benar-benar dipilih SLSQP. Frekuensi berakhir pada ETS 58,2% dan LightGBM 41,8%; severity pada ElasticNet 42,5%, LightGBM 37,3%, dan XGBoost 20,2%. Hanya 2 dari 6 dan 3 dari 6 kandidat memperoleh bobot bukan nol, jadi optimisernya benar-benar menyeleksi alih-alih merata-ratakan semuanya.",
          ],
        },
        results: {
          heading: "Hasil & Validasi",
          navLabel: "Hasil",
          body:
            "Tiap model diberi skor per dimensi, dan tidak ada satu algoritma pun yang menang di semua tempat, dan justru kondisi itulah yang membenarkan pemakaian ensemble alih-alih sekadar memilih yang terbaik.",
          bullets: [
            "Frekuensi: LightGBM terbaik pada MAPE 6,32%, di depan ETS pada 7,04% dan XGBoost pada 8,45%.",
            "Severity: ElasticNet terbaik pada MAPE 5,40%, di depan LightGBM pada 5,66% dan Ridge pada 6,02%.",
            "Total nominal klaim: XGBoost terbaik pada MAPE 7,32%, di depan ETS pada 9,61% dan LightGBM pada 9,70%.",
            "Ensemble berbobot SLSQP menghasilkan MAPE gabungan terbaik 4,40%, di bawah setiap model individual pada setiap dimensi.",
            "Walk-forward cross validation memberi CV MAPE 10,13% pada frekuensi dan 0,77% pada log severity, dan jarak antara keduanya adalah pengingat bahwa angka skala log itu bagus secara konstruksi, bukan bukti bahwa severity mudah diprediksi.",
            "Feature engineering menolong model pohon (LightGBM membaik dari 7,87% ke 6,33%) tetapi merugikan model linear dan Prophet, mengonfirmasi bahwa manfaatnya spesifik per model alih-alih berlaku universal.",
            "Satu artefak jujur yang layak dilaporkan: pada hyperparameter final, LightGBM untuk severity sama sekali tidak menghasilkan split dan merosot menjadi prediktor konstan. Pada 19 baris dengan num_leaves 3 dan lambda_l1 0,5, regularisernya yang menang. Ensemble menyerapnya karena ElasticNet dan XGBoost memikul tahap itu, tetapi inilah persis jenis kegagalan senyap yang akan dikirim tanpa disadari oleh submission satu model.",
          ],
          captions: [
            "Kepentingan fitur untuk kedua tahap. Total_Claim_Lag2 dan Frequency_RollStd3 mendominasi frekuensi, sementara panel severity kosong karena model itu tidak menghasilkan split sama sekali, dan itu adalah temuan, bukan galat rendering.",
          ],
        },
        projection: {
          heading: "Keluaran Prediksi",
          body:
            "Pipeline menghasilkan frekuensi, severity, dan total per bulan prediksi, dan itulah yang memungkinkan perusahaan asuransi merencanakan kapasitas dan cadangan secara terpisah alih-alih hanya melihat satu total mata uang.",
          bullets: [
            "Frekuensi mengendap di sekitar 238 klaim per bulan, naik perlahan dengan puncak Q3 sampai Q4 mendekati 238 hingga 239.",
            "Severity rata-rata relatif stabil pada rentang Rp45 sampai 47 juta per klaim, dan keluaran pipeline berpusat pada Rp45,5 juta.",
            "Total nominal klaim mendarat pada rentang Rp10,8 sampai 11,2 miliar per bulan, mengikuti frekuensi alih-alih severity.",
            "Poin terakhir itulah wawasan perencanaannya: severity relatif stabil, sehingga totalnya digerakkan oleh berapa banyak klaim yang datang, dan itu menjadikan frekuensi angka yang perlu dipantau dari bulan ke bulan.",
          ],
          captions: [
            "Prediksi terhadap riwayat, dengan garis vertikal memisahkan yang terobservasi dari yang diprediksi. Severity mendatar pada periode prediksi sementara frekuensi memikul variasinya, dan itulah yang membuat totalnya mengikuti frekuensi.",
          ],
        },
        recommendations: {
          heading: "Rekomendasi Strategis",
          navLabel: "Dampak",
          bullets: [
            "Perkuat cadangan teknis pada H2 2026, menahan minimal 60% cadangan tahunan menjelang puncak Q3 sampai Q4.",
            "Kendalikan severity lewat batas manfaat yang lebih ketat atau co-insurance pada klaim inpatient luar negeri serta jaringan provider yang lebih kuat di luar negeri, karena klaim luar negeri membawa korelasi terkuat kedua dengan nominal klaim.",
            "Sasar diagnosis mahal terpisah dari diagnosis yang sering, karena analisis ICD memperlihatkan kedua daftar itu nyaris tidak beririsan dan satu program biaya tidak bisa mencakup keduanya.",
            "Jalankan program preventif dan wellness dengan target penurunan claim rate minimal 5%.",
            "Picu repricing premi proaktif bila realisasi klaim melampaui proyeksi lebih dari 10% selama dua bulan berturut-turut.",
            "Pasang dasbor peringatan dini yang memberi alarm ketika realisasi bulanan melampaui proyeksi lebih dari 15%.",
          ],
        },
        limitations: {
          heading: "Batasan",
          bullets: [
            "Sembilan belas observasi bulanan adalah data latih yang sangat kecil. Setiap model di sini diregulasi secara agresif karena alasan itu, dan LightGBM severity yang runtuh menjadi konstanta adalah harga yang terlihat dari keputusan tersebut.",
            "Prophet membutuhkan sekitar dua tahun untuk komponen musiman yang kuat, sehingga kontribusi musimannya di sini lemah secara konstruksi, bukan karena penyetelan.",
            "Fitur masa depan untuk kolom yang tidak diketahui dibawa maju dari bulan terakhir yang terobservasi, yang masuk akal untuk satu kuartal ke depan dan makin sulit dipertahankan untuk horizon yang lebih jauh.",
            "Polis aktif praktis konstan sepanjang jendela, sehingga model tidak bisa mempelajari efek eksposur dan pertumbuhan portofolio sungguhan perlu dimasukkan sebagai asumsi eksplisit.",
            "MAPE bersifat asimetris dan tidak stabil ketika nilai aktualnya mendekati nol. Ia adalah metrik kompetisi sehingga itulah yang dioptimasi model, tetapi ia tidak boleh menjadi satu-satunya metrik yang dipantau perusahaan asuransi di produksi.",
          ],
        },
      },
    },
  },

  "hybrid-job-recommendation": {
    title: "Sistem Rekomendasi Lowongan Hybrid",
    category: "Riset",
    description:
      "Menggabungkan TF-IDF leksikal dengan SBERT semantik pada 28.858 lowongan pekerjaan Indonesia, lalu merangking ulang kandidat dengan LambdaMART sampai NDCG@10 86,29%, unggul 13,3 poin dibanding kemiripan hybrid saja.",
    longDescription:
      "Sistem rekomendasi lowongan pekerjaan berbasis konten untuk pasar Indonesia. Teks direpresentasikan dengan menggabungkan TF-IDF per-field berbobot dan embedding SBERT multibahasa, kandidat diambil lewat jarak Euclidean pada vektor hybrid itu, dan urutan akhirnya dipelajari LambdaMART yang mengoptimasi NDCG terhadap label relevansi holistik berjenjang. Judul penelitian lengkapnya adalah \"Hybrid Job Recommendation System Using TF-IDF and SBERT with Learning-to-Rank for Personalized Job Matching in Indonesia\".",
    caseStudy: {
      context:
        "Penelitian sarjana · Sistem rekomendasi berbasis konten dan learning-to-rank · Proyek individu, sepenuhnya reproducible pada SEED 42.",
      problemHeading: "Latar Belakang Bisnis",
      problem: [
        "Platform lowongan kerja di Indonesia mencocokkan kandidat dengan lowongan sebagian besar lewat kata kunci. Ketik \"data analyst\" dan yang muncul adalah lowongan yang memuat persis string itu, yang berarti lowongan \"business intelligence\" yang relevan menjadi tak terlihat sementara lowongan tidak relevan yang kebetulan menyebut frasa tersebut justru berperingkat pertama.",
        "Penyebabnya adalah pencocokan kata kunci hanya bekerja pada bentuk permukaan. Ia tidak punya gagasan bahwa business intelligence dan data analytics adalah bidang bertetangga, dan tidak punya gagasan bahwa kecocokan pada judul pekerjaan seharusnya bernilai lebih besar daripada kecocokan yang terkubur di deskripsi panjang.",
        "Model yang murni semantik memperbaiki masalah pertama dan menciptakan masalah kedua. Embedding menangkap makna tetapi kehilangan token teknis yang persis, sehingga lowongan yang menuntut stack tertentu bisa tenggelam di bawah lowongan yang mirip secara umum.",
        "Solusinya adalah sistem dua tahap. Tahap satu merepresentasikan tiap lowongan sebagai gabungan TF-IDF leksikal berbobot dan SBERT semantik multibahasa lalu mengambil 200 kandidat. Tahap dua mempelajari cara mengurutkan kandidat itu dengan LambdaMART, sehingga bobot tiap kriteria kecocokan dipelajari dari relevansi berjenjang alih-alih ditetapkan manual.",
      ],
      highlightLabels: ["NDCG@10", "Jumlah Lowongan", "Query Uji", "Kenaikan vs Hybrid"],
      sections: {
        dataset: {
          heading: "Pemahaman Data",
          navLabel: "Data",
          body:
            "28.858 lowongan pekerjaan Indonesia setelah pembersihan, membawa judul pekerjaan, skill, deskripsi, lokasi, jenjang pendidikan, jenjang pengalaman, gaji, industri perusahaan, dan career level.",
          bullets: [
            "Pembersihan teks mengubah semuanya menjadi huruf kecil, membuang URL dan alamat email, serta menghapus karakter non-alfanumerik sambil sengaja mempertahankan +, #, dan . sehingga C++, C#, dan .NET tetap bertahan sebagai token.",
            "Duplikat dibuang berdasarkan kombinasi judul pekerjaan, industri perusahaan, dan lokasi, karena lowongan yang sama kerap diunggah ulang.",
            "Cakupan field struktural tidak merata dan dilaporkan apa adanya: jenjang pengalaman tersedia pada 86,8% baris, pendidikan pada 82,1%, dan gaji hanya pada 26,4%. Angka terakhir itulah alasan gaji masuk sebagai fitur yang dipasangkan dengan penanda ketersediaan alih-alih sebagai nilai hasil imputasi.",
            "Judul pekerjaan dipetakan ke 12 kategori lewat kata kunci. Sebarannya sangat timpang: Other memuat 15.713 lowongan, lalu Sales and Business Development 4.242, Finance and Accounting 2.297, Marketing and Communication 2.204, Software Development 1.308, Engineering 1.238, Administration and Operations 974, dan Human Resources 273.",
            "Kategori Other yang mencakup 54% korpus adalah batasan nyata dari taksonomi berbasis kata kunci, dan ia ditangani dengan mengeluarkan lowongan tersebut dari himpunan query evaluasi alih-alih berpura-pura taksonominya sudah lengkap.",
          ],
        },
        eda: {
          heading: "Penyiapan Fitur",
          navLabel: "EDA",
          body:
            "Empat atribut struktural dinormalisasi ke skala 0 sampai 1 sehingga kemiripan pada atribut itu sebanding dengan kemiripan teks.",
          bullets: [
            "Pengalaman diurai dari teks bebas, dibatasi pada 10 tahun, dengan \"fresh graduate\" dipetakan eksplisit ke 0 alih-alih dibiarkan kosong.",
            "Pendidikan dipetakan ke skala ordinal di mana SMA adalah 0,0, D3 0,25, D4 0,40, S1 0,50, S2 0,75, dan S3 1,0, sehingga jarak antara dua jenjang menjadi bermakna.",
            "Lokasi dinormalisasi lewat tabel alias sehingga \"jakarta raya\" dan \"dki jakarta\" sama-sama menjadi \"jakarta\", yang kalau tidak akan memecah pasar kerja terbesar menjadi tiga string yang tidak saling cocok.",
            "Gaji diskalakan min-max dan dipotong ke rentang 0 sampai 1.",
            "Skill ditokenisasi menjadi himpunan dengan kata generik dibuang (and, or, with, using, skill, ability, knowledge, experience, good, strong, basic), sehingga irisan Jaccard mengukur kemampuan sesungguhnya alih-alih kalimat basa-basi.",
          ],
        },
        preprocessing: {
          heading: "Representasi Hybrid",
          navLabel: "Hybrid",
          body:
            "Representasinya adalah kontribusi inti: sinyal leksikal dan semantik digabungkan lewat konkatenasi alih-alih dirata-ratakan, sehingga ranker di tahap berikutnya bisa membobot keduanya secara terpisah alih-alih mewarisi campuran yang sudah ditetapkan.",
          bullets: [
            "TF-IDF di-fit per field alih-alih pada satu string gabungan: judul dengan 2.000 fitur pada 1 sampai 3 gram, skill dengan 2.000 fitur pada 1 sampai 3 gram, dan deskripsi dengan 1.000 fitur pada 1 sampai 2 gram, semuanya dengan min_df 2, max_df 0,8, dan sublinear term frequency.",
            "Tiap field lalu diberi bobot sebelum digabung: judul 0,50, skill 0,25, deskripsi 0,25. Kecocokan judul bernilai dua kali kecocokan deskripsi, dan itu menyandikan fakta domain bahwa judul adalah indikator tunggal terkuat tentang apa sebenarnya sebuah pekerjaan. Hasilnya dinormalisasi L2 menjadi vektor 5.000 dimensi.",
            "SBERT memakai paraphrase-multilingual-mpnet-base-v2, dan itu penting karena lowongan Indonesia mencampur bahasa Indonesia dan Inggris secara bebas bahkan di dalam satu field. Meng-encode 28.858 lowongan menghasilkan embedding 768 dimensi dalam 3,48 menit di GPU, lalu dinormalisasi L2.",
            "Vektor hybrid-nya adalah V = [alpha dikali TF-IDF, beta dikali SBERT] dengan alpha 0,6 dan beta 0,4, menghasilkan 5.768 dimensi. Konkatenasi mempertahankan kedua sinyal sebagai blok yang bisa dialamati terpisah; merata-ratakannya akan menghancurkan sifat itu.",
          ],
        },
        relevance: {
          heading: "Label Relevansi Berjenjang",
          body:
            "Learning-to-rank membutuhkan target, dan relevan atau tidak secara biner terlalu kasar untuk kecocokan pekerjaan, di mana seorang kandidat bisa cocok sebagian pada beberapa sumbu sekaligus. Skor relevansi holistik disusun dari lima kriteria berbobot lalu didiskretkan.",
          bullets: [
            "rel = 0,40 dikali kecocokan kategori + 0,25 dikali Jaccard skill + 0,15 dikali kecocokan pengalaman + 0,10 dikali kecocokan pendidikan + 0,10 dikali kecocokan lokasi.",
            "Skor kontinu itu didiskretkan menjadi lima tingkat dari 0 sampai 4 pada ambang 0,15, 0,30, 0,45, dan 0,60, dan itulah yang dibutuhkan NDCG untuk membedakan kecocokan sangat baik dari yang sekadar bisa diterima.",
            "Keputusan desain paling kritis: kategori dan skill dipakai untuk membangun label tetapi sengaja dikeluarkan dari fitur model. Memasukkan kembali komponen label sebagai fitur adalah kebocoran buku teks dan akan menghasilkan skor yang tidak berarti apa pun.",
            "Ini adalah ground truth heuristik, bukan anotasi manusia, dan hal itu dinyatakan sebagaimana adanya. Bobotnya menyandikan pandangan yang bisa dipertahankan tentang apa yang membuat sebuah lowongan relevan, tetapi memvalidasinya terhadap penilaian manusia adalah pekerjaan utama yang masih tersisa.",
          ],
        },
        modeling: {
          heading: "Retrieval dan Learning-to-Rank",
          navLabel: "Modeling",
          body:
            "Dua tahap: satu lintasan retrieval murah yang mempersempit 28.858 lowongan menjadi 200, lalu satu lintasan terpelajar yang mahal untuk mengurutkan 200 itu dengan benar.",
          bullets: [
            "Tahap satu mengambil 200 kandidat terdekat lewat jarak Euclidean pada vektor hybrid, dihitung per potongan dengan matriks Gram sehingga 13.116 query selesai dalam 82 detik.",
            "Tiap kandidat lalu dideskripsikan tepat oleh sepuluh fitur: tiga kemiripan teks (sim_hybrid, sim_tfidf, sim_sbert) dan tujuh sinyal struktural (loc_match, edu_fit, edu_av, exp_fit, exp_av, sal_fit, sal_av).",
            "Setiap fitur kecocokan struktural dipasangkan dengan penanda ketersediaan. Karena gaji hanya tersedia pada 26,4% lowongan, skor kecocokan nol menjadi ambigu antara ketidakcocokan sungguhan dan nilai yang hilang, dan penanda ketersediaan itulah yang memungkinkan model membedakan keduanya.",
            "Query yang memenuhi syarat adalah 13.116 lowongan di luar kategori Other yang kategorinya punya anggota lebih banyak daripada K terbesar yang dievaluasi, sehingga tiap query punya cukup kandidat sejati agar metriknya terdefinisi.",
            "Pembagiannya per query pada 70/30: 9.182 query latih yang menghasilkan 1.836.400 baris kandidat, dan 3.934 query uji yang ditahan. Membagi per query alih-alih per baris itulah yang mencegah kandidat milik satu query muncul di kedua sisi.",
            "LambdaMART dilatih sebagai LGBMRanker dengan objective lambdarank dan metric ndcg: 500 estimator, learning rate 0,05, 63 leaves, min_child_samples 30, subsample 0,9, dan colsample_bytree 0,9. Pelatihannya memakan 351 detik.",
          ],
        },
        evaluation: {
          heading: "Evaluasi",
          navLabel: "Evaluasi",
          body:
            "Dievaluasi pada 3.934 query yang ditahan di empat titik potong, dengan NDCG berjenjang sebagai metrik utama ditambah Precision dan MAP yang dihitung terhadap ambang relevansi biner tingkat 2 ke atas.",
          bullets: [
            "NDCG@5 87,42%, Precision@5 90,50%, MAP@5 88,25%.",
            "NDCG@10 86,29%, Precision@10 89,27%, MAP@10 85,78%.",
            "NDCG@20 85,03%, Precision@20 87,98%, MAP@20 83,28%.",
            "NDCG@30 84,24%, Precision@30 86,99%, MAP@30 81,62%.",
            "Peluruhan dari K=5 ke K=30 landai, sekitar 3 poin NDCG di sepanjang kenaikan panjang daftar enam kali lipat, yang berarti kualitasnya tidak runtuh begitu kecocokan yang paling jelas sudah habis.",
            "Kepentingan fitur dari LambdaMART mengonfirmasi bahwa kemiripan hybrid memikul perangkingannya sementara fitur kecocokan struktural menghaluskannya, dan itulah perilaku yang memang dituju desain dua tahap ini.",
          ],
          captions: [
            "NDCG, Precision, dan MAP terhadap K di sebelah kiri, kepentingan fitur LambdaMART di sebelah kanan. Kurva multi-K yang landai adalah bagian yang berguna: sistem rekomendasi yang hanya bekerja pada K=5 tidak layak dipasang.",
          ],
        },
        ablation: {
          heading: "Studi Ablasi",
          body:
            "Setiap komponen diuji terhadap ground truth holistik yang sama dan query uji yang sama, sehingga perbandingannya mengisolasi kontribusi alih-alih mengubah dua hal sekaligus.",
          bullets: [
            "TF-IDF saja: NDCG@10 70,93%, Precision@10 86,94%, MAP@10 84,20%.",
            "SBERT saja: NDCG@10 69,00%, Precision@10 83,72%, MAP@10 78,07%. Kemiripan semantik sendirian ternyata lebih lemah daripada leksikal di sini, dan itu layak dinyatakan karena bertentangan dengan intuisi bahwa embedding yang lebih baru pasti lebih baik.",
            "Hybrid tanpa learning-to-rank: NDCG@10 73,00%, jadi menggabungkan kedua representasi saja sudah mengalahkan masing-masing sebesar 2 sampai 4 poin.",
            "Hybrid dengan fusi tetap (rata-rata sederhana dari kesepuluh fitur): NDCG@10 80,57%. Sekadar memakai fitur struktural sama sekali bernilai tambahan 7,6 poin.",
            "Hybrid dengan LambdaMART: NDCG@10 86,29%. Mempelajari bobotnya alih-alih menetapkannya menambah 5,7 poin lagi, sehingga totalnya unggul 13,3 poin dibanding kemiripan hybrid saja.",
            "Uji Wilcoxon signed-rank pada NDCG@10 per query mengonfirmasi perbedaannya signifikan terhadap setiap baseline, dengan p praktis 0 terhadap tiga yang pertama dan p = 7,54e-131 terhadap fusi tetap.",
            "Nuansa yang layak dinyatakan: fusi tetap justru mencetak skor lebih tinggi pada Precision@10 (91,51% berbanding 89,27%) dan MAP@10 (89,01% berbanding 85,78%). LambdaMART mengoptimasi NDCG, yang memberi imbalan pada menempatkan kecocokan tingkat 4 di atas tingkat 3, sementara Precision dan MAP hanya menanyakan apakah sebuah item melewati ambang biner. Metode usulan memenangkan metrik yang memang dilatihnya dan kalah pada dua yang tidak, dan hanya melaporkan yang menang akan menyesatkan.",
          ],
        },
        impact: {
          heading: "Keluaran Kualitatif",
          navLabel: "Keluaran",
          body:
            "Metrik menggambarkan kasus rata-rata. Contoh keluaran memperlihatkan apa yang benar-benar diterima pengguna, dan itulah pemeriksaan yang menangkap sistem yang skornya bagus tetapi hasilnya kacau.",
          bullets: [
            "Query \"Staff Accounting/Finance\" dengan skill Excel, Leadership, dan Spreadsheet, berlokasi di Jakarta Selatan: kesepuluh lowongan yang dikembalikan adalah Finance and Accounting, sembilan dari sepuluh berada di Jakarta Selatan atau Jakarta Raya, dan sembilan dari sepuluh membawa relevansi tingkat 3.",
            "Query teks bebas untuk Fullstack Developer dengan PHP, JavaScript, MySQL, Python, HTML, dan CSS mengembalikan sepuluh lowongan Software Development, seluruhnya peran fullstack, tersebar di Jakarta, Depok, Bali, Sleman, Semarang, Bandung, dan Tangerang.",
            "Contoh kedua lebih penting daripada yang pertama: teks query-nya diketik manusia dan memuat salah ketik (\"pyhton\", \"jakarata\") ditambah deskripsi pengalaman berbahasa Indonesia. Cabang SBERT multibahasa itulah yang menyerapnya, dan itu persis kasus yang akan gagal ditangani sistem TF-IDF murni.",
            "Fungsi recommend_for yang sama melayani baik lowongan yang dipakai sebagai query maupun profil kandidat berupa teks bebas, sehingga pipeline risetnya sekaligus menjadi jalur scoring yang akan dipanggil sebuah produk.",
          ],
        },
        limitations: {
          heading: "Batasan & Langkah Lanjut",
          bullets: [
            "Label relevansinya heuristik, bukan hasil anotasi manusia. Kelima bobotnya bisa dipertahankan tetapi belum tervalidasi, dan anotasi manusia adalah langkah berikutnya yang paling bernilai.",
            "Kategori Other memuat 54% lowongan dan dikeluarkan dari evaluasi, sehingga metrik yang dilaporkan menggambarkan performa pada separuh korpus yang terkategorikan dengan baik.",
            "Cakupan gaji sebesar 26,4% berarti fitur itu nyaris tidak aktif pada tiga perempat kandidat.",
            "Taksonomi judul berbasis kata kunci, sehingga lowongan dengan judul tidak lazim akan salah diklasifikasikan alih-alih dibiarkan tak tentu.",
            "Langkah berikutnya dari penelitian itu sendiri: menambah metode pembanding yang dievaluasi pada ground truth yang sama beserta uji signifikansi, dan memvalidasi definisi relevansinya lewat anotasi manusia.",
            "Semuanya berjalan pada SEED 42 dan reproducible dari ujung ke ujung, mulai dari fitting TF-IDF, encoding SBERT, sampai pelatihan LambdaMART.",
          ],
        },
      },
    },
  },

  "jivara-health-tech": {
    title: "Jivara Stay on Track, Stay Healthy",
    category: "Capstone DBS Foundation",
    description:
      "Membangun lapisan data untuk aplikasi health-tech yang membaca foto makanan lalu memperingatkan penggunanya bila makanan itu berbenturan dengan obat yang sedang diminum, mengubah 29 kelas makanan, 23.682 catatan obat, dan 1.037 aturan interaksi menjadi artefak yang bisa langsung dipakai tim AI dan backend.",
    longDescription:
      "Alur kerja Data Science pada Jivara, proyek capstone DBS Foundation Coding Camp 2026. Peran saya bukan melatih model akhirnya, melainkan membangun seluruh fondasi yang menopangnya: dataset gambar YOLO yang tervalidasi, katalog nutrisi makanan Indonesia, registri obat BPOM yang sudah dibersihkan, dan knowledge base yang menyambungkan makanan hasil deteksi sampai ke peringatan interaksi obat. Dikirim sebagai notebook yang reproducible, artefak handoff terdokumentasi untuk AI Engineer dan Backend, serta dasbor Streamlit untuk menjelajahi hasilnya.",
    caseStudy: {
      context:
        "Capstone DBS Foundation Coding Camp 2026 · Tim lintas fungsi, peran saya: Data Scientist · Persiapan data untuk computer vision, nutrisi, dan intelijen interaksi obat.",
      problemHeading: "Latar Belakang Bisnis",
      problem: [
        "Orang yang mengonsumsi obat jangka panjang diminta menghindari makanan tertentu, dan hampir tidak ada yang mengingat makanan mana saja. Jeruk bali dengan statin, produk susu dengan antibiotik tertentu, sayuran hijau dengan warfarin: nasihatnya datang sekali di konter apotek dan sudah hilang saat waktu makan malam tiba. Hasilnya adalah kelas kerugian yang sebenarnya bisa dihindari tetapi tidak pernah tercatat sebagai medication error, karena tidak terjadi apa-apa yang dramatis, obatnya sekadar bekerja kurang optimal.",
        "Penyebabnya adalah pengetahuannya ada tetapi tidak berada di momen ketika ia dibutuhkan. Data interaksi tersimpan di rujukan farmakologi, registri obat ada di BPOM, data nutrisi ada di katalog terpisah, dan pasiennya sedang memegang sepiring makanan tanpa satu pun dari itu di tangannya.",
        "Jivara menutup jarak itu dengan membiarkan kamera ponsel yang bertanya: foto makanannya, lalu aplikasinya memberi tahu itu makanan apa, apa isinya, dan apakah ia berbenturan dengan sesuatu yang sedang Anda konsumsi. Tetapi model computer vision hanya mengembalikan label seperti nasi-goreng, dan sebuah label sendirian tidak bisa memperingatkan siapa pun tentang apa pun.",
        "Di situlah alur kerja ini berada. Tugas saya adalah membangun rantai yang mengubah label menjadi peringatan: gambar makanan, lalu kelas YOLO, lalu bahan, lalu nutrisi, lalu kategori obat, lalu interaksi. Setiap mata rantai itu adalah dataset yang harus dicari, dibersihkan, divalidasi, dan didokumentasikan sebelum AI Engineer maupun Backend bisa menulis satu baris kode di atasnya.",
      ],
      highlightLabels: [
        "Kelas Makanan",
        "Gambar Latih",
        "Catatan Obat Dibersihkan",
        "Aturan Interaksi",
      ],
      sections: {
        dataset: {
          heading: "Pemahaman Data",
          navLabel: "Data",
          body:
            "Lima sumber terpisah harus disatukan ke dalam satu sistem, dan tidak satu pun di antaranya dirancang untuk saling berbicara. Pekerjaannya dibingkai dalam lima pertanyaan bisnis, satu per dataset, sehingga setiap keputusan pembersihan bisa ditelusuri kembali ke sesuatu yang memang dibutuhkan produknya.",
          bullets: [
            "Dataset gambar makanan dari Roboflow untuk pelatihan YOLO. Export finalnya membawa 29 kelas makanan Indonesia pada 4.915 gambar latih, 978 validasi, dan 562 uji.",
            "Data resep hasil scraping Cookpad, dipakai untuk menguraikan sebuah hidangan menjadi bahan penyusunnya. 1.050 resep bersih yang mencakup 61 kelas makanan.",
            "Katalog nutrisi makanan Indonesia dari nutrition1.csv, dibersihkan menjadi 1.346 entri makanan dengan kalori, protein, lemak, dan karbohidrat sebagai field pencarian utamanya.",
            "Registri obat BPOM: 23.682 catatan produk mentah yang memuat nomor registrasi, komposisi, pendaftar, dan bentuk sediaan.",
            "Aturan interaksi obat dan makanan: 1.037 baris yang menghubungkan 61 kelas makanan dengan 17 kategori obat, 314 di antaranya interaksi positif dan sisanya catatan tanpa interaksi yang dinyatakan eksplisit.",
            "Sebaran kelas pada dataset gambar mentah adalah masalah nyata yang pertama. Median anotasi per kelas adalah 282, tetapi Tahu Goreng membawa sekitar 800 sementara Pisang dan Stroberi berada di sekitar 220. Model yang dilatih pada kemiringan seperti itu belajar menebak kelas yang sering muncul.",
          ],
          captions: [
            "Anotasi per kelas terhadap median 282. Rentang dari sekitar 800 turun ke 220 inilah yang harus ditutup penanganan imbalance nanti, karena detektor yang hanya bekerja pada hidangan populer tidak berguna untuk aplikasi nutrisi.",
            "Analisis bounding box. Geometri anotasi diaudit sebelum pelatihan, bukan sesudahnya, karena box yang rusak atau tidak wajar jauh lebih mahal begitu ia sudah tertanam di dalam model terlatih.",
          ],
        },
        eda: {
          heading: "Eksplorasi Data",
          navLabel: "EDA",
          body:
            "Keempat sumber tabular diprofilkan terpisah, karena ketiganya gagal dengan cara yang sama sekali berbeda: katalog nutrisi punya nama makanan duplikat, registri obat mencantumkan satu produk berkali-kali di bawah merek berbeda, dan tabel interaksi punya ketidakkonsistenan label.",
          bullets: [
            "Katalog nutrisi didominasi ekor panjang berisi nama makanan yang nyaris sama, dan itulah alasan deduplikasi harus dilakukan pada nama yang sudah dinormalisasi, bukan pada string mentahnya.",
            "Registri BPOM menyusut drastis begitu dilihat dari sisi komposisi alih-alih merek: 23.682 catatan mentah menjadi 15.085 setelah deduplikasi berdasarkan nomor registrasi, dan menjadi 2.173 begitu hanya satu merek dipertahankan per komposisi unik. Angka terakhir itulah yang penting, karena risiko interaksi mengikuti zat aktifnya, bukan nama mereknya.",
            "16.441 entri zat aktif diekstrak dari kolom komposisi berupa teks bebas, dan itulah yang membuat pencarian kategori obat menjadi mungkin sama sekali.",
            "Rincian tingkat keparahan interaksi didominasi INTAKE_TIMING dan AVOID_CRITICAL, artinya sebagian besar aturannya bukan larangan sederhana melainkan instruksi waktu, dan itu mengubah cara peringatannya harus dirumuskan di aplikasi.",
            "Audit memunculkan 15 label interaksi yang tidak konsisten, dicatat di berkas anomali tersendiri alih-alih diam-diam diperbaiki.",
          ],
          captions: [
            "Profiling katalog nutrisi. Sebaran di sini menentukan field mana yang aman diekspos sebagai lookup dan mana yang butuh fallback ketika nilainya kosong.",
            "Sebaran golongan obat setelah registri BPOM dibersihkan. Golongannya diturunkan dari pola nomor registrasi, satu-satunya sinyal terstruktur yang ditawarkan berkas mentahnya.",
            "Sebaran tingkat keparahan pada aturan interaksi. INTAKE_TIMING yang unggul atas AVOID_CRITICAL berarti aplikasinya lebih banyak perlu menyampaikan kapan sesuatu boleh dimakan, bukan bahwa ia terlarang, dan itu pesan yang jauh lebih berguna untuk kepatuhan.",
          ],
        },
        preprocessing: {
          heading: "Praproses & Pipeline",
          body:
            "Empat pipeline pembersihan, satu per sumber, masing-masing ditulis sebagai notebook yang berjalan dari atas ke bawah dan menuliskan keluarannya ke folder handoff berversi. Pipeline gambar yang paling rumit, karena kualitas dataset adalah langit-langit bagi kualitas model.",
          bullets: [
            "Pipeline gambar: memuat anotasi Roboflow, menganalisis sebaran kelas dan bounding box, memvalidasi tiap berkas gambar terhadap korupsi dan referensi yang hilang, mendeteksi duplikat, membersihkan box tidak valid, menangani imbalance kelas, mengonversi ke YOLO TXT dengan xywh ternormalisasi, dan mengekspor beserta data.yaml yang bisa langsung ditunjuk AI Engineer.",
            "Imbalance ditangani dengan undersampling kelas yang berlebih alih-alih augmentasi agresif, dan berkas yang dibuang dicatat ke CSV sehingga keputusannya bisa dibalik dan diaudit.",
            "Pipeline resep: membersihkan teks resep, menggabungkan sumber, menstandarkan nama makanan agar persis cocok dengan daftar kelas YOLO, mengekstrak bahan, lalu membangun peta makanan ke bahan sekaligus kebalikannya. Peta kebalikan itulah yang memungkinkan sistem menjawab pertanyaan sebenarnya, yaitu hidangan mana saja yang mengandung bahan yang berbenturan dengan obatnya.",
            "Pipeline nutrisi: membuang kolom yang tidak dipakai, menstandarkan dan membersihkan nama makanan, deduplikasi, memberi food_id dan nutrition_key untuk pencarian, melampirkan asal data, dan memvalidasi katalognya.",
            "Pipeline BPOM: membersihkan teks komposisi dan produk, mengurai tanggal, memisahkan field pendaftar menjadi perusahaan dan negara asal, menurunkan kategori obat dari nomor registrasi, mengekstrak zat aktif dari teks bebas, menghitungnya, menghitung durasi registrasi, menandai kedaluwarsa, deduplikasi berdasarkan nomor registrasi, dan akhirnya menyusutkannya menjadi satu merek per komposisi.",
            "Setiap pipeline menulis ke lokasi terdokumentasi lengkap dengan data dictionary, sehingga engineer di hilir tidak pernah perlu menebak arti sebuah nama kolom dari dalam notebook.",
          ],
          captions: [
            "Keseimbangan kelas sebelum dan sesudah undersampling. Memangkas kelas yang berlebih dipilih daripada menggelembungkan kelas yang langka, karena salinan sintetis sebuah foto makanan mengajari detektor lebih sedikit daripada contoh yang lebih sedikit tetapi benar-benar bervariasi.",
            "Sebaran yang dihasilkan pada dataset gabungan. Inilah kondisi saat export dibekukan dan diserahkan ke AI Engineer.",
            "Deduplikasi komposisi pada registri BPOM: 23.682 catatan mentah menjadi 2.173 komposisi unik. Risiko interaksi mengikuti zat aktifnya, jadi menyusutkan merek bukan kehilangan data, justru itulah tujuannya.",
          ],
        },
        "knowledge-base": {
          heading: "Knowledge Base",
          navLabel: "KB",
          body:
            "Inilah deliverable integrasinya sekaligus alasan keempat pipeline itu ada. Rantai yang dibutuhkan produknya adalah: gambar makanan, lalu kelas YOLO, lalu bahan, lalu nutrisi, lalu kategori obat, lalu peringatan interaksi. Setiap panah pada rantai itu adalah join yang harus dibuat bekerja pada nama-nama yang nyata dan berantakan.",
          bullets: [
            "61 kelas makanan membawa pemetaan bahan, menghubungkan hidangan hasil deteksi ke bahan yang benar-benar mungkin memicu sesuatu.",
            "61 kelas yang sama muncul di tabel interaksi terhadap 17 kategori obat, menghasilkan 1.037 aturan yang 314 di antaranya interaksi positif.",
            "333 obat disiapkan dan dipetakan untuk API backend, 24 di antaranya masuk ke lebih dari satu kategori sehingga pengecekan interaksinya harus dijalankan per kategori, bukan sekali saja.",
            "Kesenjangan cakupan dilaporkan alih-alih disembunyikan: baru 15 dari 61 kelas makanan yang terpetakan cocok dengan entri di katalog nutrisi, menyisakan 46 tanpa join nutrisi. Jalur interaksinya bekerja untuk keenam puluh satu kelas; jalur kalori dan makronutriennya belum.",
            "Artefak handoff dipisah menurut konsumennya. AI Engineer menerima export YOLO ditambah food_to_ingredient_kb.json, ingredient_to_food_kb.json, dan aturan interaksinya. Backend menerima katalog nutrisi, lookup obat, dan berkas SQL yang langsung bisa diimpor.",
          ],
        },
        evaluation: {
          heading: "Evaluasi",
          navLabel: "Evaluasi",
          body:
            "Pipeline dievaluasi dengan perbandingan bergaya A/B pada tiga dari lima pertanyaan bisnis, dibingkai sebagai baseline (data mentah, pembersihan minimal) melawan optimized (pipeline penuh). Hasilnya dan catatan pentingnya sama-sama berarti.",
          bullets: [
            "Akurasi deteksi makanan: 71,9% baseline berbanding 88,9% optimized, naik 17,0 poin persen.",
            "Kelengkapan katalog nutrisi: 57,7% berbanding 84,5%, naik 26,8 poin.",
            "Recall interaksi obat: 52,8% berbanding 84,1%, naik 31,2 poin.",
            "Ketiga perbedaannya signifikan secara statistik pada uji Welch t-test dan Mann-Whitney, dengan selang kepercayaan bootstrap dan effect size Cohen's d di atas 4.",
            "Catatan pentingnya, dinyatakan terang-terangan karena ia mengubah cara angkanya harus dibaca: sampel ini ditarik dari distribusi Beta di sekitar rata-rata baseline dan optimized yang diasumsikan, bukan diukur dari dua proses pelatihan sungguhan. Skripnya sendiri menyatakan demikian di docstring-nya. Jadi nilai p dan effect size-nya menggambarkan simulasinya, dan itu mendemonstrasikan desain evaluasinya alih-alih membuktikan perbaikan di lapangan. Mengutip 17 poin itu sebagai kenaikan model yang terukur adalah keliru.",
            "Yang benar-benar terukur adalah fakta datasetnya: 29 kelas, 6.455 gambar diekspor pada tiga split, 23.682 catatan obat yang menyusut menjadi 2.173 komposisi unik, 1.037 aturan interaksi pada 17 kategori obat, dan join nutrisi yang mencakup 15 dari 61 kelas. Angka-angka itu reproducible dari notebooknya.",
          ],
          captions: [
            "Ringkasan evaluasi seperti yang dihasilkan pipeline, lengkap dengan pembingkaian per pemangku kepentingan. Baca bersama catatan di atas: perbandingannya adalah simulasi yang dirancang di sekitar rata-rata yang diasumsikan, bukan pengukuran dua proses pelatihan sungguhan.",
            "Akurasi deteksi makanan, baseline berbanding optimized. Tampilan distribusinya lebih jujur daripada diagram batang dua rata-rata, karena ia memperlihatkan irisan yang disembunyikan tabel ringkasan.",
            "Recall interaksi, metrik yang paling penting secara klinis, karena interaksi yang terlewat adalah peringatan yang tidak pernah sampai ke pasien.",
          ],
        },
        impact: {
          heading: "Deliverable & Dampak",
          navLabel: "Dampak",
          body:
            "Keluaran alur kerja ini bukan sebuah model, melainkan kumpulan aset yang membuat pekerjaan anggota tim lain menjadi mungkin. Pembedaan itu layak dinyatakan eksplisit, karena persiapan data adalah bagian capstone yang diam-diam menentukan apakah hal lain bisa jadi atau tidak.",
          bullets: [
            "Dataset YOLO 29 kelas yang tervalidasi sehingga AI Engineer bisa langsung melatihnya tanpa mengaudit ulang lebih dulu, dikirim lengkap dengan data.yaml, folder split, dan zip untuk transfer.",
            "Dua knowledge base JSON (makanan ke bahan, bahan ke makanan) ditambah aturan interaksinya, dan itulah yang mengubah label deteksi telanjang menjadi peringatan kesehatan.",
            "Katalog nutrisi bersih dan lookup obat untuk Backend, termasuk berkas SQL yang bisa langsung diimpor.",
            "Dokumentasi diperlakukan sebagai deliverable kelas satu: data dictionary, handoff notes, laporan dataset, panduan lookup obat, dan berkas anomali yang tercatat. Engineer di hilir bisa menjawab pertanyaan soal kolom tanpa membuka notebook.",
            "Dasbor Streamlit dengan tiga modul (nutrisi resep, obat BPOM, interaksi obat dan makanan) sehingga tim maupun penilai bisa menjelajahi keluarannya alih-alih menerima sebuah CSV atas dasar kepercayaan.",
            "Reproducibility diperlakukan sebagai syarat: notebook berjalan dari atas ke bawah, folder data mentah dan keluaran berukuran besar dihosting terpisah agar repositorinya tetap di bawah batas ukuran, dan asal-usul tiap artefak dituliskan, termasuk aturan interaksi mana yang berasal dari kurasi eksternal.",
          ],
        },
        limitations: {
          heading: "Batasan",
          body:
            "Lima hal yang harus berubah sebelum ini menjadi produk klinis sungguhan alih-alih deliverable capstone.",
          bullets: [
            "Aturan interaksinya adalah kurasi berbantuan LLM yang diperiksa terhadap literatur farmakologi dan diperkaya dari dataset Kaggle eksternal. Aturan itu belum tervalidasi secara klinis, dan tidak ada versi mana pun dari ini yang boleh sampai ke pasien tanpa telaah apoteker.",
            "Cakupan nutrisi adalah mata rantai terlemahnya: 15 dari 61 kelas makanan yang tersambung ke katalog nutrisi, sehingga fitur kalori dan makronutrien hari ini hanya bekerja pada seperempat hidangan yang terdeteksi.",
            "15 label interaksi yang tidak konsisten masih tersisa di berkas audit. Semuanya didokumentasikan alih-alih diperbaiki, karena menyelesaikannya butuh keputusan farmakologi, bukan keputusan data.",
            "Evaluasi A/B-nya adalah simulasi, sehingga ia memvalidasi desain evaluasinya dan bukan performa lapangannya. Mengukur perbaikan sesungguhnya membutuhkan dua proses pelatihan nyata pada dataset mentah dan dataset bersih.",
            "Dataset gambarnya mencakup 29 hidangan Indonesia. Itu cukup untuk mendemonstrasikan rantainya dari ujung ke ujung dan jauh dari cukup untuk pemakaian umum, dan memperluasnya adalah hal pertama yang dibutuhkan versi produksi.",
          ],
        },
      },
    },
  },

  "pivora-trading-journal": {
    title: "Aplikasi Jurnal Trading Pivora",
    category: "Full Stack",
    description:
      "Membangun aplikasi jurnal trading dengan analisis psikologi berbasis AI, notifikasi Fear & Greed Index, dan rekomendasi trading yang dipersonalisasi.",
    longDescription:
      "Pivora adalah aplikasi jurnal trading komprehensif yang dirancang untuk memantau aktivitas trading sekaligus pola psikologi penggunanya. Dengan mengintegrasikan wawasan berbasis AI, platform ini memakai data jurnal yang sebelumnya diisi pengguna sebagai masukan pelatihan untuk menghasilkan rekomendasi trading yang dipersonalisasi dan notifikasi Fear & Greed Index secara real-time, sehingga pada akhirnya mendukung pengambilan keputusan yang lebih baik bagi trader.",
  },

  "saas-laundry-management": {
    title: "Sistem Manajemen Laundry SaaS",
    category: "Full Stack",
    description:
      "Mengembangkan platform SaaS multi-tenant untuk manajemen bisnis laundry dan pelanggannya, dilengkapi integrasi QRIS dan rekomendasi bisnis berbasis AI.",
    longDescription:
      "Platform SaaS multi-tenant yang dibangun untuk menyederhanakan operasional harian pemilik usaha laundry kecil. Fitur utamanya mencakup pencatatan keuangan yang menyeluruh, pemantauan stok secara real-time, integrasi pembayaran QRIS otomatis, dan rekomendasi bisnis berbasis AI untuk mengoptimalkan aliran pendapatan.",
  },

  "construction-management-system": {
    title: "Sistem Manajemen Konstruksi",
    category: "Full Stack",
    description:
      "Mengembangkan dan memasang sistem manajemen konstruksi internal untuk pemantauan proyek, pelaporan operasional, pengelolaan sumber daya, dan alur kerja bisnis internal.",
    longDescription:
      "Dikembangkan untuk CV Gasni Aditama Konstruksi, sistem manajemen konstruksi komprehensif ini menjawab beberapa persoalan operasional bisnis sekaligus. Platformnya memusatkan pemantauan proyek, pengelolaan sumber daya, dan pelaporan, menggantikan proses manual yang sebelumnya terpencar. Sistem ini berhasil dipasang ke produksi dan aktif dipakai oleh para pemangku kepentingan perusahaan.",
  },
};
