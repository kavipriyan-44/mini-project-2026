"""
LLM Service for GenAI features
Uses Ollama to run Llama 3.2 locally
"""
import httpx
from typing import Optional
import config


async def generate_completion(prompt: str, system_prompt: Optional[str] = None) -> str:
    """Generate completion using Ollama Llama model"""
    
    messages = []
    if system_prompt:
        messages.append({"role": "system", "content": system_prompt})
    messages.append({"role": "user", "content": prompt})
    
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{config.OLLAMA_BASE_URL}/api/chat",
                json={
                    "model": config.OLLAMA_MODEL,
                    "messages": messages,
                    "stream": False,
                    "options": {
                        "temperature": 0.7,
                        "top_p": 0.9,
                    }
                }
            )
            
            if response.status_code == 200:
                data = response.json()
                return data.get("message", {}).get("content", "")
            else:
                # Fallback for any non-200 response (404, 500, etc.)
                return await fallback_summarize(prompt)
                
    except httpx.TimeoutException:
        return await fallback_summarize(prompt)
    except httpx.ConnectError:
        # Fallback when Ollama is not running
        return await fallback_summarize(prompt)
    except Exception as e:
        return await fallback_summarize(prompt)


async def summarize_terms(terms_and_conditions: str, language: str = "en") -> str:
    """Summarize complex T&C in plain language"""
    
    lang_instruction = "in simple English" if language == "en" else "in simple Tamil (தமிழ்)"
    
    system_prompt = f"""You are a helpful assistant that summarizes complex legal terms and conditions 
into simple, easy-to-understand language {lang_instruction}. 
Focus on: what the user gets, key limitations, and important deadlines.
Keep it brief - max 3-4 bullet points."""

    prompt = f"""Please summarize these terms and conditions {lang_instruction}:

{terms_and_conditions}

Provide a brief, friendly summary that highlights:
- Main benefit
- Key conditions
- Important limitations"""

    result = await generate_completion(prompt, system_prompt)
    return result


async def translate_to_tamil(text: str) -> str:
    """Translate English text to Tamil"""
    
    system_prompt = """You are a professional translator specializing in English to Tamil translation.
Translate naturally, maintaining the original meaning while making it sound natural in Tamil.
Use Tamil script (தமிழ்) for the output."""

    prompt = f"Translate this to Tamil:\n\n{text}"
    
    result = await generate_completion(prompt, system_prompt)
    return result


async def generate_recommendations(
    card_type: str,
    user_context: dict
) -> str:
    """Generate personalized recommendations based on user context"""
    
    location = user_context.get("location", "IIT Chennai")
    lifestyle = user_context.get("lifestyle", "student")
    interests = user_context.get("interests", ["technology", "food", "entertainment"])
    
    system_prompt = """You are a helpful Visa card benefits advisor. 
Provide personalized recommendations based on the user's card type and context.
Be specific, actionable, and highlight the value proposition.
Format as 3-4 short recommendations with emojis."""

    prompt = f"""Based on this user profile, recommend the best card benefits to use:

Card Type: Visa {card_type.title()}
Location: {location}
Lifestyle: {lifestyle}
Interests: {', '.join(interests)}

Provide personalized recommendations for how they can maximize their card benefits."""

    result = await generate_completion(prompt, system_prompt)
    return result


async def fallback_summarize(original_text: str) -> str:
    """Fallback summarization/recommendations when LLM is unavailable"""
    lower_text = original_text.lower()
    
    # Check if this is a recommendation request
    if "card type:" in lower_text and "lifestyle:" in lower_text:
        return await fallback_recommendations(original_text)
    
    # T&C Summarization fallback
    key_points = []
    
    if "maximum" in lower_text or "up to" in lower_text:
        key_points.append("💰 Check maximum coverage limits")
    if "valid" in lower_text or "expires" in lower_text:
        key_points.append("📅 Time-limited offer - check validity")
    if "exclud" in lower_text or "not valid" in lower_text:
        key_points.append("⚠️ Some exclusions apply")
    if "student" in lower_text or "id" in lower_text:
        key_points.append("🎓 ID verification may be required")
    if "cashback" in lower_text or "credit" in lower_text:
        key_points.append("💳 Cashback credited to your statement")
    if "lounge" in lower_text:
        key_points.append("✈️ Airport lounge access included")
    
    if not key_points:
        key_points = ["📋 Standard terms apply - see full details"]
    
    return "**Quick Summary:**\n" + "\n".join(key_points)


async def fallback_recommendations(prompt: str) -> str:
    """Generate smart fallback recommendations based on user context"""
    lower_text = prompt.lower()
    recommendations = []
    
    # Parse lifestyle
    lifestyle = "professional"
    if "student" in lower_text:
        lifestyle = "student"
    elif "business" in lower_text:
        lifestyle = "business"
    elif "freelancer" in lower_text:
        lifestyle = "freelancer"
    elif "retired" in lower_text:
        lifestyle = "retired"
    elif "professional" in lower_text:
        lifestyle = "professional"
    
    # Parse card type
    card_tier = "classic"
    if "signature" in lower_text:
        card_tier = "signature"
    elif "platinum" in lower_text:
        card_tier = "platinum"
    elif "gold" in lower_text:
        card_tier = "gold"
    
    # Generate lifestyle-specific recommendations
    if lifestyle == "student":
        recommendations.append("🎓 Use your student dining discounts at campus food outlets")
        recommendations.append("📚 Access complimentary academic resources and courses")
        recommendations.append("🎬 Get BOGO movie tickets on weekdays with BookMyShow")
    elif lifestyle == "professional":
        recommendations.append("💼 Maximize airport lounge access during business travel")
        recommendations.append("🍽️ Enjoy 20% off at 1000+ partner restaurants")
        recommendations.append("🛡️ Use extended warranty on electronics purchases")
    elif lifestyle == "business":
        recommendations.append("✈️ Leverage priority lounge access for client meetings")
        recommendations.append("💰 Get 5% cashback on international transactions")
        recommendations.append("🏢 Use concierge services for event planning")
    elif lifestyle == "freelancer":
        recommendations.append("💻 Save on coworking space memberships")
        recommendations.append("☕ Use dining discounts for client meetings")
        recommendations.append("🛡️ Benefit from purchase protection on equipment")
    elif lifestyle == "retired":
        recommendations.append("✈️ Enjoy complimentary airport lounge access")
        recommendations.append("🏥 Use travel insurance for peace of mind")
        recommendations.append("🍽️ Get dining discounts at premium restaurants")
    
    # Add card-tier specific bonus
    if card_tier == "signature":
        recommendations.append("⭐ As a Signature cardholder, you have access to exclusive Michelin-star dining!")
    elif card_tier == "platinum":
        recommendations.append("⭐ Your Platinum card includes unlimited international lounge access!")
    elif card_tier == "gold":
        recommendations.append("⭐ Don't forget your 2 complimentary lounge visits per quarter!")
    
    return "\n".join(recommendations)


async def check_ollama_status() -> dict:
    """Check if Ollama server is running and model is available"""
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            response = await client.get(f"{config.OLLAMA_BASE_URL}/api/tags")
            if response.status_code == 200:
                models = response.json().get("models", [])
                model_names = [m.get("name", "") for m in models]
                has_llama = any(config.OLLAMA_MODEL in name for name in model_names)
                return {
                    "ollama_running": True,
                    "model_available": has_llama,
                    "available_models": model_names
                }
    except:
        pass
    
    return {
        "ollama_running": False,
        "model_available": False,
        "available_models": []
    }
