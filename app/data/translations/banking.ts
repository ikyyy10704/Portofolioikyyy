import type { ProjectTranslation } from "../localize";

export const bankingTranslations: Record<string, ProjectTranslation> = {
  "credit-risk-scoring-engine": {
    title: "Credit Risk Scoring Engine Perbankan",
    description:
      "Mengubah underwriting manual menjadi model PD terkalibrasi dan credit scorecard 300-850, menekan rasio NPL portofolio dari 21,87% menjadi 4,57% sambil tetap menyetujui 72% pemohon.",
    longDescription:
      "Sistem risiko kredit konsumer ujung ke ujung: pembersihan data, feature engineering perbankan, model probability of default yang terkalibrasi, credit scorecard yang diturunkan secara aljabar, reason code SHAP untuk adverse action notice, dan decision engine Streamlit untuk analis kredit. Notebook, pipeline pelatihan, dan dasbor mengimpor modul yang sama, sehingga riset dan produksi tidak mungkin menyimpang.",
    caseStudy: {
      context:
        "Portofolio Data Science Perbankan · Credit risk analytics · Proyek individu ujung ke ujung, dari aplikasi mentah sampai decision engine siap pakai.",
      problemHeading: "Latar Belakang Bisnis",
      problem: [
        "Portofolio kredit tanpa agunan pada dataset ini mencatat rasio NPL 21,87%, lebih dari empat kali ambang 5% yang dianggap sehat oleh regulator. Dengan Loss Given Default 45%, itu setara kerugian yang diperkirakan sebesar 6.874.729 satuan mata uang pada eksposur uji 62.249.975, padahal segmen uji hanya seperlima buku.",
        "Akar masalahnya bukan pada debiturnya, melainkan pada proses underwriting. Keputusan diambil lewat penilaian manual, yang berarti tidak seragam antar analis, mustahil diukur, dan mustahil diaudit begitu kredit bermasalah muncul. Tidak ada yang bisa menjelaskan mengapa sebuah aplikasi disetujui, sehingga tidak ada yang bisa memperbaiki apa yang salah.",
        "Empat pertanyaan harus dijawab agar prosesnya bisa dipertanggungjawabkan: seberapa besar peluang pemohon ini gagal bayar, bagaimana peluang itu berubah menjadi keputusan operasional, berapa NPL yang bisa ditekan tanpa mematikan penyaluran kredit, dan mengapa persisnya seorang pemohon ditolak.",
        "Solusinya adalah model PD terkalibrasi yang diterjemahkan ke credit score 300-850 dengan tiga band keputusan (approve, manual review, reject), di mana ambang skornya diturunkan secara aljabar dari jangkar kebijakan kredit alih-alih ditebak, dan setiap keputusan disertai reason code SHAP yang siap dipakai sebagai adverse action notice.",
      ],
      highlightLabels: ["Rasio NPL", "Koefisien Gini", "Statistik KS", "Approval Rate"],
      sections: {
        dataset: {
          heading: "Pemahaman Data",
          navLabel: "Data",
          body:
            "32.581 aplikasi kredit dengan 12 kolom, dengan loan_status sebagai target. Komposisi kelasnya 78,18% lancar berbanding 21,82% default, rasio 3,58 banding 1. Sebelum pemodelan apa pun, audit kualitas data menghasilkan lima temuan yang masing-masing menuntut keputusan sadar, bukan perbaikan bawaan.",
          bullets: [
            "loan_int_rate kosong pada 3.116 baris (9,6%). Diimputasi dengan median per loan_grade, mengikuti logika risk-based pricing alih-alih meratakan semua pemohon ke satu angka, dan hanya di-fit pada data latih.",
            "person_emp_length kosong pada 895 baris (2,7%), diimputasi dengan median di dalam Pipeline sehingga tiap fold validasi silang me-refit ulang.",
            "165 aplikasi duplikat dibuang.",
            "Lima catatan menunjukkan usia sampai 144 tahun dan dua menunjukkan masa kerja sampai 123 tahun. Keduanya adalah kesalahan input, bukan pencilan yang sah, sehingga diubah menjadi NaN lalu diimputasi alih-alih diwinsorisasi, karena memotongnya akan memperlakukan data mustahil sekadar sebagai data ekstrem.",
            "Pendapatan ekstrem (sampai 6 juta) diwinsorisasi pada persentil 99,5.",
          ],
        },
        eda: {
          heading: "Eksplorasi Data",
          navLabel: "EDA",
          body:
            "Eksplorasi diarahkan pada satu hal: mencari tahu apakah risiko memisah pada dimensi yang dikenali seorang analis kredit, karena model yang berselisih dengan intuisi underwriting harus membuktikan dirinya jauh lebih keras sebelum boleh dipakai.",
          bullets: [
            "Rasio NPL naik secara monoton seiring memburuknya loan grade, dari sekitar 10% pada grade A sampai hampir 100% pada grade G.",
            "Kredit debt consolidation, home improvement, dan medical semuanya berada di atas rata-rata portofolio, sementara venture dan education di bawahnya.",
            "Penyewa gagal bayar pada sekitar 32% berbanding 7% pada pemilik rumah, pemisahan kategorikal tunggal paling tajam di data ini.",
            "Grafik bucket DTI menampilkan sinyal rekayasa paling jelas: NPL naik dari sekitar 14% pada DTI di bawah 10% menjadi lebih dari 80% pada rentang 20-30%.",
            "risk_category berbasis aturan yang dibangun saat feature engineering memisah dengan bersih dan monoton (LOW 9,78%, MEDIUM 38,74%, HIGH 70,15%, VERY_HIGH 92,96%), sehingga aturan underwritingnya terbukti masuk akal sebelum model statistik diizinkan bicara.",
          ],
          captions: [
            "EDA portofolio. Keseimbangan target, lalu rasio NPL dipecah menurut loan grade, tujuan pinjaman, status kepemilikan rumah, bucket DTI, dan risk category berbasis aturan. Keenam panelnya memisahkan risiko ke arah yang memang akan diprediksi seorang analis kredit.",
          ],
        },
        preprocessing: {
          heading: "Praproses & Feature Engineering",
          body:
            "Sepuluh variabel turunan dibangun mengikuti praktik underwriting konvensional. Seluruhnya dihitung baris per baris, sehingga fungsi yang sama melayani pelatihan batch maupun scoring real-time satu aplikasi, yang menghapus kemungkinan keduanya berselisih.",
          bullets: [
            "est_monthly_installment memakai rumus anuitas P·i / (1−(1+i)^-n) untuk tenor 36 bulan, sehingga yang dipakai adalah beban angsuran sesungguhnya, bukan nilai pinjaman di judul.",
            "dti_ratio (angsuran dibagi pendapatan bulanan) adalah ukuran klasik kemampuan bayar terhadap ambang prudensial 35%; lti_ratio (pokok dibagi pendapatan tahunan) mengukur besaran eksposur.",
            "credit_history_score memadukan panjang riwayat (0-100), penalti 35 poin bila pernah gagal bayar, dan bonus grade, memampatkan kualitas rekam jejak biro kredit menjadi satu angka.",
            "Variabel pendukung: emp_stability_ratio, interest_burden_ratio, disposable_income_monthly, loan_to_emp_years, income_log, dan skor demerit risk_category berbasis aturan.",
            "Urutan pemrosesan menjaga integritas validasi: pembersihan, lalu split stratified 80/20, lalu fitting parameter feature engineering hanya pada data latih, lalu praproses di dalam Pipeline, lalu CV 5-fold. Membalik dua langkah pertama akan membocorkan data uji lewat median suku bunga per grade.",
            "Ketidakseimbangan kelas diuji di dalam fold, bukan diasumsikan. class_weight=\"balanced\" mencapai ROC-AUC 0,8880 dengan recall 0,7999; SMOTE mencapai 0,8879 dengan recall 0,7984; tanpa penyeimbangan mencapai 0,8867 tetapi recall-nya runtuh ke 0,6008. SMOTE tidak memberi keunggulan nyata dibanding class weighting yang jauh lebih murah, dan menaikkan recall dari 60% ke 80% penting di sini karena melewatkan debitur bermasalah jauh lebih mahal daripada menolak nasabah baik.",
          ],
        },
        modeling: {
          heading: "Pemodelan",
          navLabel: "Modeling",
          body:
            "Tiga kandidat dibandingkan pada validasi silang stratified 5-fold, dengan regresi logistik disertakan sebagai baseline scorecard tradisional yang harus dikalahkan model pohon mana pun agar kompleksitas tambahannya bisa dibenarkan.",
          bullets: [
            "LightGBM memimpin dengan ROC-AUC 0,9467 (std 0,0015), Gini 0,8933, KS 0,7611, dan PR-AUC 0,9039.",
            "XGBoost menyusul dekat pada ROC-AUC 0,9459, dan regresi logistik mencapai 0,8882 dengan presisi hanya 0,5671.",
            "Simpangan baku antar fold tetap di bawah 0,002, sehingga hasilnya adalah model yang stabil, bukan pembagian data yang kebetulan menguntungkan.",
            "Satu keputusan membentuk model final lebih dari hyperparameter mana pun: kalibrasi dipisahkan dari penyeimbangan kelas. scale_pos_weight memperbaiki daya pisah tetapi merusak kalibrasi probabilitas, sedangkan credit score diturunkan dari odds, jadi model final dilatih tanpa pembobotan lalu dikalibrasi secara isotonic. Brier score turun ke 0,0500.",
          ],
        },
        evaluation: {
          heading: "Evaluasi",
          navLabel: "Evaluasi",
          body:
            "Diukur pada 6.484 aplikasi yang belum pernah dilihat model. Tolok ukur industri disertakan karena angka risiko kredit tanpa pembanding tidak mengatakan apa pun kepada sebuah komite.",
          bullets: [
            "ROC-AUC 0,9495 berbanding 0,8900 milik regresi logistik (di atas 0,75 sudah dianggap memadai).",
            "Gini 0,8989 berbanding 0,7800 (di atas 0,40 memadai), dan KS 76,62 berbanding 63,81 (rentang 40 sampai 60 sudah tergolong kuat).",
            "PR-AUC 0,9093, precision 0,9775, recall 0,7362, F1 0,8399.",
            "Brier score 0,0500 berbanding 0,1274 milik baseline, mengonfirmasi kalibrasinya bertahan.",
            "Confusion matrix pada cut-off PD 0,50: 5.042 true negative, 24 false positive, 374 false negative, dan 1.044 true positive.",
            "Dua cut-off dihitung dan dilaporkan berdampingan: Youden J memaksimalkan KS pada PD 0,2288, sementara biaya harapan minimum mendarat pada PD 0,1500 dengan rasio biaya false negative terhadap false positive 5:1. Cut-off berbasis biaya lebih rendah karena kredit macet jauh lebih mahal daripada kehilangan satu nasabah baik.",
          ],
          captions: [
            "Suite validasi lengkap: kurva ROC, pemisahan KS antara distribusi kumulatif good dan bad, kurva precision-recall, confusion matrix, calibration plot, dan sebaran PD menurut hasil aktual. Calibration plot adalah yang paling menentukan di sini, karena credit score diturunkan dari odds.",
          ],
        },
        integrity: {
          heading: "Uji Kehati-hatian: apakah model hanya menyalin kebijakan lama?",
          body:
            "KS 76,62 berada jauh di atas rentang 30 sampai 45 yang lazim pada portofolio ritel nyata. Angka sebagus itu adalah alasan untuk curiga, bukan untuk merayakan, jadi dua pemeriksaan dijalankan sebelum model dinyatakan layak.",
          bullets: [
            "Audit kebocoran: tidak ada kolom yang membocorkan target. AUC univariat tertinggi hanya 0,72 (loan_grade), dan tidak satu pun variabel bersifat deterministik.",
            "Dari mana daya pisah itu sebenarnya datang: dari interaksi tajam antara loan_percent_income dan loan_grade. Di dalam grade A saja, NPL melonjak dari 9,2% menjadi 60,4% begitu pinjaman melewati 30% pendapatan. Pola itu terlalu rapi untuk sebuah buku kredit nyata dan merupakan ciri dataset kurasi.",
            "Uji challenger: model dilatih ulang tanpa loan_grade dan loan_int_rate, dua variabel yang ditetapkan bank sendiri alih-alih diamati dari nasabah. ROC-AUC turun dari 0,9497 ke 0,9377 dan KS dari 0,7746 ke 0,7302, penurunan hanya 5,7%. Artinya model ini tidak sekadar mengulang keputusan pricing lama; mayoritas daya pisahnya berasal dari profil finansial pemohon itu sendiri.",
            "Kesimpulan jujurnya, dinyatakan di dalam deliverable: KS 76 tidak boleh dijanjikan ke manajemen sebagai performa lapangan. Pada portofolio nyata, penurunan ke rentang 40 sampai 55 adalah hal wajar, dan cut-off perlu dikalibrasi ulang setelah 6 sampai 12 bulan data booking pertama terkumpul.",
          ],
        },
        scorecard: {
          heading: "Credit Scorecard & Decision Engine",
          body:
            "Skornya mengikuti bentuk baku Score = OFFSET + FACTOR × ln((1−PD)/PD). Yang membuatnya bisa dipertanggungjawabkan adalah OFFSET dan FACTOR tidak dipilih berdasarkan perasaan, melainkan diselesaikan secara aljabar dari dua jangkar kebijakan kredit, sehingga ambang bisnis menempel langsung pada skor.",
          bullets: [
            "Jangkar pertama: PD 25% dipetakan ke skor 600, batas bawah manual review. Jangkar kedua: PD 10% dipetakan ke skor 700, batas bawah persetujuan. Menyelesaikan keduanya menghasilkan FACTOR 91,02, OFFSET 500,00, dan PDO (points to double the odds) sebesar 63,1.",
            "PD dibatasi bawah pada 3 basis poin dan atas pada 99,9%, karena kalibrasi isotonic dapat mengembalikan tepat 0 atau 1 pada bin ekstrem dan PD absolut nol tidak bisa dipertanggungjawabkan dalam dokumen risiko. Basel mensyaratkan PD floor untuk eksposur ritel dengan alasan yang sama.",
            "Aturan keputusan: di atas 700 setujui dan cairkan otomatis; 600 sampai 700 arahkan ke manual review untuk verifikasi penghasilan, kunjungan, atau tawaran plafon lebih kecil; di bawah 600 tolak atau alihkan ke produk beragunan.",
            "Band manual review sengaja dipertahankan. Model ini dimaksudkan menghapus ketidakseragaman dari keputusan rutin, bukan menghapus pertimbangan manusia dari kasus yang memang membutuhkannya.",
          ],
          captions: [
            "Sebaran skor menurut hasil aktual dengan cut-off kebijakan 600 dan 700 ditandai, rasio NPL per band skor (monoton dari 95,4% pada 300-550 turun ke 2,1% pada 750-850), dan komposisi keputusan yang dihasilkan. Monotonisitas antar band adalah sifat pertama yang diperiksa komite kredit.",
          ],
        },
        explainability: {
          heading: "Explainability & Reason Code",
          body:
            "Pemohon yang ditolak berhak tahu alasannya, dan komite kredit tidak akan menyetujui model yang tidak bisa diinterogasi. SHAP memenuhi keduanya dari satu perhitungan yang sama.",
          bullets: [
            "Pendorong teratas: person_home_ownership_OWN (menurunkan risiko), lti_ratio (menaikkan), person_income (menaikkan), loan_int_rate (menurunkan), loan_intent_VENTURE (menaikkan), risk_category_LOW (menurunkan), loan_percent_income, dan disposable_income_monthly.",
            "Empat dari delapan pendorong terkuat adalah variabel rekayasa, mengonfirmasi bahwa feature engineering perbankan memberi bobot nyata alih-alih sekadar menghias daftar fitur.",
            "explain_high_risk_case() menghasilkan reason code per aplikasi dalam format yang siap dipakai sebagai adverse action notice, yaitu dasar hukum yang dibutuhkan bank ketika menjelaskan penolakan kepada pemohon.",
          ],
          captions: [
            "SHAP beeswarm. Tiap titik adalah satu aplikasi yang diwarnai menurut nilai fiturnya, memperlihatkan bukan hanya variabel mana yang penting tetapi juga ke arah mana dan seberapa konsisten.",
            "Peringkat global menurut mean |SHAP|. Rasio perbankan hasil rekayasa duduk sejajar dengan kolom aplikasi mentah, bukan di bawahnya.",
            "Satu aplikasi berisiko tinggi yang dijelaskan. Inilah artefak yang menjadi reason code pada surat penolakan, dan itulah yang mengubah skor buram menjadi keputusan yang bisa diaudit.",
          ],
        },
        impact: {
          heading: "Dampak Bisnis",
          navLabel: "Dampak",
          body:
            "Di-backtest pada 6.484 aplikasi uji terhadap kebijakan lama yang menyetujui semua pengajuan yang masuk.",
          bullets: [
            "Band APPROVE: 4.144 aplikasi (63,91%), NPL 3,14%, rata-rata skor 804, eksposur 38,3 juta.",
            "Band MANUAL REVIEW: 1.068 aplikasi (16,47%), NPL 15,73%, rata-rata skor 659.",
            "Band REJECT: 1.272 aplikasi (19,62%), NPL 88,05%, rata-rata skor 350. Hampir sembilan dari sepuluh aplikasi di band itu memang berakhir macet.",
            "Rasio NPL turun dari 21,87% ke 4,57%, penurunan 17,29 poin persen (79,1% secara relatif), mendarat di bawah ambang sehat 5%.",
            "Approval rate bertahan di 72,15%, jadi perbaikan itu tidak dibeli dengan menghentikan penyaluran kredit. 1.204 kredit macet dicegah, senilai estimasi 5.979.572 kerugian yang dihindari pada LGD 45%.",
            "Angkanya sengaja konservatif: ia mengasumsikan separuh band manual review akhirnya cair dengan komposisi risiko yang sama, yang berarti analis dianggap tidak menambah daya pisah sama sekali.",
          ],
        },
        limitations: {
          heading: "Batasan & Tata Kelola",
          body:
            "Lima batasan yang harus berada di depan komite kredit sebelum deployment, bukan sesudahnya.",
          bullets: [
            "Performa lapangan akan lebih rendah. KS 76 mencerminkan dataset yang luar biasa tajam; rentang realistis pada portofolio hidup adalah KS 40 sampai 55.",
            "loan_grade dan loan_int_rate ditetapkan bank sendiri. Bila kebijakan pricing berubah, model harus dilatih ulang, dan varian challenger berfungsi sebagai cadangan.",
            "Dataset tidak punya dimensi waktu, sehingga validasi out-of-time, uji baku untuk model risiko, tidak dapat dilakukan.",
            "Bias seleksi tetap ada: data hanya memuat aplikasi yang disetujui di masa lalu, sehingga perilaku pemohon yang dulu ditolak tidak terobservasi. Reject inference adalah item pertama pada peta jalan.",
            "Jadwal tata kelola yang dikirim bersama model: monitoring PSI bulanan (investigasi di atas 0,25), Gini dan KS triwulanan (rekalibrasi bila turun 10%), rekalibrasi cut-off tiap enam bulan, pelatihan ulang penuh tahunan, dan adu champion-challenger yang berjalan terus.",
          ],
        },
      },
    },
  },

  "ewallet-fraud-detection": {
    title: "Deteksi Fraud Transaksi E-Wallet",
    description:
      "Membangun sistem deteksi fraud real-time pada 6,36 juta transaksi mobile money dengan rasio ketidakseimbangan 1:774, sekaligus membongkar artefak simulator yang membuat sebagian besar proyek PaySim melaporkan skor sempurna.",
    longDescription:
      "Pipeline deteksi fraud ujung ke ujung pada 6,36 juta transaksi mobile money PaySim: profiling data, rekayasa fitur perilaku, penanganan ketidakseimbangan kelas ekstrem, pemodelan terawasi dan tak terawasi, evaluasi berbasis mitigasi risiko, explainability SHAP, dan dasbor peringatan Streamlit. Kontribusi pembedanya adalah satu langkah diagnostik yang paling sering dilewati proyek fraud: menguji apakah metrik yang nyaris sempurna itu nyata sebelum melaporkannya.",
    caseStudy: {
      context:
        "Portofolio Data Science Perbankan · Keamanan transaksi digital · Proyek individu ujung ke ujung pada dataset mobile money PaySim.",
      problemHeading: "Latar Belakang Bisnis",
      problem: [
        "Dari 6.362.620 transaksi, hanya 8.213 yang merupakan fraud. Itu 0,13%, rasio 1 banding 774, dan itu membuat akurasi menjadi metrik tanpa makna: model yang menjawab \"semua transaksi aman\" mendapat akurasi 99,87% sambil membiarkan seluruh kerugian terjadi.",
        "Biaya bisnisnya berdua sisi dan saling tarik-menarik. Fraud yang lolos adalah kerugian langsung, klaim nasabah, dan risiko reputasi. Transaksi sah yang diblokir adalah pengguna yang kesal, beban tim review, dan pada akhirnya churn. Mengoptimalkan salah satunya saja menghasilkan sistem yang tidak bisa dioperasikan siapa pun.",
        "Karena itu targetnya tidak pernah berupa satu skor. Targetnya sepasang: menangkap minimal 90% fraud sambil menjaga alert rate cukup rendah agar tim review sungguhan sanggup memproses antreannya, dan membuat setiap alert cukup bisa dijelaskan untuk ditindaklanjuti analis dan diaudit regulator.",
        "Solusinya adalah classifier XGBoost yang divalidasi secara kronologis dengan ambang yang dikalibrasi pada jendela validasi terpisah, Isolation Forest sebagai lapisan kedua tak terawasi, penjelasan SHAP pada tingkat global maupun per transaksi, dan dasbor Streamlit di mana ambang blokir adalah slider yang dikendalikan tim risiko, bukan konstanta yang terkubur di dalam kode.",
      ],
      highlightLabels: [
        "Transaksi Dianalisis",
        "Precision",
        "Recall",
        "Gangguan ke Pengguna",
      ],
      sections: {
        dataset: {
          heading: "Pemahaman Data",
          navLabel: "Data",
          body:
            "6.362.620 transaksi sepanjang 743 jam (sekitar 31 hari), tanpa nilai kosong dan tanpa duplikat. Label fraud muncul 8.213 kali, memberi ketidakseimbangan 1:774 yang mendikte setiap pilihan metodologis di bawahnya.",
          bullets: [
            "Fraud muncul persis pada dua tipe transaksi, pola klasik kuras lalu tarik tunai: TRANSFER pada fraud rate 0,7688% (4.097 dari 532.909) dan CASH_OUT pada 0,1840% (4.116 dari 2.237.500).",
            "PAYMENT, CASH_IN, dan DEBIT tidak memuat satu pun fraud pada 3,59 juta transaksi, dan itu sendiri adalah sinyal pemodelan, bukan sekadar keingintahuan.",
            "Median nominal fraud adalah 441.423 berbanding 171.034 pada transaksi sah bertipe sama, jadi nilai absolut membawa sinyal tetapi jauh dari cukup bila berdiri sendiri.",
          ],
          captions: [
            "Fraud rate per tipe transaksi. Tiga dari lima tipe tidak memuat fraud sama sekali, yang mempersempit masalah sesungguhnya ke rantai TRANSFER dan CASH_OUT.",
          ],
        },
        eda: {
          heading: "Eksplorasi Data & Temuan Kritis",
          navLabel: "EDA",
          body:
            "Sebelum memercayai metrik apa pun, satu aturan sederhana diuji: tandai setiap TRANSFER atau CASH_OUT yang menguras saldo pengirim tepat sampai nol. Hasilnya menentukan bagaimana keseluruhan proyek ini dilaporkan.",
          bullets: [
            "Aturan satu baris itu menangkap 8.024 dari 8.213 fraud, yaitu 97,7%, dengan tepat 1 false positive dari 2,77 juta transaksi.",
            "Penyebabnya adalah simulatornya, bukan pelakunya: agen fraud PaySim selalu mengosongkan rekening korban sepenuhnya. Fraudster sungguhan tidak sekooperatif itu. Mereka memecah nominal, menyisakan saldo, dan meniru pola belanja normal.",
            "Melaporkan F1 99,9% yang dibangun di atas jalan pintas itu akan benar secara teknis dan tidak berguna secara praktis, jadi proyek ini melaporkan dua skenario alih-alih satu.",
            "Skenario penuh memakai seluruh 25 fitur dan merupakan model terbaik untuk dataset ini. Skenario realistis membuang lima fitur rawan artefak (is_full_balance_transfer, is_origin_balance_drained, origin_balance_error, origin_balance_delta, amount_to_origin_balance_ratio) dan itulah angka yang dipakai menetapkan ekspektasi produksi.",
            "Setiap angka utama yang dikutip untuk proyek ini berasal dari skenario realistis, karena angka skenario penuh mengukur simulatornya alih-alih modelnya.",
          ],
        },
        preprocessing: {
          heading: "Praproses & Feature Engineering",
          body:
            "Dua puluh lima fitur pada tiga sudut pandang perilaku, dengan seluruh statistik historis di-fit hanya pada jendela waktu paling awal sehingga tidak ada informasi masa depan yang bocor mundur.",
          bullets: [
            "Data dipisah secara kronologis berdasarkan step menjadi tiga jendela berurutan: fit (4.104.531 transaksi), validasi (1.009.353), dan uji (1.248.736). Split acak akan membocorkan informasi masa depan ke pelatihan, dan ambang keputusan dikalibrasi pada validasi sehingga tidak pernah dipilih di test set.",
            "Kelompok integritas saldo: origin_balance_error, destination_balance_error, origin_balance_delta, destination_balance_delta, is_origin_balance_drained, dan is_destination_balance_silent. Galat pembukuan dan saldo penerima yang tidak bergerak adalah penanda manipulasi.",
            "Kelompok rasio nilai transaksi: amount_to_origin_balance_ratio, amount_to_type_mean_ratio, amount_to_hour_mean_ratio, is_full_balance_transfer, dan amount_log. Nominal janggal hanya janggal secara relatif terhadap saldo pemiliknya dan rata-rata historis tipe serta jam tersebut.",
            "Kelompok waktu dan tipe: hour_of_day, is_low_activity_hour, is_high_risk_type, is_merchant_destination, plus one-hot lima tipe transaksi. Fraud memanfaatkan jam sepi dan rantai TRANSFER ke CASH_OUT.",
            "day_index sengaja dibuang. Indeks hari tidak bisa diekstrapolasi ke periode uji dan hanya akan mendorong model menghafal jendela pelatihan.",
            "Ketidakseimbangan kelas ditangani dengan scale_pos_weight = 1204 sebagai bawaan alih-alih SMOTE. Pada gradient boosting, pembobotan gradien memberi efek setara tanpa mensintesis 4 juta tetangga terdekat dan tanpa menciptakan titik minoritas artifisial. SMOTE tetap tersedia lewat flag untuk pembanding.",
          ],
        },
        modeling: {
          heading: "Pemodelan",
          navLabel: "Modeling",
          body:
            "Tiga model dengan tiga peran yang jelas berbeda: satu terawasi sebagai model utama, satu terawasi sebagai pembanding, dan satu tak terawasi sebagai jaring pengaman yang dilatih hanya pada transaksi sah sehingga bisa menandai pola yang belum pernah dilabeli.",
          bullets: [
            "XGBoost sebagai model utama: 400 pohon, max_depth 6, tree_method hist, eval_metric aucpr.",
            "LightGBM sebagai pembanding: 400 pohon, num_leaves 63, min_child_weight 5.",
            "Isolation Forest sebagai lapisan tak terawasi: 200 pohon, max_samples 256, di-fit hanya pada transaksi sah.",
            "Satu detail konfigurasi menentukan apakah proyek ini berjalan sama sekali. Dengan min_child_weight bawaan LightGBM (1e-3) dan scale_pos_weight di atas 1000, model membelah daun sampai setiap kasus fraud terhafal: probabilitas jenuh di 0 dan 1, dan PR-AUC runtuh dari 0,86 menjadi 0,005. Menaikkan min_child_weight ke 5 memulihkannya sepenuhnya. Ini jenis kegagalan yang tampak seperti pipeline rusak padahal sebenarnya hyperparameter yang berinteraksi dengan pembobotan ekstrem.",
          ],
        },
        evaluation: {
          heading: "Evaluasi",
          navLabel: "Evaluasi",
          body:
            "Ambang tidak pernah dibiarkan di 0,5. Kebijakan operasinya adalah presisi tertinggi yang masih memenuhi target recall 90%, dikalibrasi pada jendela validasi lalu diterapkan tanpa perubahan pada jendela uji berisi 1.248.736 transaksi dengan 4.250 fraud.",
          bullets: [
            "XGBoost, skenario realistis: precision 93,91%, recall 90,73%, F1 0,9229, PR-AUC 0,9765, alert rate 0,33%.",
            "LightGBM, skenario realistis: precision 48,20% pada recall yang sebanding yaitu 89,34%, PR-AUC 0,4765. Separuh alert-nya palsu, yang berarti melipatgandakan beban review tanpa tambahan cakupan.",
            "Isolation Forest: recall 91,44%, setara XGBoost, tetapi pada presisi 0,47% dan alert rate 66,33%. Ia memperlihatkan persis mengapa recall sendirian menyesatkan. E-wallet yang memblokir dua dari tiga transaksi akan kehilangan penggunanya dalam sehari, dan itulah alasan Isolation Forest ditempatkan sebagai lapisan kedua alih-alih lapisan utama.",
            "Confusion matrix XGBoost pada skenario realistis: 1.244.236 true negative, 250 false positive, 394 false negative, dan 3.856 true positive.",
            "Membaca tiap kuadran dalam bahasa bisnis: 394 fraud lolos (kerugian langsung, klaim nasabah, risiko reputasi), 250 transaksi sah tertahan (pengguna kesal dan beban review), dan 3.856 fraud dicegah.",
            "Sebagai pembanding, skenario penuh mencapai precision 100,00% dan recall 99,34% dengan nol false positive. Angka itu dilaporkan terbuka lalu dikesampingkan, karena ia mengukur jalan pintas kuras saldo milik simulator alih-alih kemampuan model menemukan fraud.",
          ],
          captions: [
            "Kurva precision-recall, skenario realistis. PR-AUC adalah ringkasan yang jujur ketika kelas positif hanya 0,13% data, dan jarak antara XGBoost dengan dua lainnya jauh lebih lebar di sini dibanding yang disiratkan ROC-AUC.",
            "Kurva yang sama dengan fitur rawan artefak dikembalikan. Semuanya nyaris sempurna, dan justru hasil seperti inilah yang seharusnya memicu penyelidikan alih-alih menjadi judul.",
            "XGBoost pada jendela uji, skenario realistis: 3.856 fraud tertangkap berbanding 394 yang lolos dan 250 transaksi sah yang tertahan.",
            "Isolation Forest pada recall yang sama. Kolom false positive-nyalah yang mendiskualifikasi ia sebagai model utama: cakupan yang setara tidak ada gunanya bila harganya 66% dari seluruh transaksi.",
            "Kurva trade-off ambang. Inilah grafik yang benar-benar dinegosiasikan tim risiko, karena titik yang dipilih adalah keputusan kapasitas sama besarnya dengan keputusan statistik.",
          ],
        },
        explainability: {
          heading: "Explainability (SHAP)",
          body:
            "Alert tanpa alasan tidak bisa ditindaklanjuti analis dan tidak akan lolos audit regulator, jadi explainability diperlakukan sebagai deliverable alih-alih lampiran.",
          bullets: [
            "Pemicu utama pada skenario realistis: oldbalanceOrg (fraud menyasar rekening bersaldo besar), newbalanceOrig (sisa saldo sesudahnya), is_high_risk_type (TRANSFER atau CASH_OUT), amount_to_type_mean_ratio (nominal jauh di atas rata-rata historis tipe tersebut), dan nominal mentahnya.",
            "Dasbor menampilkan penjelasan per transaksi alih-alih skor telanjang, sehingga analis melihat bukan \"risiko 0,97\" melainkan variabel mana yang mendorong skor itu ke sana.",
          ],
          captions: [
            "SHAP summary, skenario realistis. Dengan jalan pintas kuras saldo dihapus, model bersandar pada konteks saldo rekening dan ukuran transaksi relatif, yaitu perilaku yang bisa dikenali sekaligus dibantah oleh analis fraud.",
          ],
        },
        impact: {
          heading: "Dampak Bisnis & Deployment",
          navLabel: "Dampak",
          body:
            "Diukur sepanjang jendela uji pada skenario realistis, sehingga angka dampaknya membawa catatan kejujuran yang sama dengan metrik di belakangnya.",
          bullets: [
            "6,64 miliar satuan nilai fraud berhasil dicegah, yaitu 99,34% dari total nilai fraud pada periode itu.",
            "Hanya 250 transaksi sah yang tertahan dari 1.244.486, tingkat gangguan 0,02% bagi pengguna sungguhan.",
            "Alert rate 0,33% menjaga antrean review harian tetap di dalam kapasitas tim operasional sungguhan, dan kapasitas itulah kendala yang menentukan apakah sebuah model fraud benar-benar bisa dipasang.",
            "Dikirim sebagai dasbor Streamlit dengan tiga tab: alert real-time (formulir transaksi, banner alert, gauge probabilitas, skor anomali, pemicu SHAP), screening batch (unggah CSV berskema PaySim, dapatkan tabel terurut risiko dan daftar alert yang bisa diunduh), dan performa model (kedua skenario berdampingan).",
            "Ambang blokir adalah slider di sidebar, bukan konstanta. Ambang lebih rendah menaikkan recall dan menambah alert palsu, dan pertukaran itu adalah keputusan bisnis yang berubah mengikuti kapasitas tim review, sehingga tempatnya di antarmuka alih-alih di dalam kode.",
            "Tier risiko yang ditampilkan ke operator: TINGGI pada atau di atas ambang (blokir dan verifikasi), SEDANG pada setengah ambang (antrean pemantauan), dan RENDAH di bawah itu (lolos tanpa gangguan).",
          ],
        },
        limitations: {
          heading: "Batasan",
          body:
            "Lima hal yang memisahkan hasil portofolio dari sistem produksi.",
          bullets: [
            "PaySim adalah data simulasi. Pola kuras sampai nol tidak mewakili fraud nyata, dan bahkan angka skenario realistis pun perlu divalidasi ulang pada data produksi.",
            "Belum ada profil per akun. Fitur velocity (transaksi per jam per akun), jumlah penerima unik, dan jarak dari kebiasaan pengguna membutuhkan feature store dengan agregasi bergulir. Inilah peningkatan terbesar yang tersedia berikutnya.",
            "Label datang terlambat di dunia nyata. Konfirmasi fraud bisa memakan waktu berhari-hari, jadi pipeline produksi perlu menampung label yang menyusul dan pelatihan ulang terjadwal.",
            "Pemantauan drift wajib. Distribusi transaksi bergeser mengikuti kampanye promo, musim, dan taktik fraudster, sehingga PSI fitur dan alert rate perlu ditinjau mingguan.",
            "Ambang adalah keputusan bisnis. Kapasitas tim review menentukan berapa banyak alert per hari yang sanggup ditangani, jadi ia harus dikalibrasi ulang setiap kali kapasitas itu berubah.",
          ],
        },
      },
    },
  },

  "ewallet-churn-promo-sensitivity": {
    title: "Churn E-Wallet & Sensitivitas Promo",
    description:
      "Membuktikan bahwa belanja promo sama sekali tidak menahan pengguna e-wallet, lalu membangun model risiko churn dan playbook retensi senilai net benefit Rp78,3 juta tanpa tambahan subsidi.",
    longDescription:
      "Analisis retensi untuk e-wallet: memprediksi siapa yang akan berhenti bertransaksi, mengukur seberapa besar belanja promosi benar-benar menahan mereka, dan menyusun playbook retensi yang tidak bertumpu pada bakar uang. Dikirim sebagai notebook Colab, pipeline Python modular, dan dasbor Streamlit dengan matriks aksi risiko dikali nilai.",
    caseStudy: {
      context:
        "Portofolio Data Science Perbankan · Analitik growth dan retensi dalam konteks GoPay / DANA / OVO · Proyek individu ujung ke ujung.",
      problemHeading: "Latar Belakang Bisnis",
      problem: [
        "Mengakuisisi pengguna e-wallet di Indonesia jauh lebih mahal daripada mempertahankan yang sudah ada, namun refleks tim growth ketika churn naik hampir selalu sama: tambah cashback, tambah kupon. Refleks itu menggerus unit economics tanpa jaminan siapa pun benar-benar bertahan.",
        "Kemungkinan tidak nyaman yang tidak pernah diuji adalah bahwa belanja promo dan retensi berkorelasi karena alasan yang sama sekali tidak berhubungan dengan sebab-akibat. Pengguna yang lebih sering bertransaksi secara alami mengumpulkan lebih banyak cashback, sehingga cashback tampak menahan mereka padahal ia hanya mengikuti mereka.",
        "Tiga pertanyaan membingkai pekerjaan ini: apa yang sebenarnya membedakan pengguna yang berhenti bertransaksi dari yang bertahan, apakah pengguna promo yang lebih berat benar-benar lebih loyal, dan siapa yang harus diselamatkan lebih dulu serta dengan taktik apa selain subsidi.",
        "Solusinya adalah model risiko churn yang dipakai untuk memeringkat alih-alih untuk mengklaim akurasi, matriks segmentasi risiko dikali nilai yang memberi taktik berbeda pada tiap sel, dan tiga program retensi yang dihitung terhadap pendapatan yang dilindunginya. Terminologi e-commerce pada dataset sumber dipetakan ke konsep e-wallet (OrderCount menjadi transaction_count, CouponUsed menjadi promo_redemptions, DaySinceLastOrder menjadi days_since_last_transaction) dengan pemetaan lengkap terpusat di satu berkas konfigurasi.",
      ],
      highlightLabels: ["Pengguna Dianalisis", "Rasio Churn", "Net Benefit", "ROI Program"],
      sections: {
        dataset: {
          heading: "Pemahaman Data",
          navLabel: "Data",
          body:
            "5.630 pengguna dengan 20 kolom dan rasio churn 16,84%. Tujuh kolom membawa 4 sampai 5% nilai kosong yang diimputasi dengan median, dan pipeline model juga membawa SimpleImputer sendiri agar data produksi yang belum terlihat tetap aman.",
          bullets: [
            "Komposisi kelas sekitar 1 banding 5 cukup timpang sehingga ambang keputusan bawaan 0,5 akan menjadi titik operasi yang salah, dan itu membentuk cara evaluasinya nanti.",
            "Nilai monetary adalah proksi. Dataset tidak membawa nilai transaksi, sehingga rata-rata cashback dipakai sebagai gantinya. Pada data produksi ini harus diganti dengan GMV atau take rate sungguhan, dan substitusi itu ditandai alih-alih dikubur.",
            "Label kategori dinormalisasi saat pemuatan, karena berkas mentahnya mengeja kategori yang sama dengan beberapa cara berbeda.",
          ],
          captions: [
            "Komposisi target: churn 16,84%. Cukup kecil sehingga akurasi tidak informatif, cukup besar sehingga kelas minoritasnya masih bisa dipelajari.",
          ],
        },
        eda: {
          heading: "Eksplorasi Data",
          navLabel: "EDA",
          body:
            "Di sinilah proyek ini mendapatkan kesimpulannya. Diagnosis dijalankan terhadap asumsi tim growth itu sendiri lebih dulu, karena rekomendasi untuk memangkas belanja promo butuh buktinya di depan, bukan di belakang.",
          bullets: [
            "Penggunaan promo datar terhadap churn di seluruh kuartil kupon: 18,4%, 15,7%, 16,8%, 16,5%. Tidak ada gradien, yang berarti promo bukan tuas retensi.",
            "Cashback per transaksi bergerak berlawanan dengan asumsi: kuartil tertinggi justru paling loyal (churn 10,1% berbanding 22,6%). Cashback mengikuti nilai belanja, ia tidak menyebabkannya.",
            "Tenure adalah kisah sebenarnya. Pengguna dengan tenure tiga bulan atau kurang churn pada 41,9%; yang sudah melewati lima belas bulan churn pada 4,2%. Churn adalah masalah onboarding, bukan masalah harga.",
            "Keluhan adalah pendorong terkuat kedua: churn 31,7% pada pengguna yang mengeluh berbanding 10,9% pada yang tidak.",
            "Skor kepuasan tidak protektif dengan sendirinya. Pengguna dengan skor 5 dari 5 tetap churn pada 23,8%, karena penilaian tinggi tanpa kebiasaan bertransaksi tidak menahan siapa pun.",
            "Kota tier 3 churn pada 21,4% berbanding tier 1 pada 14,5%, jadi kota lebih kecil butuh perlakuan berbeda alih-alih kampanye nasional yang sama.",
          ],
          captions: [
            "Grafik yang membingkai ulang seluruh proyek. Churn praktis datar di seluruh kuartil promo, jadi uang yang dibelanjakan untuk menahan pengguna bukan itu yang sebenarnya menahan mereka.",
            "Churn terhadap tenure. Tiga bulan pertama membawa rasio churn 41,9% berbanding 4,2% setelah lima belas bulan, yang memindahkan letak masalah dari harga ke onboarding.",
            "Keluhan hampir melipattigakan rasio churn. Masalah layanan yang tidak terselesaikan ternyata pendorong terbesar kedua, di atas apa pun yang berkaitan dengan harga.",
            "Frekuensi transaksi terhadap churn. Kebiasaan, bukan besaran diskon, yang memprediksi seseorang bertahan.",
            "Churn per segmen RFM, dan inilah yang membuat segmentasinya bisa ditindaklanjuti alih-alih sekadar deskriptif.",
            "Heatmap korelasi fitur, dipakai untuk menangkap rasio rekayasa yang redundan sebelum masuk ke model.",
          ],
        },
        preprocessing: {
          heading: "Praproses & Feature Engineering",
          body:
            "Tiga keluarga fitur dibangun: segmentasi RFM, rasio sensitivitas promo, serta sinyal keaktifan dan layanan.",
          bullets: [
            "RFM: recency_days, frequency_transactions, dan monetary_value, masing-masing diberi skor kuintil 1 sampai 5, dijumlahkan menjadi rfm_score, lalu dipetakan ke segmen Champion, Loyal, Potential Loyalist, Needs Attention, dan At Risk.",
            "promo_redemption_rate (kupon dibagi transaksi) mengukur intensitas pemakaian kupon; cashback_per_transaction mengukur subsidi efektif per transaksi.",
            "promo_dependency_index merata-ratakan persentil kedua rasio menjadi satu angka 0 sampai 1, sehingga ketergantungan promo menjadi satu besaran yang bisa dibandingkan alih-alih dua.",
            "is_promo_hunter menandai pengguna dengan ketergantungan pada atau di atas persentil 75 dan skor monetary 2 atau kurang: konsumsi subsidi tinggi dengan nilai balik rendah. Kelompok itu ternyata 10,3% dari basis pengguna.",
            "Sinyal keaktifan dan layanan: transactions_per_tenure_month, app_minutes_per_transaction, is_dormant (lebih dari 7 hari tanpa transaksi), is_new_user (tenure 3 bulan atau kurang), satisfaction_gap, dan unresolved_complaint_risk.",
          ],
        },
        modeling: {
          heading: "Pemodelan",
          navLabel: "Modeling",
          body:
            "Split stratified 80:20 dengan bobot kelas seimbang, dan ambang keputusan dipilih pada F1 maksimum alih-alih dibiarkan di 0,5, karena kelas churn hanya 16,8% populasi.",
          bullets: [
            "LightGBM menjadi juara: ROC-AUC 0,9992, PR-AUC 0,9970, F1 0,9869, precision 0,9843, recall 0,9895 pada ambang 0,44, dengan ROC-AUC CV 5-fold sebesar 0,9780.",
            "Random Forest menyusul pada ROC-AUC 0,9887, PR-AUC 0,9471, dan F1 0,8672.",
            "Setiap metrik dipilih dengan alasan: ROC-AUC mengukur kualitas pemeringkatan risiko yang memang dipakai kampanye retensi untuk memilih target, F1 menyeimbangkan antara mengganggu pengguna loyal dan melewatkan pengguna yang benar-benar pergi, PR-AUC lebih jujur pada kelas minoritas, dan recall sengaja dijaga tinggi karena melewatkan satu pengguna churn lebih mahal daripada mengirim satu notifikasi yang tidak perlu.",
            "Pendorong churn teratas: monetary_value, cashback_per_transaction, promo_dependency_index, transactions_per_tenure_month, tenure_months, satisfaction_score, dan has_complaint.",
          ],
          captions: [
            "Kurva ROC untuk kedua kandidat. Pemisahannya ekstrem, dan itulah temuan yang dibahas di bagian evaluasi alih-alih hasil yang layak dirayakan.",
            "Kurva precision-recall, sudut pandang yang lebih jujur pada kelas minoritas 16,8%.",
          ],
        },
        evaluation: {
          heading: "Evaluasi",
          navLabel: "Evaluasi",
          body:
            "Bagian evaluasi proyek ini sebagian besar adalah argumen yang melawan angka utamanya sendiri, dan justru itulah yang membuat sisanya bisa dipercaya.",
          bullets: [
            "Dataset publik ini nyaris terpisah secara linear. LightGBM tanpa satu pun fitur turunan sudah mencapai ROC-AUC sekitar 0,9996, sehingga angka utama 0,9992 adalah sifat datanya, bukan bukti keterampilan pemodelan.",
            "Tolok ukur produksi yang realistis untuk churn adalah 0,75 sampai 0,85. Karena itu setiap rekomendasi di proyek ini bersandar pada pemeringkatan risiko dan pola pendorong churn, tidak pernah pada klaim akurasi absolut.",
            "Skor risiko untuk seluruh populasi dihitung dengan prediksi out-of-fold pada 5 fold, sehingga tidak ada pengguna yang diskor oleh model yang pernah melihatnya saat pelatihan.",
            "Kepentingan fitur dibaca sebagai deskripsi perilaku mana yang muncul bersama churn dan diperiksa silang terhadap EDA, alih-alih diperlakukan sebagai bukti sebab-akibat.",
          ],
          captions: [
            "Confusion matrix pada ambang optimal F1 sebesar 0,44 alih-alih ambang bawaan 0,5.",
            "Pendorong churn menurut LightGBM. Ketergantungan promo berperingkat tinggi sebagai penanda pengguna bernilai rendah, konsisten dengan temuan EDA bahwa promo tidak menahan siapa pun.",
          ],
        },
        segmentation: {
          heading: "Segmentasi Risiko dan Nilai",
          body:
            "Skor risiko sendirian tidak mengatakan apa pun kepada tim growth tentang anggaran. Menyilangkannya dengan nilai mengubahnya menjadi sembilan sel, masing-masing dengan taktik dan batas biaya sendiri. Ambangnya: risiko tinggi pada 0,60 ke atas, sedang 0,30 sampai 0,60, dan rendah di bawah 0,30.",
          bullets: [
            "Risiko tinggi: 908 pengguna, churn aktual 95,6%, rata-rata tenure 3,5 bulan.",
            "Risiko sedang: 77 pengguna, churn aktual 39,0%, rata-rata tenure 4,3 bulan.",
            "Risiko rendah: 4.645 pengguna, churn aktual 1,1%, rata-rata tenure 11,5 bulan.",
            "Risiko tinggi dan nilai tinggi mendapat priority save: kontak personal ditambah pembebasan biaya admin selama tiga bulan.",
            "Risiko tinggi dan nilai rendah mendapat nudge otomatis tanpa subsidi sama sekali, dan sel inilah tempat sebagian besar anggaran cashback selama ini terbuang.",
            "Sel risiko sedang difokuskan pada pembentukan kebiasaan (autodebet tagihan, pengingat mingguan) dan sel risiko rendah beralih ke advocacy, cross-sell, dan komunikasi massal berbiaya rendah.",
          ],
          captions: [
            "Matriks risiko dikali nilai. Tiap sel membawa taktik dan batas biayanya sendiri, dan itulah yang menghentikan anggaran retensi dari dibagi rata ke pengguna yang kebutuhannya sangat berbeda.",
            "Profil tiap tier risiko. Kelompok risiko tinggi dicirikan oleh tenure pendek dan riwayat keluhan, yang mengarahkan playbook ke onboarding dan pemulihan layanan alih-alih ke harga.",
          ],
        },
        impact: {
          heading: "Playbook Retensi & Dampak Bisnis",
          navLabel: "Dampak",
          body:
            "Tiga program, masing-masing terikat pada bukti tertentu dan masing-masing dirancang bekerja tanpa tambahan subsidi. Asumsinya terpusat di berkas konfigurasi: pendapatan bersih Rp25.000 per pengguna aktif per bulan, horizon 12 bulan, tingkat penyelamatan 30%, dan biaya program Rp4.000 per pengguna.",
          bullets: [
            "1. Onboarding pembentuk kebiasaan 30 hari untuk pengguna baru. Bukti: 27,7% basis pengguna bertenure tiga bulan atau kurang dan churn pada 41,9%. Taktik: misi aktivasi bertahap (top up, bayar tagihan, pasang autodebet) dengan hadiah non-tunai seperti badge tier, limit transfer lebih besar, dan akses fitur prioritas. Metrik keberhasilan: minimal tiga transaksi pada 30 hari pertama.",
            "2. Service recovery loop untuk pengguna yang mengeluh. Bukti: churn 31,7% setelah keluhan berbanding 10,9% tanpa keluhan, dan 54,7% kelompok risiko tinggi pernah mengajukan keluhan. Taktik: SLA penyelesaian tiket 24 jam, follow-up proaktif pasca-resolusi, dan jalur dukungan prioritas bagi pengguna bernilai tinggi yang skor risikonya naik.",
            "3. Realokasi cashback merata ke nilai fungsional. Bukti: churn datar di seluruh kuartil promo sementara 10,3% pengguna adalah promo hunter bernilai rendah. Taktik: hentikan cashback seragam dan ganti dengan manfaat fungsional seperti autodebet tagihan bebas biaya, split bill, dan reward berbasis tier untuk pengguna bernilai tinggi. Metrik keberhasilan: biaya promo per pengguna aktif turun tanpa kenaikan churn.",
            "Terkuantifikasi: 985 pengguna ditargetkan pada tier risiko tinggi dan sedang, Rp274,0 juta pendapatan tahunan berisiko, Rp82,2 juta dapat diselamatkan pada tingkat penyelamatan 30%, berbanding Rp3,9 juta biaya program non-subsidi. Net benefit Rp78,3 juta pada ROI 20,9x.",
            "Dikirim sebagai dasbor Streamlit lima tab (ringkasan, perilaku pengguna, performa model, segmentasi risiko dengan unduhan CSV target, dan playbook retensi) dengan filter sidebar untuk tier risiko, tier nilai, city tier, dan rentang tenure.",
          ],
        },
        limitations: {
          heading: "Batasan",
          bullets: [
            "Nilai monetary diproksikan dengan rata-rata cashback karena dataset tidak memuat nilai transaksi. Ganti dengan GMV atau take rate sebelum tier nilainya dipakai secara operasional.",
            "Arah recency terbalik pada data ini: pengguna churn justru terlihat baru saja bertransaksi, yang menyiratkan label churn diberikan pada satu snapshot. Definisi churn perlu divalidasi ulang sebelum dipakai di produksi, dan ini catatan terpenting dari ketiganya.",
            "Imputasi median diterapkan pada tujuh kolom dengan 4 sampai 5% nilai kosong.",
            "Langkah berikutnya: kalibrasi probabilitas (Platt atau isotonic), uji A/B playbook per sel matriks, dan penambahan fitur perilaku berbasis time-series seperti tren transaksi mingguan.",
          ],
        },
      },
    },
  },

  "ewallet-user-segmentation": {
    title: "Segmentasi Pengguna E-Wallet (RFM & Clustering)",
    description:
      "Mensegmentasi 4.338 pengguna e-wallet menjadi empat persona dengan RFM dan K-Means, memperlihatkan bahwa kelompok pengguna terbesar (36% basis) hanya menghasilkan 5% nilai transaksi dan tidak layak menerima anggaran promo yang selama ini didapatnya.",
    longDescription:
      "Proyek segmentasi perilaku yang mengubah riwayat transaksi mentah menjadi empat persona pengguna bernama, masing-masing dengan alokasi anggaran promo dan metrik keberhasilannya sendiri. Dibangun sebagai pipeline modular di mana notebook Colab dirakit dari modul sumber yang sama dengan yang menggerakkan CLI dan dasbor Streamlit, sehingga ketiga artefak itu tidak mungkin berselisih.",
    caseStudy: {
      context:
        "Portofolio Data Science Perbankan · Segmentasi perilaku dan alokasi anggaran promo · Proyek individu ujung ke ujung.",
      problemHeading: "Latar Belakang Bisnis",
      problem: [
        "Tim growth sebuah e-wallet menjalankan satu kampanye promo untuk semua orang. Itu hanya bisa dibenarkan bila setiap pengguna bernilai sama, dan mereka tidak pernah sama. Pertanyaan yang dijawab proyek ini blak-blakan: dari sekian banyak pengguna, siapa yang layak diberi promo, siapa yang tidak membutuhkannya, dan siapa yang harus segera diselamatkan sebelum berhenti bertransaksi.",
        "Penyebab pemborosannya adalah nilai pengguna sangat terkonsentrasi sementara jumlah kepala tidak. Anggaran yang dialokasikan per kepala karena itu mengalir ke kelompok yang paling banyak jumlahnya, dan kelompok itu hampir selalu yang paling tidak bernilai.",
        "Bila dibiarkan, ini muncul sebagai pos biaya promo yang tumbuh lebih cepat daripada volume transaksi, tanpa ada seorang pun yang bisa menunjuk pengguna mana yang sebenarnya tertahan oleh uang itu.",
        "Solusinya adalah segmentasi yang dibangun dari Recency, Frequency, dan Monetary, diklaster dengan K-Means, lalu diterjemahkan menjadi empat persona bernama. Tiap persona membawa tingkat anggaran, taktik, dan metrik keberhasilannya sendiri, sehingga tim kampanye menerima sesuatu yang bisa dieksekusi alih-alih sebuah nomor klaster.",
      ],
      highlightLabels: [
        "Pengguna Tersegmentasi",
        "Persona Ditemukan",
        "Nilai dari 17% Teratas",
        "Silhouette (k=4)",
      ],
      sections: {
        dataset: {
          heading: "Pemahaman Data",
          navLabel: "Data",
          body:
            "541.909 baris transaksi sepanjang Desember 2010 sampai Desember 2011 lintas 38 negara, membawa 4.372 identitas pelanggan. Setelah pembersihan, 4.338 pengguna masuk ke dalam analisis.",
          bullets: [
            "Transaksi mentah dinormalisasi ke skema kanonik (user_id, transaction_id, transaction_date, transaction_value, region) sehingga mengganti berkas sumber lain hanya menuntut penyuntingan satu konstanta konfigurasi.",
            "Baris tanpa identitas pengguna, duplikat, transaksi batal (nomor invoice berawalan C), dan nilai non-positif semuanya dibuang sebelum agregasi.",
            "Tanggal acuan untuk recency ditetapkan sehari setelah transaksi terakhir di dataset, sehingga pengguna yang bertransaksi pada hari terakhir mendapat recency satu alih-alih nol.",
            "Dinyatakan terbuka: berkas contohnya adalah data transaksi ritel daring yang dipakai sebagai proksi riwayat e-wallet. Struktur analisisnya identik, tetapi angka absolutnya tidak mewakili perilaku dompet digital di Indonesia.",
          ],
        },
        eda: {
          heading: "Eksplorasi Data",
          navLabel: "EDA",
          body:
            "Eksplorasi diarahkan pada satu angka: seberapa terkonsentrasi nilai transaksi dibandingkan jumlah kepala. Rasio itulah yang menentukan apakah alokasi anggaran seragam masih bisa dipertahankan.",
          bullets: [
            "Power Users adalah 17% basis pengguna dan menghasilkan 66% nilai transaksi, dengan median recency 8 hari, 10 transaksi, dan nilai monetary 2.534.",
            "At-Risk VIP adalah 28% basis dan masih menghasilkan 23% nilai, tetapi recency mereka sudah merosot ke 58 hari.",
            "Cashback Hunters adalah 20% basis dan menghasilkan 5% nilai, dengan median hanya 2 transaksi dan nilai 344.",
            "Dormant Users adalah kelompok terbesar dengan 36% basis dan menghasilkan 5% nilai, dengan recency 179 hari dan satu transaksi.",
            "Kesimpulannya mengalir langsung dari empat baris itu: anggaran promo yang dibagi rata per kepala mengirim sepertiga uangnya ke kelompok dengan peluang kembali paling kecil.",
            "Data finansial menceng tajam ke kanan, sehingga sedikit pengguna bernilai sangat besar akan mendominasi jarak Euclidean dan menarik pusat klaster ke arahnya.",
          ],
          captions: [
            "Grafik yang memikul seluruh argumennya. Power Users adalah 17% basis dan 66% nilai; Dormant Users 36% basis dan 5% nilai. Alokasi anggaran per kepala mana pun terbalik terhadap gambaran ini.",
            "Sebaran RFM per persona. Pemisahannya paling bersih pada recency dan frequency, dan itulah yang membuat taktik win-back dan retensi bisa dibedakan dalam praktik.",
          ],
        },
        preprocessing: {
          heading: "Praproses & Feature Engineering",
          body:
            "Dua lapis penanganan, keduanya bertujuan menghentikan segelintir pengguna ekstrem dari menentukan letak pusat klaster.",
          bullets: [
            "Transformasi log1p diterapkan pada kolom mana pun dengan kemencengan di atas ambang 0,75, yang memampatkan ekor kanan panjang tanpa membuang pengguna yang berada di dalamnya.",
            "RobustScaler alih-alih StandardScaler, karena ia memakai median dan rentang antar-kuartil sehingga pencilan yang tersisa tidak menggeser skala bagi semua orang.",
            "Recency dihitung terhadap tanggal acuan tetap, frequency menghitung transaksi unik per pengguna, dan monetary menjumlahkan nilai transaksi per pengguna.",
            "Kolom tenure_days dibawa berdampingan agar pengguna yang baru bergabung bisa dibedakan dari yang benar-benar tidak aktif, karena keduanya sama-sama terlihat jarang bertransaksi pada jendela satu tahun.",
          ],
        },
        modeling: {
          heading: "Pemodelan",
          navLabel: "Modeling",
          body:
            "K-Means pada ruang RFM asli, dengan jumlah klaster dipilih lewat keputusan yang dinyatakan alih-alih disembunyikan.",
          bullets: [
            "Silhouette tanpa batasan memuncak pada k = 2 dengan skor 0,434. Titik siku kurva inertia berada pada k = 5. Nilai yang benar-benar dipakai adalah k = 4 dengan silhouette 0,335.",
            "Alasannya: silhouette memuncak di k = 2 karena dua gumpalan besar memang paling mudah dipisahkan secara geometris, tetapi dua kelompok tidak bisa menggerakkan alokasi anggaran. Alokasi promo menuntut minimal empat perlakuan berbeda (pertahankan, tumbuhkan, tarik kembali, hemat), dan di atas sekitar delapan tim kampanye tetap tidak sanggup mengeksekusinya secara berbeda.",
            "Karena itu pencarian dibatasi ke 4 sampai 8 klaster, dan k = 4 adalah silhouette terbaik di dalam rentang itu, berdekatan dengan siku pada k = 5. Angka tanpa batasan tetap dilaporkan utuh di notebook dan dasbor alih-alih diam-diam dibuang.",
            "PCA dipakai hanya untuk menampilkan. Tiga komponen menjelaskan 100% ragam dengan PC1 sendirian 75,6%, tetapi klaster dibentuk di ruang RFM asli agar pusat klasternya tetap bisa diterjemahkan langsung ke bahasa bisnis.",
          ],
          captions: [
            "Elbow dan silhouette dihitung berdampingan. Grafiknya ditampilkan dengan optimum tanpa batasan tetap terlihat, karena jumlah klaster yang dipilih atas alasan bisnis sebaiknya dipertahankan secara terbuka alih-alih disajikan sebagai pemenang statistik.",
            "Proyeksi PCA dipecah menjadi satu panel per persona, dengan seluruh populasi berwarna abu-abu sebagai konteks. Pemisahan panel menjaga tiap kelompok tetap terbaca di wilayah yang bersinggungan, dan ia tidak bergantung pada kemampuan pembaca membedakan empat warna sekaligus.",
          ],
        },
        evaluation: {
          heading: "Penamaan Persona & Validasi",
          navLabel: "Evaluasi",
          body:
            "Nomor klaster bukan deliverable. Tiap klaster dibandingkan dengan median populasi pada tiga sumbu (masih baru bertransaksi atau tidak, sering atau tidak, bernilai besar atau tidak), dan delapan kombinasi yang mungkin dipetakan ke arketipe persona yang tetap.",
          bullets: [
            "Tabel pemetaannya mencakup kedelapan kombinasi: Power Users, Cashback Hunters, Big Ticket Spenders, New and Casual Users, At-Risk VIP, Fading Regulars, Lapsed Big Spenders, dan Dormant Users.",
            "Pemetaannya deterministik, sehingga dataset yang sama selalu menghasilkan nama persona yang sama dan penamaannya tidak pernah bergantung pada indeks klaster acak yang kebetulan diberikan K-Means.",
            "Indeks perilaku membandingkan tiap persona terhadap median populasi di mana 100 adalah median. Recency dibalik menjadi skor kebaruan agar arah warnanya konsisten: biru selalu berarti perilaku lebih kuat, merah selalu lebih lemah.",
            "Palet grafik diuji keterbacaannya untuk buta warna pada setiap pasangan warna. Paletnya memuat empat slot, sehingga klaster kelima dan seterusnya ditampilkan lewat panel terpisah atau mode sorot alih-alih dengan menambah warna yang sulit dibedakan.",
          ],
          captions: [
            "Indeks perilaku per persona terhadap median populasi (100). Membalik recency menjadi skor kekuatan menjaga arah warnanya tetap bermakna, sehingga pembaca tidak perlu mengingat bahwa recency rendah itu bagus.",
          ],
        },
        impact: {
          heading: "Alokasi Anggaran Promo",
          navLabel: "Dampak",
          body:
            "Segmentasi ini mengganti satu kampanye seragam dengan empat perlakuan yang berbeda baik anggaran maupun bentuknya.",
          bullets: [
            "Power Users, alokasi rendah: mereka sudah bertransaksi tanpa insentif, sehingga diskon di sini menggerus margin pada pendapatan yang memang sudah pasti masuk. Yang mereka butuhkan adalah pengakuan status, bukan potongan harga: loyalitas berjenjang, akses fitur lebih awal, dan layanan prioritas. Metrik keberhasilan: retention rate 90 hari dan pertumbuhan GTV per pengguna.",
            "At-Risk VIP, alokasi tertinggi: 23% nilai transaksi dengan recency yang sudah jatuh di bawah median populasi. Satu rupiah yang dibelanjakan di sini menyelamatkan pendapatan yang sudah terbukti ada, jauh lebih murah daripada mengakuisisi pengguna baru bernilai setara. Bentuknya: kontak personal dan cashback besar sekali pakai dengan tenggat singkat. Metrik keberhasilan: reactivation rate 30 hari.",
            "Cashback Hunters, alokasi sedang dengan batas ambang ROI: mereka responsif terhadap promo tetapi ukuran tiketnya kecil, sehingga promo datar hanya mensubsidi transaksi yang tetap kecil. Cashback bertingkat dengan minimum belanja yang naik bertahap menaikkan nilai keranjang tanpa menaikkan anggaran. Metrik keberhasilan: average ticket dan rasio biaya promo terhadap GTV.",
            "Dormant Users, alokasi sangat rendah: hentikan promo bernilai besar dan jaga hubungannya lewat komunikasi berbiaya rendah saja. Uang yang dihemat dari kelompok terbesar inilah yang persis mendanai kampanye win-back At-Risk VIP.",
            "Dikirim sebagai dasbor Streamlit empat tab: ringkasan persona dengan kartu aksi promo, peta klaster PCA 2D dan 3D dengan mode sorot per persona, bukti kualitas model, dan penjelajah pengguna dengan unduhan CSV. Jumlah klaster dapat diubah dari sidebar dan berkas transaksi lain bisa diunggah langsung dari sana.",
          ],
        },
        limitations: {
          heading: "Batasan",
          bullets: [
            "RFM hanya menggambarkan masa lalu. Segmentasi ini menjelaskan siapa yang bernilai, bukan siapa yang akan merespons promo. Menjawab pertanyaan kedua membutuhkan uji terkontrol A/B atau model uplift.",
            "Jendelanya satu tahun, sehingga pengguna yang baru bergabung terlihat jarang bertransaksi semata karena belum punya cukup waktu. Kolom tenure_days ada untuk memisahkan kasus itu.",
            "Klaster perlu dilatih ulang berkala. Perilaku bergeser, dan jadwal bulanan atau kuartalan menjaga persona tetap mencerminkan keadaan terkini.",
            "Nilai transaksi diambil apa adanya, tanpa penyesuaian pengembalian dana atau promo yang sudah terpakai. Bila data itu tersedia, gunakan nilai bersih agar Monetary tidak melebih-lebihkan kontribusi pengguna.",
            "Dataset contohnya adalah data ritel daring yang dipakai sebagai proksi e-wallet, sehingga angka absolutnya tidak boleh dikutip sebagai perilaku e-wallet Indonesia.",
          ],
        },
      },
    },
  },
};
