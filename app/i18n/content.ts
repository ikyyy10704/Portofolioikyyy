import type { Language } from "./LanguageProvider";

interface ExperienceEntry {
  role: string;
  company: string;
  date: string;
  description: string[];
}

interface SiteContent {
  nav: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    experience: string;
    contact: string;
    backToPortfolio: string;
    problem: string;
  };
  hero: {
    badge: string;
    title: string;
    intro: string;
    viewProjects: string;
    downloadCv: string;
    photoAlt: string;
  };
  about: {
    eyebrow: string;
    heading: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
  };
  skills: {
    eyebrow: string;
    heading: string;
    groups: { title: string; subtitle: string }[];
  };
  projects: {
    eyebrow: string;
    heading: string;
    filters: { all: string; data: string; fullstack: string };
    filterLabel: string;
  };
  experience: {
    eyebrow: string;
    heading: string;
    entries: ExperienceEntry[];
  };
  detail: {
    problemHeading: string;
    aboutProject: string;
    readReport: string;
    visitSite: string;
    viewSource: string;
    keyVisual: string;
  };
  footer: {
    tagline: string;
    location: string;
    followMe: string;
    workTogether: string;
    servicesTitle: string;
    services: string[];
    quickLinksTitle: string;
    copyright: string;
    privacy: string;
    terms: string;
  };
}

const english: SiteContent = {
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    contact: "Contact Me",
    backToPortfolio: "Back to Portfolio",
    problem: "Problem",
  },
  hero: {
    badge: "Full Stack Developer + Data Scientist",
    title: "Building web systems and data products that solve real business problems.",
    intro:
      "I am Rizki Pangestu, an Information Systems student at Universitas Amikom Yogyakarta with hands-on experience in production web applications, machine learning, analytics dashboards, and AI-powered product features.",
    viewProjects: "View Projects",
    downloadCv: "Download CV",
    photoAlt: "Rizki Pangestu - Full Stack Developer & Data Scientist",
  },
  about: {
    eyebrow: "About",
    heading: "A hybrid builder for software, analytics, and creative problem solving.",
    paragraphs: [
      "My work connects full stack engineering with data science. I have developed production-ready systems for construction operations, laboratory workflows, SaaS laundry management, and trading journals with AI-driven analysis.",
      "On the data side, I work with machine learning, computer vision, predictive analytics, recommendation systems, and dashboarding. I enjoy turning raw information into products that are practical, clear, and ready for users.",
    ],
    stats: [
      { value: "3.84", label: "GPA / 4.00" },
      { value: "14", label: "Real Projects" },
      { value: "45%", label: "Engagement Growth" },
      { value: "2", label: "Languages" },
    ],
  },
  skills: {
    eyebrow: "Skills",
    heading: "Technical toolkit from CV and project experience.",
    groups: [
      {
        title: "Full Stack Development",
        subtitle: "Production web systems and API integration",
      },
      {
        title: "Data Science & Analytics",
        subtitle: "Machine learning, dashboards, and predictive analytics",
      },
      {
        title: "Design & Creative",
        subtitle: "Visual communication for products and campaigns",
      },
    ],
  },
  projects: {
    eyebrow: "Projects",
    heading: "My Portfolio.",
    filters: { all: "All", data: "Data", fullstack: "Fullstack" },
    filterLabel: "Filter projects by field",
  },
  experience: {
    eyebrow: "Experience",
    heading: "Career, education, and organization highlights.",
    entries: [
      {
        role: "Data Scientist Participant",
        company: "Coding Camp 2026 - Dicoding & DBS Foundation",
        date: "Feb 2026 - Jul 2026",
        description: [
          "Completed an intensive Data Scientist learning path covering Python programming, machine learning, and data visualization.",
          "Built capstone project 'Jivara': a health-tech application for food detection and medication adherence tracking using CV and AI.",
          "Prepared ML datasets and developed a Streamlit dashboard for monitoring food-drug interactions.",
        ],
      },
      {
        role: "Full Stack Developer",
        company: "CV. GASNI ADITAMA KONSTRUKSI",
        date: "June 2025 - May 2026",
        description: [
          "Developed and enhanced features for an in-house construction management system to support daily operations.",
          "Maintained system performance and managed structured data input to ensure database accuracy.",
          "Built and integrated new modules using PHP (CI3), MySQL, and REST API based on evolving business needs.",
        ],
      },
      {
        role: "Speaker (Crypto Enthusiast)",
        company: "Talk Show FORBISDA HIPMI DIY Blockchain 101",
        date: "Feb 2026",
        description: [
          "Delivered presentations on blockchain fundamentals and cryptocurrency ecosystems.",
          "Educated participants about opportunities and risks in the blockchain industry.",
          "Shared insights on Web3 trends, crypto adoption, and digital assets.",
        ],
      },
      {
        role: "Board of Director - Business Pillar",
        company: "JJC Amikom Jogja",
        date: "Feb 2026",
        description: [
          "Contributed to business development strategies and community growth initiatives.",
          "Supported cross-division collaboration to drive the organization's business-oriented programs.",
        ],
      },
      {
        role: "Ketua Divisi OKK",
        company: "HIPMI PT Amikom Yogyakarta",
        date: "Jun 2024 - March 2025",
        description: [
          "Led the membership recruitment, onboarding, and cadre development division.",
          "Managed organizational programs to strengthen member engagement and institutional capacity.",
        ],
      },
      {
        role: "Data Science Division Member",
        company: "AMCC (Amikom Computer Club)",
        date: "Dec 2023 - Jul 2024",
        description: [
          "Actively contributed to data science discussions, knowledge sharing, and internal workshops.",
          "Collaborated with fellow members on data-related projects and technical problem-solving sessions.",
          "Completed a final project assigned by AMCC facilitators as part of the division's structured learning program.",
        ],
      },
      {
        role: "Junior Graphic Designer",
        company: "KBMDG STUDIO",
        date: "Jan 2022 - Jun 2022",
        description: [
          "Led the development of various design projects by collaborating with creative team members.",
          "Conceptualized and delivered 20+ distinct design projects with 100% client satisfaction rate.",
          "Pioneered a new design approach that reduced revision cycles.",
        ],
      },
    ],
  },
  detail: {
    problemHeading: "The Problem",
    aboutProject: "About the Project",
    readReport: "Read Full Report (PDF)",
    visitSite: "Visit Live Site",
    viewSource: "View Source Code",
    keyVisual: "key visualisation",
  },
  footer: {
    tagline:
      "A creator exploring tech and AI. Building digital experiences and sharing the journey.",
    location: "Daerah Istimewa Yogyakarta, Indonesia",
    followMe: "Follow me",
    workTogether: "Let's Work Together",
    servicesTitle: "Services",
    services: [
      "Full Stack Development",
      "Data Science & ML",
      "Web Analytics",
      "UI/UX Design",
      "Company Profile",
    ],
    quickLinksTitle: "Quick Links",
    copyright: "© 2026 Rizki Pangestu. All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
};

const indonesian: SiteContent = {
  nav: {
    home: "Beranda",
    about: "Tentang",
    skills: "Keahlian",
    projects: "Proyek",
    experience: "Pengalaman",
    contact: "Hubungi Saya",
    backToPortfolio: "Kembali ke Portofolio",
    problem: "Masalah",
  },
  hero: {
    badge: "Full Stack Developer + Data Scientist",
    title: "Membangun sistem web dan produk data yang menyelesaikan masalah bisnis nyata.",
    intro:
      "Saya Rizki Pangestu, mahasiswa Sistem Informasi di Universitas Amikom Yogyakarta dengan pengalaman langsung membangun aplikasi web produksi, machine learning, dasbor analitik, dan fitur produk berbasis AI.",
    viewProjects: "Lihat Proyek",
    downloadCv: "Unduh CV",
    photoAlt: "Rizki Pangestu - Full Stack Developer & Data Scientist",
  },
  about: {
    eyebrow: "Tentang",
    heading: "Perpaduan antara rekayasa perangkat lunak, analitik, dan pemecahan masalah kreatif.",
    paragraphs: [
      "Pekerjaan saya menghubungkan full stack engineering dengan data science. Saya sudah membangun sistem siap produksi untuk operasional konstruksi, alur kerja laboratorium, manajemen laundry berbasis SaaS, dan jurnal trading dengan analisis berbasis AI.",
      "Di sisi data, saya bekerja dengan machine learning, computer vision, analitik prediktif, sistem rekomendasi, dan dasbor. Saya menikmati proses mengubah data mentah menjadi produk yang praktis, jelas, dan siap dipakai pengguna.",
    ],
    stats: [
      { value: "3.84", label: "IPK / 4.00" },
      { value: "14", label: "Proyek Nyata" },
      { value: "45%", label: "Pertumbuhan Engagement" },
      { value: "2", label: "Bahasa" },
    ],
  },
  skills: {
    eyebrow: "Keahlian",
    heading: "Perangkat teknis dari pengalaman kerja dan proyek.",
    groups: [
      {
        title: "Full Stack Development",
        subtitle: "Sistem web produksi dan integrasi API",
      },
      {
        title: "Data Science & Analitik",
        subtitle: "Machine learning, dasbor, dan analitik prediktif",
      },
      {
        title: "Desain & Kreatif",
        subtitle: "Komunikasi visual untuk produk dan kampanye",
      },
    ],
  },
  projects: {
    eyebrow: "Proyek",
    heading: "Portofolio Saya.",
    filters: { all: "Semua", data: "Data", fullstack: "Fullstack" },
    filterLabel: "Saring proyek berdasarkan bidang",
  },
  experience: {
    eyebrow: "Pengalaman",
    heading: "Sorotan karier, pendidikan, dan organisasi.",
    entries: [
      {
        role: "Peserta Data Scientist",
        company: "Coding Camp 2026 - Dicoding & DBS Foundation",
        date: "Feb 2026 - Jul 2026",
        description: [
          "Menyelesaikan learning path Data Scientist intensif yang mencakup pemrograman Python, machine learning, dan visualisasi data.",
          "Membangun proyek capstone 'Jivara': aplikasi health-tech untuk deteksi makanan dan pemantauan kepatuhan minum obat memakai computer vision dan AI.",
          "Menyiapkan dataset untuk pelatihan model dan membangun dasbor Streamlit untuk memantau interaksi obat dan makanan.",
        ],
      },
      {
        role: "Full Stack Developer",
        company: "CV. GASNI ADITAMA KONSTRUKSI",
        date: "Juni 2025 - Mei 2026",
        description: [
          "Mengembangkan dan menyempurnakan fitur sistem manajemen konstruksi internal untuk mendukung operasional harian.",
          "Menjaga performa sistem dan mengelola input data terstruktur agar basis data tetap akurat.",
          "Membangun dan mengintegrasikan modul baru dengan PHP (CI3), MySQL, dan REST API sesuai kebutuhan bisnis yang berkembang.",
        ],
      },
      {
        role: "Pembicara (Crypto Enthusiast)",
        company: "Talk Show FORBISDA HIPMI DIY Blockchain 101",
        date: "Feb 2026",
        description: [
          "Membawakan materi tentang dasar blockchain dan ekosistem cryptocurrency.",
          "Mengedukasi peserta mengenai peluang dan risiko di industri blockchain.",
          "Berbagi wawasan tentang tren Web3, adopsi kripto, dan aset digital.",
        ],
      },
      {
        role: "Board of Director - Pilar Bisnis",
        company: "JJC Amikom Jogja",
        date: "Feb 2026",
        description: [
          "Berkontribusi pada strategi pengembangan bisnis dan inisiatif pertumbuhan komunitas.",
          "Mendukung kolaborasi lintas divisi untuk menjalankan program organisasi yang berorientasi bisnis.",
        ],
      },
      {
        role: "Ketua Divisi OKK",
        company: "HIPMI PT Amikom Yogyakarta",
        date: "Jun 2024 - Mar 2025",
        description: [
          "Memimpin divisi rekrutmen anggota, onboarding, dan pengembangan kaderisasi.",
          "Mengelola program organisasi untuk memperkuat keterlibatan anggota dan kapasitas kelembagaan.",
        ],
      },
      {
        role: "Anggota Divisi Data Science",
        company: "AMCC (Amikom Computer Club)",
        date: "Des 2023 - Jul 2024",
        description: [
          "Aktif dalam diskusi data science, berbagi pengetahuan, dan workshop internal.",
          "Berkolaborasi dengan sesama anggota pada proyek berbasis data dan sesi pemecahan masalah teknis.",
          "Menyelesaikan proyek akhir dari fasilitator AMCC sebagai bagian dari program pembelajaran terstruktur divisi.",
        ],
      },
      {
        role: "Junior Graphic Designer",
        company: "KBMDG STUDIO",
        date: "Jan 2022 - Jun 2022",
        description: [
          "Memimpin pengerjaan berbagai proyek desain bersama anggota tim kreatif.",
          "Merancang dan menyelesaikan 20+ proyek desain berbeda dengan tingkat kepuasan klien 100%.",
          "Merintis pendekatan desain baru yang menurunkan jumlah siklus revisi.",
        ],
      },
    ],
  },
  detail: {
    problemHeading: "Latar Belakang Masalah",
    aboutProject: "Tentang Proyek Ini",
    readReport: "Baca Laporan Lengkap (PDF)",
    visitSite: "Kunjungi Situs",
    viewSource: "Lihat Kode Sumber",
    keyVisual: "visualisasi utama",
  },
  footer: {
    tagline:
      "Seorang kreator yang menekuni teknologi dan AI. Membangun pengalaman digital dan membagikan prosesnya.",
    location: "Daerah Istimewa Yogyakarta, Indonesia",
    followMe: "Ikuti saya",
    workTogether: "Mari Bekerja Sama",
    servicesTitle: "Layanan",
    services: [
      "Full Stack Development",
      "Data Science & ML",
      "Web Analytics",
      "Desain UI/UX",
      "Company Profile",
    ],
    quickLinksTitle: "Tautan Cepat",
    copyright: "© 2026 Rizki Pangestu. Seluruh hak cipta dilindungi.",
    privacy: "Kebijakan Privasi",
    terms: "Syarat Layanan",
  },
};

const contentByLanguage: Record<Language, SiteContent> = {
  en: english,
  id: indonesian,
};

export function siteContent(language: Language): SiteContent {
  return contentByLanguage[language] ?? english;
}
