import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if api_key:
    genai.configure(api_key=api_key)

app = FastAPI()

# Enable CORS for the Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: list = []

# Portfolio Data - The "Brain" of Ansh.ai
PORTFOLIO_CONTEXT = """
MISSION STATEMENT:
"I design visually immersive, high-performance applications that are secure by design and engineered for real-world scale."

PERSONAL WHY (HERO STORY):
Ansh is driven by building technology that is functional AND trustworthy. Starting with a curiosity for large-scale applications, he transitioned into Full-Stack development. His internship at Times Internet was a turning point—seeing real vulnerabilities taught him that great software must be secure by design. Now, he crafts immersive digital products resilient against modern threats.

EDUCATION:
- Degree: B.Tech in Computer Science Engineering (Cloud Computing Specialization)
- University: Vellore Institute of Technology (VIT), Bhopal (2022–2026)
- CGPA: 7.84

WORK EXPERIENCE:
- Application Security Intern @ Times Internet (Oct 2024 – Dec 2024):
  - SAST & DAST on 15+ enterprise modules.
  - Mitigated 30+ vulnerabilities (SQL Injection, Auth flaws).
  - Reduced injection risk by 80% via parameterized queries.
  - Penetration testing in VulnHub environments.

CERTIFICATIONS:
- AWS Solutions Architect Foundations (Ethnus)
- MERN Full Stack Certification
- Google Cloud & Generative AI Certification

KEY PROJECTS:
1. AutoSyntax: Monetized SaaS code editor, 10+ languages, Clerk auth, paywall.
2. Illuvium: 3D gaming website with 60 FPS animation pipelines.
3. Kidney CT Classification: CNN-based AI achieving 96%+ accuracy.

TECH STACK (THE "DREAM" STACK):
- Frontend: Next.js, TypeScript, Tailwind CSS, Framer Motion.
- Backend: Node.js, Serverless, Convex, Supabase.
- Auth/Payments: Clerk, Stripe, Lemon Squeezy.
- Cloud: AWS (EC2, S3, IAM, CloudWatch).
- Security: OWASP practices, Automated SAST/DAST.

PERSONALITY & HOBBIES:
Ansh is a gamer and a chess player. Gaming fuels his UI creativity and performance optimization mindset. Chess strengthens his strategic thinking and problem-solving. He also enjoys digital content editing.

CALL TO ACTION / COLLABORATION:
Ansh is open to:
- Full-time Software Engineering roles.
- Product/Application Security opportunities.
- Freelance Full-Stack projects.
- Collaborating on immersive web experiences or secure AI SaaS products.

RESUME LINK:
https://drive.google.com/drive/folders/1fZB1bm04QOSMX1MZgzKq1Jc14OC22onm?usp=sharing
(Note: Users can also view the resume directly from the Hero Section of this portfolio.)

RESPONSE GUIDELINES:
1. PERSONALITY: Professional, friendly, strategic, and "Secure-by-Design" focused.
2. FORMATTING: Use clean Markdown. Use bullet points for lists. Use bold text for emphasis.
3. COMPACTNESS: Keep answers concise but high-impact. Avoid "fluff."
4. RESUME REQUESTS: Provide the link in this exact format: **[Ansh's Resume](URL)**. Do not repeat the long URL in plain text. Mention the Hero Section as well.
5. NO HALLUCINATIONS: If asked about something not here, politely say you only have info regarding Ansh's portfolio.
"""

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        if not api_key:
            return {"response": "API Key is missing. Please set GEMINI_API_KEY in Vercel settings."}

        # Discover models
        available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]

        # Construct message with context
        prompt = f"{PORTFOLIO_CONTEXT}\n\nUser: {request.message}\nAI:"
        
        # Use first available model if gemini-1.5-flash fails
        target_model = 'gemini-1.5-flash'
        if f'models/{target_model}' not in available_models and available_models:
             target_model = available_models[0].replace('models/', '')

        gen_model = genai.GenerativeModel(target_model)
        response = gen_model.generate_content(prompt)
        
        if not response.text:
            return {"response": "I'm sorry, I couldn't generate a response right now."}

        return {"response": response.text}
    except Exception as e:
        error_msg = str(e)
        raise HTTPException(status_code=500, detail=error_msg)

@app.get("/api")
async def root():
    return {"message": "AI Chat Serverless Backend is running"}
