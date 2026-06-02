from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import fitz  # PyMuPDF
from google import genai
from pydantic import BaseModel
import os
import json
from dotenv import load_dotenv # <-- NEW IMPORT

# Load the environment variables from the .env file
load_dotenv() # <-- NEW COMMAND

app = FastAPI(title="AI Resume Analyzer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize the Gemini Client (now it will easily find GEMINI_API_KEY from the .env file)
try:
    client = genai.Client()
except Exception as e:
    print(f"Warning: Client initialization failed. Check your API key. Error: {e}")

@app.get("/")
async def health_check():
    return {"status": "Active", "message": "AI Analysis Engine is ready and secured with .env!"}

@app.post("/analyze")
async def analyze_resume(
    file: UploadFile = File(...), 
    target_job: str = Form(...)
):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")
    
    if not os.environ.get("GEMINI_API_KEY"):
        raise HTTPException(status_code=500, detail="Gemini API Key is not set in environment variables.")
        
    try:
        # 1. Parse PDF text
        pdf_bytes = await file.read()
        doc = fitz.open(stream=pdf_bytes, filetype="pdf")
        resume_text = "".join([page.get_text() for page in doc])
        doc.close()

        # 2. Construct the ultimate analytics and survival prompt
        system_prompt = (
            "You are an expert technical recruiter and elite interviewer. Analyze the provided resume text "
            "against the Target Job/Job Description. You must return your analysis strictly as a valid JSON object "
            "matching the requested structure exactly, with absolutely no markdown wrapping, no trailing text, and no code blocks."
        )

        analysis_instruction = f"""
        Resume Text:
        {resume_text}

        Target Job / Job Description:
        {target_job}

        Generate an analysis matching this exact JSON schema structure:
        {{
            "target_job": "Name of target job",
            "match_score": 75,
            "skills_analysis": {{
                "match_percentage": 70,
                "required_skills": ["skill1", "skill2"],
                "missing_skills": ["skill3", "skill4"]
            }},
            "project_strength_analysis": [
                {{
                    "project_name": "Project Alpha",
                    "interview_value": "High",
                    "interview_impact_percentage": 85,
                    "reason": "Why it has high impact for this specific job context"
                }}
            ],
            "resume_improvement_roadmap": [
                "Step 1: Specific skill/milestone to achieve",
                "Step 2: Next technical action item"
            ],
            "interview_strategy": {{
                "what_to_highlight": ["Specific project or asset to push"],
                "what_to_avoid": ["Underprepared or irrelevant details to steer clear of"],
                "expected_questions": ["Technical Question 1", "Technical Question 2"],
                "risk_areas": [
                    {{
                        "warning": "e.g., Resume lists TensorFlow but contains no TensorFlow projects.",
                        "possible_questions": ["What is TensorFlow?", "Why did you use it?"],
                        "confidence_level": "Low"
                    }}
                ]
            }},
            "analytics_section": {{
                "skill_readiness": {{
                    "Core Skill 1": 85,
                    "Core Skill 2": 70
                }},
                "interview_confidence": {{
                    "Technical Round": 70,
                    "Project Discussion": 80,
                    "HR Round": 90
                }},
                "resume_strength_breakdown": {{
                    "Skills": 75,
                    "Projects": 85,
                    "Experience": 30,
                    "Certifications": 40
                }}
            }}
        }}
        """

        # 3. Request structured analysis from Gemini 2.5 Flash
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=analysis_instruction,
            config={
                'system_instruction': system_prompt,
                'response_mime_type': 'application/json'
            }
        )

        # Parse output text to ensure it's clean JSON
        result_json = json.loads(response.text)
        return result_json

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI response failed to format into clean JSON.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)