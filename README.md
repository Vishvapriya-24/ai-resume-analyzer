<h1 align="center">🚀 AI Resume Analyzer & Interview Strategist</h1>

<p align="center">
  <strong>An intelligent, full-stack web application that uses Generative AI to analyze resumes, calculate job match scores, and generate highly targeted interview survival strategies.</strong>
</p>

<p align="center">
  <a href="https://ai-resume-analyzer-sandy-sigma.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/View_Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
  <img src="https://img.shields.io/badge/Gemini_AI-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini AI" />
</p>

---

## 📸 Dashboard Preview
> **Note:** *Insert a screenshot of your running app here by dragging and dropping the image directly into this editor.*

---

## ✨ Key Features

* 🎯 **Smart Match Scoring:** Calculates a deterministic ATS-style match percentage between a resume and a target job description using Semantic AI.
* 📊 **Interactive Analytics:** Visualizes skill readiness via dynamic horizontal progress bars and interview confidence metrics using `Recharts`.
* 💡 **Targeted Strategy Engine:** Generates specific "What to Highlight" and "What to Avoid" action items tailored to precise experience gaps.
* 🚨 **Risk Flagging:** Identifies critical weaknesses in the profile and assigns confidence threat levels.
* 📄 **Clean PDF Export:** Features a print-optimized CSS layout for instantly exporting the interview survival guide to a clean PDF.
* 🔒 **Progressive Disclosure UI:** Maintains a clutter-free, expert-level interface by hiding deep analytics until requested by the user.

---

## 🛠️ Tech Stack & Architecture

This project utilizes a decoupled microservices architecture:

### Frontend (Client-Side)
* **Framework:** React.js (Vite)
* **Styling:** Custom Vanilla CSS (Dark Theme, Print Media Queries)
* **Data Visualization:** Recharts, Custom SVG Gauges
* **Hosting:** Vercel

### Backend (Server-Side)
* **Framework:** Python / FastAPI
* **AI Engine:** Google Gemini 2.5 Flash (via `google-genai`)
* **Document Processing:** PyMuPDF (`fitz`) for complex PDF text extraction
* **Hosting:** Render

---

## 🚀 Run It Locally

Want to run this project on your own machine? Follow these detailed configuration steps:

### 1. Clone the Repository
Open your terminal and run:
```bash
git clone [https://github.com/Vishvapriya-24/ai-resume-analyzer.git](https://github.com/Vishvapriya-24/ai-resume-analyzer.git)
cd ai-resume-analyzer
