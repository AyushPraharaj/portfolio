# Ayush Praharaj — AI/ML Portfolio

Personal portfolio site for a Data Analyst & ML Practitioner. Built with React + Vite, animated with Framer Motion, featuring a **live in-browser MNIST digit recognizer** powered by TensorFlow.js.

**Live:** _(add your Vercel/Netlify URL here)_

---

## Highlights

- **Dark glassmorphism design** — animated gradient orbs, grid overlay, gradient text
- **Interactive ML demo** — draw any digit (0–9); CNN predicts it live in-browser via TF.js
- **Real projects** — PD-DSS (AUC 0.809), Food Recommendation (XGBoost, PySpark), BARC ML (R² 0.98)
- **Experience timeline** — BARC Mumbai internship with certificate
- **Fully responsive** — mobile-first, Framer Motion scroll animations

---

## Tech Stack

| Layer      | Tool                              |
|------------|-----------------------------------|
| Framework  | React 18 + Vite                   |
| Styling    | Tailwind CSS v4                   |
| Animations | Framer Motion                     |
| ML         | TensorFlow.js                     |
| Icons      | Lucide React                      |
| Deploy     | Vercel / Netlify                  |

---

## Getting Started

```bash
npm install
npm run dev          # → http://localhost:5173
```

### Generate the MNIST model (one-time)

```bash
pip install tensorflow-cpu tensorflowjs
python scripts/generate_model.py
```

Then restart `npm run dev`. The Live Demo section shows a "Model Not Found" message until this is run.

---

## Customizing

| File | What to edit |
|------|-------------|
| `src/data/projects.js` | Project cards, titles, links |
| `src/data/skills.js` | Skill categories and chips |
| `src/data/experience.js` | Internship & education |
| `src/components/Hero.jsx` | Name, tagline, subtitle |
| `src/components/Contact.jsx` | Social links & email |

---

## Deploy

```bash
npm run build    # outputs to dist/
```

Push to GitHub → connect **Vercel** (auto-detects Vite) → deploys on every push.

> Commit `public/model/` after running `generate_model.py` so the live demo works in production.

---

Built with React + Vite + TensorFlow.js · Ayush Praharaj
