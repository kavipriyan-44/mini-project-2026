from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import cards, benefits, offers, ai
import config

app = FastAPI(
    title="Visa Benefits AI Agent",
    description="Proactive AI agent for Visa card benefits with GenAI-powered insights",
    version="1.0.0"
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(cards.router, prefix="/api/cards", tags=["Cards"])
app.include_router(benefits.router, prefix="/api/benefits", tags=["Benefits"])
app.include_router(offers.router, prefix="/api/offers", tags=["Offers"])
app.include_router(ai.router, prefix="/api/ai", tags=["AI"])


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": "Visa Benefits AI Agent"}


@app.get("/")
async def root():
    return {
        "message": "Welcome to Visa Benefits AI Agent API",
        "docs": "/docs",
        "health": "/api/health"
    }
