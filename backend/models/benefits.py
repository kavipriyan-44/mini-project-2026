from pydantic import BaseModel
from typing import List, Optional
from enum import Enum


class BenefitCategory(str, Enum):
    TRAVEL = "travel"
    DINING = "dining"
    SHOPPING = "shopping"
    ENTERTAINMENT = "entertainment"
    INSURANCE = "insurance"
    LIFESTYLE = "lifestyle"
    CASHBACK = "cashback"


class Benefit(BaseModel):
    id: str
    title: str
    description: str
    category: BenefitCategory
    terms_and_conditions: str
    value: Optional[str] = None  # e.g., "20% off", "₹5000 cashback"
    merchant: Optional[str] = None
    validity: Optional[str] = None
    icon: str = "gift"


class BenefitsResponse(BaseModel):
    card_type: str
    total_benefits: int
    benefits: List[Benefit]
    categories: List[str]


class MerchantOffer(BaseModel):
    id: str
    merchant_name: str
    offer_title: str
    discount: str
    description: str
    location: Optional[str] = None
    distance_km: Optional[float] = None
    valid_until: str
    terms: str
    category: BenefitCategory
    logo_url: Optional[str] = None


class OffersResponse(BaseModel):
    location: str
    total_offers: int
    offers: List[MerchantOffer]
