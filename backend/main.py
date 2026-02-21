import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Configure Gemini
api_key = os.getenv("GEMINI_API_KEY")
if not api_key:
    raise ValueError("GEMINI_API_KEY not found in .env")

genai.configure(api_key=api_key)
# Explicitly use the full model name
model = genai.GenerativeModel('models/gemini-1.5-flash')

app = FastAPI()

# Enable CORS for the Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    history: list = []

# Portfolio Data (Simplified extraction from constants/index.js)
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

@app.post("/chat")
async def chat(request: ChatRequest):
    try:
        print(f"--- Chat Request ---")
        print(f"Message: {request.message}")
        
        # Discover models
        available_models = [m.name for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
        print(f"Available models: {available_models}")

        # Construct message with context
        prompt = f"{PORTFOLIO_CONTEXT}\n\nUser: {request.message}\nAI:"
        
        # Use first available model if gemini-1.5-flash fails
        target_model = 'gemini-1.5-flash'
        if f'models/{target_model}' not in available_models:
             # Fallback to first available if main target not found
             target_model = available_models[0].replace('models/', '')
             print(f"Fallback to model: {target_model}")

        gen_model = genai.GenerativeModel(target_model)
        response = gen_model.generate_content(prompt)
        
        if not response.text:
            return {"response": "I'm sorry, I couldn't generate a response right now."}

        return {"response": response.text}
    except Exception as e:
        print(f"FULL ERROR: {e}")
        error_msg = str(e)
        raise HTTPException(status_code=500, detail=error_msg)

@app.get("/")
async def root():
    return {"message": "AI Chat Backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
