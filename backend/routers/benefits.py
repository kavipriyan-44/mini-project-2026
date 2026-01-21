from fastapi import APIRouter, Query
from services.benefits_service import get_benefits_by_card_type, get_all_categories
from models.benefits import BenefitsResponse

router = APIRouter()


@router.get("/{card_type}", response_model=BenefitsResponse)
async def get_benefits(
    card_type: str,
    category: str = Query(None, description="Filter by benefit category")
):
    """Get all benefits for a specific card type"""
    
    response = get_benefits_by_card_type(card_type)
    
    # Filter by category if specified
    if category:
        response.benefits = [b for b in response.benefits if b.category.value == category]
        response.total_benefits = len(response.benefits)
    
    return response


@router.get("/")
async def list_categories():
    """List all available benefit categories"""
    return {
        "categories": get_all_categories(),
        "description": "Use these categories to filter benefits"
    }
