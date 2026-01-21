# Visa Benefits AI Agent

A proactive AI agent that delivers real-time Visa card benefit insights with GenAI-powered summaries and personalized recommendations.

## 🚀 One-Click Start with Docker

### Prerequisites
- Docker Desktop installed and running

### Quick Start
```bash
# Start all services (frontend, backend, ollama)
docker-compose up -d

# Pull the Llama model (first time only, takes a few minutes)
docker exec -it visa-ollama ollama pull llama3.2
```

Then open **http://localhost** in your browser!

### Services
| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost | React app with Visa benefits UI |
| Backend API | http://localhost:8000 | FastAPI with benefits/offers/AI endpoints |
| API Docs | http://localhost:8000/docs | Swagger API documentation |
| Ollama | http://localhost:11434 | Local LLM for AI features |

### Stop All Services
```bash
docker-compose down
```

---

## 💻 Development Setup (Without Docker)

### Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Then open **http://localhost:5173**

---

## 🃏 Test Cards

| Card Number | Type | Tier |
|-------------|------|------|
| `4000 0000 0000 0000` | Classic | Standard |
| `4000 0000 0000 1000` | Gold | Premium |
| `4000 0000 0000 2000` | Platinum | Elite |
| `4000 0000 0000 3000` | Signature | Luxury |

---

## ✨ Features

- **Card Validation**: Secure test card input with visual preview
- **Benefits Dashboard**: Categorized benefits (Travel, Dining, Shopping, etc.)
- **User Context**: Personalization based on lifestyle, location, and interests
- **AI Summarization**: Llama-powered T&C summarization
- **Multi-language**: English/Tamil support
- **Nearby Offers**: Location-based merchant offers
