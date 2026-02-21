import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
api_key = os.getenv("AIzaSyB5tZyKbtwtBx1AEh-MpAwt_uwqW_ySse4")
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

# Portfolio Data
PORTFOLIO_CONTEXT = """
You are an AI assistant for Ansh Tripathi's portfolio. 
Ansh is a dedicated developer focusing on build high-quality, modern web applications and AI-driven solutions.
His expertise includes: React, Next.js, TypeScript, Node.js, Express, NestJS, MongoDB, MySQL, Git, GitHub, Docker, Tailwind CSS, Sass, CSS.

Work Experience:
- Times Internet (Application Security Intern): Oct 2024 - Dec 2024.
  - Conducted SAST & DAST on 15+ enterprise modules using Checkmarx and Burp Suite.
  - Mitigated 30+ vulnerabilities (SQL Injection, auth flaws).
  - Secured Java (JDBC) codebases with parameterized queries, reducing injection risk by 80%.
  - Utilized Hawki for real-time API security analysis and OWASP Top 10 assessment.
  - Pen-testing expertise: Privilege escalation, Nmap, root access via CVEs.

Projects:
1. Auto Syntax - SAAS Code Editor: Full-stack SaaS online code editor with 10+ languages, dynamic theming, Clerk auth, and monetization via Lemon Squeezy. (Live: https://full-stack-saa-s-code-editor.vercel.app)
2. Illuvium - 3D Gaming Website: 60 FPS animations, React, Tailwind CSS, Spline/Sketchfab integration. (Live: https://3-d-gaming-website-eta.vercel.app)
3. Spicy Spoon - Restaurant Website: Responsive landing page with smooth animations and menu highlights. (Live: https://spicyspoon.vercel.app/#top)

Socials:
- GitHub: https://github.com/anshtripathi6969
- LinkedIn: https://www.linkedin.com/in/anshtripathi20/
- Instagram: https://www.instagram.com/anshtripathi8989/
- X/Twitter: https://x.com/AnshTri65204980

Respond helpfully to user questions about Ansh's work and experience based on this data. Be professional, friendly, and concise. 
If asked about something not in this context, politely say you only have information about Ansh's portfolio.
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
