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
### 📤 1. Easy Resume Upload
![image](https://github.com/Vishvapriya-24/ai-resume-analyzer/blob/2677c960db344148c5804f5293d660cf4203b0a4/FrontPage.png)

### 🎯 2. Instant Match Score
![image](https://github.com/Vishvapriya-24/ai-resume-analyzer/blob/2677c960db344148c5804f5293d660cf4203b0a4/MatchScore.png)

### 📊 3. Deep Skill Analytics
![image](https://github.com/Vishvapriya-24/ai-resume-analyzer/blob/2677c960db344148c5804f5293d660cf4203b0a4/Analytics.png)

### 📄 4. Professional PDF Export
![image](https://github.com/Vishvapriya-24/ai-resume-analyzer/blob/2677c960db344148c5804f5293d660cf4203b0a4/Advice.png)

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
git clone https://github.com/Vishvapriya-24/ai-resume-analyzer.git
cd ai-resume-analyzer
```

---

### 2. Setup the Python Backend

The backend handles PDF processing and manages communications with the Gemini API.

#### Navigate into the backend directory

```bash
cd ai-backend
```

#### Create an isolated virtual environment

This helps prevent package conflicts.

```bash
python -m venv venv
```

#### Activate the virtual environment

**Windows (Command Prompt)**

```bash
venv\Scripts\activate.bat
```

**Windows (PowerShell)**

```powershell
venv\Scripts\activate.ps1
```

**Mac/Linux**

```bash
source venv/bin/activate
```

#### Install backend dependencies

```bash
pip install -r requirements.txt
```

#### Configure environment variables

Create a file named `.env` inside the `ai-backend` directory and add:

```env
GEMINI_API_KEY=your_actual_api_key_here
```

#### Start the backend server

```bash
uvicorn main:app --reload
```

The API will be available at:

```text
http://127.0.0.1:8000
```

---

### 3. Setup the React Frontend

The frontend provides the interactive user interface and dashboard.

#### Open a new terminal and navigate to the frontend folder

```bash
cd frontend
```

#### Install frontend dependencies

```bash
npm install
```

#### Start the development server

```bash
npm run dev
```

Open the local URL shown in the terminal (typically):

```text
http://localhost:5173
```

to access the application in your browser.

---
