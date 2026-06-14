export const projects = [
  {
    id: 1,
    category: 'Healthcare AI',
    title: 'PD-DSS: Parkinson\'s Disease Decision Support System',
    description:
      'Five-agent LangGraph DSS built around MDF-Net — a 670K-parameter three-branch fusion network (temporal, spectral, wavelet) with a medication-state auxiliary head. 45-fold LOSO cross-validation. AUC 0.809, MCC 0.665, 80.5% accuracy, 100% specificity across all healthy controls.',
    tech: ['LangGraph', 'PyTorch', 'Multi-Agent AI', 'EEG Processing', 'LOSO CV', 'FOOOF'],
    github: 'https://github.com/AyushPraharaj',
    demo: null,
    categoryColor: '#8b5cf6',
    featured: true,
  },
  {
    id: 2,
    category: 'Data Engineering',
    title: 'Scalable Food Recommendation & Ad Optimization',
    description:
      'Hybrid pipeline on real Swiggy data — 148K restaurants, 1M+ menu items. XGBoost CTR model (ROC-AUC 0.69) on 18 engineered features with SHAP attribution. Full second-price auction engine with budget pacing deployed via FastAPI on Azure.',
    tech: ['Python', 'XGBoost', 'PySpark', 'FastAPI', 'Azure', 'SHAP', 'A/B Testing'],
    github: 'https://github.com/AyushPraharaj',
    demo: null,
    categoryColor: '#06b6d4',
    featured: false,
  },
  {
    id: 3,
    category: 'ML Research · Internship @ BARC',
    title: 'Bentonite Thermal Conductivity Prediction',
    description:
      'Benchmarked 6 ML models (LR, SVM, RF, Extra Trees, Gradient Boosting, ANN) for thermal conductivity prediction at BARC Mumbai. Gradient Boosting achieved R² 0.98, RMSE 0.06. Validated across 3 bentonite variants. Deployed via a Tkinter GUI for non-technical researchers.',
    tech: ['Python', 'scikit-learn', 'Gradient Boosting', 'EDA', 'Feature Engineering', 'Tkinter'],
    github: 'https://github.com/AyushPraharaj',
    demo: null,
    categoryColor: '#f59e0b',
    featured: false,
  },
  {
    id: 4,
    category: 'Data Analytics',
    title: 'Enterprise Project Risk & Delivery Dashboard',
    description:
      'Alteryx ETL workflows to clean, transform and integrate enterprise project datasets from disparate sources. Interactive Power BI dashboards tracking project risk, delivery complexity, team utilization and budget KPIs for stakeholder decision-making.',
    tech: ['Alteryx', 'Power BI', 'ETL', 'SQL', 'Data Visualization'],
    github: 'https://github.com/AyushPraharaj',
    demo: null,
    categoryColor: '#10b981',
    featured: false,
  },
];
