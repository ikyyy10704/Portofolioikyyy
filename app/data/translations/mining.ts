import type { ProjectTranslation } from "../localize";

export const miningTranslations: Record<string, ProjectTranslation> = {
  "mining-predictive-maintenance": {
    title: "Predictive Maintenance Alat Berat Tambang",
    description:
      "Membangun klasifikasi kondisi pra-kerusakan alat berat tambang dari 5 sensor telemetri dan 41 fitur rekayasa, menangkap 84% kerusakan sebelum terjadi dan menekan biaya kerusakan periode holdout sebesar 81,7%.",
    longDescription:
      "Sistem predictive maintenance ujung ke ujung untuk alat berat tambang: dari pembacaan sensor mentah, melewati feature engineering berbasis fisika mesin, validasi kronologis dan kalibrasi ambang berbasis biaya, sampai dasbor Streamlit yang menyusun prioritas work order untuk planner di site. Seluruh pipeline berada dalam satu modul yang dipakai bersama oleh notebook dan dasbor, sehingga tidak ada risiko perbedaan perhitungan antara riset dan produksi.",
    caseStudy: {
      context:
        "Portofolio Data Science Pertambangan · Proyek individu ujung ke ujung, dari data sensor mentah sampai dasbor work order yang siap dipakai.",
      problemHeading: "Latar Belakang Bisnis",
      problem: [
        "Di operasi tambang terbuka, tidak ada alat yang bekerja sendirian. Ketika satu haul truck berhenti tanpa peringatan, antrean loading menumpuk, excavator menganggur, dan target produksi shift itu meleset. Biaya sebuah kerusakan tidak pernah sebatas ongkos perbaikan; yang berhenti adalah seluruh rantai hauling.",
        "Penyebabnya adalah maintenance yang masih sebagian besar reaktif, dan ekonominya sangat asimetris. Kerusakan yang lolos deteksi (false negative) menelan sekitar $25.000 dalam bentuk unplanned downtime; alarm palsu (false positive) menelan sekitar $1.200 untuk inspeksi yang ternyata tidak perlu. Satu kerusakan yang lolos setara dengan sekitar 21 alarm palsu.",
        "Asimetri itulah yang mendikte seluruh desain model. Akurasi menjadi metrik yang menyesatkan di sini: model yang selalu menjawab \"sehat\" sudah 93,6% akurat dan 0% berguna. Karena itu proyek ini mengoptimalkan recall dan PR-AUC, dan ambang keputusannya dipilih dari kurva biaya, bukan dibiarkan di angka bawaan 0,5.",
        "Solusinya adalah classifier kondisi yang memberi skor risiko kerusakan pada setiap unit-jam, menerjemahkan probabilitas itu ke tier work order HIGH / MEDIUM / LOW beserta SLA responsnya, dan menjelaskan tiap skor dengan SHAP, sehingga tim maintenance bisa bertindak atas dasarnya alih-alih diminta memercayai kotak hitam.",
      ],
      highlightLabels: ["PR-AUC (Holdout)", "Recall", "Biaya Dihindari", "Fitur Rekayasa"],
      sections: {
        dataset: {
          heading: "Pemahaman Data",
          navLabel: "Data",
          body:
            "AI4I 2020 Predictive Maintenance Dataset memuat 10.000 pembacaan sensor × 14 kolom tanpa satu pun nilai kosong. Target Machine failure muncul 638 kali (6,38%), rasio 1 : 14,7. Tersedia lima sensor mentah: suhu udara, suhu proses, kecepatan putaran, torsi, dan tool wear. Mode kerusakan terbagi menjadi OSF 339, HDF 158, TWF 154, PWF 22, RNF 10.",
          bullets: [
            "Lima penanda mode kerusakan (TWF / HDF / PWF / OSF / RNF) dibuang dari himpunan fitur. Kelimanya adalah komponen penyusun label; mempertahankannya menghasilkan akurasi ~100% yang runtuh total di lapangan. Ini penyaring pertama antara proyek yang serius dan yang sekadar hiasan.",
            "AI4I adalah snapshot, bukan telemetry stream: tidak ada machine_id dan tidak ada timestamp. Setiap baris dipetakan secara deterministik ke 61 unit alat berat dengan stempel waktu per jam agar pipeline rolling window yang dipakai di produksi benar-benar bisa dibangun dan diuji. Pemetaan itu kausal dan reproducible, dan tidak diklaim menciptakan sinyal temporal yang memang tidak ada di data, karena itu kontribusinya diukur terbuka lewat uji ablasi.",
            "Tidak ada nilai kosong dan tidak ada baris duplikat, sehingga seluruh anggaran pembersihan data dialihkan ke pengendalian kebocoran fitur alih-alih imputasi.",
          ],
          captions: [
            "Keseimbangan kelas: 638 kerusakan berbanding 9.362 pembacaan sehat. Model yang selalu menjawab \"sehat\" sudah mencetak akurasi 93,6%, dan itulah alasan akurasi ditolak sebagai metrik keputusan.",
            "Tiap sensor mentah dipisah antara kondisi sehat dan rusak. Torsi dan kecepatan putaran memisahkan kelas paling terlihat; tool wear memperlihatkan kerusakan menumpuk mendekati batas servis 250 menit.",
          ],
        },
        eda: {
          heading: "Eksplorasi Data",
          navLabel: "EDA",
          body:
            "Eksplorasi menjawab satu pertanyaan di atas segalanya: apakah sinyal kerusakan terbaca dari sensor tunggal, atau hanya muncul pada interaksi antar sensor. Jawabannya membentuk baik himpunan fitur maupun pilihan keluarga model.",
          bullets: [
            "Tidak ada satu pun sensor mentah yang berkorelasi kuat dengan target secara sendirian. Sinyalnya hidup pada kombinasi, seperti torsi tinggi yang terjadi bersamaan dengan putaran rendah (lugging), atau tool wear tinggi bersama torsi tinggi, dan itu persis yang tidak bisa direpresentasikan baseline linear.",
            "Fitur fisika hasil rekayasa berkorelasi jauh lebih kuat dengan target dibanding sensor mentah yang membentuknya, sehingga pendekatan domain-dulu terkonfirmasi sebelum satu model pun dilatih.",
            "Riwayat sensor per unit memperlihatkan kerusakan datang sebagai perubahan kondisi mendadak, bukan degradasi perlahan. Ini peringatan awal bahwa jendela rolling 6 jam mungkin menyumbang lebih sedikit dari perkiraan, dan uji ablasi kemudian membenarkannya.",
          ],
          captions: [
            "Riwayat sensor unit dengan kerusakan terbanyak, disertai penanda kejadian kerusakan. Transisinya tajam, bukan bertahap, dan sifat data ini penting saat menafsirkan fitur time-series.",
            "Korelasi antara sensor mentah, fitur domain hasil rekayasa, dan target. overstrain_minnm dan tool wear menonjol: fitur fisika membawa sinyal yang tidak dimiliki kolom mentahnya.",
          ],
        },
        preprocessing: {
          heading: "Praproses & Feature Engineering",
          body:
            "Dua lapis fitur dibangun, fisika lebih dulu lalu statistik, menghasilkan 46 fitur siap-model. Setiap langkah bersifat kausal: hanya pembacaan sekarang dan masa lalu dari sebuah unit yang pernah dipakai.",
          bullets: [
            "Fitur domain meniru mekanisme kerusakan yang dikenal, bukan aritmetika antar kolom secara acak: temp_diff_k (proses dikurangi ambien, kemampuan buang panas), power_w (torsi kali kecepatan sudut, beban daya berlebih), overstrain_minnm (tool wear kali torsi, akumulasi overstrain), torque_per_rpm (lugging), vibration_index (simpangan rpm dari kurva daya konstan), dan wear_ratio (tool wear terhadap batas 250 menit).",
            "Fitur time-series per unit pada jendela 6 jam: rolling mean, rolling standard deviation, rolling max, delta antar pembacaan, drift 24 jam, dan z-score terhadap baseline unit itu sendiri.",
            "Ketidakseimbangan kelas diadu, bukan diasumsikan: class_weight=\"balanced\", scale_pos_weight (14,9 pada data latih), dan SMOTE dibandingkan berdampingan. SMOTE dijalankan di dalam imblearn Pipeline sehingga oversampling terjadi setelah pembagian fold; melakukannya sebelum split adalah kebocoran klasik yang mengubah skor validasi menjadi fiksi.",
            "Pembagian data bersifat kronologis, bukan acak: 20% periode terakhir (1.948 pembacaan, 132 kerusakan) ditahan dan tidak pernah disentuh selama pelatihan maupun pemilihan ambang.",
          ],
        },
        modeling: {
          heading: "Pemodelan",
          navLabel: "Modeling",
          body:
            "Empat kandidat dijalankan di bawah dua skema validasi berdampingan: TimeSeriesSplit (latih di masa lalu, uji di masa depan) sebagai angka yang jujur secara operasional, dan StratifiedKFold sebagai pemeriksa stabilitas antar fold.",
          bullets: [
            "XGBoost memimpin dengan PR-AUC 0,819 ± 0,087, tipis di atas LightGBM pada 0,816 ± 0,084.",
            "Regresi logistik, dengan maupun tanpa SMOTE, hanya mencapai PR-AUC 0,545 dan 0,538. Recall-nya tinggi (0,820) tetapi presisinya runtuh ke sekitar 0,29, karena ia praktis menandai apa saja yang mencurigakan.",
            "Jarak antara model linear dan model pohon adalah inti persoalannya: relasi antar sensor di sini non-linear dan penuh interaksi (torsi tinggi bersamaan dengan rpm rendah), dan itu persis yang ditangkap ensemble pohon serta tidak bisa dinyatakan oleh batas linear.",
          ],
          captions: [
            "Validasi silang pada kedua skema. Peringkatnya stabil antara TimeSeriesSplit dan StratifiedKFold, jadi pemenangnya bukan artefak dari cara fold dipotong.",
          ],
        },
        evaluation: {
          heading: "Evaluasi & Kalibrasi Ambang",
          navLabel: "Evaluasi",
          body:
            "Seluruh model dilatih ulang pada data latih penuh lalu diuji pada periode holdout yang belum pernah dilihat. Ambang keputusan dikalibrasi pada periode validasi internal (20% akhir data latih), tidak pernah pada holdout, karena kalau tidak angka yang dilaporkan optimistis secara konstruksi.",
          bullets: [
            "Pada ambang bawaan 0,50: recall 0,758, precision 0,807, F1 0,781, dengan 32 false negative dan 24 false positive.",
            "Pada ambang 0,05 hasil kalibrasi biaya: recall 0,841, precision 0,627, dengan 21 false negative dan 66 false positive. PR-AUC 0,868 dan ROC-AUC 0,976 tidak berubah, karena ambang menggeser titik operasi, bukan modelnya.",
            "Menurunkan ambang menukar 42 inspeksi tambahan dengan 11 kerusakan yang dicegah. Pada rasio biaya 21:1 pertukaran itu sangat menguntungkan, dan persis itulah yang ditunjukkan kurva biaya.",
            "Uji ablasi, dilaporkan terbuka: sensor mentah saja memberi PR-AUC 0,721; menambahkan fitur domain berbasis fisika menaikkannya ke 0,826 (+0,106); menambahkan fitur rolling 6 jam justru menggesernya ke 0,819 (−0,007, masih jauh di dalam simpangan antar fold 0,087 sehingga tidak berbeda secara statistik). Performanya datang dari pengetahuan domain, bukan dari jendela rolling. Jalur rolling tetap dipertahankan di pipeline karena pada telemetry asli, di mana kerusakan berkembang selama berjam-jam, justru di situlah nilainya.",
          ],
          captions: [
            "Kurva precision-recall pada periode holdout dibanding baseline tebakan acak. PR-AUC, bukan ROC-AUC, adalah ringkasan yang jujur ketika kelas positif hanya 6,4% dari data.",
            "Kiri: recall, precision, dan F1 saat ambang bergeser. Kanan: total biaya (FN × $25.000 + FP × $1.200). Titik minimumnya jauh dari 0,5, dan itulah alasan ambang bawaan memang tidak akan pernah menjadi jawaban yang benar.",
            "Model yang sama pada dua ambang. Bergerak dari 0,50 ke 0,05 mengubah 32 kerusakan yang lolos menjadi 21, dengan harga 42 inspeksi tambahan.",
          ],
        },
        explainability: {
          heading: "Explainability (SHAP)",
          body:
            "Model yang tidak bisa diinterogasi tim maintenance tidak akan dipercaya, dan model yang tidak dipercaya tidak mengubah apa pun di lapangan. SHAP menjawab pertanyaan global (apa yang mendorong kerusakan di seluruh armada) sekaligus pertanyaan lokal (kenapa unit ini diberi skor tinggi hari ini).",
          bullets: [
            "Pendorong teratas menurut mean |SHAP|: overstrain_minnm (1,993), tool_wear_min (1,681), rot_speed_rpm (0,617), temp_diff_k (0,600), heat_dissipation (0,578).",
            "Empat dari lima teratas adalah fitur fisika hasil rekayasa, dan urutannya cocok dengan mode kerusakan dominan di data (OSF dan HDF). Model ini bisa dipertanggungjawabkan di depan reliability engineer.",
            "Penjelasan SHAP waterfall per unit ditempelkan langsung pada work order, sehingga teknisi tahu komponen mana yang harus diperiksa lebih dulu alih-alih menerima skor risiko telanjang.",
          ],
          captions: [
            "SHAP summary plot: tiap titik adalah satu pembacaan, diwarnai menurut nilai fiturnya. Overstrain dan tool wear yang tinggi mendorong prediksi ke arah kerusakan, dan arah itu cocok dengan intuisi keteknikan, yang justru membuat model ini bisa dipertahankan.",
            "Peringkat global menurut mean |SHAP|. Fitur rekayasa mendominasi sensor mentah yang menurunkannya.",
            "Dependence plot untuk pendorong terkuat: kontribusi risikonya naik non-linear setelah melewati ambang tertentu, bukan proporsional, dan perilaku itulah yang tidak bisa dinyatakan model linear.",
          ],
        },
        impact: {
          heading: "Dampak Bisnis & Deployment",
          navLabel: "Dampak",
          body:
            "Sepanjang periode holdout (1.948 unit-jam, 132 kerusakan), model berubah menjadi perbandingan biaya langsung terhadap status quo yang reaktif.",
          bullets: [
            "Reaktif tanpa model: 132 kerusakan, $3.300.000.",
            "Model pada ambang 0,5: $828.800, hemat $2.471.200 (74,9%).",
            "Model pada ambang produksi: $604.200, hemat $2.695.800 (81,7%).",
            "Probabilitas diterjemahkan ke keputusan lapangan: HIGH (>70%) hentikan operasi dan terbitkan work order darurat dalam 8 jam; MEDIUM (30-70%) jadwalkan inspeksi terencana dalam 72 jam dan batasi beban; LOW (<30%) lanjut dengan monitoring rutin.",
            "Tier risiko dan ambang alarm sengaja dipisah. Tier mencerminkan pembacaan terakhir unit (prioritas hari ini); riwayat alarms_24h menangkap kerusakan intermiten, sehingga unit yang sempat melonjak lalu tenang tetap masuk radar tanpa menggeser tier-nya. Membiarkan riwayat menimpa tier akan mewarnai hampir seluruh armada sebagai HIGH dan menghancurkan daftar prioritasnya.",
            "Dikirim sebagai dasbor Streamlit: KPI armada, distribusi tier, pendorong kerusakan berperingkat SHAP, tren sensor per unit, dan tabel prioritas work order yang bisa diunduh. Notebook dan dasbor mengimpor modul pipeline yang sama, sehingga tidak ada training/serving skew.",
          ],
          captions: [
            "Distribusi tier risiko armada yang menyuplai dasbor. Inilah artefak yang benar-benar dipakai planner: daftar berperingkat, bukan kolom probabilitas.",
          ],
        },
        limitations: {
          heading: "Batasan",
          body:
            "Dinyatakan di awal, karena batasan yang tidak disampaikan akan ditemukan stakeholder pada saat yang paling merugikan.",
          bullets: [
            "Ini classifier kondisi, bukan model remaining useful life. Label AI4I bersifat sesaat, jadi ia menjawab \"apakah unit ini berisiko sekarang\", bukan \"akan rusak dalam N jam\".",
            "vibration_index adalah proksi yang diturunkan dari hubungan rpm dan torsi, bukan bacaan akselerometer. Sensor getaran sungguhan akan menaikkan recall secara berarti.",
            "Pemetaan armada 61 unit bersifat deterministik dan kausal, tetapi bukan jejak operasi nyata. Ganti dengan telemetry asli sebelum menarik kesimpulan per unit.",
            "Angka biaya adalah asumsi, bukan hasil audit keuangan site. Seluruhnya berada dalam satu objek Config agar bisa dikalibrasi ulang sebelum dipakai untuk keputusan anggaran.",
            "Data berasal dari satu jenis proses manufaktur; performanya pada armada tambang sungguhan wajib divalidasi ulang sebelum dipakai secara operasional.",
          ],
        },
      },
    },
  },

  "haul-truck-fuel-optimization": {
    title: "Optimasi Produktivitas & Konsumsi BBM Haul Truck",
    description:
      "Mengganti KPI armada yang menyesatkan dengan KPI yang terukur, lalu mengkuantifikasi tiga lever operasional senilai penurunan konsumsi BBM 14,0% (sekitar $1,50 juta per tahun) pada armada 24 haul truck.",
    longDescription:
      "Analisis operasional armada haul truck tambang: audit data mentah, kalibrasi empat koefisien fisik dari 37.918 catatan konsumsi terukur, feature engineering menjadi 17 indeks operasional, model regresi konsumsi BBM, dan tiga rekomendasi taktis yang sudah dikuantifikasi dalam liter dan dolar. Kontribusi sesungguhnya proyek ini bersifat diagnostik: ia menunjukkan bahwa KPI bahan bakar yang paling lazim dipakai industri justru membaik ketika operasinya memburuk.",
    caseStudy: {
      context:
        "Portofolio Data Science Pertambangan · Produktivitas armada dan ekonomi bahan bakar · Proyek individu ujung ke ujung.",
      problemHeading: "Latar Belakang Bisnis",
      problem: [
        "Di tambang terbuka, hauling adalah pusat biaya terbesar setelah pengupasan, dan diesel adalah komponen tunai terbesar di dalamnya, yaitu 30-40% biaya tunai hauling. Masalahnya bukan kurangnya data; tiap truck modern memancarkan telemetri per detik. Masalahnya adalah KPI yang dipakai mengelolanya menunjuk ke arah yang salah.",
        "KPI yang terpasang di hampir semua dasbor armada adalah liter per jam. Untuk armada hauling metrik itu punya cacat fatal. Truck yang menghela beban penuh di tanjakan membakar sekitar 118 L/jam dan dinilai \"boros\" padahal sangat produktif. Truck yang menganggur di antrean loader membakar sekitar 13 L/jam dengan tonase nol dan dinilai \"hemat\" padahal sedang membakar uang.",
        "Akibatnya operasi yang memburuk justru terlihat membaik. Semakin banyak truck mengantre, semakin rendah liter per jam armada, dan semakin bagus laporan bulanan, sementara biaya per ton naik dan kapasitas armada menguap.",
        "Solusinya adalah mengganti pertanyaannya. Bukan \"berapa liter per jam?\" melainkan \"berapa liter untuk memindahkan satu ton satu kilometer, dan berapa ton yang hilang karena mesin hidup tanpa bekerja?\" Seluruh pekerjaan di bawahnya, mulai kalibrasi koefisien, himpunan fitur, model, sampai tiga rekomendasi, ada untuk menjawab pasangan pertanyaan itu dalam liter dan dolar.",
      ],
      highlightLabels: [
        "R2 (Data Konsumsi Nyata)",
        "Penurunan BBM Ditemukan",
        "Penghematan per Tahun",
        "Siklus Haul Dianalisis",
      ],
      sections: {
        dataset: {
          heading: "Pemahaman Data",
          navLabel: "Data",
          body:
            "Audit dikerjakan lebih dulu, dan hasilnya adalah temuan tidak nyaman yang layak dinyatakan terang-terangan: dari enam kolom telemetri haul yang dibutuhkan analisis (idle_time, speed, engine_load, cycle_time, truck_id, timestamp), nol tersedia. Berkas yang ada (fuel.csv) adalah dataset sertifikasi kendaraan EPA / fueleconomy.gov: 38.113 baris × 81 kolom, 1984-2017, menyusut menjadi 37.918 setelah difilter ke bahan bakar cair dengan MPG dan displacement yang valid.",
          bullets: [
            "Keputusan 1: bekerja di ruang konsumsi, bukan MPG. MPG berbanding terbalik dengan bahan bakar: selisih 5 MPG di ujung bawah skala (10 ke 15) adalah penghematan yang jauh lebih besar daripada 5 MPG yang sama di ujung atas (40 ke 45). Merata-ratakan atau meregresi MPG secara langsung memberi bobot terbalik pada armada paling boros, persis kebalikan dari yang dibutuhkan. Semuanya dihitung dalam L/100km, satuan yang sama dengan yang sudah dipakai operasi tambang.",
            "Keputusan 2: arsitektur dua lapis dengan status tiap metrik dinyatakan terbuka. Lapis A memakai fuel.csv berisi 37.918 catatan nyata, sehingga metriknya kredibel secara lapangan. Lapis B adalah model siklus haul yang diparameterisasi oleh Lapis A, sehingga metriknya mengukur keterpulihan proses generatif, dan secara eksplisit bukan validasi lapangan.",
            "Yang benar-benar diukur data EPA, pada kendaraan nyata, adalah empat hubungan fisik yang juga mengatur pembakaran bahan bakar haul truck. Keempatnya dipanen sebagai koefisien: K1 penalti stop-start +35,71% (biaya antrean dan spotting), K2 elastisitas displacement 0,4821 (right-sizing), K3 efek teknologi peredam idle −36,67% dari 549 unit hybrid (auto engine shutdown), dan K4 rentang rugi drivetrain serta traksi +43,75% (rolling resistance).",
            "K2 layak dicatat: elastisitas 0,48 berarti mesin 10% lebih besar hanya menambah 4,7% bahan bakar, jadi right-sizing armada adalah lever yang lemah. K4 menunjukkan rentang 44% pada resistansi yang harus dilawan mesin, dan itu lever yang kuat. Urutan prioritas rekomendasi akhir lahir dari perbandingan itu, bukan dari intuisi.",
            "Keluaran model siklus haul: 45.424 siklus, 24 truck, 91 hari, 4 rute.",
          ],
          captions: [
            "K1: penalti bahan bakar terukur dari operasi stop-start dibanding jelajah tetap, yaitu +35,71% (IQR 27,8-44,4). Inilah angka yang memberi harga pada antrean loader dan penundaan spotting.",
            "K2 dan K4 berdampingan. Ukuran mesin (elastisitas 0,48) hampir tidak menggeser konsumsi; rugi drivetrain dan traksi merentang 43,75%, jadi lever yang layak ditarik adalah resistansi, bukan displacement mesin.",
            "K3: terukur pada 549 unit berteknologi peredam idle, yaitu −36,67%. Inilah dasar bukti untuk rekomendasi auto engine shutdown.",
          ],
        },
        eda: {
          heading: "Eksplorasi Data",
          navLabel: "EDA",
          body:
            "Satu konfound harus dikendalikan sebelum perbandingan apa pun diizinkan. idle_ratio berkorelasi kuat negatif dengan jarak angkut (r = −0,74): pada siklus pendek, idle otomatis menjadi fraksi yang lebih besar. Membandingkan idle antar rute karena itu mengukur rute, bukan perilakunya, dan menghasilkan kesimpulan yang bukan sekadar kurang tepat melainkan terbalik. Seluruh perbandingan idle di proyek ini dikerjakan di dalam rute.",
          bullets: [
            "Temuan utamanya, pada satu rute dengan kerja angkut setara, bergerak dari kuintil idle terendah ke tertinggi: konsumsi per jam turun 18,8%, konsumsi per ton-km turun 1,6% (praktis tidak berubah), dan tonase per jam mesin hidup turun 15,6%. Biaya sesungguhnya dari idle bukan laju bakarnya, melainkan produktivitas.",
            "Inilah bukti bahwa liter per jam adalah KPI yang rusak untuk hauling: ia membaik ketika operasi memburuk. KPI yang benar adalah sepasang angka, liter per ton-km bersama ton per jam mesin hidup, karena masing-masing sendirian bisa dimainkan.",
            "Secara absolut, idle menyerap 5,9% bahan bakar armada tanpa memindahkan material sama sekali (2,9% di antaranya dapat ditekan). Pada rute bersiklus pendek R4_ROMStock porsinya mencapai 15,5%.",
            "Peringkat pendorong dalam-rute terhadap L/ton-km (Spearman): total_resistance +0,49, rolling_resistance +0,47, speed_deficit +0,40, payload_utilization −0,36, tyre_condition_index +0,30, engine_hours +0,21, grade +0,12, idle_ratio +0,05.",
            "Temuan strukturalnya: rolling resistance hampir sekuat total resistance (+0,47 vs +0,49) sementara grade jauh lebih lemah di dalam rute. Komponen resistansi yang paling menentukan justru komponen yang bisa dikendalikan perawatan jalan, bukan yang terkunci pada geometri pit.",
            "Sebaran antar unit menunjuk ke akar yang sama: truck terburuk 42,8% lebih boros per ton-km daripada yang terbaik, pada rute dan material yang sama, dan indeks kondisi ban berkorelasi +0,48 dengan L/ton-km.",
          ],
          captions: [
            "Temuan intinya. Sepanjang kuintil idle, konsumsi per ton-km nyaris tidak bergerak (−1,6%) sementara tonase per jam mesin hidup runtuh (−15,6%). Idle tidak terutama memboroskan bahan bakar; ia menghancurkan kapasitas.",
            "Speed deficit, total resistance, dan utilisasi payload terhadap konsumsi. Resistansi memiliki kemiringan paling curam, dan 32% siklus berjalan underload di bawah 95% payload.",
            "Peringkat pendorong dalam-rute dengan konfound dikendalikan, berdampingan dengan komposisi waktu mesin hidup. Rolling resistance, besaran yang bisa direkayasa dan dikendalikan, hampir menyamai total resistance.",
            "Sebaran 42,8% antara unit terbaik dan terburuk pada pekerjaan yang identik, mengikuti kondisi ban pada r = +0,48. Lima unit prioritas inspeksi semuanya belum terpasang auto engine shutdown.",
          ],
        },
        preprocessing: {
          heading: "Praproses & Feature Engineering",
          body:
            "Tujuh belas indeks operasional direkayasa, dan penjagaan kebocoran di sekelilingnya adalah bagian yang menentukan apakah hasilnya bermakna sama sekali.",
          bullets: [
            "idle_ratio dihitung terhadap waktu mesin hidup (cycle_minutes + standby_minutes), bukan terhadap cycle time saja. Standby (istirahat, ganti shift, blast delay, antrean refuelling) adalah mesin hidup tanpa tonase, dan porsinya justru lebih besar.",
            "Metrik siklus: travel_ratio, productive_ratio, cycles_per_hour, tonnes_per_hour (per jam mesin hidup), tonne_km_per_cycle, dan fixed_time_minutes.",
            "Fuel Efficiency Index diskalakan sehingga 100 sama dengan benchmark armada (kuartil terbaik L/ton-km), dipilih agar bisa langsung masuk scorecard operator tanpa perlu menjelaskan satuan.",
            "Engine load (%) dihitung sebagai daya rimpull saat travel bermuatan dibagi rated power, setara sinyal engine-load ECM (VIMS / MineStar) pada truck sungguhan.",
            "Penjagaan kebocoran pada kedua dataset. Model A: city / highway / combined MPG, CO2 per mil, barel per tahun, biaya bahan bakar tahunan, dan skor efisiensi semuanya adalah target yang ditulis ulang, dan dibuang. Model B: sembilan kolom dihapus (fuel_liters, fuel_per_tonne_km, fuel_per_tonne, fuel_per_hour, fuel_efficiency_index, idle_fuel_liters, avoidable_fuel_liters, idle_fuel_share, idle_burn_rate_liters_per_hour). Pipeline memasang assert yang gagal keras bila fitur bocor lolos masuk, dan saat refactor penamaan penjaga itu menangkap satu positif palsu (has_turbocharger memuat substring \"charge\") sehingga pola kata kuncinya dipertajam.",
            "Strategi validasi sengaja berbeda antar model. Model A: split acak 80/20 plus CV 5-fold, karena tugas spesifikasi ke konsumsi tidak punya ketergantungan waktu. Model B: split kronologis, karena split acak akan membocorkan kondisi jalan dan cuaca hari yang sama ke test set.",
          ],
        },
        modeling: {
          heading: "Pemodelan",
          navLabel: "Modeling",
          body:
            "Random Forest dan XGBoost dilatih pada kedua lapis, dengan baseline fisika murni disertakan sebagai pembanding yang sebenarnya paling penting.",
          bullets: [
            "Lapis A (konsumsi EPA nyata, L/100km): XGBoost R2 0,9446, MAE 0,5127, RMSE 0,7329; Random Forest R2 0,9433, MAE 0,4841. Stabil pada CV 5-fold di 0,9447 ± 0,0014.",
            "Lapis B (telemetri haul, liter per siklus): XGBoost R2 0,9873, MAE 2,5193; Random Forest R2 0,9856.",
            "Baseline fisika (energi rimpull dibagi efisiensi, tanpa machine learning sama sekali): R2 0,5716, MAE 17,840.",
            "Kedua nilai R2 harus dibaca berbeda, dan bedanya penting. Angka 0,944 milik Model A kredibel secara lapangan: catatan konsumsi nyata, terjaga dari kebocoran, dan stabil pada CV. Angka 0,987 milik Model B mengukur seberapa baik model memulihkan proses generatifnya sendiri, dan tidak boleh dikutip sebagai akurasi prediksi armada.",
            "Perbandingan yang bermakna ada di baris terakhir. Selisih 0,57 ke 0,99 adalah struktur yang tidak terkandung dalam rumus rimpull: penalti low-speed, bahan bakar idle, beban aksesori, dan heterogenitas antar unit. Selisih itulah yang membuat model berguna di atas kalkulator fisika.",
            "Kepentingan fitur diukur dengan permutation importance pada test set, yaitu berapa banyak R2 yang hilang ketika satu fitur diacak, alih-alih gain internal tree yang bias ke fitur berkardinalitas tinggi.",
          ],
          captions: [
            "Prediksi terhadap aktual untuk kedua lapis, disertai perbandingan R2 termasuk baseline fisika saja. Angka 0,57 milik baseline adalah titik acuan jujur untuk menilai apa yang sebenarnya ditambahkan machine learning.",
          ],
        },
        evaluation: {
          heading: "Evaluasi & Interpretasi Model",
          navLabel: "Evaluasi",
          body:
            "Sebelum hasil pemodelan apa pun diterima, model siklus haul harus mendarat di dalam rentang lapangan nyata untuk truck kelas CAT 777G / 785D; kalau tidak, parameternya yang salah.",
          bullets: [
            "Konsumsi per jam mesin hidup: 81,6 L/jam (rentang lapangan 70-100). Konsumsi per jam siklus produktif: 102,3 L/jam (90-140). Konsumsi per ton-km: 0,152 L (0,10-0,16). Cycle time: 38,2 menit (20-45 tergantung rute). Keempatnya lolos.",
            "Permutation importance mengonfirmasi peringkat EDA secara independen: suku resistansi dan utilisasi payload mendominasi, dan model tidak bersandar pada proksi dari target.",
            "Scorecard per unit mengekspor lima truck prioritas inspeksi (HT-013 pada 0,1899 L/ton-km dan FEI 71,2, lalu HT-018, HT-005, HT-016, dan HT-002), semuanya masih tanpa auto engine shutdown.",
          ],
          captions: [
            "Permutation importance pada test set untuk kedua model. Mengukur kepentingan lewat pengacakan pada data yang ditahan menghindari bias kardinalitas milik tree gain.",
          ],
        },
        impact: {
          heading: "Rekomendasi Bisnis",
          navLabel: "Dampak",
          body:
            "Baseline sepanjang 91 hari dan 24 truck: 2.802.540 L ($2.662.413) untuk memindahkan 5.303.267 ton, atau 0,528 L per ton. Tiga lever dikuantifikasi terhadapnya memakai rumus rimpull dan koefisien terukur, bukan persentase asumsi.",
          bullets: [
            "1. Program haul road dan tekanan ban: 290.091 L (−10,4%), $275.586 per 91 hari, sekitar $1.105.373 per tahun. Grading dan watering terjadwal per rute plus pemeriksaan tekanan ban tiap shift, menargetkan penurunan rolling resistance 1,0 poin persen. Ini nomor satu karena rolling resistance harus dilawan di setiap meter jarak angkut, sementara idle hanya membakar sekitar 13 L/jam.",
            "2. Disiplin payload di loading point: 72.235 L (−2,6%), $68.623 per 91 hari, sekitar $275.247 per tahun. Payload meter dengan umpan balik langsung ke operator excavator, menargetkan utilisasi 98% (saat ini 32% siklus berjalan di bawah 95%). Tonase yang sama lalu berpindah dengan 1.171 siklus lebih sedikit, sehingga biaya tetap siklus tidak perlu dikeluarkan. Lever ini murah: tanpa belanja modal, hanya instrumentasi yang sudah dimiliki sebagian besar excavator modern.",
            "3. Auto engine shutdown dan disiplin idle: 30.853 L (−1,1%), sekitar $117.565 per tahun dalam bentuk bahan bakar, ditambah 2.833 jam truck yang setara sekitar 1,5 unit atau sekitar 440.636 ton kapasitas yang terbebaskan. Retrofit 19 unit yang belum terpasang dan tetapkan batas idle 5 menit dengan pelaporan per operator.",
            "Total program: 393.179 L, −14,0%, $1.498.185 per tahun. Nilai kapasitas dari lever ketiga dilaporkan terpisah, bukan dijumlahkan ke penghematan kas, karena realisasinya bergantung pada apakah kapasitas itu benar-benar dipakai atau satu unit benar-benar diparkir.",
            "Urutan ini adalah keluaran analisis, bukan asumsi, dan urutannya berlawanan dengan intuisi. Naluri operasional menempatkan idle di nomor satu karena ia paling terlihat di pit. Data menempatkannya nomor tiga untuk bahan bakar dan nomor satu untuk kapasitas.",
          ],
          captions: [
            "Tiga lever dibandingkan dengan dekomposisi konsumsi baseline. Program haul road sendirian mengalahkan gabungan dua lainnya lebih dari dua kali lipat.",
          ],
        },
        limitations: {
          heading: "Batasan",
          body:
            "Pembedaan antara yang terukur dan yang diturunkan dinyatakan di dalam deliverable itu sendiri, bukan dikubur.",
          bullets: [
            "Metrik Model A berasal dari data konsumsi nyata dan kredibel secara lapangan. R2 Model B mengukur keterpulihan proses generatif, bukan akurasi lapangan, dan tidak boleh dikutip sebagai akurasi prediksi armada.",
            "Data EPA mencakup kendaraan ringan jalan raya. Ia memberi arah dan besaran relatif yang sahih untuk keempat koefisien fisik, tetapi bukan nilai absolut untuk mesin diesel 1.000 kW. Rentang lapangan yang dipakai sebagai uji kewajaran berasal dari spesifikasi kelas 777/785, bukan dari dataset.",
            "Angka penghematan adalah estimasi rekayasa, bukan hasil terealisasi. Ketiganya perlu divalidasi di site sebelum masuk anggaran, dimulai dari K1 terhadap penalti low-speed armada sendiri, efek rolling resistance yang diukur sebelum dan sesudah satu siklus grading, dan definisi idle versi site.",
            "Mengganti dengan telemetri asli hanya memerlukan perubahan satu konstanta (HAUL_TELEMETRY_CSV); seluruh Lapis B dan bagian pemodelan lalu berjalan tanpa perubahan lain pada data site itu sendiri.",
          ],
        },
      },
    },
  },

  "mineral-grade-prediction": {
    title: "Prediksi Kadar Mineral (Geospasial)",
    description:
      "Mengestimasi kadar bijih per blok pada 75.000 blok, lalu memakai variografi dan kontrol positif sintetis untuk membuktikan dataset ini tidak memuat sinyal spasial, alih-alih melaporkan R2 0,97 bocor yang dengan senang hati dihasilkannya.",
    longDescription:
      "Proyek estimasi sumber daya pada block model 75.000 blok: eksplorasi spasial, variogram eksperimental, feature engineering bermotif geologi, pembagian data per panel spasial, dan estimasi Random Forest / XGBoost, disusul audit kebocoran fitur dan kontrol positif sintetis. Hasil utamanya bersifat negatif dan dipertahankan dengan bukti: koordinat pada dataset ini tidak memuat informasi apa pun tentang kadar, sehingga R2 mendekati nol adalah jawaban yang benar dan 0,97 hasil fitur bocor adalah jawaban yang salah.",
    caseStudy: {
      context:
        "Portofolio Data Science Pertambangan · Estimasi sumber daya dan validasi geostatistik · Proyek individu ujung ke ujung.",
      problemHeading: "Latar Belakang Bisnis",
      problem: [
        "Perusahaan tambang hanya mampu mengukur kadar pada sebagian sangat kecil dari endapan. Pemboran menghasilkan sampel assay di sepanjang lubang bor, dan pada endapan besar itu lazimnya kurang dari 0,1% volume badan bijih. Namun keputusan penambangan diambil per blok (misalnya 25 × 25 × 10 m) untuk keseluruhan endapan.",
        "Estimasi sumber daya menjawab pertanyaan yang ditinggalkan lubang bor: berapa kadar blok yang tidak pernah dibor? Jawabannya menentukan batas pit, urutan penambangan, umur tambang, dan pada akhirnya kelayakan finansial proyek. Salah di sini bukan ketidaknyamanan pemodelan, melainkan kesalahan alokasi modal.",
        "Metode berbasis lokasi bisa bekerja karena satu sifat geologi: kontinuitas spasial. Mineralisasi terbentuk lewat proses yang bekerja pada skala ruang tertentu, seperti intrusi, aliran fluida hidrotermal, dan pengayaan supergen, sehingga blok yang berdekatan cenderung berkadar mirip dan kemiripan itu meluruh terhadap jarak. Variogram mengukur peluruhan itu, dan ia adalah pemeriksaan yang menentukan apakah estimator spasial mana pun bisa bekerja.",
        "Yang dibangun di sini adalah pipeline estimasi lengkap (Random Forest dan XGBoost dengan fitur spasial rekayasa, pembagian per panel, dan pengendalian kebocoran) yang dibungkus validasi yang memang dituntut industri. Validasi itulah yang mengubah deliverable proyek ini menjadi vonis yang bisa dipertahankan atas datanya, bukan sekadar skor model.",
      ],
      highlightLabels: [
        "Blok Dimodelkan",
        "Rasio Nugget / Sill",
        "R2 pada Fitur Spasial",
        "R2 (Kontrol Positif)",
      ],
      sections: {
        dataset: {
          heading: "Pemahaman Data",
          navLabel: "Data",
          body:
            "mining_block_model.csv memuat 75.000 blok pada grid 500 × 500 × 100, membawa koordinat, kadar, tonase, jenis batuan, dan sejumlah kolom ekonomi. Semuanya berjalan pada random_state = 42 dan sepenuhnya reproducible.",
          bullets: [
            "Target pemodelan adalah kadar di dalam domain ore. Blok waste berada pada kadar nol dan dipisahkan, karena mencampurkannya menciptakan distribusi bimodal yang melebih-lebihkan setiap korelasi yang dihitung pada himpunan penuh.",
            "Dataset juga membawa kolom yang diturunkan dari kadar itu sendiri (ore_value_per_tonne, profit, waste_flag, target, dan rock_type), dan kolom-kolom inilah yang menjadi subjek audit kebocoran di bagian berikutnya.",
            "Varians domain pada blok ore adalah 18,88, angka yang nantinya dibandingkan dengan sill variogram.",
          ],
          captions: [
            "Distribusi kadar pada block model. Bentuknya sangat wajar, dan tidak ada satu pun di sini yang memperingatkan bahwa struktur spasialnya hilang, dan itulah alasan variografi tidak boleh dilewati.",
          ],
        },
        eda: {
          heading: "Eksplorasi Data",
          navLabel: "EDA",
          body:
            "Tiga pertanyaan harus dijawab sebelum memodelkan apa pun: bagaimana bentuk sebaran kadar, apakah kadar berubah menurut kedalaman, dan apakah ia membentuk zona yang koheren dilihat dari atas.",
          bullets: [
            "Kadar terhadap kedalaman datar. Tidak ada profil pengayaan supergen dan tidak ada gradien pelapukan, sehingga sumbu vertikal tidak membawa informasi.",
            "Heatmap bench tidak memperlihatkan zona berkadar tinggi yang koheren. Rata-rata per panel berserak di sekitar rata-rata domain tanpa organisasi spasial apa pun.",
            "Scatter 3D mengonfirmasi gambaran yang sama dalam tiga dimensi: blok berkadar tinggi tersebar di seluruh volume, bukan mengelompok menjadi badan bijih.",
            "Pada titik ini buktinya sugestif tetapi belum konklusif, karena ketiadaan struktur secara visual bukan pembuktian. Untuk itulah variogram ada.",
          ],
          captions: [
            "Rata-rata kadar per bench. Endapan nyata biasanya memperlihatkan tren kedalaman akibat pengayaan atau pelapukan; yang ini datar, sehingga fitur kedalaman tidak bisa menolong.",
            "Heatmap panel dilihat dari atas. Tidak terbentuk zona berkadar tinggi yang bersambung, dan ini petunjuk kuat pertama bahwa blok bertetangga tidak mengatakan apa pun tentang satu sama lain.",
            "Kadar dalam tiga dimensi. Blok berkadar tinggi berserak di seluruh volume alih-alih terkonsentrasi menjadi badan bijih.",
          ],
        },
        variography: {
          heading: "Variografi: Uji Kelayakan Estimasi",
          navLabel: "Variogram",
          body:
            "Inilah pemeriksaan yang mengatur seluruh proyek, dan ia harus mendahului pemodelan. Variogram eksperimental mengukur seberapa cepat kemiripan antar blok meluruh terhadap jarak pisah: gamma(h) = 1/(2N(h)) · Sigma (z_i − z_j)^2 untuk semua pasangan berjarak sekitar h. Endapan nyata menunjukkan gamma(h) rendah pada lag pendek, lalu naik sampai mendatar pada sill setelah melewati range, dan range itulah jarak maksimum ketika satu blok masih mengatakan sesuatu tentang tetangganya.",
          bullets: [
            "Semivariance datar di sekitar 18,6 pada seluruh lag, sementara varians domainnya 18,88. Gamma(h) menyentuh sill sejak lag terpendek dan tidak pernah naik.",
            "Rasio nugget / sill = 1,04, yaitu pure nugget. Dua blok bersebelahan sama tidak miripnya dengan dua blok terpisah 250 m. Secara geostatistik, range = 0.",
            "Konsekuensinya bersifat teoretis, bukan sekadar empiris: kriging pada data seperti ini mengembalikan rata-rata domain untuk setiap blok, dan metode berbasis lokasi mana pun menghadapi langit-langit yang sama. Karena itu R2 mendekati nol adalah hasil yang benar, bukan tanda model gagal.",
          ],
          captions: [
            "Variogram eksperimental yang menolak dataset ini sebelum pemodelan dimulai. Gamma(h) duduk di sill sejak lag terpendek: pure nugget, tanpa kontinuitas spasial yang bisa dimanfaatkan.",
          ],
        },
        preprocessing: {
          heading: "Praproses & Feature Engineering",
          navLabel: "Praproses",
          body:
            "Fitur direkayasa dari penalaran geologi, bukan dari apa pun yang kebetulan tersedia di kolom, dan dua kesalahan metodologis spesifik sengaja dirancang keluar dari pipeline.",
          bullets: [
            "Kelompok kedalaman: depth_from_surface dan bench_level, karena pengayaan supergen dan pelapukan terikat kedalaman.",
            "Geometri endapan: radial_distance, horizontal_distance, dan azimuth, karena kadar sering meluruh keluar dari pusat badan bijih.",
            "Agregasi spasial: neighbour_grade_mean dan neighbour_grade_std, padanan machine learning dari kriging dan inverse distance weighting.",
            "Fisik blok: tonase sebagai proksi densitas dan volume.",
            "Kesalahan yang dihindari 1: pembagian acak. Pada grid rapat, pembagian acak menempatkan setiap blok uji tepat bersebelahan dengan blok latih. Model tinggal menyalin nilai tetangganya dan skor ujinya menjadi terlalu optimistis. Proyek ini memisahkan panel utuh 50 × 50 m, meniru situasi nyata: memprediksi area yang belum pernah dibor.",
            "Kesalahan yang dihindari 2: kebocoran lewat fitur tetangga. neighbour_grade_mean dihitung setelah pemisahan data dan hanya dari blok latih. Blok latih meminta k + 1 tetangga lalu membuang yang pertama (dirinya sendiri); blok uji meminta tetangga ke pohon yang sama yang hanya berisi blok latih.",
          ],
        },
        modeling: {
          heading: "Pemodelan",
          body:
            "Random Forest dan XGBoost dilatih pada himpunan fitur spasial murni, dengan baseline rata-rata domain disertakan bukan sebagai pelengkap melainkan sebagai pembanding wajib: estimator yang tidak mampu mengalahkan rata-rata domain berarti tidak mempelajari apa pun.",
          bullets: [
            "Secara prinsip, model pohon adalah pelengkap yang tepat untuk kriging: ia menangkap hubungan non-linier, interaksi antar fitur (kadar yang bergantung pada litologi × kedalaman × alterasi), kovariat heterogen, dan anisotropi yang dipelajari dari data alih-alih dirancang manual dalam model variogram.",
            "Batasnya sama nyatanya dan tetap diingat: ia tidak menghasilkan varians estimasi seperti kriging, tidak membawa jaminan ketidakbiasan, dan cenderung over-smoothing sehingga meratakan kadar tinggi dan membuat kadar kepala dilaporkan terlalu rendah. Pada praktik industri keduanya dijalankan berdampingan lalu direkonsiliasi.",
            "Pada dataset ini tidak satu pun model mampu melampaui baseline, dan variogram sudah menjelaskan alasannya sebelum satu pohon pun ditumbuhkan.",
          ],
        },
        evaluation: {
          heading: "Evaluasi",
          navLabel: "Evaluasi",
          body:
            "Setiap model diberi skor terhadap baseline rata-rata domain pada panel yang sepenuhnya ditahan dari pelatihan.",
          bullets: [
            "Baseline rata-rata domain: R2 −0,0000, RMSE 4,335.",
            "Random Forest pada fitur spasial: R2 −0,0167, RMSE 4,372.",
            "XGBoost pada fitur spasial: R2 −0,0249, RMSE 4,389.",
            "Kedua model mendarat sedikit di bawah baseline, tanda khas model yang mencocokkan derau pada dataset tanpa struktur yang bisa dipelajari.",
            "Prediksi terhadap aktual runtuh menjadi pita horizontal di sekitar rata-rata domain, persis perilaku yang diramalkan teori pada kondisi pure nugget.",
          ],
          captions: [
            "Kedua model mencetak skor di bawah baseline rata-rata domain. Melaporkan ini apa adanya lebih berharga daripada menyetel model sampai akhirnya muncul angka positif.",
            "Prediksi terhadap aktual pada panel yang ditahan. Prediksinya membentuk pita datar di rata-rata domain, karena model tidak punya apa pun untuk dijadikan pijakan.",
            "Kepentingan fitur pada himpunan fitur spasial. Tidak ada fitur yang mendominasi, karena tidak satu pun membawa sinyal: penting tanpa daya prediksi.",
          ],
        },
        "leakage-audit": {
          heading: "Audit Kebocoran Fitur",
          body:
            "Pipeline yang sama, bila diberi kolom ekonomi milik dataset, menghasilkan R2 = 0,97. Menerbitkan angka itu adalah jalan yang mudah sekaligus jalan yang salah.",
          bullets: [
            "XGBoost dengan ore_value dan profit: R2 0,9711. Dengan waste_flag: R2 0,9713.",
            "ore_value_per_tonne adalah fungsi langsung dari kadar; profit tepat sama dengan tonase × (ore_value − mining_cost − processing_cost); waste_flag, target, dan rock_type == \"Waste\" identik dan bernilai 1 persis saat kadar = 0.",
            "Korelasi antara ore_value dan kadar adalah 0,96 pada seluruh blok, tetapi hanya 0,002 di dalam domain ore. Angka 0,96 lahir sepenuhnya dari bimodalitas (blok waste bernilai nol pada kedua kolom, blok ore bernilai tinggi pada keduanya), bukan dari hubungan nyata.",
            "Kolom-kolom itu hanya menjawab \"waste atau ore?\". Mereka tidak mengatakan apa pun tentang \"berapa kadarnya?\", padahal pertanyaan kedua itulah inti estimasi sumber daya.",
          ],
        },
        "positive-control": {
          heading: "Kontrol Positif",
          navLabel: "Kontrol",
          body:
            "R2 mendekati nol punya dua kemungkinan sebab: pipeline yang rusak, atau data yang memang tanpa sinyal. Membedakan keduanya bukan pilihan, jadi kode, fitur, dan protokol evaluasi yang sama persis dijalankan pada endapan sintetis yang memang berstruktur spasial.",
          bullets: [
            "Variogram endapan sintetis berperilaku sebagaimana mestinya: gamma(h) rendah pada lag pendek lalu naik ke sill setelah melewati range yang terhingga.",
            "Heatmap bench-nya memperlihatkan persis zona berkadar tinggi yang koheren, yang absen pada dataset sebenarnya.",
            "Pada data itu pipeline yang identik mencapai R2 0,9796 dengan RMSE 2,105.",
            "Kesimpulannya, dengan bukti alih-alih klaim: yang hilang adalah sinyal di data, bukan kemampuan di model.",
          ],
          captions: [
            "Variogram endapan kontrol: gamma(h) naik dari nugget rendah menuju sill pada range yang terhingga, yaitu bentuk badan bijih sungguhan, dan itu yang tidak pernah ditunjukkan dataset aslinya.",
            "Zona berkadar tinggi yang koheren pada endapan kontrol, yaitu organisasi spasial yang tidak dimiliki block model aslinya.",
            "Pipeline identik, data berstruktur: R2 0,980. Pipeline-nya bekerja; dataset aslinya memang tidak memuat apa pun untuk dipelajari.",
          ],
        },
        impact: {
          heading: "Rekomendasi",
          navLabel: "Dampak",
          body:
            "Deliverable proyek ini adalah vonis yang bisa dipertahankan atas datanya, dan dalam estimasi sumber daya itu jauh lebih berharga daripada sebuah skor model.",
          bullets: [
            "mining_block_model.csv tidak layak dipakai untuk estimasi kadar, dan hal itu perlu ditetapkan sebelum ada yang membangun desain pit di atasnya.",
            "Jangan melaporkan R2 dari model mana pun yang memakai ore_value, profit, waste_flag, target, atau rock_type.",
            "Bila tujuannya memisahkan waste dari ore, ubah menjadi klasifikasi dan ukur dengan ROC-AUC, sambil mencatat bahwa label waste pun tersebar acak di ruang (proporsi waste per panel mengikuti sebaran binomial murni) sehingga klasifikasi berbasis koordinat juga akan gagal.",
            "Untuk estimasi sungguhan: gunakan data assay lubang bor beserta koordinat kerahnya, lakukan pemodelan domain geologi, dan validasi dengan variogram sebelum memilih algoritma. Variografi dulu, algoritma kemudian; membalik urutan itulah cara nilai R2 bocor masuk ke laporan teknis.",
          ],
        },
        limitations: {
          heading: "Batasan",
          bullets: [
            "Kesimpulan ini berlaku untuk block model ini, bukan untuk estimasi spasial secara umum, dan kontrol positif ada justru untuk membuat batas itu eksplisit.",
            "Kontrol sintetis memvalidasi pipeline-nya, bukan geologi endapan nyata mana pun.",
            "Model pohon tidak menghasilkan varians estimasi dan tidak membawa jaminan ketidakbiasan; pada data nyata ia sebaiknya direkonsiliasi dengan kriging alih-alih menggantikannya.",
          ],
        },
      },
    },
  },
};
