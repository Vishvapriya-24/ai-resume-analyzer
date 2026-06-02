import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import './App.css';

// Predefined list of jobs for the autocomplete dropdown
const PREDEFINED_JOBS = [
  "Java Full Stack Developer",
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Engineer",
  "Computer Vision Engineer",
  "Data Analyst",
  "DevOps Engineer"
];

// Custom SVG Circular Gauge Component (Made Larger)
const CircularGauge = ({ score }) => {
  const radius = 90; // Increased from 70 to make room for text
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  
  const getStatus = (s) => {
    if (s >= 80) return { text: 'EXCELLENT', color: '#4ade80' };
    if (s >= 60) return { text: 'GOOD', color: '#fbbf24' };
    return { text: 'NEEDS IMPROVEMENT', color: '#ef4444' };
  };
  const { text, color } = getStatus(score);

  return (
    <div className="circular-gauge-container">
      <svg width="220" height="220">
        <circle cx="110" cy="110" r={radius} stroke="#2a2a2a" strokeWidth="14" fill="none" />
        <circle
          cx="110"
          cy="110"
          r={radius}
          stroke={color}
          strokeWidth="14"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 110 110)"
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      <div className="gauge-content">
        <span className="gauge-score">{score}%</span>
        <span className="gauge-status" style={{ color }}>{text}</span>
      </div>
    </div>
  );
};

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleJobSelect = (job) => {
    setJobDescription(job);
    setShowDropdown(false);
  };

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      setError("Please provide both a resume PDF and a target job.");
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);
    setShowDetails(false);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('target_job', jobDescription);

    try {
      const response = await axios.post('http://127.0.0.1:8000/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResults(response.data);
    } catch (err) {
      setError("Failed to analyze resume. Check if your backend is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatBarData = (dataObj) => {
    if (!dataObj) return [];
    return Object.keys(dataObj).map(key => ({
      name: key,
      score: dataObj[key]
    }));
  };

  const handleExportPDF = () => window.print();

  // Filter jobs based on user input
  const filteredJobs = PREDEFINED_JOBS.filter(job => 
    job.toLowerCase().includes(jobDescription.toLowerCase())
  );

  return (
    <div className="app-container">
      <header className="no-print">
        <h1>AI Resume Analyzer</h1>
        <p className="subtitle">Upload your resume and get a targeted interview survival strategy.</p>
      </header>

      <main>
        <form onSubmit={handleAnalyze} className="upload-section no-print">
          <div className="input-group">
            <label>1. Upload Resume (PDF)</label>
            <input type="file" accept=".pdf" onChange={handleFileChange} className="file-input" />
          </div>
          
          <div className="input-group" ref={dropdownRef}>
            <label>2. Target Job Title</label>
            <div className="autocomplete-wrapper">
              <input 
                type="text" 
                placeholder="Start typing a job title (e.g., Data Scientist)..."
                value={jobDescription}
                onChange={(e) => {
                  setJobDescription(e.target.value);
                  setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                className="text-input"
              />
              {showDropdown && jobDescription && filteredJobs.length > 0 && (
                <ul className="autocomplete-dropdown">
                  {filteredJobs.map((job, index) => (
                    <li key={index} onClick={() => handleJobSelect(job)}>
                      {job}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <button type="submit" disabled={loading} className="analyze-btn">
            {loading ? <span className="spinner">⏳ Analyzing...</span> : 'Generate Interview Strategy'}
          </button>
        </form>

        {error && <div className="error-box no-print">{error}</div>}

        {results && (
          <div className="results-section">
            
            <div className="primary-score-card">
              <h3>Job Match Score</h3>
              <p className="target-job-label">Target: {results.target_job}</p>
              <CircularGauge score={results.match_score} />
              
              {!showDetails && (
                <button 
                  className="toggle-details-btn no-print" 
                  onClick={() => setShowDetails(true)}
                >
                  View Detailed Analytics ↓
                </button>
              )}
            </div>

            {showDetails && (
              <div className="detailed-analytics fade-in">
                
                <div className="charts-grid">
                  <div className="chart-container skill-bars-container">
                    <h3>Skill Readiness</h3>
                    <div className="skills-list">
                      {Object.entries(results.analytics_section?.skill_readiness || {}).map(([skill, score], i) => (
                        <div key={i} className="skill-row">
                          <div className="skill-label-group">
                            <span className="skill-name">{skill}</span>
                            <span className="skill-score-text">{score}%</span>
                          </div>
                          <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${score}%` }}></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="chart-container">
                    <h3>Interview Confidence</h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <BarChart data={formatBarData(results.analytics_section?.interview_confidence)} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                        <XAxis dataKey="name" tick={{ fill: '#a3a3a3', fontSize: 12 }} />
                        <YAxis domain={[0, 100]} tick={{ fill: '#a3a3a3' }} />
                        <Tooltip 
                          cursor={{fill: 'rgba(255,255,255,0.05)'}}
                          contentStyle={{ backgroundColor: '#1e1e1e', border: '1px solid #333', borderRadius: '8px', color: '#fff' }} 
                        />
                        <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="strategy-grid">
                  <div className="card highlight">
                    <h3>✅ What to Highlight</h3>
                    <ul>{results.interview_strategy.what_to_highlight.map((item, i) => <li key={i}>{item}</li>)}</ul>
                  </div>
                  <div className="card avoid">
                    <h3>⚠️ What to Avoid</h3>
                    <ul>{results.interview_strategy.what_to_avoid.map((item, i) => <li key={i}>{item}</li>)}</ul>
                  </div>
                </div>

                <div className="card questions">
                  <h3>Expected Interview Questions</h3>
                  <ol>{results.interview_strategy.expected_questions.map((q, i) => <li key={i}>{q}</li>)}</ol>
                </div>

                <div className="card warning">
                  <h3>🚨 Critical Risk Areas</h3>
                  {results.interview_strategy.risk_areas.map((risk, i) => (
                    <div key={i} className="risk-item">
                      <p><strong>Warning:</strong> {risk.warning}</p>
                      <span className={`confidence-badge ${risk.confidence_level.toLowerCase()}`}>
                        Confidence: {risk.confidence_level}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="footer-actions no-print">
                   <button className="export-btn" onClick={handleExportPDF}>
                     📄 Export Strategy as PDF
                   </button>
                </div>

              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;