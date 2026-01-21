import os
from dotenv import load_dotenv

load_dotenv()

# Server Configuration
HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", 8000))
DEBUG = os.getenv("DEBUG", "true").lower() == "true"

# CORS Origins
CORS_ORIGINS = [
    "http://localhost:5173",
    "http://localhost:3000",
    "http://127.0.0.1:5173",
]

# Ollama Configuration
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.2")

# Visa API Configuration (for future use)
VISA_API_BASE_URL = os.getenv("VISA_API_BASE_URL", "https://sandbox.api.visa.com")
VISA_API_USER_ID = os.getenv("VISA_API_USER_ID", "")
VISA_API_PASSWORD = os.getenv("VISA_API_PASSWORD", "")
