export interface CaseStudyMetric {
  label: string;
  value: string;
}

<<<<<<< HEAD
export interface CaseStudyFigure {
  /** Path under /public. */
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** Set for charts rendered on a dark canvas, so the figure card matches instead of framing them in white. */
  theme?: "dark";
}

=======
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
export interface CaseStudySection {
  /** Anchor id used by the in-page case-study navbar. */
  id: string;
  heading: string;
<<<<<<< HEAD
  /** Short label for the in-page navbar. Sections without one are not linked. */
  navLabel?: string;
  body?: string;
  bullets?: string[];
  figures?: CaseStudyFigure[];
=======
  body?: string;
  bullets?: string[];
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
}

export interface CaseStudy {
  /** Short context line: competition, team, role. */
  context: string;
<<<<<<< HEAD
  /** Heading for the opening narrative block. */
  problemHeading?: string;
=======
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
  /** Background / problem statement paragraphs. */
  problem: string[];
  /** Headline result metrics shown as cards. */
  highlights: CaseStudyMetric[];
  /** Detailed write-up sections. */
  sections: CaseStudySection[];
  /** Link to the original full report (PDF). */
  reportUrl?: string;
}

<<<<<<< HEAD
/** Filter bucket used by the portfolio grid. */
export type ProjectGroup = "data" | "fullstack";

=======
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
export interface Project {
  slug: string;
  title: string;
  category: string;
<<<<<<< HEAD
  /** Which filter tab the project belongs to. */
  group: ProjectGroup;
  description: string;
  tags: string[];
  longDescription?: string;
  /** Optional hero image for the detail page. Falls back to a gradient. */
  coverImage?: string;
=======
  description: string;
  tags: string[];
  longDescription?: string;
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
  githubUrl?: string;
  demoUrl?: string;
  caseStudy?: CaseStudy;
}

export const projects: Project[] = [
  {
<<<<<<< HEAD
    slug: "ewallet-user-segmentation",
    title: "E-Wallet User Segmentation (RFM & Clustering)",
    category: "Data Science",
    group: "data",
    description: "Segmented 4,338 e-wallet users into four personas with RFM and K-Means, exposing that the largest user group (36% of the base) generates only 5% of transaction value and should not receive the promo budget it was getting.",
    tags: ["Python", "K-Means", "RFM", "Streamlit"],
    longDescription:
      "A behavioural segmentation project that turns raw transaction history into four named user personas, each with its own promo budget allocation and success metric. Built as a modular pipeline where the Colab notebook is generated from the same source modules that power the CLI and the Streamlit dashboard, so the three artefacts can never disagree.",
    coverImage: "/Image/projects/ewallet-segmentation/02_pca_facets.png",
    caseStudy: {
      context:
        "Banking Data Science Portfolio · Behavioural segmentation and promo budget allocation · End-to-end individual project.",
      problemHeading: "Business Understanding",
      problem: [
        "An e-wallet growth team runs one promo campaign for everybody. That is defensible only if every user is worth the same, and they never are. The question this project answers is blunt: out of all these users, who deserves a promo, who does not need one, and who must be rescued right now before they stop transacting altogether.",
        "The cause of the waste is that user value is extremely concentrated while headcount is not. Budget allocated per head therefore flows to whoever is most numerous, which is almost always the least valuable group.",
        "Left unfixed, this shows up as a promo cost line that grows faster than transaction volume, with nobody able to point at which users the money actually retained.",
        "The solution is a segmentation built on Recency, Frequency and Monetary value, clustered with K-Means, and then translated into four named personas. Each persona carries its own budget level, its own tactic, and its own success metric, so the campaign team has something they can execute rather than a cluster number.",
      ],
      highlights: [
        { label: "Users Segmented", value: "4,338" },
        { label: "Personas Found", value: "4" },
        { label: "Value from Top 17%", value: "66%" },
        { label: "Silhouette (k=4)", value: "0.335" },
      ],
      sections: [
        {
          id: "dataset",
          heading: "Data Understanding",
          navLabel: "Data",
          body:
            "541,909 transaction rows spanning December 2010 to December 2011 across 38 countries, carrying 4,372 customer identities. After cleaning, 4,338 users enter the analysis.",
          bullets: [
            "Raw transactions are normalised into a canonical schema (user_id, transaction_id, transaction_date, transaction_value, region) so that swapping in a different source file only requires editing one config constant.",
            "Rows without a user identity, duplicates, cancelled transactions (invoice numbers prefixed with C) and non-positive values are all removed before aggregation.",
            "The reference date for recency is set to one day after the last transaction in the dataset, so a user who transacted on the final day gets a recency of one rather than zero.",
            "Stated openly: the sample file is online retail transaction data used as a proxy for e-wallet history. The analytical structure is identical, but the absolute numbers do not represent Indonesian digital wallet behaviour.",
          ],
        },
        {
          id: "eda",
          heading: "Exploratory Data Analysis",
          navLabel: "EDA",
          body:
            "The exploration was aimed at one number: how concentrated is transaction value against headcount. That ratio is what decides whether uniform budget allocation is defensible.",
          bullets: [
            "Power Users are 17% of the base and generate 66% of transaction value, with a median recency of 8 days, 10 transactions and a monetary value of 2,534.",
            "At-Risk VIP are 28% of the base and still generate 23% of value, but their recency has already slipped to 58 days.",
            "Cashback Hunters are 20% of the base and generate 5% of value, with a median of only 2 transactions and 344 in value.",
            "Dormant Users are the single largest group at 36% of the base, and generate 5% of value, with a recency of 179 days and one transaction.",
            "The conclusion follows directly from those four rows: a promo budget split evenly per head sends a third of the money to the group with the lowest probability of ever coming back.",
            "Financial data is sharply right-skewed, so a few very large users would otherwise dominate Euclidean distance and drag the cluster centres toward themselves.",
          ],
          figures: [
            {
              src: "/Image/projects/ewallet-segmentation/03_value_concentration.png",
              alt: "Share of transaction value against share of users for each persona",
              caption:
                "The chart that carries the whole argument. Power Users are 17% of the base and 66% of value; Dormant Users are 36% of the base and 5% of value. Any per-head budget allocation is upside down against this picture.",
              width: 868,
              height: 582,
            },
            {
              src: "/Image/projects/ewallet-segmentation/05_rfm_distribution.png",
              alt: "Distribution of recency, frequency and monetary value per persona",
              caption:
                "RFM distributions per persona. The separation is cleanest on recency and frequency, which is what makes the win-back and retention tactics distinguishable in practice.",
              width: 1505,
              height: 499,
            },
          ],
        },
        {
          id: "preprocessing",
          heading: "Preprocessing & Feature Engineering",
          body:
            "Two layers of treatment, both aimed at stopping a handful of extreme users from deciding where the cluster centres land.",
          bullets: [
            "log1p transformation applied to any column with skewness above a 0.75 threshold, which compresses the long right tail without discarding the users in it.",
            "RobustScaler rather than StandardScaler, because it uses the median and interquartile range, so the remaining outliers do not shift the scale for everyone else.",
            "Recency is computed against a fixed reference date, frequency counts unique transactions per user, and monetary sums transaction value per user.",
            "A tenure_days column is carried alongside so that recently joined users can be told apart from genuinely inactive ones, since both look infrequent on a one year window.",
          ],
        },
        {
          id: "modeling",
          heading: "Modeling",
          navLabel: "Modeling",
          body:
            "K-Means in the original RFM space, with the number of clusters chosen by a decision that is stated rather than hidden.",
          bullets: [
            "Unconstrained silhouette peaks at k = 2 with a score of 0.434. The elbow of the inertia curve sits at k = 5. The value actually used is k = 4, with a silhouette of 0.335.",
            "The reasoning: silhouette peaks at k = 2 because two large blobs are geometrically the easiest thing to separate, but two groups cannot drive a budget allocation. Promo allocation needs at least four distinct treatments (retain, grow, win back, economise), and beyond about eight the campaign team cannot execute them differently anyway.",
            "So the search was constrained to 4 to 8 clusters, and k = 4 is the best silhouette inside that range, sitting next to the elbow at k = 5. The unconstrained numbers are still reported in full in the notebook and the dashboard rather than being quietly dropped.",
            "PCA is used for display only. Three components explain 100% of the variance with PC1 alone at 75.6%, but the clusters are formed in the original RFM space so that centroids stay directly translatable into business language.",
          ],
          figures: [
            {
              src: "/Image/projects/ewallet-segmentation/01_cluster_selection.png",
              alt: "Elbow curve and silhouette score across candidate cluster counts",
              caption:
                "Elbow and silhouette computed side by side. The chart is shown with the unconstrained optimum visible, because a cluster count chosen for business reasons should be defended in the open rather than presented as the statistical winner.",
              width: 1198,
              height: 450,
            },
            {
              src: "/Image/projects/ewallet-segmentation/02_pca_facets.png",
              alt: "PCA projection faceted one panel per persona",
              caption:
                "PCA projection split into one panel per persona, with the full population in grey for context. Faceting keeps each group readable where the regions overlap, and it does not depend on the reader telling four colours apart at once.",
              width: 1748,
              height: 476,
            },
          ],
        },
        {
          id: "evaluation",
          heading: "Persona Naming & Validation",
          navLabel: "Evaluation",
          body:
            "A cluster number is not a deliverable. Each cluster is compared against the population median on three axes (recent or not, frequent or not, high value or not), and the eight possible combinations map to fixed persona archetypes.",
          bullets: [
            "The mapping table covers all eight combinations: Power Users, Cashback Hunters, Big Ticket Spenders, New and Casual Users, At-Risk VIP, Fading Regulars, Lapsed Big Spenders, and Dormant Users.",
            "The mapping is deterministic, so the same dataset always produces the same persona names and the naming never depends on the arbitrary cluster index K-Means happens to assign.",
            "A behaviour index compares each persona against the population median where 100 is the median. Recency is inverted into a recency-strength score so the colour direction stays consistent: blue always means stronger behaviour, red always means weaker.",
            "Chart palettes were checked for colour-blind readability across every pair. The palette holds four slots, so a fifth cluster onward is shown through separate panels or a highlight mode rather than by adding colours that are hard to tell apart.",
          ],
          figures: [
            {
              src: "/Image/projects/ewallet-segmentation/04_persona_index.png",
              alt: "Behaviour strength index per persona against the population median",
              caption:
                "Behaviour index per persona against the population median (100). Inverting recency into a strength score keeps the colour direction meaningful, so a reader never has to remember that low recency is good.",
              width: 818,
              height: 569,
            },
          ],
        },
        {
          id: "impact",
          heading: "Promo Budget Allocation",
          navLabel: "Impact",
          body:
            "The segmentation replaces one uniform campaign with four treatments that differ in both budget and form.",
          bullets: [
            "Power Users, low allocation: they already transact without incentives, so a discount here erodes margin on revenue that was arriving anyway. What they need is status recognition, not price cuts: tiered loyalty, early feature access, priority service. Success metric: 90 day retention and GTV growth per user.",
            "At-Risk VIP, highest allocation: 23% of transaction value with recency already below the population median. A rupiah spent here rescues revenue that is already proven, far cheaper than acquiring a new user of equivalent value. Form: personal contact plus a single large cashback with a short deadline. Success metric: 30 day reactivation rate.",
            "Cashback Hunters, medium allocation capped by an ROI threshold: they respond to promos but their ticket size is small, so a flat promo just subsidises transactions that stay small. Tiered cashback with a rising minimum spend raises basket value without raising the budget. Success metric: average ticket and promo cost against GTV.",
            "Dormant Users, very low allocation: stop the high value promos and keep the relationship alive with low cost communication only. The money saved on this largest group is precisely what funds the At-Risk VIP win-back campaign.",
            "Delivered as a four tab Streamlit dashboard: persona summary with promo action cards, a 2D and 3D PCA cluster map with per-persona highlight mode, model quality evidence, and a user explorer with CSV download. Cluster count is adjustable from the sidebar and a different transaction file can be uploaded there directly.",
          ],
        },
        {
          id: "limitations",
          heading: "Limitations",
          bullets: [
            "RFM only describes the past. This segmentation says who is valuable, not who will respond to a promo. Answering the second question needs a controlled A/B test or an uplift model.",
            "The window is one year, so recently joined users look infrequent purely because they have not had time. The tenure_days column exists to separate that case.",
            "Clusters need periodic retraining. Behaviour shifts, and a monthly or quarterly schedule keeps the personas current.",
            "Transaction value is taken as-is, with no adjustment for refunds or promos already consumed. Where that data exists, net value should be used so Monetary does not overstate a user's contribution.",
            "The sample dataset is online retail data used as an e-wallet proxy, so the absolute figures should not be quoted as Indonesian e-wallet behaviour.",
          ],
        },
      ],
    },
    githubUrl: "https://github.com/ikyyy10704",
  },
  {
    slug: "food-delivery-eta-prediction",
    title: "Food Delivery ETA Prediction",
    category: "Data Science",
    group: "data",
    description: "Predicted food delivery duration for an on-demand platform to MAE 3.21 minutes and R2 0.816, and showed with SHAP that distance is not the main cause of late deliveries.",
    tags: ["Python", "LightGBM", "SHAP", "Streamlit"],
    longDescription:
      "An ETA prediction system for a ShopeeFood or GoFood style delivery platform: raw operational data cleaning, geospatial and temporal feature engineering, three tree-based models compared, SHAP interpretation, and a Streamlit app the operations team can actually use to simulate ETA across the day.",
    coverImage: "/Image/projects/delivery-eta/prediction_quality.png",
    caseStudy: {
      context:
        "Logistics Data Science Portfolio · On-demand food delivery ETA · End-to-end individual project, from raw operational data to a deployed estimator.",
      problemHeading: "Business Understanding",
      problem: [
        "A wrong ETA is one of the largest sources of customer complaints on a food delivery app, and it hurts in both directions. Promise too little time and the customer waits longer than told: ratings drop, complaints rise, support load grows, and voucher compensation swells. Promise too much and the customer abandons the order before placing it: conversion falls, driver utilisation drops, and GMV per driver-hour falls with it.",
        "The cause is that ETA is usually estimated from distance alone, which is the one input everybody has. But distance is a poor proxy for duration once traffic, weather, kitchen preparation time and driver behaviour enter the picture.",
        "Three questions framed the work: how long will an order actually take given distance, weather, traffic and order hour; which factor really drives lateness; and how to put that estimate in front of the operations team interactively rather than in a notebook.",
        "The solution is a LightGBM regressor over 19 engineered features, interpreted with SHAP so the drivers are visible rather than assumed, and shipped as a Streamlit app that shows an ETA range instead of a single number.",
      ],
      highlights: [
        { label: "MAE", value: "3.21 min" },
        { label: "R2", value: "0.816" },
        { label: "Within 5 Minutes", value: "80.0%" },
        { label: "Orders Analysed", value: "45,593" },
      ],
      sections: [
        {
          id: "dataset",
          heading: "Data Understanding",
          navLabel: "Data",
          body:
            "45,593 historical deliveries across 20 columns covering restaurant and customer coordinates, driver profile, weather, traffic density, order type and actual delivery duration, plus 11,399 unlabelled orders for prediction. This dataset is dirty in the way real operational data is dirty, and every problem was handled explicitly rather than dropped.",
          bullets: [
            "Trailing whitespace on every text column (values like \"0x4607 \" and \"High \"), stripped across all object columns.",
            "Text prefixes fused into values (\"conditions Sunny\"), removed by prefix.",
            "The target itself carried a prefix (\"(min) 24\"), so the number is extracted and cast to float.",
            "Missing values stored as the literal string \"NaN \" rather than as nulls, affecting over 7,000 cells, converted to real nulls.",
            "Broken coordinates: latitudes of -30.9 (sign error, fixed with abs) and values near 0.01 (invalid, flagged across 3,640 rows).",
            "Ratings and ages outside plausible ranges (a rating of 6.0, an age of 15) clipped to valid ranges and then imputed.",
          ],
          figures: [
            {
              src: "/Image/projects/delivery-eta/eda_overview.png",
              alt: "Exploratory overview of the delivery dataset",
              caption:
                "EDA overview across the delivery dataset. The target distribution, condition breakdowns and the relationships that later show up in the SHAP ranking are all visible here before any model is fitted.",
              width: 1522,
              height: 972,
            },
          ],
        },
        {
          id: "eda",
          heading: "Exploratory Data Analysis",
          navLabel: "EDA",
          body:
            "The exploration set up the question the SHAP analysis would later answer: is delivery duration mostly a function of how far the order has to travel, or of the conditions it travels through.",
          bullets: [
            "Median delivery time is 26 minutes, so an average error of about 3 minutes is roughly 12% relative error, which is accurate enough to display to a customer.",
            "The error distribution is centred but has a visible tail: a small share of orders carry large errors, and those cluster in peak hours and extreme weather.",
            "Traffic density separates duration far more sharply than distance bands do, which was the first sign that the intuitive answer (shrink the delivery radius) was going to be the wrong lever.",
            "Order hour shows the expected double peak at lunch (11 to 14) and dinner (18 to 22), where kitchen queues and road congestion arrive at the same time.",
          ],
        },
        {
          id: "preprocessing",
          heading: "Preprocessing & Feature Engineering",
          body:
            "Nineteen features across four groups. The encoders are fitted after the train and test split so imputation values never leak backwards from the test set.",
          bullets: [
            "Geospatial: Haversine great-circle distance between restaurant and customer, computed vectorised at R = 6,371.0088 km, plus is_long_haul above 15 km. Haversine is a straight line and real road distance is typically 1.3 to 1.5 times longer, but the tree model learns that detour factor from the data itself, so no paid routing API is needed.",
            "Temporal: order_hour, is_peak_hour (lunch 11 to 14 or dinner 18 to 22), is_weekend, day_of_week, order_month_day as a payday and promo cycle proxy, and prep_pickup_minutes as a direct proxy for kitchen load.",
            "Missing order hours are reconstructed from pickup time minus the median pickup delay rather than dropped, because those rows still carry valid information in every other column.",
            "Operational conditions encoded with a manual ordinal scale rather than LabelEncoder, so the order carries business meaning and stays identical between training and the app: traffic Low(0) to Jam(3), weather Sunny(0) to Stormy(5), plus Festival, City, order type and vehicle type.",
            "City hub extracted from the driver ID prefix: INDORES13DEL02 gives INDO for Indore. A free local signal that is usually thrown away when ID columns get dropped by default.",
          ],
        },
        {
          id: "modeling",
          heading: "Modeling",
          navLabel: "Modeling",
          body:
            "Three tree-based models trained on the same 19 features with an 80/20 split, compared on four metrics including one written for the operations team rather than for a data scientist.",
          bullets: [
            "LightGBM: MAE 3.21 minutes, RMSE 4.02, R2 0.816, and 80.0% of orders correct within 5 minutes.",
            "XGBoost: MAE 3.26, RMSE 4.09, R2 0.809, 78.9% within 5 minutes.",
            "Random Forest: MAE 3.42, RMSE 4.31, R2 0.788, 77.1% within 5 minutes.",
            "RMSE sitting above MAE says a small number of orders still carry large errors. Investigating those found them concentrated in peak hours and extreme weather, which makes them the first target for the next model iteration rather than an unexplained residual.",
            "The accuracy-within-5-minutes metric exists because it is the one number an operations lead can act on: four out of five orders land inside the tolerance customers actually notice.",
          ],
          figures: [
            {
              src: "/Image/projects/delivery-eta/prediction_quality.png",
              alt: "Actual versus predicted delivery time and the error distribution",
              caption:
                "Actual against predicted duration, with the error distribution beside it. The error is centred near zero with a mild tail, and negative error means the ETA was too optimistic, which is the direction that costs the most in customer trust.",
              width: 1412,
              height: 532,
            },
            {
              src: "/Image/projects/delivery-eta/feature_importance_lightgbm.png",
              alt: "LightGBM feature importance for the ETA model",
              caption:
                "LightGBM feature importance. Useful as a first pass, but split counts favour high-cardinality features, which is why the operational conclusions below are drawn from SHAP instead.",
              width: 972,
              height: 752,
            },
          ],
        },
        {
          id: "evaluation",
          heading: "Interpretation & the Main Finding",
          navLabel: "Evaluation",
          body:
            "SHAP was computed on the test set and expressed in minutes, so every driver of lateness can be read directly as time rather than as an abstract importance score.",
          bullets: [
            "Traffic density: 2.49 minutes average impact, the single largest factor, with Jam conditions adding the most.",
            "Driver age: 2.45 minutes, functioning as a proxy for experience and riding style rather than as demographics.",
            "Driver rating: 2.21 minutes, with higher ratings consistently associated with faster deliveries.",
            "Vehicle condition: 1.88 minutes, meaning a poor vehicle is a real time penalty and fleet maintenance is an ETA lever.",
            "Distance: 1.85 minutes, important but only fifth. Road conditions beat distance.",
            "Weather 1.69 minutes, and multiple deliveries 0.81 minutes, so batching does add time but remains economically worthwhile.",
            "The finding that changes the operational decision: distance is not the main driver of lateness. Traffic density and driver quality (age, rating, vehicle condition) collectively matter far more, which means shrinking the service radius is not the most effective fix. Improving driver allocation during congested hours and maintaining fleet quality returns more.",
          ],
          figures: [
            {
              src: "/Image/projects/delivery-eta/shap_importance_bar.png",
              alt: "SHAP importance ranking expressed in minutes",
              caption:
                "SHAP importance in minutes. Expressing impact in the unit of the target is what lets an operations lead compare a traffic fix against a fleet maintenance programme on the same scale.",
              width: 862,
              height: 983,
            },
            {
              src: "/Image/projects/delivery-eta/shap_beeswarm.png",
              alt: "SHAP beeswarm plot for the ETA model",
              caption:
                "SHAP beeswarm. Each point is one order coloured by feature value, showing the direction of each effect and how consistent it is across the fleet.",
              width: 843,
              height: 983,
            },
          ],
        },
        {
          id: "impact",
          heading: "Deployment Recommendation",
          navLabel: "Impact",
          body:
            "The model is only half the deliverable. How the number is presented to the customer is the other half, and it changes the business outcome more than a decimal point of MAE would.",
          bullets: [
            "Show the customer ETA plus MAE as an upper bound rather than the point prediction. Being slightly pessimistic beats breaking a promise, and it is standard practice across the delivery industry.",
            "The Streamlit app takes distance, weather, traffic and order hour (plus optional driver profile and batching) and returns an ETA with a realistic range derived from the model MAE.",
            "Risk factor badges flag peak hour, congestion, bad weather, long haul and heavy batching, so the operator sees why an estimate is high rather than just that it is.",
            "A full-day ETA simulation shows the fastest and slowest hour for the same order, and a distance sensitivity view shows how many minutes each additional kilometre costs.",
            "Any feature the user leaves blank falls back to the training median, so the model always receives a complete feature vector and the app never errors out on partial input.",
          ],
        },
        {
          id: "limitations",
          heading: "Limitations & Roadmap",
          bullets: [
            "Haversine is a straight line distance. Replacing it with real road distance from OSRM or a distance matrix API is the single most promising next improvement.",
            "The model predicts a point. Quantile regression with LightGBM would let the app present a P50 to P90 range that is derived rather than approximated from MAE.",
            "There are no real-time features yet: active orders per restaurant and driver density per zone would both help most in exactly the peak hour cases where the current model is weakest.",
            "Validation uses a random split. A time-based split would imitate production conditions more strictly.",
            "After deployment, MAE needs monitoring per city and per hour so drift shows up where it actually happens rather than only in the global average.",
          ],
        },
      ],
    },
    githubUrl: "https://github.com/ikyyy10704",
  },
  {
    slug: "credit-risk-scoring-engine",
    title: "Banking Credit Risk Scoring Engine",
    category: "Data Science",
    group: "data",
    description: "Turned manual underwriting into a calibrated PD model and a 300-850 credit scorecard, cutting the portfolio NPL rate from 21.87% to 4.57% while still approving 72% of applicants.",
    tags: ["Python", "LightGBM", "SHAP", "Streamlit"],
    longDescription:
      "An end-to-end consumer credit risk system: data cleansing, banking feature engineering, a calibrated probability-of-default model, an algebraically derived credit scorecard, SHAP reason codes for adverse action notices, and a Streamlit decision engine for credit analysts. The notebook, the training pipeline and the dashboard all import the same module, so research and production can never drift apart.",
    coverImage: "/Image/projects/credit-risk/02_model_validation.png",
    caseStudy: {
      context:
        "Banking Data Science Portfolio · Credit risk analytics · End-to-end individual project, from raw applications to a deployable decision engine.",
      problemHeading: "Business Understanding",
      problem: [
        "The unsecured consumer loan portfolio in this dataset carries an NPL rate of 21.87%, more than four times the 5% threshold regulators treat as healthy. At a Loss Given Default of 45%, that translates to an expected loss of 6,874,729 currency units on a test exposure of 62,249,975, and the test segment is only a fifth of the book.",
        "The root cause is not the borrowers; it is the underwriting process. Decisions are made by manual judgement, which means they are inconsistent between analysts, impossible to measure, and impossible to audit once a loan goes bad. Nobody can say why a particular application was approved, so nobody can fix what went wrong.",
        "Four questions had to be answered for the process to become defensible: how likely is this applicant to default, how does that probability become an operational decision, how much NPL can be cut without shutting down lending altogether, and why exactly was an applicant rejected.",
        "The solution is a calibrated PD model translated into a 300-850 credit score with three decision bands (approve, manual review, reject), where the score cut-offs are derived algebraically from credit policy anchors rather than guessed, and every decision comes with SHAP reason codes ready to be used as an adverse action notice.",
      ],
      highlights: [
        { label: "NPL Rate", value: "4.57%" },
        { label: "Gini Coefficient", value: "0.899" },
        { label: "KS Statistic", value: "76.6" },
        { label: "Approval Rate", value: "72.15%" },
      ],
      sections: [
        {
          id: "dataset",
          heading: "Data Understanding",
          navLabel: "Data",
          body:
            "32,581 credit applications across 12 columns, with loan_status as the target. The class split is 78.18% performing against 21.82% default, a ratio of 3.58 to 1. Before any modelling, the data quality audit produced five findings that each needed a deliberate decision rather than a default fix.",
          bullets: [
            "loan_int_rate was missing on 3,116 rows (9.6%). Imputed with the median per loan_grade, which follows risk-based pricing logic instead of flattening every applicant to one number, and fitted on the training split only.",
            "person_emp_length was missing on 895 rows (2.7%), imputed with the median inside the Pipeline so every cross-validation fold refits it.",
            "165 duplicate applications were dropped.",
            "Five records showed an age up to 144 and two showed employment length up to 123 years. These are input errors, not legitimate outliers, so they were set to NaN and imputed rather than winsorised, because clipping them would have treated impossible data as merely extreme.",
            "Extreme incomes (up to 6 million) were winsorised at the 99.5th percentile.",
          ],
        },
        {
          id: "eda",
          heading: "Exploratory Data Analysis",
          navLabel: "EDA",
          body:
            "The exploration was aimed at one thing: finding out whether risk separates along dimensions a credit officer would recognise, because a model that disagrees with underwriting intuition has to justify itself much harder before it can be deployed.",
          bullets: [
            "NPL rate rises monotonically as loan grade worsens, from roughly 10% at grade A to nearly 100% at grade G.",
            "Debt consolidation, home improvement and medical loans all sit above the portfolio average; venture and education sit below it.",
            "Renters default at around 32% against 7% for owners, the sharpest single categorical split in the data.",
            "The DTI bucket chart shows the clearest engineered signal: NPL climbs from about 14% below 10% DTI to over 80% in the 20-30% band.",
            "The rule-based risk_category built during feature engineering separates cleanly and monotonically (LOW 9.78%, MEDIUM 38.74%, HIGH 70.15%, VERY_HIGH 92.96%), which proves the underwriting rules are sound before any statistical model is allowed to speak.",
          ],
          figures: [
            {
              src: "/Image/projects/credit-risk/01_eda.png",
              alt: "Six panel exploratory analysis of the credit portfolio",
              caption:
                "Portfolio EDA. Target balance, then NPL rate broken down by loan grade, loan purpose, home ownership, DTI bucket, and the rule-based risk category. Every one of the six panels separates risk in the direction a credit officer would predict.",
              width: 2456,
              height: 1280,
            },
          ],
        },
        {
          id: "preprocessing",
          heading: "Preprocessing & Feature Engineering",
          body:
            "Ten derived variables were built following conventional underwriting practice. All of them are computed row by row, so the same function serves batch training and real-time scoring of a single application, which removes any chance of the two disagreeing.",
          bullets: [
            "est_monthly_installment uses the annuity formula P·i / (1-(1+i)^-n) over a 36 month tenor, giving the borrower's actual repayment burden rather than the headline loan amount.",
            "dti_ratio (installment over monthly income) is the classic ability-to-pay measure against a 35% prudential threshold; lti_ratio (principal over annual income) measures exposure size.",
            "credit_history_score combines history length (0-100), a 35 point penalty for any prior default, and a grade bonus, condensing bureau record quality into one number.",
            "Supporting variables: emp_stability_ratio, interest_burden_ratio, disposable_income_monthly, loan_to_emp_years, income_log, and a rule-based risk_category demerit score.",
            "The processing order protects validation integrity: cleansing, then the stratified 80/20 split, then fitting feature engineering parameters on the training set only, then preprocessing inside a Pipeline, then 5-fold CV. Reversing the first two steps would leak the test set through the per-grade interest rate medians.",
            "Class imbalance was tested inside the folds rather than assumed. class_weight=\"balanced\" reached ROC-AUC 0.8880 with recall 0.7999; SMOTE reached 0.8879 with recall 0.7984; no balancing at all reached 0.8867 but recall collapsed to 0.6008. SMOTE offered no real advantage over the far cheaper class weighting, and pushing recall from 60% to 80% matters here because missing a defaulter costs much more than turning away a good customer.",
          ],
        },
        {
          id: "modeling",
          heading: "Modeling",
          navLabel: "Modeling",
          body:
            "Three candidates were compared under stratified 5-fold cross validation, with logistic regression included as the traditional scorecard baseline that any tree model has to beat to justify its extra complexity.",
          bullets: [
            "LightGBM led with ROC-AUC 0.9467 (std 0.0015), Gini 0.8933, KS 0.7611 and PR-AUC 0.9039.",
            "XGBoost followed closely at ROC-AUC 0.9459, and logistic regression reached 0.8882 with precision of only 0.5671.",
            "Between-fold standard deviation stays under 0.002, so the result is a stable model rather than a lucky split.",
            "One decision shaped the final model more than any hyperparameter: calibration was kept separate from class balancing. scale_pos_weight improves separation but destroys probability calibration, and a credit score is derived from the odds, so the final model was trained without weighting and then calibrated isotonically. Brier score fell to 0.0500.",
          ],
        },
        {
          id: "evaluation",
          heading: "Evaluation",
          navLabel: "Evaluation",
          body:
            "Measured on 6,484 applications the model had never seen. The industry benchmarks are included because a credit risk number without a benchmark tells a committee nothing.",
          bullets: [
            "ROC-AUC 0.9495 against logistic regression's 0.8900 (above 0.75 is considered adequate).",
            "Gini 0.8989 against 0.7800 (above 0.40 is adequate), and KS 76.62 against 63.81 (40 to 60 is already strong).",
            "PR-AUC 0.9093, precision 0.9775, recall 0.7362, F1 0.8399.",
            "Brier score 0.0500 against 0.1274 for the baseline, confirming the calibration held.",
            "Confusion matrix at a 0.50 PD cut-off: 5,042 true negatives, 24 false positives, 374 false negatives, 1,044 true positives.",
            "Two cut-offs were computed and reported side by side: Youden J maximises KS at PD 0.2288, while minimum expected cost lands at PD 0.1500 under a 5:1 false negative to false positive cost ratio. The cost-based cut-off is lower because bad debt is far more expensive than a lost good customer.",
          ],
          figures: [
            {
              src: "/Image/projects/credit-risk/02_model_validation.png",
              alt: "Six panel model validation suite for the calibrated LightGBM model",
              caption:
                "The full validation suite: ROC curve, KS separation between good and bad cumulative distributions, precision-recall curve, confusion matrix, calibration plot, and the PD distribution by actual outcome. The calibration plot is the one that matters most here, because the credit score is derived from the odds.",
              width: 2412,
              height: 1343,
            },
          ],
        },
        {
          id: "integrity",
          heading: "Integrity Check: is the model just copying the old policy?",
          body:
            "A KS of 76.62 sits well above the 30 to 45 range typical of real retail portfolios. A number that good is a reason for suspicion, not celebration, so two checks were run before the model was declared fit for use.",
          bullets: [
            "Leakage audit: no column gives the target away. The highest univariate AUC is 0.72 (loan_grade), and no variable is deterministic.",
            "Where the separation actually comes from: a sharp interaction between loan_percent_income and loan_grade. Within grade A alone, NPL jumps from 9.2% to 60.4% once the loan crosses 30% of income. That is a pattern too clean for a real book and a signature of a curated dataset.",
            "Challenger test: the model was retrained without loan_grade and loan_int_rate, the two variables the bank sets itself rather than observing from the customer. ROC-AUC fell from 0.9497 to 0.9377 and KS from 0.7746 to 0.7302, a drop of only 5.7%. The model is therefore not simply replaying the old pricing decisions; most of its power comes from the applicant's own financial profile.",
            "The honest conclusion, stated in the deliverable: a KS of 76 must not be promised to management as field performance. On a real portfolio a fall into the 40 to 55 range is normal, and the cut-off needs recalibrating after the first 6 to 12 months of booking data.",
          ],
        },
        {
          id: "scorecard",
          heading: "Credit Scorecard & Decision Engine",
          body:
            "The score follows the standard form Score = OFFSET + FACTOR × ln((1-PD)/PD). What makes it defensible is that OFFSET and FACTOR are not chosen by feel; they are solved algebraically from two credit policy anchors, so the business thresholds attach directly to the score.",
          bullets: [
            "Anchor one: PD 25% maps to score 600, the floor of manual review. Anchor two: PD 10% maps to score 700, the floor of approval. Solving both gives FACTOR 91.02, OFFSET 500.00, and a PDO (points to double the odds) of 63.1.",
            "PD is floored at 3 basis points and capped at 99.9%, because isotonic calibration can return exactly 0 or 1 in extreme bins and an absolute PD of zero cannot be defended in a risk document. Basel requires a PD floor for retail exposures for the same reason.",
            "Decision rules: above 700 approve and disburse automatically; 600 to 700 route to manual review for income verification, a site visit, or a smaller limit offer; below 600 reject or redirect to a secured product.",
            "The manual review band is deliberately retained. The model is meant to remove inconsistency from routine decisions, not to remove human judgement from the cases that need it.",
          ],
          figures: [
            {
              src: "/Image/projects/credit-risk/03_scorecard.png",
              alt: "Credit score distribution, NPL rate per score band, and decision composition",
              caption:
                "Score distribution by actual outcome with the 600 and 700 policy cut-offs marked, NPL rate per score band (monotonic from 95.4% at 300-550 down to 2.1% at 750-850), and the resulting decision mix. Monotonicity across bands is the property a credit committee checks first.",
              width: 2456,
              height: 719,
            },
          ],
        },
        {
          id: "explainability",
          heading: "Explainability & Reason Codes",
          body:
            "A rejected applicant has a legal right to know why, and a credit committee will not sign off on a model it cannot interrogate. SHAP answers both needs from the same computation.",
          bullets: [
            "Top drivers: person_home_ownership_OWN (lowers risk), lti_ratio (raises), person_income (raises), loan_int_rate (lowers), loan_intent_VENTURE (raises), risk_category_LOW (lowers), loan_percent_income, and disposable_income_monthly.",
            "Four of the eight strongest drivers are engineered variables, confirming that the banking feature engineering carried real weight rather than decorating the feature list.",
            "explain_high_risk_case() emits per-application reason codes in a format ready to serve as an adverse action notice, which is the legal basis a bank needs when explaining a rejection to an applicant.",
          ],
          figures: [
            {
              src: "/Image/projects/credit-risk/04_shap_beeswarm.png",
              alt: "SHAP beeswarm plot of the credit risk model",
              caption:
                "SHAP beeswarm. Each point is one application coloured by feature value, showing not just which variables matter but in which direction and how consistently.",
              width: 1025,
              height: 1116,
            },
            {
              src: "/Image/projects/credit-risk/04_shap_bar.png",
              alt: "Global feature importance by mean absolute SHAP value",
              caption:
                "Global ranking by mean |SHAP|. Engineered banking ratios sit alongside the raw application fields rather than below them.",
              width: 1028,
              height: 1116,
            },
            {
              src: "/Image/projects/credit-risk/05_shap_high_risk_case.png",
              alt: "SHAP explanation for a single high risk application",
              caption:
                "A single high-risk application explained. This is the artefact that becomes the reason code on the rejection letter, which is what turns an opaque score into an auditable decision.",
              width: 1156,
              height: 764,
            },
          ],
        },
        {
          id: "impact",
          heading: "Business Impact",
          navLabel: "Impact",
          body:
            "Backtested on the 6,484 test applications against the old policy of approving everything that came through the door.",
          bullets: [
            "APPROVE band: 4,144 applications (63.91%), NPL 3.14%, average score 804, exposure 38.3 million.",
            "MANUAL REVIEW band: 1,068 applications (16.47%), NPL 15.73%, average score 659.",
            "REJECT band: 1,272 applications (19.62%), NPL 88.05%, average score 350. Nearly nine in ten applications in that band really did end up in default.",
            "NPL rate falls from 21.87% to 4.57%, a drop of 17.29 percentage points (79.1% relative), landing below the 5% healthy threshold.",
            "Approval rate stays at 72.15%, so lending is not shut down to buy the improvement. 1,204 bad loans are prevented, worth an estimated 5,979,572 in avoided loss at 45% LGD.",
            "The figure is deliberately conservative: it assumes half of the manual review band is eventually disbursed with the same risk composition, meaning the analyst is credited with adding no separation power at all.",
          ],
        },
        {
          id: "limitations",
          heading: "Limitations & Governance",
          body:
            "Five limitations that belong in front of the credit committee before deployment, not after.",
          bullets: [
            "Field performance will be lower. KS 76 reflects an unusually sharp dataset; a realistic range on a live portfolio is KS 40 to 55.",
            "loan_grade and loan_int_rate are set by the bank itself. If pricing policy changes, the model must be retrained, and the challenger variant serves as the fallback.",
            "The dataset has no time dimension, so out-of-time validation, the standard test for a risk model, cannot be performed.",
            "Selection bias remains: the data only contains applications that were approved in the past, so the behaviour of previously rejected applicants is unobserved. Reject inference is the first item on the roadmap.",
            "Governance schedule shipped with the model: PSI monitoring monthly (investigate above 0.25), Gini and KS quarterly (recalibrate on a 10% drop), cut-off recalibration every six months, full retraining annually, and a continuous champion-challenger race.",
          ],
        },
      ],
    },
    githubUrl: "https://github.com/ikyyy10704",
  },
  {
    slug: "ewallet-fraud-detection",
    title: "E-Wallet Transaction Fraud Detection",
    category: "Data Science",
    group: "data",
    description: "Built a real-time fraud detection system over 6.36 million mobile money transactions at a 1:774 imbalance, and exposed the simulator artefact that makes most PaySim projects report perfect scores.",
    tags: ["Python", "XGBoost", "SHAP", "Streamlit"],
    longDescription:
      "An end-to-end fraud detection pipeline on 6.36 million PaySim mobile money transactions: data profiling, behavioural feature engineering, extreme class imbalance handling, supervised and unsupervised modelling, risk-mitigation evaluation, SHAP explainability, and a Streamlit alerting dashboard. Its distinguishing contribution is a diagnostic step most fraud projects skip, which is testing whether the near-perfect metrics are real before reporting them.",
    coverImage: "/Image/projects/fraud-detection/realistic_precision_recall_curves.png",
    caseStudy: {
      context:
        "Banking Data Science Portfolio · Digital transaction security · End-to-end individual project on the PaySim mobile money dataset.",
      problemHeading: "Business Understanding",
      problem: [
        "Out of 6,362,620 transactions, only 8,213 are fraudulent. That is 0.13%, a ratio of 1 to 774, and it makes accuracy a meaningless metric: a model that answers \"every transaction is safe\" scores 99.87% accuracy while letting every rupiah of loss through.",
        "The business cost is two-sided and pulls in opposite directions. A missed fraud is a direct loss, a customer claim, and a reputational hit. A blocked legitimate transaction is an angry user, review team workload, and eventually churn. Optimising either one alone produces a system nobody can operate.",
        "So the target was never a single score. It was a pair: catch at least 90% of fraud while keeping the alert rate low enough that a real review team can process the queue, and make every alert explainable enough for an analyst to act on and a regulator to audit.",
        "The solution is a chronologically validated XGBoost classifier with a threshold calibrated on a held-out validation window, an Isolation Forest as an unsupervised second layer, SHAP explanations at both the global and per-transaction level, and a Streamlit dashboard where the blocking threshold is a slider the risk team controls rather than a constant buried in code.",
      ],
      highlights: [
        { label: "Transactions Analysed", value: "6.36M" },
        { label: "Precision", value: "93.91%" },
        { label: "Recall", value: "90.73%" },
        { label: "User Disruption", value: "0.02%" },
      ],
      sections: [
        {
          id: "dataset",
          heading: "Data Understanding",
          navLabel: "Data",
          body:
            "6,362,620 transactions over 743 hours (roughly 31 days), with zero missing values and zero duplicates. The fraud label fires 8,213 times, giving a 1:774 imbalance that dictates every methodological choice downstream.",
          bullets: [
            "Fraud appears in exactly two transaction types, the classic drain-then-cash-out pattern: TRANSFER at a 0.7688% fraud rate (4,097 of 532,909) and CASH_OUT at 0.1840% (4,116 of 2,237,500).",
            "PAYMENT, CASH_IN and DEBIT contain literally zero fraud across 3.59 million transactions, which is itself a modelling signal rather than a curiosity.",
            "Median fraud amount is 441,423 against 171,034 for legitimate transactions of the same type, so absolute value carries signal but nowhere near enough on its own.",
          ],
          figures: [
            {
              src: "/Image/projects/fraud-detection/fraud_rate_by_type.png",
              alt: "Fraud rate broken down by transaction type",
              caption:
                "Fraud rate by transaction type. Three of the five types contain no fraud at all, which narrows the real problem to the TRANSFER and CASH_OUT chain.",
              width: 840,
              height: 600,
            },
          ],
        },
        {
          id: "eda",
          heading: "Exploratory Analysis & the Critical Finding",
          navLabel: "EDA",
          body:
            "Before trusting any metric, one simple rule was tested: flag every TRANSFER or CASH_OUT that drains the sender's balance to exactly zero. The result decided how the entire project would be reported.",
          bullets: [
            "That one-line rule catches 8,024 of 8,213 frauds, which is 97.7%, with exactly 1 false positive out of 2.77 million transactions.",
            "The reason is the simulator, not the criminals: PaySim's fraud agents always empty the victim's account completely. Real fraudsters are not that cooperative. They split amounts, leave a residual balance, and imitate normal spending patterns.",
            "Reporting a 99.9% F1 built on that shortcut would be technically true and practically worthless, so the project reports two scenarios instead of one.",
            "The full scenario uses all 25 features and is the best model for this dataset. The realistic scenario drops the five artefact-prone features (is_full_balance_transfer, is_origin_balance_drained, origin_balance_error, origin_balance_delta, amount_to_origin_balance_ratio) and is the number used to set production expectations.",
            "Every headline figure quoted for this project comes from the realistic scenario, because the full-scenario numbers measure the simulator rather than the model.",
          ],
        },
        {
          id: "preprocessing",
          heading: "Preprocessing & Feature Engineering",
          body:
            "Twenty-five features across three behavioural angles, with every historical statistic fitted only on the earliest time window so that nothing from the future leaks backwards.",
          bullets: [
            "Data is split chronologically by step into three consecutive windows: fit (4,104,531 transactions), validation (1,009,353) and test (1,248,736). A random split would leak future information into training, and the decision threshold is calibrated on validation so it is never chosen on the test set.",
            "Balance integrity group: origin_balance_error, destination_balance_error, origin_balance_delta, destination_balance_delta, is_origin_balance_drained, is_destination_balance_silent. Bookkeeping errors and a recipient balance that does not move are manipulation markers.",
            "Transaction value ratio group: amount_to_origin_balance_ratio, amount_to_type_mean_ratio, amount_to_hour_mean_ratio, is_full_balance_transfer, amount_log. An odd amount is only odd relative to the owner's balance and the historical average for that type and hour.",
            "Time and type group: hour_of_day, is_low_activity_hour, is_high_risk_type, is_merchant_destination, plus one-hot encoding of the five types. Fraud exploits quiet hours and the TRANSFER to CASH_OUT chain.",
            "day_index was deliberately excluded. A day index cannot be extrapolated into the test period and would only encourage the model to memorise the training window.",
            "Class imbalance handled with scale_pos_weight = 1204 by default rather than SMOTE. On gradient boosting, gradient reweighting achieves the equivalent effect without synthesising 4 million nearest neighbours and without inventing artificial minority points. SMOTE remains available as a flag for comparison.",
          ],
        },
        {
          id: "modeling",
          heading: "Modeling",
          navLabel: "Modeling",
          body:
            "Three models with three distinct roles: a supervised primary, a supervised comparator, and an unsupervised safety net trained only on legitimate transactions so it can flag patterns no label has yet described.",
          bullets: [
            "XGBoost as the primary model: 400 trees, max_depth 6, tree_method hist, eval_metric aucpr.",
            "LightGBM as the comparator: 400 trees, num_leaves 63, min_child_weight 5.",
            "Isolation Forest as the unsupervised layer: 200 trees, max_samples 256, fitted on legitimate transactions only.",
            "One configuration detail decided whether the project worked at all. With LightGBM's default min_child_weight of 1e-3 and a scale_pos_weight above 1000, the model split leaves until every fraud case was memorised: probabilities saturated at 0 and 1, and PR-AUC collapsed from 0.86 to 0.005. Raising min_child_weight to 5 restored it completely. It is the kind of failure that looks like a broken pipeline and is actually a hyperparameter interacting with extreme weighting.",
          ],
        },
        {
          id: "evaluation",
          heading: "Evaluation",
          navLabel: "Evaluation",
          body:
            "The threshold was never left at 0.5. The operating policy is the highest precision that still meets a 90% recall target, calibrated on the validation window and then applied unchanged to the test window of 1,248,736 transactions containing 4,250 frauds.",
          bullets: [
            "XGBoost, realistic scenario: precision 93.91%, recall 90.73%, F1 0.9229, PR-AUC 0.9765, alert rate 0.33%.",
            "LightGBM, realistic scenario: precision 48.20% at a comparable recall of 89.34%, PR-AUC 0.4765. Half of its alerts are false, which doubles review workload for no gain in coverage.",
            "Isolation Forest: recall 91.44%, matching XGBoost, but at a precision of 0.47% and an alert rate of 66.33%. It shows exactly why recall alone is a misleading metric. An e-wallet that blocks two out of every three transactions loses its users within a day, which is why the Isolation Forest was placed as a second layer rather than the primary.",
            "Confusion matrix for XGBoost in the realistic scenario: 1,244,236 true negatives, 250 false positives, 394 false negatives, 3,856 true positives.",
            "Reading the quadrants in business terms: 394 frauds slipped through (direct loss, customer claims, reputational risk), 250 legitimate transactions were held (annoyed users and review workload), and 3,856 frauds were prevented.",
            "For contrast, the full scenario reaches 100.00% precision and 99.34% recall with zero false positives. Those numbers are reported openly and then set aside, because they measure the simulator's balance-drain shortcut rather than the model's ability to find fraud.",
          ],
          figures: [
            {
              src: "/Image/projects/fraud-detection/realistic_precision_recall_curves.png",
              alt: "Precision recall curves for all three models in the realistic scenario",
              caption:
                "Precision-recall curves, realistic scenario. PR-AUC is the honest summary when the positive class is 0.13% of the data, and the gap between XGBoost and the other two is far wider here than ROC-AUC would suggest.",
              width: 840,
              height: 600,
            },
            {
              src: "/Image/projects/fraud-detection/precision_recall_curves.png",
              alt: "Precision recall curves in the full feature scenario",
              caption:
                "The same curves with the artefact-prone features restored. Everything is nearly perfect, which is precisely the result that should trigger an investigation rather than a headline.",
              width: 840,
              height: 600,
            },
            {
              src: "/Image/projects/fraud-detection/realistic_confusion_matrix_xgboost.png",
              alt: "Confusion matrix for XGBoost in the realistic scenario",
              caption:
                "XGBoost on the test window, realistic scenario: 3,856 frauds caught against 394 missed and 250 legitimate transactions held.",
              width: 840,
              height: 600,
            },
            {
              src: "/Image/projects/fraud-detection/realistic_confusion_matrix_isolation_forest.png",
              alt: "Confusion matrix for Isolation Forest in the realistic scenario",
              caption:
                "Isolation Forest at the same recall. The false positive column is what disqualifies it as a primary model: matching coverage is worthless if it costs 66% of all transactions.",
              width: 840,
              height: 600,
            },
            {
              src: "/Image/projects/fraud-detection/realistic_threshold_tradeoff.png",
              alt: "Precision, recall and F1 against the decision threshold",
              caption:
                "The threshold trade-off curve. This is the chart the risk team actually negotiates over, because the chosen point is a capacity decision as much as a statistical one.",
              width: 840,
              height: 600,
            },
          ],
        },
        {
          id: "explainability",
          heading: "Explainability (SHAP)",
          body:
            "An alert without a reason cannot be actioned by an analyst and will not survive a regulator's audit, so explainability was treated as a deliverable rather than an appendix.",
          bullets: [
            "Top triggers in the realistic scenario: oldbalanceOrg (fraud targets accounts with large balances), newbalanceOrig (what is left afterwards), is_high_risk_type (TRANSFER or CASH_OUT), amount_to_type_mean_ratio (amount far above the historical average for that type), and the raw amount.",
            "The dashboard shows per-transaction explanations rather than a bare score, so an analyst sees not \"risk 0.97\" but which variables pushed the score there.",
          ],
          figures: [
            {
              src: "/Image/projects/fraud-detection/realistic_shap_summary.png",
              alt: "SHAP summary plot for the realistic fraud model",
              caption:
                "SHAP summary, realistic scenario. With the balance-drain shortcut removed, the model leans on account balance context and relative transaction size, which is behaviour a fraud analyst can recognise and challenge.",
              width: 938,
              height: 886,
            },
          ],
        },
        {
          id: "impact",
          heading: "Business Impact & Deployment",
          navLabel: "Impact",
          body:
            "Measured over the test window in the realistic scenario, so the impact figure carries the same honesty caveat as the metrics behind it.",
          bullets: [
            "6.64 billion units of fraud value prevented, which is 99.34% of the total fraud value in the period.",
            "Only 250 legitimate transactions were held out of 1,244,486, a disruption rate of 0.02% for genuine users.",
            "Alert rate of 0.33% keeps the daily review queue within the capacity of a real operations team, which is the constraint that decides whether a fraud model can actually be deployed.",
            "Delivered as a Streamlit dashboard with three tabs: real-time alerting (transaction form, alert banner, probability gauge, anomaly score, SHAP triggers), batch screening (upload a PaySim-schema CSV, get a risk-ranked table and a downloadable alert list), and model performance (both scenarios side by side).",
            "The blocking threshold is a sidebar slider, not a constant. A lower threshold raises recall and adds false alerts, and that trade is a business decision that changes with review team capacity, so it belongs in the interface rather than in the code.",
            "Risk tiers shown to the operator: HIGH at or above the threshold (block and verify), MEDIUM at half the threshold (monitoring queue), LOW below that (passes untouched).",
          ],
        },
        {
          id: "limitations",
          heading: "Limitations",
          body:
            "Five items that separate a portfolio result from a production system.",
          bullets: [
            "PaySim is simulated data. The drain-to-zero pattern does not represent real fraud, and even the realistic scenario figures need revalidation on production data.",
            "There is no per-account profile yet. Velocity features (transactions per hour per account), unique recipient counts, and distance from a user's own habits need a feature store with rolling aggregation. This is the single largest available improvement.",
            "Labels arrive late in the real world. Fraud confirmation can take days, so a production pipeline needs to accept delayed labels and retrain on a schedule.",
            "Drift monitoring is mandatory. Transaction distributions shift with promo campaigns, seasonality and fraudster tactics, so feature PSI and alert rate need weekly review.",
            "The threshold is a business decision. Review team capacity determines how many alerts per day can be handled, so it must be recalibrated whenever that capacity changes.",
          ],
        },
      ],
    },
    githubUrl: "https://github.com/ikyyy10704",
  },
  {
    slug: "ewallet-churn-promo-sensitivity",
    title: "E-Wallet Churn & Promo Sensitivity",
    category: "Data Science",
    group: "data",
    description: "Proved that promo spend was not holding e-wallet users at all, then built a churn risk model and a retention playbook worth Rp78.3 million in net benefit without any additional subsidy.",
    tags: ["Python", "LightGBM", "RFM", "Streamlit"],
    longDescription:
      "A retention analysis for an e-wallet: predicting who will stop transacting, measuring how much promotional spend genuinely holds them, and building a retention playbook that does not rely on burning cash. Delivered as a Colab notebook, a modular Python pipeline, and a Streamlit dashboard with a risk-by-value action matrix.",
    coverImage: "/Image/projects/churn-ewallet/12_risk_value_matrix.png",
    caseStudy: {
      context:
        "Banking Data Science Portfolio · Growth and retention analytics in a GoPay / DANA / OVO context · End-to-end individual project.",
      problemHeading: "Business Understanding",
      problem: [
        "Acquiring an e-wallet user in Indonesia costs far more than retaining an existing one, yet the growth team's reflex when churn rises is almost always the same: more cashback, more coupons. That reflex erodes unit economics with no guarantee anyone actually stays.",
        "The uncomfortable possibility nobody tests is that promo spend and retention are correlated for reasons that have nothing to do with causation. Users who transact more naturally collect more cashback, which makes cashback look like it is holding them when it is really just following them.",
        "Three questions framed the work: what actually separates users who stop transacting from those who stay, are heavier promo users genuinely more loyal, and who should be saved first and with what tactic other than subsidy.",
        "The solution is a churn risk model used for ranking rather than for accuracy claims, a risk-by-value segmentation matrix that assigns a different tactic to each cell, and three retention programmes costed against the revenue they protect. The e-commerce terminology in the source dataset was mapped to e-wallet concepts (OrderCount to transaction_count, CouponUsed to promo_redemptions, DaySinceLastOrder to days_since_last_transaction) with the full mapping centralised in one config file.",
      ],
      highlights: [
        { label: "Users Analysed", value: "5,630" },
        { label: "Churn Rate", value: "16.84%" },
        { label: "Net Benefit", value: "Rp78.3M" },
        { label: "Programme ROI", value: "20.9x" },
      ],
      sections: [
        {
          id: "dataset",
          heading: "Data Understanding",
          navLabel: "Data",
          body:
            "5,630 users across 20 columns with a churn rate of 16.84%. Seven columns carried 4 to 5% missing values, imputed with the median, and the model pipeline also carries its own SimpleImputer so that unseen production data stays safe.",
          bullets: [
            "The class split of roughly 1 to 5 is imbalanced enough that a default 0.5 decision threshold would be the wrong operating point, which shaped the evaluation later.",
            "Monetary value is a proxy. The dataset carries no transaction value, so average cashback stands in for it. On production data this should be replaced with actual GMV or take rate, and that substitution is flagged rather than buried.",
            "Category labels were normalised during loading, because the raw file spells the same category several different ways.",
          ],
          figures: [
            {
              src: "/Image/projects/churn-ewallet/01_churn_distribution.png",
              alt: "Distribution of churned versus retained users",
              caption:
                "The target split: 16.84% churn. Small enough that accuracy is uninformative, large enough that the minority class is learnable.",
              width: 1222,
              height: 524,
            },
          ],
        },
        {
          id: "eda",
          heading: "Exploratory Data Analysis",
          navLabel: "EDA",
          body:
            "This is where the project earns its conclusion. The diagnosis was run against the growth team's own assumption first, because a recommendation to cut promo spend needs the evidence in front of it, not behind it.",
          bullets: [
            "Promo usage is flat against churn across every coupon quartile: 18.4%, 15.7%, 16.8%, 16.5%. There is no gradient, which means promo is not a retention lever.",
            "Cashback per transaction runs the opposite way to the assumption: the highest quartile is the most loyal (10.1% churn against 22.6%). Cashback follows spending value, it does not cause it.",
            "Tenure is the real story. Users of three months or less churn at 41.9%; users past fifteen months churn at 4.2%. Churn is an onboarding problem, not a pricing problem.",
            "Complaints are the second strongest driver: 31.7% churn among users who complained against 10.9% among those who did not.",
            "Satisfaction score is not protective on its own. Users scoring 5 out of 5 still churn at 23.8%, because a high rating without a transaction habit holds nobody.",
            "City tier 3 churns at 21.4% against tier 1 at 14.5%, so the smaller cities need a different treatment rather than the same national campaign.",
          ],
          figures: [
            {
              src: "/Image/projects/churn-ewallet/02_churn_by_promo_usage.png",
              alt: "Churn rate across promo usage quartiles",
              caption:
                "The chart that reframed the project. Churn is essentially flat across promo quartiles, so the money being spent to hold users is not what is holding them.",
              width: 1589,
              height: 563,
            },
            {
              src: "/Image/projects/churn-ewallet/05_churn_by_tenure_recency.png",
              alt: "Churn by tenure band and recency",
              caption:
                "Churn against tenure. The first three months carry a 41.9% churn rate against 4.2% past fifteen months, which relocates the problem from pricing to onboarding.",
              width: 1294,
              height: 563,
            },
            {
              src: "/Image/projects/churn-ewallet/04_churn_by_complaint.png",
              alt: "Churn rate for users with and without complaints",
              caption:
                "Complaints nearly triple the churn rate. Unresolved service issues turn out to be the second largest driver, ahead of anything price related.",
              width: 1269,
              height: 524,
            },
            {
              src: "/Image/projects/churn-ewallet/03_churn_by_transaction_frequency.png",
              alt: "Churn rate by transaction frequency",
              caption:
                "Transaction frequency against churn. Habit, not discount depth, is what predicts staying.",
              width: 1294,
              height: 524,
            },
            {
              src: "/Image/projects/churn-ewallet/06_churn_by_rfm_segment.png",
              alt: "Churn rate by RFM segment",
              caption:
                "Churn by RFM segment, which is what makes the segmentation actionable rather than descriptive.",
              width: 1413,
              height: 524,
            },
            {
              src: "/Image/projects/churn-ewallet/07_feature_correlation.png",
              alt: "Correlation heatmap across engineered features",
              caption:
                "Feature correlation heatmap, used to catch redundant engineered ratios before they entered the model.",
              width: 1258,
              height: 1064,
            },
          ],
        },
        {
          id: "preprocessing",
          heading: "Preprocessing & Feature Engineering",
          body:
            "Three feature families were built: RFM segmentation, promo sensitivity ratios, and activity and service signals.",
          bullets: [
            "RFM: recency_days, frequency_transactions and monetary_value, each scored into quintiles from 1 to 5, summed into rfm_score, then mapped to Champion, Loyal, Potential Loyalist, Needs Attention and At Risk segments.",
            "promo_redemption_rate (coupons over transactions) measures coupon intensity; cashback_per_transaction measures the effective subsidy per transaction.",
            "promo_dependency_index averages the percentile of both ratios into a single 0 to 1 number, so promo reliance becomes one comparable figure instead of two.",
            "is_promo_hunter flags users with dependency at or above the 75th percentile and a monetary score of 2 or below: high subsidy consumption with low value returned. They turn out to be 10.3% of the base.",
            "Activity and service signals: transactions_per_tenure_month, app_minutes_per_transaction, is_dormant (more than 7 days without a transaction), is_new_user (tenure of 3 months or less), satisfaction_gap, and unresolved_complaint_risk.",
          ],
        },
        {
          id: "modeling",
          heading: "Modeling",
          navLabel: "Modeling",
          body:
            "Stratified 80:20 split with balanced class weights, and the decision threshold chosen at maximum F1 rather than left at 0.5, since the churn class is only 16.8% of the population.",
          bullets: [
            "LightGBM was the champion: ROC-AUC 0.9992, PR-AUC 0.9970, F1 0.9869, precision 0.9843, recall 0.9895 at a threshold of 0.44, with 5-fold CV ROC-AUC of 0.9780.",
            "Random Forest followed at ROC-AUC 0.9887, PR-AUC 0.9471 and F1 0.8672.",
            "Each metric was selected for a reason: ROC-AUC measures the risk ranking that the retention campaign actually uses to pick targets, F1 balances annoying loyal users against missing leavers, PR-AUC is more honest on the minority class, and recall is deliberately kept high because missing a churner costs more than sending an unnecessary notification.",
            "Top churn drivers: monetary_value, cashback_per_transaction, promo_dependency_index, transactions_per_tenure_month, tenure_months, satisfaction_score and has_complaint.",
          ],
          figures: [
            {
              src: "/Image/projects/churn-ewallet/08_roc_curves.png",
              alt: "ROC curves for LightGBM and Random Forest",
              caption:
                "ROC curves for both candidates. The separation is extreme, which is the finding discussed in the evaluation section rather than a result to celebrate.",
              width: 741,
              height: 616,
            },
            {
              src: "/Image/projects/churn-ewallet/09_precision_recall_curves.png",
              alt: "Precision recall curves for both models",
              caption:
                "Precision-recall curves, the more honest view on a 16.8% minority class.",
              width: 741,
              height: 616,
            },
          ],
        },
        {
          id: "evaluation",
          heading: "Evaluation",
          navLabel: "Evaluation",
          body:
            "The evaluation section of this project is mostly an argument against its own headline number, which is the part that makes the rest of it trustworthy.",
          bullets: [
            "This public dataset is very close to linearly separable. LightGBM with no engineered features at all already reaches ROC-AUC of roughly 0.9996, so the 0.9992 headline is a property of the data, not evidence of modelling skill.",
            "A realistic production benchmark for churn is 0.75 to 0.85. Every recommendation in this project therefore rests on the risk ranking and the driver patterns, never on a claim of absolute accuracy.",
            "Risk scores for the whole population were computed with out-of-fold predictions across 5 folds, so no user was ever scored by a model that had seen them during training.",
            "Feature importance is read as a description of which behaviours co-occur with churn, and cross-checked against the EDA, rather than treated as proof of causation.",
          ],
          figures: [
            {
              src: "/Image/projects/churn-ewallet/10_confusion_matrix.png",
              alt: "Confusion matrix for the champion model at the tuned threshold",
              caption:
                "Confusion matrix at the F1-optimal threshold of 0.44 rather than the default 0.5.",
              width: 681,
              height: 498,
            },
            {
              src: "/Image/projects/churn-ewallet/11_feature_importance.png",
              alt: "Feature importance ranking from the champion model",
              caption:
                "Churn drivers from LightGBM. Promo dependency ranks high as a marker of a low-value user, which is consistent with the EDA finding that promo does not hold anyone.",
              width: 1069,
              height: 662,
            },
          ],
        },
        {
          id: "segmentation",
          heading: "Risk and Value Segmentation",
          body:
            "A risk score alone tells a growth team nothing about budget. Crossing it with value turns it into nine cells, each with its own tactic and its own permitted cost. Thresholds: high risk at 0.60 and above, medium risk 0.30 to 0.60, low risk below 0.30.",
          bullets: [
            "High risk: 908 users, 95.6% actual churn, average tenure 3.5 months.",
            "Medium risk: 77 users, 39.0% actual churn, average tenure 4.3 months.",
            "Low risk: 4,645 users, 1.1% actual churn, average tenure 11.5 months.",
            "High risk and high value gets a priority save: personal outreach plus three months of waived admin fees.",
            "High risk and low value gets an automated nudge with no subsidy at all, which is the cell where most cashback budget has historically been wasted.",
            "Medium risk cells focus on habit building (autodebit for bills, weekly reminders) and low risk cells shift to advocacy, cross-sell and low-cost mass communication.",
          ],
          figures: [
            {
              src: "/Image/projects/churn-ewallet/12_risk_value_matrix.png",
              alt: "Risk by value segmentation matrix",
              caption:
                "The risk-by-value matrix. Each cell carries its own tactic and its own cost ceiling, which is what stops retention budget from being spread evenly across users who need very different things.",
              width: 781,
              height: 570,
            },
            {
              src: "/Image/projects/churn-ewallet/13_risk_tier_profile.png",
              alt: "Behavioural profile of each risk tier",
              caption:
                "Profile of each risk tier. The high risk group is defined by short tenure and complaint history, which points the playbook at onboarding and service recovery rather than at price.",
              width: 1315,
              height: 524,
            },
          ],
        },
        {
          id: "impact",
          heading: "Retention Playbook & Business Impact",
          navLabel: "Impact",
          body:
            "Three programmes, each tied to a specific piece of evidence and each designed to work without additional subsidy. Assumptions are centralised in the config file: Rp25,000 net revenue per active user per month, a 12 month horizon, a 30% save rate, and Rp4,000 programme cost per user.",
          bullets: [
            "1. A 30 day habit-building onboarding for new users. Evidence: 27.7% of the base has tenure of three months or less and churns at 41.9%. Tactic: staged activation missions (top up, pay a bill, set up autodebit) rewarded with non-cash benefits such as tier badges, higher transfer limits and priority feature access. Success metric: at least three transactions in the first 30 days.",
            "2. A service recovery loop for users who complain. Evidence: 31.7% churn after a complaint against 10.9% without, and 54.7% of the high risk group have filed one. Tactic: a 24 hour ticket SLA, proactive post-resolution follow-up, and a priority support lane for high value users whose risk score is rising.",
            "3. Reallocation of blanket cashback into functional value. Evidence: churn is flat across all promo quartiles while 10.3% of users are low-value promo hunters. Tactic: stop uniform cashback and replace it with functional benefits such as fee-free bill autodebit, split bill, and tier-based rewards for high value users. Success metric: promo cost per active user falls with no rise in churn.",
            "Quantified: 985 users targeted across the high and medium risk tiers, Rp274.0 million of annual revenue at risk, Rp82.2 million recoverable at a 30% save rate, against Rp3.9 million of non-subsidy programme cost. Net benefit Rp78.3 million at an ROI of 20.9x.",
            "Shipped as a five tab Streamlit dashboard (summary, user behaviour, model performance, risk segmentation with a downloadable target CSV, and the retention playbook) with sidebar filters for risk tier, value tier, city tier and tenure range.",
          ],
        },
        {
          id: "limitations",
          heading: "Limitations",
          bullets: [
            "Monetary value is proxied by average cashback because the dataset holds no transaction value. Replace it with GMV or take rate before using the value tiers operationally.",
            "Recency runs backwards in this data: churned users appear to have transacted more recently, which suggests the churn label was applied on a single snapshot. The churn definition needs revalidating before production use, and this is the most important caveat of the three.",
            "Median imputation was applied to seven columns with 4 to 5% missing values.",
            "Next steps: probability calibration (Platt or isotonic), A/B testing the playbook per matrix cell, and adding time-series behavioural features such as weekly transaction trend.",
          ],
        },
      ],
    },
    githubUrl: "https://github.com/ikyyy10704",
  },
  {
    slug: "mining-predictive-maintenance",
    title: "Heavy Equipment Predictive Maintenance",
    category: "Data Science",
    group: "data",
    description: "Built a pre-failure classifier for mining heavy equipment from 5 telemetry sensors and 41 engineered features, catching 84% of breakdowns before they happen and cutting holdout-period failure cost by 81.7%.",
    tags: ["Python", "XGBoost", "SHAP", "Streamlit"],
    longDescription:
      "An end-to-end predictive maintenance system for mining heavy equipment: from raw sensor readings, through physics-based feature engineering, chronological validation and cost-calibrated thresholding, to a Streamlit dashboard that ranks work orders for the planner on site. The whole pipeline lives in a single reusable module shared by the notebook and the dashboard, so there is no training/serving skew.",
    coverImage: "/Image/projects/predictive-maintenance/pm08.png",
    caseStudy: {
      context:
        "Mining Data Science Portfolio · End-to-end individual project, from raw sensor data to a deployable work-order dashboard.",
      problemHeading: "Business Understanding",
      problem: [
        "In an open-pit operation no machine works alone. When a haul truck stops without warning the loading queue backs up, the excavator sits idle, and the shift misses its production tonnage target. The cost of a breakdown is never just the repair bill. It is the whole hauling chain that stops with it.",
        "The cause is that maintenance is still largely reactive, and its economics are deeply asymmetric. A missed failure (false negative) costs roughly $25,000 in unplanned downtime; a false alarm (false positive) costs about $1,200 for an inspection that turns out to be unnecessary. One missed failure is worth about 21 false alarms.",
        "That asymmetry dictated the entire model design. Accuracy is a misleading metric here: a model that always predicts \"healthy\" is already 93.6% accurate and 0% useful. So the project optimises recall and PR-AUC instead, and the decision threshold is chosen from a cost curve rather than left at the default 0.5.",
        "The solution: a condition classifier that scores every unit-hour for failure risk, converts that probability into HIGH / MEDIUM / LOW work-order tiers with response SLAs, and explains each score with SHAP, so the maintenance team can act on it instead of being asked to trust a black box.",
      ],
      highlights: [
        { label: "PR-AUC (Holdout)", value: "0.868" },
        { label: "Recall", value: "84.1%" },
        { label: "Cost Avoided", value: "$2.70M" },
        { label: "Engineered Features", value: "46" },
      ],
      sections: [
        {
          id: "dataset",
          heading: "Data Understanding",
          navLabel: "Data",
          body:
            "AI4I 2020 Predictive Maintenance Dataset holds 10,000 sensor readings × 14 columns with zero missing values. The target Machine failure fires 638 times (6.38%), a 1:14.7 imbalance. Five raw sensors are available: air temperature, process temperature, rotational speed, torque, and tool wear. Failure modes break down as OSF 339, HDF 158, TWF 154, PWF 22, RNF 10.",
          bullets: [
            "The five failure-mode flags (TWF / HDF / PWF / OSF / RNF) were dropped from the feature set. They are the components the label is assembled from. Keeping them produces ~100% accuracy that collapses completely in the field. This is the first filter between a serious project and a decorative one.",
            "AI4I is a snapshot, not a telemetry stream: there is no machine_id and no timestamp. Each row was mapped deterministically onto 61 equipment units with hourly stamps so the rolling-window pipeline used in production could actually be built and tested. The mapping is causal and reproducible, and it is not claimed to create temporal signal that was never in the data, which is why its contribution is measured openly in an ablation test.",
            "No missing values and no duplicate rows, so the cleaning budget went entirely into leakage control instead of imputation.",
          ],
          figures: [
            {
              src: "/Image/projects/predictive-maintenance/pm01.png",
              alt: "Class balance of the machine failure target and the fleet mapping summary",
              caption:
                "Class balance: 638 failures against 9,362 healthy readings. A model that always answers \"healthy\" would already score 93.6% accuracy, which is why accuracy was rejected as the decision metric.",
              width: 1313,
              height: 407,
            },
            {
              src: "/Image/projects/predictive-maintenance/pm02.png",
              alt: "Distribution of each raw sensor split by healthy and failure readings",
              caption:
                "Each raw sensor split into healthy versus failure. Torque and rotational speed separate the classes most visibly; tool wear shows failures piling up near the 250-minute service limit.",
              width: 1427,
              height: 695,
            },
          ],
        },
        {
          id: "eda",
          heading: "Exploratory Data Analysis",
          navLabel: "EDA",
          body:
            "The exploration answered one question above all: is the failure signal readable from single sensors, or does it only exist in their interaction? The answer shaped both the feature set and the choice of model family.",
          bullets: [
            "No single raw sensor is strongly correlated with the target on its own. The signal lives in combinations such as high torque occurring together with low rotational speed (lugging), or high tool wear together with high torque, and that is exactly what a linear baseline cannot represent.",
            "The engineered physics features correlate with the target far more strongly than the raw sensors they are built from, confirming the domain-first approach before any model was fitted.",
            "Per-unit sensor history shows failures arriving as sharp state changes rather than as slow degradation, an early warning that 6-hour rolling windows might add less than expected, which the ablation test later confirmed.",
          ],
          figures: [
            {
              src: "/Image/projects/predictive-maintenance/pm03.png",
              alt: "Sensor history over time for the unit with the most failures",
              caption:
                "Sensor history for the unit with the most failures, with failure events marked. The transitions are abrupt rather than gradual, a property of the dataset that matters when interpreting the time-series features.",
              width: 1308,
              height: 648,
            },
            {
              src: "/Image/projects/predictive-maintenance/pm04.png",
              alt: "Correlation heatmap of raw sensors, domain features and the target",
              caption:
                "Correlation between raw sensors, engineered domain features, and the target. overstrain_minnm and tool wear stand out: the physics features carry signal the raw columns do not.",
              width: 823,
              height: 715,
            },
          ],
        },
        {
          id: "preprocessing",
          heading: "Preprocessing & Feature Engineering",
          body:
            "Two feature layers were built, physics first and statistics second, for 46 model-ready features. Every step is causal: only the current and past readings of a unit are ever used.",
          bullets: [
            "Domain features mimic known failure mechanisms rather than random column arithmetic: temp_diff_k (process − ambient, heat dissipation), power_w (torque × angular velocity, power overload), overstrain_minnm (tool wear × torque, overstrain accumulation), torque_per_rpm (lugging), vibration_index (rpm deviation from the constant-power curve), and wear_ratio (tool wear against the 250-minute limit).",
            "Time-series features per unit over a 6-hour window: rolling mean, rolling standard deviation, rolling max, deltas between readings, 24-hour drift, and a z-score against the unit's own baseline.",
            "Class imbalance was contested, not assumed: class_weight=\"balanced\", scale_pos_weight (14.9 on the training set), and SMOTE were compared head to head. SMOTE runs inside an imblearn Pipeline so oversampling happens after the fold split. Doing it before the split is the classic leak that turns validation scores into fiction.",
            "The split is chronological, not random: the last 20% of the period (1,948 readings, 132 failures) is held out and never touched during training or threshold selection.",
          ],
        },
        {
          id: "modeling",
          heading: "Modeling",
          navLabel: "Modeling",
          body:
            "Four candidates were run under two validation schemes side by side: TimeSeriesSplit (train on the past, test on the future) as the operationally honest number, and StratifiedKFold as a fold-stability check.",
          bullets: [
            "XGBoost led with PR-AUC 0.819 ± 0.087, just ahead of LightGBM at 0.816 ± 0.084.",
            "Logistic regression, with or without SMOTE, reached PR-AUC 0.545 and 0.538 respectively. It achieves high recall (0.820) but precision collapses to ~0.29, because it simply flags almost anything suspicious.",
            "The gap between the linear and tree models is the whole point: sensor relationships here are non-linear and interaction-heavy (high torque combined with low rpm), which is precisely what tree ensembles capture and a linear boundary cannot.",
          ],
          figures: [
            {
              src: "/Image/projects/predictive-maintenance/pm05.png",
              alt: "Cross-validation PR-AUC comparison across models under two validation schemes",
              caption:
                "Cross-validation across both schemes. The ranking is stable between TimeSeriesSplit and StratifiedKFold, so the winner is not an artefact of how the folds were cut.",
              width: 1421,
              height: 458,
            },
          ],
        },
        {
          id: "evaluation",
          heading: "Evaluation & Threshold Calibration",
          navLabel: "Evaluation",
          body:
            "All models were retrained on the full training set and evaluated on the final, never-seen holdout period. The decision threshold was calibrated on an internal validation period (the last 20% of the training data), never on the holdout. Otherwise the reported numbers would be optimistic by construction.",
          bullets: [
            "At the default 0.50 threshold: recall 0.758, precision 0.807, F1 0.781, with 32 false negatives and 24 false positives.",
            "At the cost-calibrated 0.05 threshold: recall 0.841, precision 0.627, with 21 false negatives and 66 false positives. PR-AUC 0.868 and ROC-AUC 0.976 are unchanged, because the threshold moves the operating point, not the model.",
            "Lowering the threshold buys 11 prevented breakdowns for 42 extra inspections. At a 21:1 cost ratio that trade is strongly profitable, which is exactly what the cost curve shows.",
            "Ablation test, reported openly: raw sensors alone give PR-AUC 0.721; adding physics-based domain features lifts it to 0.826 (+0.106); adding the 6-hour rolling features moves it to 0.819 (−0.007, well inside the 0.087 between-fold spread, so statistically indistinguishable). The performance came from domain knowledge, not from the rolling windows. The rolling path stays in the pipeline because on real telemetry, where failures develop over hours, that is precisely where its value lies.",
          ],
          figures: [
            {
              src: "/Image/projects/predictive-maintenance/pm06.png",
              alt: "Precision-recall curves for every model on the holdout period",
              caption:
                "Precision-recall curves on the holdout period against the random-guess baseline. PR-AUC, not ROC-AUC, is the honest summary metric when the positive class is 6.4% of the data.",
              width: 813,
              height: 538,
            },
            {
              src: "/Image/projects/predictive-maintenance/pm07.png",
              alt: "Metric trade-off against threshold and the total cost curve",
              caption:
                "Left: recall, precision and F1 as the threshold moves. Right: total cost (FN × $25,000 + FP × $1,200). The minimum sits far from 0.5, which is why the default threshold was never going to be the right answer.",
              width: 1418,
              height: 302,
            },
            {
              src: "/Image/projects/predictive-maintenance/pm08.png",
              alt: "Confusion matrices at the default and production thresholds",
              caption:
                "The same model at two thresholds. Moving from 0.50 to 0.05 turns 32 missed failures into 21, at the price of 42 additional inspections.",
              width: 1207,
              height: 501,
            },
          ],
        },
        {
          id: "explainability",
          heading: "Explainability (SHAP)",
          body:
            "A model the maintenance team cannot interrogate will not be trusted, and an untrusted model changes nothing on site. SHAP answers both the global question (what drives failure across the fleet) and the local one (why was this unit scored high today).",
          bullets: [
            "Top drivers by mean |SHAP|: overstrain_minnm (1.993), tool_wear_min (1.681), rot_speed_rpm (0.617), temp_diff_k (0.600), heat_dissipation (0.578).",
            "Four of the top five are engineered physics features, and the ranking matches the dominant failure modes in the data (OSF and HDF). The model can be defended in front of a reliability engineer.",
            "Local SHAP waterfall explanations are attached to the work order itself, so the technician knows which component to inspect first instead of receiving a bare risk score.",
          ],
          figures: [
            {
              src: "/Image/projects/predictive-maintenance/pm09.png",
              alt: "SHAP summary plot of the top features",
              caption:
                "SHAP summary plot: each point is one reading, coloured by feature value. High overstrain and high tool wear push the prediction toward failure, and the direction matches engineering intuition, which is what makes the model defensible.",
              width: 1045,
              height: 706,
            },
            {
              src: "/Image/projects/predictive-maintenance/pm10.png",
              alt: "Global feature importance ranked by mean absolute SHAP value",
              caption:
                "Global ranking by mean |SHAP|. Engineered features dominate the raw sensors they were derived from.",
              width: 978,
              height: 604,
            },
            {
              src: "/Image/projects/predictive-maintenance/pm11.png",
              alt: "SHAP dependence plot for the strongest feature",
              caption:
                "Dependence plot for the strongest driver: the risk contribution rises non-linearly past a threshold rather than proportionally, behaviour a linear model cannot express.",
              width: 875,
              height: 538,
            },
          ],
        },
        {
          id: "impact",
          heading: "Business Impact & Deployment",
          navLabel: "Impact",
          body:
            "Over the holdout period (1,948 unit-hours, 132 failures), the model turns into a direct cost comparison against the reactive status quo.",
          bullets: [
            "Reactive, no model: 132 breakdowns, $3,300,000.",
            "Model at threshold 0.5: $828,800, a saving of $2,471,200 (74.9%).",
            "Model at the production threshold: $604,200, a saving of $2,695,800 (81.7%).",
            "Probabilities are translated into field decisions: HIGH (>70%) stop and raise an emergency work order within 8 hours; MEDIUM (30-70%) schedule a planned inspection within 72 hours and limit load; LOW (<30%) continue with routine monitoring.",
            "Risk tier and alarm threshold are deliberately kept separate. The tier reflects the unit's latest reading (today's priority); the alarm history alarms_24h catches intermittent failures, so a unit that spiked and then settled stays on the radar without shifting its tier. Letting history override the tier would paint almost the whole fleet HIGH and destroy the priority list.",
            "Delivered as a Streamlit dashboard: fleet KPIs, tier distribution, SHAP-ranked failure drivers, per-unit sensor trends, and a downloadable work-order priority table. The notebook and the dashboard import the same pipeline module, so there is no training/serving skew.",
          ],
          figures: [
            {
              src: "/Image/projects/predictive-maintenance/pm13.png",
              alt: "Risk tier distribution across the fleet and the work order priority view",
              caption:
                "Fleet risk tier distribution feeding the dashboard. This is the artefact the planner actually uses: a ranked list, not a probability column.",
              width: 1418,
              height: 473,
            },
          ],
        },
        {
          id: "limitations",
          heading: "Limitations",
          body:
            "Stated up front, because limitations that go unstated get discovered by stakeholders at the worst possible moment.",
          bullets: [
            "This is a condition classifier, not a remaining-useful-life model. AI4I labels are instantaneous, so it answers \"is this unit at risk now\", not \"it will fail in N hours\".",
            "vibration_index is a proxy derived from the rpm-torque relationship, not an accelerometer reading. A real vibration sensor would lift recall meaningfully.",
            "The 61-unit fleet mapping is deterministic and causal but not a real operational trace. Replace it with genuine telemetry before drawing per-unit conclusions.",
            "The cost figures are assumptions, not a site financial audit. Every one of them sits in a single Config object to be recalibrated before it informs a budget.",
            "The data comes from one manufacturing process; performance on a real mining fleet must be revalidated before operational use.",
          ],
        },
      ],
    },
    githubUrl: "https://github.com/ikyyy10704",
  },
  {
    slug: "haul-truck-fuel-optimization",
    title: "Haul Truck Productivity & Fuel Optimization",
    category: "Data Science",
    group: "data",
    description: "Replaced a misleading fleet KPI with a measured one, then quantified three operational levers worth a 14.0% fuel reduction (~$1.50M/year) across a 24-truck haul fleet.",
    tags: ["Python", "XGBoost", "Random Forest", "Feature Engineering"],
    longDescription:
      "An operational analysis of a mining haul truck fleet: raw data audit, calibration of four physical coefficients from 37,918 measured consumption records, feature engineering into 17 operational indices, fuel consumption regression models, and three tactical recommendations quantified in litres and dollars. The project's real contribution is diagnostic: it shows that the industry's most common fuel KPI improves as the operation gets worse.",
    coverImage: "/Image/projects/haul-truck/fig04_idle_true_cost.png",
    caseStudy: {
      context:
        "Mining Data Science Portfolio · Fleet productivity and fuel economics · End-to-end individual project.",
      problemHeading: "Business Understanding",
      problem: [
        "In an open-pit mine, hauling is the largest cost centre after stripping, and diesel is the largest cash component inside it, at 30-40% of hauling cash cost. The problem is not a shortage of data; every modern truck emits telemetry by the second. The problem is that the KPI used to manage it points the wrong way.",
        "The KPI on almost every fleet dashboard is litres per hour. For a haul fleet it has a fatal defect. A truck dragging a full load up a ramp burns ~118 L/h and is judged \"wasteful\" while being highly productive. A truck idling in the loader queue burns ~13 L/h with zero tonnage and is judged \"efficient\" while burning money.",
        "The consequence is that a deteriorating operation looks like an improving one. The more trucks queue, the lower the fleet's litres per hour, and the better the monthly report, while cost per tonne rises and fleet capacity evaporates.",
        "The solution was to change the question. Not \"how many litres per hour?\" but \"how many litres to move one tonne one kilometre, and how many tonnes are lost to engines running without working?\" Everything downstream (the coefficient calibration, the feature set, the models, the three recommendations) exists to answer that pair of questions in litres and dollars.",
      ],
      highlights: [
        { label: "R² (Real Consumption)", value: "0.944" },
        { label: "Fuel Reduction Found", value: "14.0%" },
        { label: "Annualised Saving", value: "$1.50M" },
        { label: "Haul Cycles Analysed", value: "45,424" },
      ],
      sections: [
        {
          id: "dataset",
          heading: "Data Understanding",
          navLabel: "Data",
          body:
            "The audit came first, and it produced an uncomfortable finding worth stating plainly: of the six haul telemetry columns the analysis needed (idle_time, speed, engine_load, cycle_time, truck_id, timestamp), zero were present. The available file (fuel.csv) is the EPA / fueleconomy.gov vehicle certification dataset: 38,113 rows × 81 columns, 1984-2017, reduced to 37,918 after filtering to liquid fuels with valid MPG and displacement.",
          bullets: [
            "Decision 1: work in consumption space, not MPG. MPG is inversely related to fuel: a 5 MPG difference at the bottom of the scale (10→15) is a far larger saving than the same 5 MPG at the top (40→45). Averaging or regressing MPG directly weights the most wasteful fleet backwards, the exact opposite of what is needed. Everything is computed in L/100km, the same family of units mining operations already use.",
            "Decision 2: a two-layer architecture with the status of every metric declared. Layer A uses fuel.csv: 37,918 real records, so its metrics are field-credible. Layer B is a haul cycle model parameterised by Layer A, so its metrics measure recoverability of the generative process, explicitly not field validation.",
            "What the EPA data genuinely measures, on real vehicles, are four physical relationships that also govern haul truck combustion. Those were harvested as coefficients: K1 stop-start penalty +35.71% (queueing and spotting cost), K2 displacement elasticity 0.4821 (right-sizing), K3 idle-suppression technology effect −36.67% from 549 hybrid units (auto engine shutdown), K4 drivetrain and traction loss range +43.75% (rolling resistance).",
            "K2 deserves a note: an elasticity of 0.48 means a 10% larger engine adds only 4.7% fuel, so fleet right-sizing is a weak lever. K4 shows a 44% spread in the resistance the engine has to fight, which is a strong one. The priority order of the final recommendations was born from that comparison, not from intuition.",
            "The haul cycle model output: 45,424 cycles, 24 trucks, 91 days, 4 routes.",
          ],
          figures: [
            {
              src: "/Image/projects/haul-truck/fig01_lowspeed_penalty.png",
              alt: "Low-speed and stop-start fuel penalty measured from the certification dataset",
              caption:
                "K1: the measured fuel penalty of stop-start operation versus steady cruising: +35.71% (IQR 27.8-44.4). This is the number that prices loader queues and spotting delays.",
              width: 1612,
              height: 689,
            },
            {
              src: "/Image/projects/haul-truck/fig02_engine_drivetrain.png",
              alt: "Displacement elasticity and drivetrain loss range",
              caption:
                "K2 and K4 side by side. Engine size (elasticity 0.48) barely moves consumption; drivetrain and traction losses span 43.75%, so the lever worth pulling is resistance, not engine displacement.",
              width: 1661,
              height: 689,
            },
            {
              src: "/Image/projects/haul-truck/fig03_idle_reduction.png",
              alt: "Effect of idle-suppression technology measured on 549 hybrid units",
              caption:
                "K3: measured on 549 units with idle-suppression technology: −36.67%. This is the evidence base for the auto engine shutdown recommendation.",
              width: 961,
              height: 672,
            },
          ],
        },
        {
          id: "eda",
          heading: "Exploratory Data Analysis",
          navLabel: "EDA",
          body:
            "One confounder had to be controlled before any comparison was allowed. idle_ratio correlates strongly negatively with haul distance (r = −0.74): on short cycles, idle is automatically a larger fraction. Comparing idle across routes therefore measures the route, not the behaviour, and it produces a conclusion that is not merely imprecise but inverted. Every idle comparison in this project is made within a route.",
          bullets: [
            "The headline finding, on a single route with equivalent haul work, moving from the lowest to the highest idle quintile: fuel per hour −18.8%, fuel per tonne-km −1.6% (essentially unchanged), tonnes per engine-hour −15.6%. The real cost of idle is not the burn rate; it is productivity.",
            "This is the proof that litres per hour is a broken KPI for hauling: it improves as the operation deteriorates. The correct KPI is a pair, litres per tonne-km together with tonnes per engine-hour, because either one alone can be gamed.",
            "In absolute terms idle absorbs 5.9% of fleet fuel while moving no material at all (2.9% of it addressable). On the short-cycle R4_ROMStock route it reaches 15.5%.",
            "Within-route driver ranking against L/tonne-km (Spearman): total_resistance +0.49, rolling_resistance +0.47, speed_deficit +0.40, payload_utilization −0.36, tyre_condition_index +0.30, engine_hours +0.21, grade +0.12, idle_ratio +0.05.",
            "The structural insight: rolling resistance is almost as strong as total resistance (+0.47 vs +0.49) while grade is far weaker within a route. The most decisive component of resistance is the one road maintenance can control, not the one locked into pit geometry.",
            "Unit-to-unit spread points at the same root cause: the worst truck is 42.8% more fuel-hungry per tonne-km than the best, on the same routes and material, and the tyre condition index correlates +0.48 with L/tonne-km.",
          ],
          figures: [
            {
              src: "/Image/projects/haul-truck/fig04_idle_true_cost.png",
              alt: "The true cost of idle: fuel rate versus productivity across idle quintiles",
              caption:
                "The central finding. Across idle quintiles, fuel per tonne-km barely moves (−1.6%) while tonnes per engine-hour collapses (−15.6%). Idle does not primarily waste fuel; it destroys capacity.",
              width: 1642,
              height: 731,
            },
            {
              src: "/Image/projects/haul-truck/fig05_speed_resistance_payload.png",
              alt: "Speed, total resistance and payload utilisation against fuel consumption",
              caption:
                "Speed deficit, total resistance and payload utilisation against consumption. Resistance carries the steepest slope, and 32% of cycles run underloaded below 95% payload.",
              width: 1851,
              height: 665,
            },
            {
              src: "/Image/projects/haul-truck/fig06_drivers_cycle_composition.png",
              alt: "Within-route driver ranking and engine-hour composition",
              caption:
                "Within-route driver ranking with the confounder controlled, alongside the composition of engine-on time. Rolling resistance, an engineered and controllable quantity, nearly matches total resistance.",
              width: 1833,
              height: 828,
            },
            {
              src: "/Image/projects/haul-truck/fig07_fleet_variance.png",
              alt: "Fuel efficiency variance between units and its relationship with tyre condition",
              caption:
                "A 42.8% spread between the best and worst unit on identical work, tracking tyre condition at r = +0.48. The five priority-inspection units are all still without auto engine shutdown.",
              width: 1688,
              height: 706,
            },
          ],
        },
        {
          id: "preprocessing",
          heading: "Preprocessing & Feature Engineering",
          body:
            "Seventeen operational indices were engineered, and the leakage guard around them is the part that decides whether the results mean anything.",
          bullets: [
            "idle_ratio is computed against engine-on time (cycle_minutes + standby_minutes), not against cycle time alone. Standby (breaks, shift change, blast delay, refuelling queues) is an engine running without tonnage, and it is the larger share.",
            "Cycle metrics: travel_ratio, productive_ratio, cycles_per_hour, tonnes_per_hour (per engine-hour), tonne_km_per_cycle, fixed_time_minutes.",
            "Fuel Efficiency Index scaled so 100 = fleet benchmark (best quartile of L/tonne-km), chosen so it can go straight onto an operator scorecard without explaining units.",
            "Engine load (%) = rimpull power during loaded travel ÷ rated power, the equivalent of the ECM engine-load signal (VIMS / MineStar) on a real truck.",
            "Leakage guards on both datasets. Model A: city / highway / combined MPG, CO₂ per mile, barrels per year, annual fuel cost and efficiency score are all rewritten targets and were dropped. Model B: nine columns removed (fuel_liters, fuel_per_tonne_km, fuel_per_tonne, fuel_per_hour, fuel_efficiency_index, idle_fuel_liters, avoidable_fuel_liters, idle_fuel_share, idle_burn_rate_liters_per_hour). The pipeline asserts hard and fails loudly if a leaked feature slips through. During a rename refactor the guard caught a false positive (has_turbocharger matching the substring \"charge\"), which sharpened the keyword pattern.",
            "Validation strategy differs by model on purpose. Model A: random 80/20 plus 5-fold CV, since specification → consumption has no time dependence. Model B: a chronological split, because a random split would leak the same day's road and weather conditions into the test set.",
          ],
        },
        {
          id: "modeling",
          heading: "Modeling",
          navLabel: "Modeling",
          body:
            "Random Forest and XGBoost were trained on both layers, with a pure-physics baseline included as the comparison that actually matters.",
          bullets: [
            "Layer A (real EPA consumption, L/100km): XGBoost R² 0.9446, MAE 0.5127, RMSE 0.7329; Random Forest R² 0.9433, MAE 0.4841. Stable across 5-fold CV at 0.9447 ± 0.0014.",
            "Layer B (haul telemetry, litres per cycle): XGBoost R² 0.9873, MAE 2.5193; Random Forest R² 0.9856.",
            "Physics baseline (rimpull energy ÷ efficiency, no machine learning at all): R² 0.5716, MAE 17.840.",
            "The two R² values must be read differently, and the difference matters. Model A's 0.944 is field-credible, built on real consumption records, leakage-guarded and stable in CV. Model B's 0.987 measures how well the model recovers its own generative process and must not be quoted as fleet prediction accuracy.",
            "The meaningful comparison is the last line. The 0.57 → 0.99 gap is structure that the rimpull formula does not contain: low-speed penalties, idle fuel, accessory load, and unit-to-unit heterogeneity. That gap is what makes the model useful on top of a physics calculator.",
            "Feature importance is measured by permutation importance on the test set, meaning how much R² is lost when one feature is shuffled, rather than internal tree gain, which is biased toward high-cardinality features.",
          ],
          figures: [
            {
              src: "/Image/projects/haul-truck/fig08_model_performance.png",
              alt: "Predicted versus actual for both models and the R-squared comparison",
              caption:
                "Predicted versus actual for both layers, with the R² comparison including the physics-only baseline. The baseline's 0.57 is the honest reference point for what machine learning added.",
              width: 1844,
              height: 694,
            },
          ],
        },
        {
          id: "evaluation",
          heading: "Evaluation & Model Interpretation",
          navLabel: "Evaluation",
          body:
            "Before any modelling result was accepted, the haul cycle model had to land inside real field ranges for CAT 777G / 785D class trucks. If it did not, the parameters were wrong.",
          bullets: [
            "Fuel per engine-hour: 81.6 L/h (field range 70-100). Fuel per productive cycle-hour: 102.3 L/h (90-140). Fuel per tonne-km: 0.152 L (0.10-0.16). Cycle time: 38.2 minutes (20-45 depending on route). All four pass.",
            "Permutation importance confirms the EDA ranking independently: resistance terms and payload utilisation dominate, and the model is not leaning on a proxy for the target.",
            "The unit scorecard exports the five priority-inspection trucks (HT-013 at 0.1899 L/tonne-km and FEI 71.2, then HT-018, HT-005, HT-016 and HT-002), all of them still without auto engine shutdown.",
          ],
          figures: [
            {
              src: "/Image/projects/haul-truck/fig09_feature_importance.png",
              alt: "Permutation importance for both models",
              caption:
                "Permutation importance on the test set for both models. Measuring importance by shuffling on held-out data avoids the cardinality bias of tree gain.",
              width: 1898,
              height: 749,
            },
          ],
        },
        {
          id: "impact",
          heading: "Business Recommendations",
          navLabel: "Impact",
          body:
            "Baseline across 91 days and 24 trucks: 2,802,540 L ($2,662,413) to move 5,303,267 tonnes, or 0.528 L per tonne. Three levers were quantified against it using the rimpull formula and the measured coefficients, not assumed percentages.",
          bullets: [
            "1. Haul road and tyre pressure programme: 290,091 L (−10.4%), $275,586 per 91 days, ≈$1,105,373/year. Scheduled grading and watering per route plus per-shift tyre pressure checks, targeting a 1.0 percentage point reduction in rolling resistance. It ranks first because rolling resistance must be fought on every metre of the haul, while idle only burns ~13 L/h.",
            "2. Payload discipline at the loading point: 72,235 L (−2.6%), $68,623 per 91 days, ≈$275,247/year. Payload meters with direct feedback to the excavator operator, targeting 98% utilisation (32% of cycles currently run below 95%). The same tonnage then moves in 1,171 fewer cycles, so fixed cycle costs are never incurred. This lever is cheap: no capital spend, only instrumentation most modern excavators already have.",
            "3. Auto engine shutdown and idle discipline: 30,853 L (−1.1%), ≈$117,565/year in fuel, plus 2,833 truck-hours ≈ 1.5 equivalent units ≈ 440,636 tonnes of freed capacity. Retrofit the 19 units without it and enforce a 5-minute idle limit with per-operator reporting.",
            "Total programme: 393,179 L, −14.0%, $1,498,185/year. The capacity value of lever 3 is reported separately rather than added to cash savings, because realising it depends on whether that freed capacity is actually used or a unit is genuinely parked.",
            "The ranking is an output of the analysis, not an assumption, and it is counter-intuitive. Operational instinct puts idle first because it is the most visible problem in the pit. The data puts it third for fuel and first for capacity.",
          ],
          figures: [
            {
              src: "/Image/projects/haul-truck/fig10_savings_program.png",
              alt: "Impact of the three levers and the decomposition of baseline consumption",
              caption:
                "The three levers against the decomposition of baseline consumption. The haul road programme alone outweighs the other two combined by more than double.",
              width: 1854,
              height: 631,
            },
          ],
        },
        {
          id: "limitations",
          heading: "Limitations",
          body:
            "The distinction between what is measured and what is derived is stated in the deliverable itself, not buried.",
          bullets: [
            "Model A's metrics come from real consumption data and are field-credible. Model B's R² measures recoverability of the generative process, not field accuracy, so it should never be quoted as fleet prediction accuracy.",
            "EPA data covers light on-road vehicles. It gives valid direction and relative magnitude for the four physical coefficients, but not absolute values for a 1,000 kW diesel engine. The field ranges used as sanity checks come from 777/785 class specifications, not from the dataset.",
            "The savings figures are engineering estimates, not realised results. All three need site validation before entering a budget, starting with K1 against the fleet's own low-speed penalty, the rolling resistance effect measured before and after one grading cycle, and the site's own definition of idle.",
            "Swapping in real telemetry requires changing one constant (HAUL_TELEMETRY_CSV); the entire Layer B and modelling section then runs unchanged on the site's own data.",
          ],
        },
      ],
    },
    githubUrl: "https://github.com/ikyyy10704",
  },
  {
    slug: "mineral-grade-prediction",
    title: "Mineral Grade Prediction (Geospatial)",
    category: "Data Science",
    group: "data",
    description: "Estimated ore grade per block across 75,000 blocks, then used variography plus a synthetic positive control to prove the dataset carries no spatial signal, instead of reporting the leaked R² of 0.97 it would happily produce.",
    tags: ["Python", "Geostatistics", "XGBoost", "Random Forest"],
    longDescription:
      "A resource-estimation project on a 75,000-block mining block model: spatial exploration, experimental variography, geologically motivated feature engineering, panel-based spatial splitting, and Random Forest / XGBoost estimation, followed by a feature-leakage audit and a synthetic positive control. The headline result is a negative one, defended with evidence: the coordinates in this dataset carry no information about grade, so R² ≈ 0 is the correct answer and the 0.97 that leaked features produce is the wrong one.",
    coverImage: "/Image/projects/mineral-grade/mg05.png",
    caseStudy: {
      context:
        "Mining Data Science Portfolio · Resource estimation and geostatistical validation · End-to-end individual project.",
      problemHeading: "Business Understanding",
      problem: [
        "A mining company can only measure grade on a vanishingly small fraction of a deposit. Drilling produces assay samples along boreholes, and on a large deposit that is typically less than 0.1% of the ore body's volume. But mining decisions are made per block (say 25 × 25 × 10 m) across the entire deposit.",
        "Resource estimation answers the question the drill holes leave open: what is the grade of a block that was never drilled? The answer sets the pit boundary, the mining sequence, the mine life, and ultimately whether the project is financially viable at all. Getting it wrong is not a modelling inconvenience; it is a capital allocation error.",
        "Location-based methods work because of one geological property: spatial continuity. Mineralisation forms through processes that operate at a characteristic scale such as intrusion, hydrothermal fluid flow and supergene enrichment, so nearby blocks tend to have similar grades, and that similarity decays with distance. The variogram measures exactly that decay, and it is the check that decides whether any spatial estimator can work at all.",
        "The solution built here is a full estimation pipeline (Random Forest and XGBoost with engineered spatial features, panel-based splitting, and leakage control) wrapped in the validation the industry actually requires. That validation is what turns this project's deliverable into a defensible verdict on the data rather than a model score.",
      ],
      highlights: [
        { label: "Blocks Modelled", value: "75,000" },
        { label: "Nugget / Sill Ratio", value: "1.04" },
        { label: "R² on Spatial Features", value: "−0.02" },
        { label: "R² (Positive Control)", value: "0.980" },
      ],
      sections: [
        {
          id: "dataset",
          heading: "Data Understanding",
          navLabel: "Data",
          body:
            "mining_block_model.csv holds 75,000 blocks on a 500 × 500 × 100 grid, carrying coordinates, grade, tonnage, rock type, and a set of economic columns. Everything runs at random_state = 42 and is fully reproducible.",
          bullets: [
            "The modelling target is grade within the ore domain. Waste blocks sit at grade = 0 and were separated out, because mixing them in creates a bimodal distribution that flatters every correlation computed on the full set.",
            "The dataset also ships columns derived from grade itself (ore_value_per_tonne, profit, waste_flag, target, and rock_type), and these become the subject of the leakage audit later in the project.",
            "Domain variance on the ore blocks is 18.88, the number the variogram sill is later compared against.",
          ],
          figures: [
            {
              src: "/Image/projects/mineral-grade/mg01.png",
              alt: "Histogram of block grade distribution",
              caption:
                "Grade distribution across the block model. The shape is perfectly well behaved, and nothing here warns you that the spatial structure is missing, which is exactly why variography cannot be skipped.",
              width: 975,
              height: 447,
            },
          ],
        },
        {
          id: "eda",
          heading: "Exploratory Data Analysis",
          navLabel: "EDA",
          body:
            "Three questions had to be answered before modelling anything: what shape is the grade distribution, does grade change with depth, and does it form coherent zones in plan view?",
          bullets: [
            "Grade against depth is flat. There is no supergene enrichment profile and no weathering gradient, so the vertical axis carries no information.",
            "The bench heatmap shows no coherent high-grade zones. Panel means scatter around the domain mean without any spatial organisation.",
            "The 3D scatter confirms the same picture in three dimensions: high-grade blocks are dispersed through the volume rather than clustered into an ore body.",
            "At this point the evidence is suggestive but not conclusive, because the visual absence of structure is not proof. That is what the variogram is for.",
          ],
          figures: [
            {
              src: "/Image/projects/mineral-grade/mg02.png",
              alt: "Grade profile against depth by bench",
              caption:
                "Mean grade by bench. A real deposit usually shows a depth trend from enrichment or weathering; this one is flat, so depth features cannot help.",
              width: 755,
              height: 535,
            },
            {
              src: "/Image/projects/mineral-grade/mg03.png",
              alt: "Bench-level heatmap of average grade per panel",
              caption:
                "Panel heatmap in plan view. No contiguous high-grade zones form, the first strong hint that neighbouring blocks say nothing about each other.",
              width: 756,
              height: 649,
            },
            {
              src: "/Image/projects/mineral-grade/mg04.png",
              alt: "Three-dimensional scatter of grade across the block model",
              caption:
                "Grade in three dimensions. High-grade blocks are scattered through the volume instead of concentrating into an ore body.",
              width: 726,
              height: 639,
            },
          ],
        },
        {
          id: "variography",
          heading: "Variography: The Feasibility Test",
          navLabel: "Variogram",
          body:
            "This is the check that governs the entire project, and it has to come before modelling. The experimental variogram measures how quickly similarity between blocks decays with separation distance: γ(h) = 1/(2N(h)) · Σ (zᵢ − zⱼ)² over all pairs separated by roughly h. A real deposit shows low γ(h) at short lags, rising to a sill beyond the range, with the range being the maximum distance at which one block still says something about its neighbour.",
          bullets: [
            "Semivariance is flat at ~18.6 across every lag, while the domain variance is 18.88. γ(h) hits the sill at the shortest lag and never rises.",
            "Nugget / sill ratio = 1.04, which is pure nugget. Two adjacent blocks are exactly as dissimilar as two blocks 250 m apart. Geostatistically, range = 0.",
            "The consequence is theoretical, not merely empirical: kriging on data like this returns the domain mean for every block, and any location-based method faces the identical ceiling. R² ≈ 0 is therefore the correct result, not a sign of a failed model.",
          ],
          figures: [
            {
              src: "/Image/projects/mineral-grade/mg05.png",
              alt: "Experimental variogram of the ore domain against the sill",
              caption:
                "The experimental variogram that rejects the dataset before modelling begins. γ(h) sits on the sill from the shortest lag onward: pure nugget, with no spatial continuity to exploit.",
              width: 975,
              height: 513,
            },
          ],
        },
        {
          id: "preprocessing",
          heading: "Preprocessing & Feature Engineering",
          body:
            "Features were engineered from geological reasoning rather than from whatever the columns allowed, and two specific methodological errors were designed out of the pipeline.",
          bullets: [
            "Depth group: depth_from_surface and bench_level, because supergene enrichment and weathering are depth-controlled.",
            "Deposit geometry: radial_distance, horizontal_distance and azimuth, because grade often decays outward from the centre of an ore body.",
            "Spatial aggregation: neighbour_grade_mean, neighbour_grade_std, the machine learning counterpart of kriging and inverse distance weighting.",
            "Block physics: tonnage as a proxy for density and volume.",
            "Error avoided 1: random splitting. On a dense grid, a random split puts every test block directly adjacent to training blocks. The model just copies its neighbour's value and the test score becomes wildly optimistic. This project splits whole 50 × 50 m panels instead, reproducing the real situation: predicting an area that has never been drilled.",
            "Error avoided 2: leakage through the neighbour features. neighbour_grade_mean is computed after the split and only from training blocks. Training blocks request k + 1 neighbours and discard the first (themselves); test blocks query the same tree, which contains training blocks only.",
          ],
        },
        {
          id: "modeling",
          heading: "Modeling",
          body:
            "Random Forest and XGBoost were trained on the purely spatial feature set, with a domain-mean baseline included not as decoration but as a mandatory comparator: an estimator that cannot beat the domain mean has learned nothing.",
          bullets: [
            "Tree models are the right complement to kriging in principle: they capture non-linear relationships, feature interactions (grade depending on lithology × depth × alteration), heterogeneous covariates, and anisotropy learned from data rather than hand-specified in a variogram model.",
            "Their limits are equally real and were kept in view: they produce no estimation variance the way kriging does, they carry no unbiasedness guarantee, and they tend to over-smooth, flattening high grades so head grade gets reported too low. In industry practice both are run side by side and reconciled.",
            "On this dataset neither model can exceed the baseline, and the variogram had already explained why before a single tree was fitted.",
          ],
        },
        {
          id: "evaluation",
          heading: "Evaluation",
          navLabel: "Evaluation",
          body:
            "Every model was scored against the domain-mean baseline on panels held out entirely from training.",
          bullets: [
            "Domain-mean baseline: R² −0.0000, RMSE 4.335.",
            "Random Forest on spatial features: R² −0.0167, RMSE 4.372.",
            "XGBoost on spatial features: R² −0.0249, RMSE 4.389.",
            "Both models land slightly below the baseline, the signature of a model fitting noise in a dataset that contains no learnable structure.",
            "Predicted versus actual collapses to a horizontal band around the domain mean, precisely the behaviour theory predicts under pure nugget.",
          ],
          figures: [
            {
              src: "/Image/projects/mineral-grade/mg06.png",
              alt: "R-squared and RMSE comparison between the baseline and both models",
              caption:
                "Both models score below the domain-mean baseline. Reporting this honestly is worth more than tuning until a positive number finally appears.",
              width: 1201,
              height: 456,
            },
            {
              src: "/Image/projects/mineral-grade/mg07.png",
              alt: "Predicted versus actual grade for the held-out panels",
              caption:
                "Predicted versus actual on held-out panels. The predictions form a flat band at the domain mean, because the model has nothing to condition on.",
              width: 747,
              height: 645,
            },
            {
              src: "/Image/projects/mineral-grade/mg08.png",
              alt: "Feature importance ranking for the spatial feature set",
              caption:
                "Feature importance across the spatial features. No feature dominates, because none of them carry signal: importance without predictive power.",
              width: 865,
              height: 601,
            },
          ],
        },
        {
          id: "leakage-audit",
          heading: "Feature Leakage Audit",
          body:
            "The same pipeline, handed the dataset's economic columns, produces R² = 0.97. Publishing that number would have been the easy path and the wrong one.",
          bullets: [
            "XGBoost with ore_value and profit: R² 0.9711. With waste_flag: R² 0.9713.",
            "ore_value_per_tonne is a direct function of grade; profit is exactly tonnage × (ore_value − mining_cost − processing_cost); waste_flag, target and rock_type == \"Waste\" are identical and equal 1 precisely when grade = 0.",
            "The correlation between ore_value and grade is 0.96 across all blocks, but only 0.002 within the ore domain. The 0.96 comes entirely from bimodality (waste blocks are zero on both columns, ore blocks are high on both), not from any real relationship.",
            "Those columns only answer \"waste or ore?\". They say nothing about \"how high is the grade?\", and the second question is the whole point of resource estimation.",
          ],
        },
        {
          id: "positive-control",
          heading: "Positive Control",
          body:
            "An R² near zero has two possible causes: a broken pipeline, or data with no signal. Distinguishing between them is not optional, so the same code, the same features, and the same evaluation protocol were run against a synthetic deposit that genuinely has spatial structure.",
          bullets: [
            "The synthetic deposit's variogram behaves as a real one should: low γ(h) at short lags, rising to a sill beyond a finite range.",
            "Its bench heatmap shows exactly the coherent high-grade zones that were absent from the real dataset.",
            "On that data the identical pipeline reaches R² 0.9796 with RMSE 2.105.",
            "Conclusion, with evidence rather than assertion: what is missing is signal in the data, not capability in the model.",
          ],
          figures: [
            {
              src: "/Image/projects/mineral-grade/mg09.png",
              alt: "Experimental variogram of the synthetic structured deposit",
              caption:
                "The control deposit's variogram: γ(h) rises from a low nugget to a sill at a finite range, which is what a real ore body looks like, and what the actual dataset never showed.",
              width: 975,
              height: 513,
            },
            {
              src: "/Image/projects/mineral-grade/mg10.png",
              alt: "Bench heatmap of the synthetic structured deposit",
              caption:
                "Coherent high-grade zones in the control deposit, the spatial organisation the real block model lacks.",
              width: 740,
              height: 649,
            },
            {
              src: "/Image/projects/mineral-grade/mg11.png",
              alt: "Model scores on the synthetic structured deposit",
              caption:
                "Identical pipeline, structured data: R² 0.980. The pipeline works; the original dataset simply had nothing in it to learn.",
              width: 1201,
              height: 456,
            },
          ],
        },
        {
          id: "impact",
          heading: "Recommendations",
          navLabel: "Impact",
          body:
            "The deliverable of this project is a defensible verdict on the data, which in resource estimation is worth considerably more than a model score.",
          bullets: [
            "mining_block_model.csv is not fit for grade estimation, and that should be established before anyone builds a pit design on top of it.",
            "Do not report R² from any model using ore_value, profit, waste_flag, target, or rock_type.",
            "If the objective is separating waste from ore, reframe it as classification and measure it with ROC-AUC, noting that waste labels are also spatially random here (waste proportion per panel follows a pure binomial distribution), so a coordinate-based classifier will fail too.",
            "For genuine estimation: use borehole assay data with collar coordinates, model the geological domains, and validate with a variogram before choosing an algorithm. Variography first, algorithm second. Reversing that order is how leaked R² values end up in technical reports.",
          ],
        },
        {
          id: "limitations",
          heading: "Limitations",
          bullets: [
            "The conclusions apply to this block model, not to spatial estimation in general, and the positive control exists precisely to make that boundary explicit.",
            "The synthetic control validates the pipeline, not the geology of any real deposit.",
            "Tree models produce no estimation variance and no unbiasedness guarantee; on real data they should be reconciled against kriging rather than replacing it.",
          ],
        },
      ],
    },
    githubUrl: "https://github.com/ikyyy10704",
  },
  {
    slug: "insurance-claim-trend-prediction",
    title: "Insurance Claim Trend Prediction",
    category: "Data Science",
    group: "data",
    description: "Built a two-stage multiplicative ensemble over six algorithms with SLSQP weight optimisation to forecast health insurance claim frequency, severity and total value, reaching a 4.40% combined MAPE.",
    tags: ["Python", "LightGBM", "XGBoost", "Prophet"],
    longDescription:
      "A competition project forecasting individual health insurance claims along three dimensions at once. The architecture is deliberately two-stage and multiplicative (total = frequency times severity) because count data and right-skewed currency data are governed by different factors and fail in different ways. Six algorithms are combined per stage with weights optimised by SLSQP, validated with walk-forward cross validation on only 19 months of history.",
    coverImage: "/Image/projects/insurance-claim/eda_15_forecast_results.png",
    caseStudy: {
      context:
        "Data Science Competition · Mathematical Challenge Festival (MCF) ITB 2026 · Team \"Fantastic Three\" · Team Lead.",
      problemHeading: "Business Understanding",
      problem: [
        "Individual health insurance claims in Indonesia rose 25.5% in January to June 2025 compared with the same period in 2024. That surge pushes insurers to raise premiums, which in turn makes health coverage progressively unaffordable for the public, undermining the very purpose of insurance as protection against unexpected financial shocks.",
        "The cause is that most insurers only find out about a claim surge after it has already hit the books. Reserving and pricing decisions are made on last year's realised numbers, so by the time the trend is visible the options left are all expensive ones.",
        "Prior research has applied machine learning to insurance risk, but almost always to one dimension at a time. Models that jointly predict claim frequency, claim severity and total nominal claims for individual health insurance are still very limited, and an insurer needs all three: frequency drives capacity planning, severity drives benefit design, and their product drives reserves.",
        "The solution is a forecast accurate enough across all three dimensions that the insurer can act early through risk selection, prevention and reserve planning, absorbing rising claims while keeping premiums affordable. Accuracy alone was not the deliverable; the output is a set of dated, triggered actions the insurer can put in a calendar.",
=======
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
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
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
<<<<<<< HEAD
          heading: "Data Understanding",
          navLabel: "Dataset",
          body:
            "Two internal sources spanning 1 January 2024 to 31 July 2025: Data_Klaim.csv with 5,781 individual health claim transactions and Data_Polis.csv with 4,096 active policies. Only Paid claims were used, since Pending claim amounts are not final. Plan codes encode coverage scope: M-001 worldwide, M-002 Asia regional, M-003 domestic Indonesia. External data on inflation, hospital distribution and precipitation was collected alongside the internal files as candidate regressors.",
          bullets: [
            "After joining claims to policy data, 4,627 claim rows across 19 monthly periods form the modelling table. Nineteen rows is a very small training set, and that constraint drove almost every modelling decision that follows.",
            "Approved claim amounts are heavily right-skewed: median Rp14.5 million against a mean of Rp55.0 million, with a maximum of Rp2.2 billion and a skewness near 5.2. Catastrophic claims are rare and enormous.",
            "Monthly claim frequency ranges from 208 to 302, so frequency is count-like and bounded while severity is unbounded and skewed. That difference is the reason the two are modelled separately.",
            "Missing values across Inpatient/Outpatient, payment date, hospital location and ICD codes were imputed with the mode or an explicit Unknown category. No duplicate rows were found.",
          ],
          figures: [
            {
              src: "/Image/projects/insurance-claim/eda_01_summary_cards.png",
              alt: "Summary cards of the joined claim and policy dataset",
              caption:
                "Dataset summary after joining claims to policies: 4,627 claim rows against 4,096 unique policyholders over 19 months, Rp0.25 trillion approved, mean Rp55.0 million against a median of Rp14.5 million. The gap between mean and median is the entire modelling problem in one line.",
              width: 2992,
              height: 909,
              theme: "dark",
            },
            {
              src: "/Image/projects/insurance-claim/eda_02_missing_values.png",
              alt: "Missing value audit across claim and policy columns",
              caption:
                "Missing value audit per column, run before any imputation so the treatment of each field is a recorded decision rather than a silent default.",
              width: 2992,
              height: 867,
              theme: "dark",
            },
          ],
=======
          heading: "Dataset",
          body:
            "Two sources spanning 1 January 2024 – 31 July 2025: Data_Klaim.csv with 5,781 individual health insurance claim transactions, and Data_Polis.csv with 4,096 active policies. Only Paid claims were used; Pending claims were excluded because their amounts are not yet final. Plan codes encode coverage scope: M-001 worldwide, M-002 Asia regional, M-003 domestic Indonesia.",
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
        },
        {
          id: "eda",
          heading: "Exploratory Data Analysis",
<<<<<<< HEAD
          navLabel: "EDA",
          body:
            "The exploration had to answer two questions before any model was fitted: what shape is the severity distribution, and is there enough seasonal structure in 19 months to be worth modelling.",
          bullets: [
            "Outliers make up 11% of claims by the IQR rule. They were handled with 98th-percentile clipping rather than deletion, because a catastrophic claim is real signal for a reserving model even when it distorts an average.",
            "Length of Stay has the strongest correlation with claim amount at 0.43, followed by overseas claims at 0.26 and inpatient claims at 0.24.",
            "The ICD analysis produced the most useful clinical finding: the most frequent diagnoses and the most expensive diagnoses barely overlap. Breast cancer (C50) leads on volume with 245 claims, while peripheral vascular disease (I73.9) leads on severity at Rp648 million average. A cost containment programme aimed only at the common diagnoses would miss where the money actually goes.",
            "Frequency and severity move differently over time, which is direct evidence for the two-stage split rather than a single total-claim model.",
            "With only 19 months there is not enough history for a strong yearly seasonal component, so seasonality had to be encoded as features rather than learned by a seasonal model.",
          ],
          figures: [
            {
              src: "/Image/projects/insurance-claim/eda_03_distribusi_nominal.png",
              alt: "Distribution of approved claim amounts",
              caption:
                "Claim amount distribution. The long right tail is what forces a log transform on severity and what makes MAPE, not RMSE, the right competition metric.",
              width: 2992,
              height: 1788,
              theme: "dark",
            },
            {
              src: "/Image/projects/insurance-claim/eda_04_time_series.png",
              alt: "Monthly time series of frequency, severity and total claims",
              caption:
                "Monthly frequency, severity and total claims. The three series do not move together, which is the empirical case for forecasting frequency and severity separately and multiplying afterwards.",
              width: 2992,
              height: 1990,
              theme: "dark",
            },
            {
              src: "/Image/projects/insurance-claim/eda_05_seasonal_heatmap.png",
              alt: "Seasonal heatmap of claims by month",
              caption:
                "Seasonal heatmap across the observed months. Nineteen months is under two full cycles, so this is treated as a hint for feature design rather than as a seasonal pattern a model can rely on.",
              width: 2992,
              height: 1148,
              theme: "dark",
            },
            {
              src: "/Image/projects/insurance-claim/eda_08_icd_analysis.png",
              alt: "Most frequent versus most expensive ICD diagnoses",
              caption:
                "The most frequent diagnoses beside the most expensive ones. The two lists barely intersect, which means volume-driven and cost-driven interventions have to target different patient populations.",
              width: 3190,
              height: 1387,
              theme: "dark",
            },
            {
              src: "/Image/projects/insurance-claim/eda_07_severity_by_category.png",
              alt: "Average claim severity broken down by category",
              caption:
                "Severity broken down by claim category, which is what turns the severity forecast into an actionable benefit design conversation rather than a single monthly number.",
              width: 3191,
              height: 955,
              theme: "dark",
            },
            {
              src: "/Image/projects/insurance-claim/eda_11_correlation.png",
              alt: "Correlation matrix across claim features",
              caption:
                "Correlation matrix across the claim features, used to catch redundant engineered variables before they entered a model trained on only 19 rows.",
              width: 1424,
              height: 1108,
              theme: "dark",
            },
          ],
        },
        {
          id: "preprocessing",
          heading: "Preprocessing & Feature Engineering",
          navLabel: "Features",
          body:
            "Twenty-eight features across five groups, built from monthly aggregation. With 19 training rows, every added feature is a real overfitting risk, so each group has to justify itself.",
          bullets: [
            "Time: Month, Quarter, Time_Index, plus cyclical Month_Sin and Month_Cos so that December and January sit next to each other instead of at opposite ends of a scale.",
            "Seasonal flags: Is_Q1, Is_Q4, Is_Holiday_Month covering New Year, Eid and Christmas.",
            "Claim characteristics: Pct_Inpatient, Pct_Reimburse, Pct_Singapore and Avg_LOS, all of which shift the severity mix month to month.",
            "Demographics and plan: Avg_Age, Pct_Male, and the Pct_M001 / M002 / M003 plan split that encodes coverage scope.",
            "Lags and rolling statistics: Frequency and Severity at lags 1, 2 and 3, plus rolling means and rolling standard deviations over 2 and 3 month windows. These carry the autoregressive momentum that a 19 row dataset cannot express any other way.",
            "Exposure: Active_Policies per month and the derived claim rate. Worth noting honestly that active policies sit flat at 4,096 across the entire window, so the exposure feature carries almost no variance and contributes little.",
            "Severity is modelled on log1p, which compresses the skew, stabilises variance, and makes the error behave like a percentage error, which aligns the loss with the MAPE the competition scores on. Predictions are inverted with expm1.",
          ],
          figures: [
            {
              src: "/Image/projects/insurance-claim/eda_13_features.png",
              alt: "Monthly trajectory of the engineered model features",
              caption:
                "The engineered monthly features that enter the model. Inpatient share fell from 0.70 to 0.48 across the window while average patient age drifted to 60, and active policies stayed flat at 4,096, which is why exposure ends up contributing so little.",
              width: 3190,
              height: 1390,
              theme: "dark",
            },
            {
              src: "/Image/projects/insurance-claim/eda_10_polis_claimrate.png",
              alt: "Active policies and monthly claim rate",
              caption:
                "Active policies against the derived claim rate. With the policy count effectively constant, claim rate becomes a rescaled copy of frequency rather than an independent signal.",
              width: 2992,
              height: 870,
              theme: "dark",
            },
=======
          bullets: [
            "Approved claim amounts are heavily right-skewed — median Rp14.5M vs mean Rp48.5M — signalling catastrophic claims.",
            "Missing values (Inpatient/Outpatient, payment date, hospital location, ICD codes) were imputed with mode or an \"Unknown\" category; no duplicate rows were found.",
            "Outliers (11% of claims by IQR) were handled with 98th-percentile clipping instead of deletion, preserving high-value claim signal.",
            "Length of Stay had the strongest correlation with claim amount (0.43), followed by overseas claims (0.26) and inpatient claims (0.24).",
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
          ],
        },
        {
          id: "approach",
<<<<<<< HEAD
          heading: "Modeling Architecture",
          navLabel: "Approach",
          body:
            "The core architectural decision: Total Claim = Claim Frequency times Claim Severity, with each stage forecast by its own weighted ensemble. Frequency follows a count distribution between 208 and 302 per month; severity is continuous and right-skewed with a mean of Rp55 million against a standard deviation of Rp132 million. Different distributions, different drivers, and separate models that are far easier to debug when one of them goes wrong.",
          bullets: [
            "Six candidate algorithms per stage: Prophet, LightGBM, XGBoost, Ridge Regression, ElasticNet and Holt-Winters ETS. Each contributes something distinct: Prophet handles trend changepoints and is robust to outliers, LightGBM captures non-linear feature interactions and optimises MAPE directly, Ridge and ElasticNet act as regularised linear baselines that refuse to hallucinate on 19 rows, and ETS captures pure momentum from the target history without needing any features at all.",
            "LightGBM is deliberately shrunk for the data size: num_leaves 3, learning_rate 0.01, n_estimators 150, lambda_l1 0.5. On 19 monthly rows a normally sized tree model would simply memorise the training set.",
            "Ensemble weights are optimised with SLSQP (Sequential Least-Squares Programming) separately for frequency, severity and total, rather than being set by hand. No single model is allowed to dominate more than 60% of any prediction.",
            "Total claim is computed as a blend: alpha times (frequency times severity) plus (1 minus alpha) times a direct total prediction, with alpha also optimised.",
            "A severity multiplier of 0.960 was applied to correct a consistent upward bias, which improved the combined MAPE to 4.40%.",
            "Validation is walk-forward: train on months 1 to 12 and test on 13, then 1 to 13 test 14, and so on through seven expanding-window splits. A random split would leak future months into training and make the score meaningless.",
          ],
          figures: [
            {
              src: "/Image/projects/insurance-claim/eda_14_model_weights.png",
              alt: "Optimised ensemble weights for the frequency and severity models",
              caption:
                "The weights SLSQP actually chose. Frequency ends up on ETS 58.2% and LightGBM 41.8%; severity on ElasticNet 42.5%, LightGBM 37.3% and XGBoost 20.2%. Only 2 of 6 and 3 of 6 candidates earn a non-zero weight, so the optimiser is genuinely selecting rather than averaging everything.",
              width: 2793,
              height: 667,
              theme: "dark",
            },
=======
          heading: "Approach & Methodology",
          body:
            "A 6-model ensemble — Prophet, LightGBM, XGBoost, Ridge Regression, ElasticNet, and Holt-Winters ETS — with weights optimized separately for frequency, severity, and total claims using SLSQP (Sequential Least-Squares Programming). No single model is allowed to dominate more than 60% of any prediction.",
          bullets: [
            "Feature engineering produced 28 features: cyclical calendar encoding (sin/cos), lag features, rolling statistics, log transforms, and a severity skewness ratio.",
            "Walk-forward (expanding-window) cross-validation was used to prevent data leakage and mimic real forecasting conditions.",
            "Total claim = α·(frequency × severity) + (1−α)·direct prediction, with α also optimized.",
            "A severity multiplier of 0.960 was applied to correct a consistent upward bias, improving the combined MAPE to 4.40%.",
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
          ],
        },
        {
          id: "results",
<<<<<<< HEAD
          heading: "Results & Validation",
          navLabel: "Result",
          body:
            "Each model was scored per dimension, and no single algorithm won everywhere, which is exactly the condition that justifies an ensemble instead of just picking the best one.",
          bullets: [
            "Frequency: LightGBM was best at MAPE 6.32%, ahead of ETS at 7.04% and XGBoost at 8.45%.",
            "Severity: ElasticNet was best at MAPE 5.40%, ahead of LightGBM at 5.66% and Ridge at 6.02%.",
            "Total nominal claims: XGBoost was best at MAPE 7.32%, ahead of ETS at 9.61% and LightGBM at 9.70%.",
            "The SLSQP-weighted ensemble delivered the best combined MAPE of 4.40%, below every individual model on every dimension.",
            "Walk-forward cross validation gave CV MAPE of 10.13% on frequency and 0.77% on log severity, and the gap between the two is a reminder that the log-scale number is flattering by construction rather than evidence that severity is easy.",
            "Feature engineering helped tree models (LightGBM improved from 7.87% to 6.33%) but hurt the linear models and Prophet, confirming that its benefit is model-specific rather than universal.",
            "An honest artefact worth reporting: at the final hyperparameters the severity LightGBM produced no splits at all, degenerating into a constant predictor. On 19 rows with num_leaves 3 and lambda_l1 0.5, the regulariser won. The ensemble absorbed it because ElasticNet and XGBoost carried that stage, but it is precisely the kind of silent failure a single-model submission would have shipped unnoticed.",
          ],
          figures: [
            {
              src: "/Image/projects/insurance-claim/eda_16_feature_importance.png",
              alt: "LightGBM feature importance for the frequency and severity models",
              caption:
                "Feature importance for both stages. Total_Claim_Lag2 and Frequency_RollStd3 dominate frequency, while the severity panel is empty because that model generated no splits, which is a finding rather than a rendering error.",
              width: 3190,
              height: 1287,
              theme: "dark",
            },
=======
          heading: "Results",
          bullets: [
            "Frequency: LightGBM was best (MAPE 6.32%), ahead of ETS (7.04%) and XGBoost (8.45%).",
            "Severity: ElasticNet was best (MAPE 5.40%), ahead of LightGBM (5.66%) and Ridge (6.02%).",
            "Total nominal claims: XGBoost was best (MAPE 7.32%), ahead of ETS (9.61%) and LightGBM (9.70%).",
            "No single model won everywhere — the SLSQP-weighted ensemble delivered the best combined MAPE of 4.40%.",
            "Feature engineering helped tree models (LightGBM 7.87% → 6.33%) but hurt linear models and Prophet, confirming its benefit is model-specific.",
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
          ],
        },
        {
          id: "projection",
<<<<<<< HEAD
          heading: "Forecast Output",
          body:
            "The pipeline produces frequency, severity and total per forecast month, which is what lets the insurer plan capacity and reserves separately instead of only seeing a single currency total.",
          bullets: [
            "Frequency settles around 238 claims per month, rising gradually with a Q3 to Q4 peak near 238 to 239.",
            "Average severity stays relatively stable in the Rp45 to 47 million band per claim, and the pipeline output centres on Rp45.5 million.",
            "Total nominal claims land in the Rp10.8 to 11.2 billion per month range, tracking frequency rather than severity.",
            "That last point is the planning insight: severity is comparatively stable, so the total is driven by how many claims arrive, which makes frequency the number to monitor month to month.",
          ],
          figures: [
            {
              src: "/Image/projects/insurance-claim/eda_15_forecast_results.png",
              alt: "Forecast of frequency, severity and total claims against history",
              caption:
                "Forecast against history, with the vertical line separating observed from predicted. Severity flattens in the forecast while frequency carries the variation, which is what makes the total track frequency.",
              width: 3191,
              height: 957,
              theme: "dark",
            },
=======
          heading: "2026 Projection (Jan–Dec)",
          bullets: [
            "Frequency rises gradually with a Q3–Q4 peak of ~238–239 claims/month.",
            "Severity stays relatively stable at Rp45–47M per claim.",
            "Total nominal claims range Rp10.9–11.2 billion per month, tracking frequency.",
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
          ],
        },
        {
          id: "recommendations",
          heading: "Strategic Recommendations",
<<<<<<< HEAD
          navLabel: "Impact",
          bullets: [
            "Strengthen technical reserves in H2 2026, holding at least 60% of the annual reserve ahead of the Q3 to Q4 peak.",
            "Control severity through stricter benefit limits or co-insurance on overseas inpatient claims and stronger provider networks abroad, since overseas claims carry the second strongest correlation with claim amount.",
            "Target the expensive diagnoses separately from the frequent ones, because the ICD analysis shows the two lists barely overlap and a single cost programme cannot cover both.",
            "Run preventive and wellness programmes targeting at least a 5% reduction in the claim rate.",
            "Trigger proactive premium repricing if realised claims exceed projection by more than 10% for two consecutive months.",
            "Deploy an early-warning dashboard that alerts when monthly realisation exceeds projection by more than 15%.",
          ],
        },
        {
          id: "limitations",
          heading: "Limitations",
          bullets: [
            "Nineteen monthly observations is a very small training set. Every model here is regularised aggressively for that reason, and the severity LightGBM collapsing to a constant is the visible cost of it.",
            "Prophet needs roughly two years for a strong seasonal component, so its seasonality contribution here is weak by construction rather than by tuning.",
            "Future features for unknown columns are carried forward from the last observed month, which is reasonable one quarter out and progressively less defensible further ahead.",
            "Active policies are effectively constant across the window, so the model cannot learn an exposure effect and any real portfolio growth would need to be entered as an explicit assumption.",
            "MAPE is asymmetric and unstable when actuals approach zero. It is the competition metric, so it is what the models optimise, but it should not be the only metric an insurer monitors in production.",
=======
          bullets: [
            "Strengthen technical reserves in H2 2026 (≥60% of annual reserve) ahead of the Q3–Q4 peak.",
            "Control severity via stricter benefit limits / co-insurance on overseas inpatient claims and stronger provider networks abroad.",
            "Run preventive & wellness programs targeting a ≥5% reduction in claim rate.",
            "Trigger proactive premium repricing if realized claims exceed projection by >10% for two consecutive months.",
            "Deploy an early-warning dashboard that alerts when monthly realization exceeds projection by >15%.",
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
          ],
        },
      ],
      reportUrl: "/Document/26040221_Fantastic%20Three.pdf",
    },
<<<<<<< HEAD
    githubUrl: "https://github.com/ikyyy10704",
=======
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
  },
  {
    slug: "hybrid-job-recommendation",
    title: "Hybrid Job Recommendation System",
    category: "Research",
<<<<<<< HEAD
    group: "data",
    description: "Combined lexical TF-IDF with semantic SBERT over 28,858 Indonesian job postings, then re-ranked candidates with LambdaMART to reach NDCG@10 of 86.29%, a 13.3 point gain over hybrid similarity alone.",
    tags: ["Python", "SBERT", "TF-IDF", "LambdaMART"],
    longDescription:
      "A content-based job recommendation system for the Indonesian market. Text is represented by concatenating weighted per-field TF-IDF with multilingual SBERT embeddings, candidates are retrieved by Euclidean distance on that hybrid vector, and the final ordering is learned by LambdaMART optimising NDCG against a graded holistic relevance label. The full research title is \"Hybrid Job Recommendation System Using TF-IDF and SBERT with Learning-to-Rank for Personalized Job Matching in Indonesia\".",
    coverImage: "/Image/projects/job-recommendation/ltr01.png",
    caseStudy: {
      context:
        "Undergraduate research · Content-based recommender systems and learning-to-rank · Individual project, fully reproducible at SEED 42.",
      problemHeading: "Business Understanding",
      problem: [
        "Job platforms in Indonesia match candidates to vacancies mostly by keyword. Type \"data analyst\" and you get postings containing that exact string, which means a relevant \"business intelligence\" role is invisible while an irrelevant posting that happens to mention the phrase ranks first.",
        "The cause is that keyword matching operates on surface form only. It has no notion that business intelligence and data analytics are neighbouring fields, and no notion that a match on job title should count for more than a match buried in a long description.",
        "Purely semantic models fix the first problem and create a second one. Embeddings capture meaning but lose exact technical tokens, so a posting requiring a specific stack can drift below a generically similar one.",
        "The solution is a two-stage system. Stage one represents each posting as a hybrid of weighted lexical TF-IDF and multilingual semantic SBERT and retrieves 200 candidates. Stage two learns how to order those candidates with LambdaMART, so the weight of each matching criterion is learned from graded relevance rather than assigned by hand.",
      ],
      highlights: [
        { label: "NDCG@10", value: "86.29%" },
        { label: "Job Postings", value: "28,858" },
        { label: "Test Queries", value: "3,934" },
        { label: "Gain over Hybrid", value: "+13.3 pts" },
      ],
      sections: [
        {
          id: "dataset",
          heading: "Data Understanding",
          navLabel: "Data",
          body:
            "28,858 Indonesian job postings after cleaning, carrying job title, skills, description, location, education level, experience level, salary, company industry and career level.",
          bullets: [
            "Text cleaning lowercases everything, strips URLs and email addresses, and removes non-alphanumeric characters while deliberately keeping +, # and . so that C++, C# and .NET survive as tokens.",
            "Duplicates are removed on the combination of job title, company industry and location, since the same vacancy is frequently reposted.",
            "Structural field coverage is uneven and reported honestly: experience level is present on 86.8% of rows, education on 82.1%, and salary on only 26.4%. That last number is why salary enters as a feature paired with an availability flag rather than as an imputed value.",
            "Job titles are mapped into 12 categories by keyword. The distribution is heavily unbalanced: Other holds 15,713 postings, then Sales and Business Development 4,242, Finance and Accounting 2,297, Marketing and Communication 2,204, Software Development 1,308, Engineering 1,238, Administration and Operations 974, and Human Resources 273.",
            "The Other bucket covering 54% of the corpus is a real limitation of the keyword taxonomy, and it is handled by excluding those postings from the evaluation query set rather than by pretending the taxonomy is complete.",
          ],
        },
        {
          id: "eda",
          heading: "Feature Preparation",
          navLabel: "EDA",
          body:
            "Four structural attributes are normalised to a 0 to 1 scale so that similarity on them is comparable with text similarity.",
          bullets: [
            "Experience is parsed from free text, capped at 10 years, with \"fresh graduate\" mapped explicitly to 0 rather than left as missing.",
            "Education is mapped to an ordinal scale where high school is 0.0, D3 0.25, D4 0.40, S1 0.50, S2 0.75 and S3 1.0, so the distance between two levels is meaningful.",
            "Location is normalised through an alias table so that \"jakarta raya\" and \"dki jakarta\" both resolve to \"jakarta\", which otherwise splits the single largest job market into three non-matching strings.",
            "Salary is min-max scaled and clipped to the 0 to 1 range.",
            "Skills are tokenised into sets with generic words removed (and, or, with, using, skill, ability, knowledge, experience, good, strong, basic), so Jaccard overlap measures actual capability rather than boilerplate.",
          ],
        },
        {
          id: "preprocessing",
          heading: "Hybrid Representation",
          navLabel: "Hybrid",
          body:
            "The representation is the core contribution: lexical and semantic signals are concatenated rather than averaged, so the ranker downstream can weigh them independently instead of inheriting a fixed blend.",
          bullets: [
            "TF-IDF is fitted per field rather than on one concatenated string: title with 2,000 features over 1 to 3 grams, skills with 2,000 features over 1 to 3 grams, and description with 1,000 features over 1 to 2 grams, all with min_df 2, max_df 0.8 and sublinear term frequency.",
            "Each field is then weighted before concatenation: title 0.50, skills 0.25, description 0.25. A title match is worth twice a description match, which encodes the domain fact that the title is the strongest single indicator of what a job actually is. The result is L2 normalised into a 5,000 dimension vector.",
            "SBERT uses paraphrase-multilingual-mpnet-base-v2, which matters because Indonesian job postings mix Indonesian and English freely within a single field. Encoding 28,858 postings produced 768 dimension embeddings in 3.48 minutes on GPU, then L2 normalised.",
            "The hybrid vector is V = [alpha times TF-IDF, beta times SBERT] with alpha 0.6 and beta 0.4, giving 5,768 dimensions. Concatenation preserves both signals as separately addressable blocks; averaging them would have destroyed that.",
          ],
        },
        {
          id: "relevance",
          heading: "Graded Relevance Label",
          body:
            "Learning-to-rank needs a target, and binary relevant or not is too coarse for a job match where a candidate can be a partial fit on several axes at once. A holistic relevance score is composed from five weighted criteria and then discretised.",
          bullets: [
            "rel = 0.40 times category match + 0.25 times skill Jaccard + 0.15 times experience fit + 0.10 times education fit + 0.10 times location match.",
            "The continuous score is discretised into five grades from 0 to 4 at thresholds 0.15, 0.30, 0.45 and 0.60, which is what NDCG needs to distinguish an excellent match from an acceptable one.",
            "The critical design decision: category and skills are used to build the label but are deliberately excluded from the model features. Feeding a label component back in as a feature would be textbook leakage and would produce a score that means nothing.",
            "This is a heuristic ground truth, not human annotation, and it is described as such. The weights encode a defensible view of what makes a job relevant, but validating them against human judgement is the main outstanding item.",
          ],
        },
        {
          id: "modeling",
          heading: "Retrieval and Learning-to-Rank",
          navLabel: "Modeling",
          body:
            "Two stages: a cheap retrieval pass that narrows 28,858 postings to 200, then an expensive learned pass that orders those 200 properly.",
          bullets: [
            "Stage one retrieves the 200 nearest candidates by Euclidean distance on the hybrid vector, computed in chunks with a Gram matrix so that 13,116 queries finish in 82 seconds.",
            "Each candidate is then described by exactly ten features: three text similarities (sim_hybrid, sim_tfidf, sim_sbert) and seven structural signals (loc_match, edu_fit, edu_av, exp_fit, exp_av, sal_fit, sal_av).",
            "Every structural fit feature is paired with an availability flag. Since salary is present on only 26.4% of postings, a fit score of zero is ambiguous between a genuine mismatch and a missing value, and the availability flag is what lets the model tell those two cases apart.",
            "Eligible queries are the 13,116 postings outside the Other category whose category has more members than the largest K being evaluated, so every query has enough true candidates for the metric to be defined.",
            "The split is per query at 70/30: 9,182 training queries producing 1,836,400 candidate rows, and 3,934 held-out test queries. Splitting by query rather than by row is what prevents a query's own candidates from appearing on both sides.",
            "LambdaMART is trained as LGBMRanker with objective lambdarank and metric ndcg: 500 estimators, learning rate 0.05, 63 leaves, min_child_samples 30, subsample 0.9 and colsample_bytree 0.9. Training took 351 seconds.",
          ],
        },
        {
          id: "evaluation",
          heading: "Evaluation",
          navLabel: "Evaluation",
          body:
            "Evaluated on the 3,934 held-out queries across four cut-offs, with graded NDCG as the primary metric plus Precision and MAP computed against a binary relevance threshold of grade 2 or above.",
          bullets: [
            "NDCG@5 87.42%, Precision@5 90.50%, MAP@5 88.25%.",
            "NDCG@10 86.29%, Precision@10 89.27%, MAP@10 85.78%.",
            "NDCG@20 85.03%, Precision@20 87.98%, MAP@20 83.28%.",
            "NDCG@30 84.24%, Precision@30 86.99%, MAP@30 81.62%.",
            "The decay from K=5 to K=30 is gentle, about 3 points of NDCG across a six-fold increase in list length, which means quality does not collapse once the obvious matches are exhausted.",
            "Feature importance from LambdaMART confirms the hybrid similarity carries the ranking while the structural fit features refine it, which is the behaviour the two-stage design was aiming for.",
          ],
          figures: [
            {
              src: "/Image/projects/job-recommendation/ltr01.png",
              alt: "Multi-K performance curves and LambdaMART feature importance",
              caption:
                "NDCG, Precision and MAP across K on the left, LambdaMART feature importance on the right. The flat multi-K curves are the useful part: a recommender that only works at K=5 is not deployable.",
              width: 1288,
              height: 430,
            },
          ],
        },
        {
          id: "ablation",
          heading: "Ablation Study",
          body:
            "Every component was tested against the same holistic ground truth and the same held-out queries, so the comparison isolates the contribution rather than changing two things at once.",
          bullets: [
            "TF-IDF alone: NDCG@10 70.93%, Precision@10 86.94%, MAP@10 84.20%.",
            "SBERT alone: NDCG@10 69.00%, Precision@10 83.72%, MAP@10 78.07%. Semantic similarity by itself is weaker than lexical here, which is worth stating because it runs against the intuition that newer embeddings must be better.",
            "Hybrid without learning-to-rank: NDCG@10 73.00%, so concatenating the two representations already beats either alone by 2 to 4 points.",
            "Hybrid with fixed fusion (a plain average of all ten features): NDCG@10 80.57%. Simply using the structural features at all is worth another 7.6 points.",
            "Hybrid with LambdaMART: NDCG@10 86.29%. Learning the weights instead of fixing them adds a further 5.7 points, for a total gain of 13.3 points over hybrid similarity alone.",
            "Wilcoxon signed-rank tests on per-query NDCG@10 confirm the differences are significant against every baseline, with p effectively 0 against the first three and p = 7.54e-131 against fixed fusion.",
            "The nuance that deserves stating: fixed fusion actually scores higher on Precision@10 (91.51% against 89.27%) and MAP@10 (89.01% against 85.78%). LambdaMART optimises NDCG, which rewards putting grade-4 matches above grade-3 matches, while Precision and MAP only ask whether an item clears the binary threshold. The proposed method wins the metric it was trained on and loses the two it was not, and reporting only the winning one would have been misleading.",
          ],
        },
        {
          id: "impact",
          heading: "Qualitative Output",
          navLabel: "Output",
          body:
            "Metrics describe the average case. The example outputs show what a user actually receives, which is the check that catches a system scoring well while returning nonsense.",
          bullets: [
            "Query \"Staff Accounting/Finance\" with skills in Excel, Leadership and Spreadsheet, located in Jakarta Selatan: all ten returned postings are Finance and Accounting, nine of ten are in Jakarta Selatan or Jakarta Raya, and nine of ten carry relevance grade 3.",
            "A free-text query for a Fullstack Developer with PHP, JavaScript, MySQL, Python, HTML and CSS returns ten Software Development postings, every one of them a fullstack role, spread across Jakarta, Depok, Bali, Sleman, Semarang, Bandung and Tangerang.",
            "The second example matters more than the first: the query text was typed by a person and contains typos (\"pyhton\", \"jakarata\") plus an Indonesian language experience description. The multilingual SBERT branch is what absorbs that, which is exactly the case a pure TF-IDF system would fail.",
            "The same recommend_for function serves both a posting used as a query and a free-text candidate profile, so the research pipeline doubles as the scoring path a product would call.",
          ],
        },
        {
          id: "limitations",
          heading: "Limitations & Next Steps",
          bullets: [
            "The relevance label is heuristic rather than human-annotated. Its five weights are defensible but unvalidated, and human annotation is the single most valuable next step.",
            "The Other category holds 54% of postings and is excluded from evaluation, so the reported metrics describe performance on the well-categorised half of the corpus.",
            "Salary coverage of 26.4% means that feature is close to inactive on three quarters of candidates.",
            "The title taxonomy is keyword-based, so a posting with an unusual title is misclassified rather than left uncertain.",
            "Next steps from the research itself: add further comparison methods evaluated on the same ground truth with significance testing, and validate the relevance definition through human annotation.",
            "Everything runs at SEED 42 and is reproducible end to end, from TF-IDF fitting through SBERT encoding to the LambdaMART training run.",
          ],
        },
      ],
    },
=======
    description: "Developed a personalized job matching system for Indonesia using AHP-weighted SBERT, TF-IDF, and Euclidean Distance to improve relevance and cold-start handling.",
    tags: ["Python", "SBERT", "TF-IDF", "AHP"],
    longDescription: "A personalized job recommendation system tailored for the Indonesian market. By utilizing a hybrid approach that combines AHP-Weighted SBERT and TF-IDF with Euclidean Distance similarity, this research project effectively addressed cold-start and relevance issues common in existing job platforms. The full research title is 'Hybrid Job Recommendation System Using AHP-Weighted SBERT and TF-IDF with Euclidean Distance for Personalized Job Matching in Indonesia'.",
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
  },
  {
    slug: "jivara-health-tech",
    title: "Jivara Stay on Track, Stay Healthy",
    category: "DBS Foundation Capstone",
<<<<<<< HEAD
    group: "data",
    description: "Built the data layer for a health-tech app that reads a photo of a meal and warns the user if it clashes with their medication, turning 29 food classes, 23,682 drug records and 1,037 interaction rules into artefacts the AI and backend teams could consume directly.",
    tags: ["Computer Vision", "YOLO", "Streamlit", "Knowledge Base"],
    longDescription:
      "The Data Science workstream of Jivara, a capstone for DBS Foundation Coding Camp 2026. My role was not to train the final model but to build everything it stands on: a validated YOLO image dataset, an Indonesian nutrition catalogue, a cleaned BPOM drug registry, and a knowledge base that links a detected food all the way to a drug interaction warning. Delivered as reproducible notebooks, documented handoff artefacts for the AI Engineer and Backend, and a Streamlit dashboard for exploring the results.",
    coverImage: "/Image/projects/jivara/00_summary_ds_pipeline_evaluation.png",
    demoUrl: "https://jivara-t94bpyvj8wv6d5ddarynro.streamlit.app/",
    caseStudy: {
      context:
        "DBS Foundation Coding Camp 2026 Capstone · Cross-functional team, my role: Data Scientist · Data preparation for computer vision, nutrition and drug interaction intelligence.",
      problemHeading: "Business Understanding",
      problem: [
        "People on long-term medication are told to avoid certain foods, and almost nobody remembers which ones. Grapefruit with statins, dairy with certain antibiotics, leafy greens with warfarin: the advice arrives once at the pharmacy counter and is gone by dinner. The result is a class of avoidable harm that never gets recorded as a medication error because nothing dramatic happens, the drug simply works less well.",
        "The cause is that the knowledge exists but not at the moment it is needed. Interaction data sits in pharmacology references, the drug registry sits at BPOM, nutrition data sits in a separate catalogue, and the patient is holding a plate of food with none of it in reach.",
        "Jivara closes that gap by letting the phone camera do the asking: photograph the meal, and the app tells you what it is, what is in it, and whether it conflicts with anything you are currently taking. But a computer vision model returns a label like nasi-goreng, and a label alone cannot warn anybody about anything.",
        "That is where this workstream sits. My job was to build the chain that turns a label into a warning: food image, then YOLO class, then ingredients, then nutrition, then drug category, then interaction. Every link in that chain is a dataset that had to be sourced, cleaned, validated and documented before either the AI Engineer or the Backend could write a line of code against it.",
      ],
      highlights: [
        { label: "Food Classes", value: "29" },
        { label: "Training Images", value: "4,915" },
        { label: "Drug Records Cleaned", value: "23,682" },
        { label: "Interaction Rules", value: "1,037" },
      ],
      sections: [
        {
          id: "dataset",
          heading: "Data Understanding",
          navLabel: "Data",
          body:
            "Five separate sources had to be brought into one system, and none of them were built to talk to each other. The work was framed around five business questions, one per dataset, so that each cleaning decision could be traced back to something the product actually needed.",
          bullets: [
            "Food image dataset from Roboflow, destined for YOLO training. The final export carries 29 Indonesian food classes across 4,915 training images, 978 validation and 562 test.",
            "Recipe data scraped from Cookpad, used to decompose a dish into its ingredients. 1,050 cleaned recipes covering 61 food classes.",
            "Indonesian nutrition catalogue from nutrition1.csv, cleaned into 1,346 food entries with calories, protein, fat and carbohydrate as the core lookup fields.",
            "BPOM drug registry: 23,682 raw product records covering registration number, composition, registrant, and dosage form.",
            "Drug and food interaction rules: 1,037 rows linking 61 food classes to 17 drug categories, of which 314 are positive interactions and the rest are explicit no-interaction records.",
            "The class distribution in the raw image dataset was the first real problem. Median annotations per class is 282, but Tahu Goreng carries around 800 while Pisang and Stroberi sit near 220. A model trained on that skew learns to guess the common classes.",
          ],
          figures: [
            {
              src: "/Image/projects/jivara/eda_class_distribution.png",
              alt: "Annotation count per food class in the raw dataset",
              caption:
                "Annotations per class against the median of 282. The spread from roughly 800 down to 220 is what the imbalance handling later has to close, because a detector that only performs on frequent dishes is useless for a nutrition app.",
              width: 1483,
              height: 1181,
            },
            {
              src: "/Image/projects/jivara/eda_bbox_analysis.png",
              alt: "Bounding box quality analysis across the image dataset",
              caption:
                "Bounding box analysis. Annotation geometry was audited before training rather than after, because a corrupt or degenerate box costs far more once it is baked into a trained model.",
              width: 2383,
              height: 581,
            },
          ],
        },
        {
          id: "eda",
          heading: "Exploratory Data Analysis",
          navLabel: "EDA",
          body:
            "Each of the four tabular sources was profiled separately, because they fail in completely different ways: the nutrition catalogue has duplicate food names, the drug registry has one product listed many times under different brands, and the interaction table has label inconsistencies.",
          bullets: [
            "The nutrition catalogue is dominated by a long tail of near-duplicate food names, which is why deduplication had to happen on a normalised name rather than on the raw string.",
            "The BPOM registry collapses hard once you look at composition rather than brand: 23,682 raw records reduce to 15,085 after deduplication by registration number, and to 2,173 once you keep one brand per unique composition. That last number is the one that matters, because interaction risk follows the active substance, not the brand name.",
            "16,441 active substance entries were extracted from the free-text composition column, which is what makes drug category lookup possible at all.",
            "The interaction severity breakdown is dominated by INTAKE_TIMING and AVOID_CRITICAL, meaning most rules are not simple prohibitions but timing instructions, and that changes how the warning should be worded in the app.",
            "An audit surfaced 15 inconsistent interaction labels, recorded in a dedicated anomalies file instead of being silently corrected.",
          ],
          figures: [
            {
              src: "/Image/projects/jivara/eda_nutrition1_all.png",
              alt: "Exploratory analysis of the Indonesian nutrition catalogue",
              caption:
                "Nutrition catalogue profiling. The distributions here decide which fields are safe to expose as a lookup and which need a fallback when the value is missing.",
              width: 2075,
              height: 1469,
            },
            {
              src: "/Image/projects/jivara/distribusi_golongan_obat.png",
              alt: "Distribution of drug classes in the cleaned BPOM registry",
              caption:
                "Drug class distribution after cleaning the BPOM registry. Class is derived from the registration number pattern, which is the only structured signal the raw file offers.",
              width: 2296,
              height: 869,
            },
            {
              src: "/Image/projects/jivara/eda_severity_distribution.png",
              alt: "Severity distribution of drug and food interactions",
              caption:
                "Severity distribution across the interaction rules. INTAKE_TIMING leading AVOID_CRITICAL means the app mostly needs to say when to eat something, not that it is forbidden, which is a much more useful message for adherence.",
              width: 1174,
              height: 572,
            },
          ],
        },
        {
          id: "preprocessing",
          heading: "Preprocessing & Pipeline",
          body:
            "Four cleaning pipelines, one per source, each written as a notebook that runs top to bottom and writes its output into a versioned handoff folder. The image pipeline is the most involved because dataset quality is the ceiling on model quality.",
          bullets: [
            "Image pipeline: load Roboflow annotations, analyse class and bounding box distribution, validate every image file against corruption and missing references, detect duplicates, clean invalid boxes, handle class imbalance, convert to YOLO TXT with normalised xywh, and export with a data.yaml the AI Engineer can point at directly.",
            "Imbalance was handled by undersampling the over-represented classes rather than by aggressive augmentation, with the removed files logged to CSV so the decision is reversible and auditable.",
            "Recipe pipeline: clean recipe text, merge sources, standardise food names so they match the YOLO class list exactly, extract ingredients, and build both a food to ingredient map and its reverse. The reverse map is what lets the system answer the real question, which is which dishes contain the ingredient that conflicts with the drug.",
            "Nutrition pipeline: drop unused columns, standardise and clean food names, deduplicate, assign a food_id and a nutrition_key for lookup, attach source provenance, and validate the catalogue.",
            "BPOM pipeline: clean composition and product text, parse dates, split the registrant field into company and country of origin, derive drug category from the registration number, extract active substances from free text, count them, compute registration duration, flag expiry, deduplicate by registration number, and finally reduce to one brand per composition.",
            "Every pipeline writes to a documented location with a data dictionary, so a downstream engineer never has to reverse-engineer a column name from a notebook.",
          ],
          figures: [
            {
              src: "/Image/projects/jivara/merged_dataset_undersampling_before_after.png",
              alt: "Class distribution before and after undersampling",
              caption:
                "Class balance before and after undersampling. Cutting the over-represented classes was preferred over inflating the rare ones, because synthetic copies of a food photo teach the detector less than fewer, genuinely varied examples.",
              width: 1484,
              height: 731,
            },
            {
              src: "/Image/projects/jivara/post_undersampling_distribution.png",
              alt: "Final class distribution after balancing",
              caption:
                "The resulting distribution across the merged dataset. This is the state the export was frozen at and handed to the AI Engineer.",
              width: 2862,
              height: 1576,
            },
            {
              src: "/Image/projects/jivara/ringkasan_dedup_komposisi.png",
              alt: "Summary of drug composition deduplication",
              caption:
                "Composition deduplication on the BPOM registry: 23,682 raw records down to 2,173 unique compositions. Interaction risk follows the active substance, so collapsing brands is not data loss, it is the point.",
              width: 1467,
              height: 869,
            },
          ],
        },
        {
          id: "knowledge-base",
          heading: "The Knowledge Base",
          navLabel: "KB",
          body:
            "This is the integration deliverable and the reason the four pipelines exist. The chain the product needs is: food image, then YOLO class, then ingredients, then nutrition, then drug category, then interaction warning. Each arrow in that chain is a join that had to be made to work on real, messy names.",
          bullets: [
            "61 food classes carry an ingredient mapping, linking a detected dish to the ingredients that might actually trigger something.",
            "The same 61 classes appear in the interaction table against 17 drug categories, producing 1,037 rules of which 314 are positive interactions.",
            "333 drugs are prepared and mapped for the backend API, 24 of which fall into more than one category and therefore need the interaction check run per category rather than once.",
            "A coverage gap is reported rather than hidden: only 15 of the 61 mapped food classes currently match an entry in the nutrition catalogue, leaving 46 without a nutrition join. The interaction path works for all 61; the calorie and macro path does not yet.",
            "Handoff artefacts are split by consumer. The AI Engineer receives the YOLO export plus food_to_ingredient_kb.json, ingredient_to_food_kb.json and the interaction rules. The Backend receives the nutrition catalogue, the drug lookups, and a ready-to-import SQL file.",
          ],
        },
        {
          id: "evaluation",
          heading: "Evaluation",
          navLabel: "Evaluation",
          body:
            "The pipeline was evaluated with an A/B style comparison across three of the five business questions, framed as baseline (raw data, minimal cleaning) against optimised (the full pipeline). The result and its caveat both matter.",
          bullets: [
            "Food detection accuracy: 71.9% baseline against 88.9% optimised, an improvement of 17.0 percentage points.",
            "Nutrition catalogue completeness: 57.7% against 84.5%, an improvement of 26.8 points.",
            "Drug interaction recall: 52.8% against 84.1%, an improvement of 31.2 points.",
            "All three differences are statistically significant under Welch t-test and Mann-Whitney, with bootstrap confidence intervals and Cohen's d effect sizes above 4.",
            "The caveat, stated plainly because it changes how the numbers should be read: these samples are drawn from Beta distributions around assumed baseline and optimised means, not measured from two real training runs. The script says so in its own docstring. So the p-values and effect sizes describe the simulation, and they demonstrate the evaluation design rather than prove a field improvement. Quoting the 17 points as a measured model gain would be wrong.",
            "What is genuinely measured are the dataset facts underneath: 29 classes, 6,455 exported images across three splits, 23,682 drug records reduced to 2,173 unique compositions, 1,037 interaction rules over 17 drug categories, and a nutrition join covering 15 of 61 classes. Those numbers are reproducible from the notebooks.",
          ],
          figures: [
            {
              src: "/Image/projects/jivara/00_summary_ds_pipeline_evaluation.png",
              alt: "Summary of the pipeline effectiveness evaluation across three research questions",
              caption:
                "The evaluation summary as produced by the pipeline, including per-stakeholder framing. Read alongside the caveat above: the comparison is a designed simulation around assumed means, not a measurement of two real training runs.",
              width: 3780,
              height: 2582,
            },
            {
              src: "/Image/projects/jivara/RQ1_yolo_accuracy.png",
              alt: "Baseline versus optimised distribution for food detection accuracy",
              caption:
                "Food detection accuracy, baseline against optimised. The distributional view is more honest than a bar chart of two means, because it shows the overlap the summary table hides.",
              width: 4141,
              height: 1940,
            },
            {
              src: "/Image/projects/jivara/RQ5_interaksi_recall.png",
              alt: "Baseline versus optimised distribution for interaction recall",
              caption:
                "Interaction recall, the metric that matters most clinically, since a missed interaction is a warning that never reaches the patient.",
              width: 4141,
              height: 1940,
            },
          ],
        },
        {
          id: "impact",
          heading: "Deliverables & Impact",
          navLabel: "Impact",
          body:
            "The output of this workstream is not a model, it is the set of assets that made the rest of the team's work possible. That distinction is worth being explicit about, because data preparation is the part of a capstone that silently decides whether anything else ships.",
          bullets: [
            "A validated 29-class YOLO dataset the AI Engineer could train on without re-auditing it first, shipped with data.yaml, split folders and a zip for transfer.",
            "Two JSON knowledge bases (food to ingredient, ingredient to food) plus the interaction rules, which is what turns a bare detection label into a health warning.",
            "A cleaned nutrition catalogue and drug lookups for the Backend, including an SQL file that imports directly.",
            "Documentation as a first-class deliverable: a data dictionary, handoff notes, a dataset report, a drug lookup guide, and a recorded anomalies file. A downstream engineer can answer a column question without opening a notebook.",
            "A Streamlit dashboard with three modules (recipe nutrition, BPOM drugs, drug and food interactions) so the team and the reviewers can explore the outputs instead of taking a CSV on trust.",
            "Reproducibility was treated as a requirement: notebooks run top to bottom, large raw and output folders are hosted externally so the repository stays under the size limit, and the provenance of every artefact is written down, including which interaction rules came from external curation.",
          ],
        },
        {
          id: "limitations",
          heading: "Limitations",
          body:
            "Five things that would have to change before this became a real clinical product rather than a capstone deliverable.",
          bullets: [
            "The interaction rules are LLM-assisted curation checked against pharmacology literature, enriched from an external Kaggle dataset. They are not clinically validated, and no version of this should reach a patient without pharmacist review.",
            "Nutrition coverage is the weakest link: 15 of 61 food classes join to the nutrition catalogue, so the calorie and macro feature only works on a quarter of the detected dishes today.",
            "15 inconsistent interaction labels remain in the audit file. They are documented rather than fixed, because resolving them needs a pharmacology decision, not a data one.",
            "The A/B evaluation is a simulation, so it validates the evaluation design and not the field performance. Measuring the real improvement needs two actual training runs on the raw and cleaned datasets.",
            "The image dataset covers 29 Indonesian dishes. That is enough to demonstrate the chain end to end and nowhere near enough for general use, and expanding it is the first thing a production version would need.",
          ],
        },
      ],
    },
=======
    description: "Contributed as Data Scientist for a health-tech app focused on food detection and medication adherence, including dataset preparation and Streamlit dashboard development.",
    tags: ["Computer Vision", "Streamlit", "Machine Learning"],
    longDescription: "Built as a capstone project for the DBS Foundation Coding Camp 2026. I served as the Data Scientist in a cross-functional team to develop 'Jivara', a health-tech application. The core features involved detecting food items via Computer Vision and tracking medication adherence. My responsibilities included collecting and transforming datasets for model training, defining the business problem framing, and building a Streamlit dashboard to visualize food-drug interaction insights.",
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
  },
  {
    slug: "pivora-trading-journal",
    title: "Pivora Trading Journal Application",
    category: "Full Stack",
<<<<<<< HEAD
    group: "fullstack",
=======
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
    description: "Built a trading journal application with AI-driven psychological analysis, Fear & Greed Index notifications, and personalized trading recommendations.",
    tags: ["Laravel", "Next.js", "MySQL", "AI Integration"],
    longDescription: "Pivora is a comprehensive trading journal application designed to monitor both trading activity and user psychology patterns. By integrating AI-driven insights, the platform uses previously inputted journal data as training input to deliver personalized trading recommendations and real-time Fear & Greed Index notifications, ultimately supporting better decision-making for traders.",
  },
  {
    slug: "saas-laundry-management",
    title: "SaaS Laundry Management System",
    category: "Full Stack",
<<<<<<< HEAD
    group: "fullstack",
=======
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
    description: "Developed a multi-tenant SaaS platform for laundry business and client management, featuring QRIS integration and AI business recommendations.",
    tags: ["PHP", "CodeIgniter", "MySQL", "QRIS"],
    longDescription: "A multi-tenant SaaS platform built to simplify day-to-day operations for small laundry business owners. Key features include comprehensive financial recording, real-time inventory tracking, automated QRIS payment integration, and AI-powered business recommendations to optimize revenue streams.",
  },
  {
    slug: "construction-management-system",
    title: "Construction Management System",
    category: "Full Stack",
<<<<<<< HEAD
    group: "fullstack",
=======
>>>>>>> a664042ace8f9adf8f60267bdd8c05a65db3608c
    description: "Developed and deployed an in-house construction management system for project tracking, operational reporting, resource management, and internal business workflows.",
    tags: ["PHP", "CI3", "MySQL", "REST API"],
    longDescription: "Developed for CV Gasni Aditama Konstruksi, this comprehensive construction management system solves multiple business operational challenges. The platform centralizes project tracking, resource management, and reporting, replacing fragmented manual processes. It was successfully deployed to production and is actively used by the company's stakeholders.",
  },
];
