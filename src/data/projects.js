export const projects = [
  {
    id: 1,
    category: 'NLP',
    title: 'Sentiment Analysis with BERT',
    description:
      'Fine-tuned a pre-trained BERT model on the IMDB dataset to classify movie reviews. Achieved 94.2% accuracy with HuggingFace Transformers and built a Gradio demo for inference.',
    tech: ['Python', 'PyTorch', 'HuggingFace', 'BERT', 'Gradio'],
    github: 'https://github.com/ayush',
    demo: null,
    categoryColor: '#6366f1',
  },
  {
    id: 2,
    category: 'Machine Learning',
    title: 'House Price Prediction',
    description:
      'End-to-end ML pipeline for predicting house prices using the Ames Housing dataset. Applied feature engineering, cross-validation, and XGBoost with Optuna hyperparameter tuning.',
    tech: ['Python', 'scikit-learn', 'XGBoost', 'pandas', 'Optuna'],
    github: 'https://github.com/ayush',
    demo: null,
    categoryColor: '#10b981',
  },
  {
    id: 3,
    category: 'Deep Learning',
    title: 'MNIST Digit Classifier',
    description:
      'Trained a CNN to classify handwritten digits with 99.2% test accuracy. Exported to TensorFlow.js — try the live interactive demo on this page!',
    tech: ['Python', 'TensorFlow', 'Keras', 'TF.js', 'CNN'],
    github: 'https://github.com/ayush',
    demo: '#demo',
    categoryColor: '#8b5cf6',
  },
];
