from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, List
from services.llm_service import (
    summarize_terms, 
    translate_to_tamil, 
    generate_recommendations,
    check_ollama_status
)

router = APIRouter()


class SummarizeRequest(BaseModel):
    text: str
    language: str = "en"  # "en" or "ta" for Tamil


class TranslateRequest(BaseModel):
    text: str


class RecommendRequest(BaseModel):
    card_type: str
    location: str = "IIT Chennai"
    lifestyle: str = "student"
    interests: List[str] = ["technology", "food", "entertainment"]


class AIResponse(BaseModel):
    result: str
    source: str  # "llm" or "fallback"


@router.post("/summarize", response_model=AIResponse)
async def summarize_tc(request: SummarizeRequest):
    """Summarize terms and conditions in plain language"""
    
    result = await summarize_terms(request.text, request.language)
    source = "fallback" if result.startswith("**Quick Summary:**") else "llm"
    
    return AIResponse(result=result, source=source)


@router.post("/translate")
async def translate(request: TranslateRequest):
    """Translate English text to Tamil"""
    
    result = await translate_to_tamil(request.text)
    
    return {
        "original": request.text,
        "translated": result,
        "target_language": "Tamil"
    }


@router.post("/recommend", response_model=AIResponse)
async def get_recommendations(request: RecommendRequest):
    """Generate personalized benefit recommendations"""
    
    user_context = {
        "location": request.location,
        "lifestyle": request.lifestyle,
        "interests": request.interests
    }
    
    result = await generate_recommendations(request.card_type, user_context)
    source = "fallback" if "Error" in result else "llm"
    
    return AIResponse(result=result, source=source)


@router.get("/status")
async def get_ai_status():
    """Check AI/LLM service status"""
    
    status = await check_ollama_status()
    
    return {
        "ai_enabled": status["ollama_running"] and status["model_available"],
        "ollama_status": status,
        "message": "AI features fully available" if status["model_available"] 
                   else "Using fallback mode (Ollama not running)"
    }
