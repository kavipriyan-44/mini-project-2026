from fastapi import APIRouter, Query
from typing import Optional
from services.offers_service import get_offers_by_location, get_offers_by_category
from models.benefits import OffersResponse

router = APIRouter()


@router.get("/", response_model=OffersResponse)
async def get_offers(
    location: str = Query("IIT Chennai", description="User location"),
    category: Optional[str] = Query(None, description="Filter by category"),
    max_distance: Optional[float] = Query(None, description="Maximum distance in km")
):
    """Get merchant offers near a location (simulates VMORC API)"""
    
    return get_offers_by_location(
        location=location,
        category=category,
        max_distance=max_distance
    )


@router.get("/nearby")
async def get_nearby_offers(
    max_distance: float = Query(5.0, description="Maximum distance in km")
):
    """Get offers within walking/short commute distance"""
    
    response = get_offers_by_location(max_distance=max_distance)
    return {
        "location": "IIT Chennai Campus",
        "radius_km": max_distance,
        "offers": response.offers
    }
