export interface CaseStudyMetric {
  label: string;
  value: string;
}

export interface CaseStudySection {
  /** Anchor id used by the in-page case-study navbar. */
  id: string;
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface CaseStudy {
  /** Short context line: competition, team, role. */
  context: string;
  /** Background / problem statement paragraphs. */
  problem: string[];
  /** Headline result metrics shown as cards. */
  highlights: CaseStudyMetric[];
  /** Detailed write-up sections. */
  sections: CaseStudySection[];
  /** Link to the original full report (PDF). */
  reportUrl?: string;
}

export interface Project {
  slug: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  longDescription?: string;
  githubUrl?: string;
  demoUrl?: string;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
    slug: "insurance-claim-trend-prediction",
    title: "Insurance Claim Trend Prediction",
    category: "Data Science",
    description: "Built an ensemble ML model using Prophet, LightGBM, XGBoost, Ridge, ElasticNet, and ETS with SLSQP optimization to predict health insurance claim frequency, severity, and nominal values for 2026.",
    tags: ["Python", "LightGBM", "XGBoost", "Prophet"],
    longDescription: "In this competition project, I built a robust ensemble machine learning model combining 6 different algorithms (Prophet, LightGBM, XGBoost, Ridge Regression, ElasticNet, Holt-Winters ETS) with weight optimization using SLSQP. The goal was to predict the frequency, severity, and total nominal value of individual health insurance claims for January-December 2026. The solution delivered strategic recommendations for insurers to maintain premium affordability amid a projected 25.5% claim increase.",
    githubUrl: "https://github.com/ikyyy10704",
    caseStudy: {
      context:
        "Data Science Competition · Mathematical Challenge Festival (MCF) ITB 2026 · Team \"Fantastic Three\" — Team Lead.",
      problem: [
        "Individual health insurance claims in Indonesia rose 25.5% in January–June 2025 compared to the same period in 2024. This surge pushes insurers to raise premiums, which in turn makes health coverage increasingly unaffordable for the public — undermining the very purpose of insurance as a tool to protect individuals from unexpected financial shocks.",
        "Prior research has applied machine learning to insurance risk, but almost always to a single dimension at a time. Models that jointly predict claim frequency, claim severity, and total nominal claims for individual health insurance are still very limited.",
        "The core problem I set out to solve: build a predictive model accurate enough across all three claim dimensions that an insurer can act early — through risk selection, prevention, and reserve planning — to absorb rising claims while keeping premiums affordable.",
      ],
      highlights: [
        { label: "Best Combined MAPE", value: "4.40%" },
        { label: "Models Ensembled", value: "6" },
        { label: "Engineered Features", value: "28" },
        { label: "Claim Records Analyzed", value: "5,781" },
      ],
      sections: [
        {
          id: "dataset",
          heading: "Dataset",
          body:
            "Two sources spanning 1 January 2024 – 31 July 2025: Data_Klaim.csv with 5,781 individual health insurance claim transactions, and Data_Polis.csv with 4,096 active policies. Only Paid claims were used; Pending claims were excluded because their amounts are not yet final. Plan codes encode coverage scope: M-001 worldwide, M-002 Asia regional, M-003 domestic Indonesia.",
        },
        {
          id: "eda",
          heading: "Exploratory Data Analysis",
          bullets: [
            "Approved claim amounts are heavily right-skewed — median Rp14.5M vs mean Rp48.5M — signalling catastrophic claims.",
            "Missing values (Inpatient/Outpatient, payment date, hospital location, ICD codes) were imputed with mode or an \"Unknown\" category; no duplicate rows were found.",
            "Outliers (11% of claims by IQR) were handled with 98th-percentile clipping instead of deletion, preserving high-value claim signal.",
            "Length of Stay had the strongest correlation with claim amount (0.43), followed by overseas claims (0.26) and inpatient claims (0.24).",
          ],
        },
        {
          id: "approach",
          heading: "Approach & Methodology",
          body:
            "A 6-model ensemble — Prophet, LightGBM, XGBoost, Ridge Regression, ElasticNet, and Holt-Winters ETS — with weights optimized separately for frequency, severity, and total claims using SLSQP (Sequential Least-Squares Programming). No single model is allowed to dominate more than 60% of any prediction.",
          bullets: [
            "Feature engineering produced 28 features: cyclical calendar encoding (sin/cos), lag features, rolling statistics, log transforms, and a severity skewness ratio.",
            "Walk-forward (expanding-window) cross-validation was used to prevent data leakage and mimic real forecasting conditions.",
            "Total claim = α·(frequency × severity) + (1−α)·direct prediction, with α also optimized.",
            "A severity multiplier of 0.960 was applied to correct a consistent upward bias, improving the combined MAPE to 4.40%.",
          ],
        },
        {
          id: "results",
          heading: "Results",
          bullets: [
            "Frequency: LightGBM was best (MAPE 6.32%), ahead of ETS (7.04%) and XGBoost (8.45%).",
            "Severity: ElasticNet was best (MAPE 5.40%), ahead of LightGBM (5.66%) and Ridge (6.02%).",
            "Total nominal claims: XGBoost was best (MAPE 7.32%), ahead of ETS (9.61%) and LightGBM (9.70%).",
            "No single model won everywhere — the SLSQP-weighted ensemble delivered the best combined MAPE of 4.40%.",
            "Feature engineering helped tree models (LightGBM 7.87% → 6.33%) but hurt linear models and Prophet, confirming its benefit is model-specific.",
          ],
        },
        {
          id: "projection",
          heading: "2026 Projection (Jan–Dec)",
          bullets: [
            "Frequency rises gradually with a Q3–Q4 peak of ~238–239 claims/month.",
            "Severity stays relatively stable at Rp45–47M per claim.",
            "Total nominal claims range Rp10.9–11.2 billion per month, tracking frequency.",
          ],
        },
        {
          id: "recommendations",
          heading: "Strategic Recommendations",
          bullets: [
            "Strengthen technical reserves in H2 2026 (≥60% of annual reserve) ahead of the Q3–Q4 peak.",
            "Control severity via stricter benefit limits / co-insurance on overseas inpatient claims and stronger provider networks abroad.",
            "Run preventive & wellness programs targeting a ≥5% reduction in claim rate.",
            "Trigger proactive premium repricing if realized claims exceed projection by >10% for two consecutive months.",
            "Deploy an early-warning dashboard that alerts when monthly realization exceeds projection by >15%.",
          ],
        },
      ],
      reportUrl: "/Document/26040221_Fantastic%20Three.pdf",
    },
  },
  {
    slug: "hybrid-job-recommendation",
    title: "Hybrid Job Recommendation System",
    category: "Research",
    description: "Developed a personalized job matching system for Indonesia using AHP-weighted SBERT, TF-IDF, and Euclidean Distance to improve relevance and cold-start handling.",
    tags: ["Python", "SBERT", "TF-IDF", "AHP"],
    longDescription: "A personalized job recommendation system tailored for the Indonesian market. By utilizing a hybrid approach that combines AHP-Weighted SBERT and TF-IDF with Euclidean Distance similarity, this research project effectively addressed cold-start and relevance issues common in existing job platforms. The full research title is 'Hybrid Job Recommendation System Using AHP-Weighted SBERT and TF-IDF with Euclidean Distance for Personalized Job Matching in Indonesia'.",
  },
  {
    slug: "jivara-health-tech",
    title: "Jivara Stay on Track, Stay Healthy",
    category: "DBS Foundation Capstone",
    description: "Contributed as Data Scientist for a health-tech app focused on food detection and medication adherence, including dataset preparation and Streamlit dashboard development.",
    tags: ["Computer Vision", "Streamlit", "Machine Learning"],
    longDescription: "Built as a capstone project for the DBS Foundation Coding Camp 2026. I served as the Data Scientist in a cross-functional team to develop 'Jivara', a health-tech application. The core features involved detecting food items via Computer Vision and tracking medication adherence. My responsibilities included collecting and transforming datasets for model training, defining the business problem framing, and building a Streamlit dashboard to visualize food-drug interaction insights.",
  },
  {
    slug: "pivora-trading-journal",
    title: "Pivora Trading Journal Application",
    category: "Full Stack",
    description: "Built a trading journal application with AI-driven psychological analysis, Fear & Greed Index notifications, and personalized trading recommendations.",
    tags: ["Laravel", "Next.js", "MySQL", "AI Integration"],
    longDescription: "Pivora is a comprehensive trading journal application designed to monitor both trading activity and user psychology patterns. By integrating AI-driven insights, the platform uses previously inputted journal data as training input to deliver personalized trading recommendations and real-time Fear & Greed Index notifications, ultimately supporting better decision-making for traders.",
  },
  {
    slug: "saas-laundry-management",
    title: "SaaS Laundry Management System",
    category: "Full Stack",
    description: "Developed a multi-tenant SaaS platform for laundry business and client management, featuring QRIS integration and AI business recommendations.",
    tags: ["PHP", "CodeIgniter", "MySQL", "QRIS"],
    longDescription: "A multi-tenant SaaS platform built to simplify day-to-day operations for small laundry business owners. Key features include comprehensive financial recording, real-time inventory tracking, automated QRIS payment integration, and AI-powered business recommendations to optimize revenue streams.",
  },
  {
    slug: "construction-management-system",
    title: "Construction Management System",
    category: "Full Stack",
    description: "Developed and deployed an in-house construction management system for project tracking, operational reporting, resource management, and internal business workflows.",
    tags: ["PHP", "CI3", "MySQL", "REST API"],
    longDescription: "Developed for CV Gasni Aditama Konstruksi, this comprehensive construction management system solves multiple business operational challenges. The platform centralizes project tracking, resource management, and reporting, replacing fragmented manual processes. It was successfully deployed to production and is actively used by the company's stakeholders.",
  },
];
