"""
Mock Merchant Offers Service
Simulates Visa Merchant Offers Resource Center (VMORC) API
"""
from typing import List, Optional
from models.benefits import MerchantOffer, BenefitCategory, OffersResponse


# Mock offers near IIT Chennai (IIT Madras)
OFFERS_DATABASE: List[dict] = [
    {
        "id": "o001",
        "merchant_name": "Saravana Bhavan",
        "offer_title": "Student Special Thali",
        "discount": "20% Off",
        "description": "Authentic South Indian vegetarian meals at discounted prices for students",
        "location": "Velachery, Chennai",
        "distance_km": 2.5,
        "valid_until": "2026-06-30",
        "terms": "Valid with student ID. Minimum order ₹150. Dine-in only. Not valid on weekends.",
        "category": BenefitCategory.DINING,
    },
    {
        "id": "o002",
        "merchant_name": "Decathlon",
        "offer_title": "Sports & Fitness Gear",
        "discount": "15% Off",
        "description": "All sports equipment and fitness accessories",
        "location": "OMR, Chennai",
        "distance_km": 5.0,
        "valid_until": "2026-03-31",
        "terms": "Valid on purchases above ₹2000. Excludes cycles and treadmills. One per customer per month.",
        "category": BenefitCategory.SHOPPING,
    },
    {
        "id": "o003",
        "merchant_name": "PVR Cinemas",
        "offer_title": "Weekday Movie Magic",
        "discount": "Buy 1 Get 1 Free",
        "description": "BOGO on movie tickets Monday to Thursday",
        "location": "VR Chennai Mall",
        "distance_km": 8.0,
        "valid_until": "2026-04-30",
        "terms": "Valid Mon-Thu only. Excludes premium formats and recliner seats. Max 2 free tickets per transaction.",
        "category": BenefitCategory.ENTERTAINMENT,
    },
    {
        "id": "o004",
        "merchant_name": "Crossword Bookstore",
        "offer_title": "Academic Books Discount",
        "discount": "25% Off",
        "description": "Textbooks, reference materials, and stationery",
        "location": "T. Nagar, Chennai",
        "distance_km": 6.0,
        "valid_until": "2026-05-31",
        "terms": "Valid on academic and reference books only. Student ID required. Cannot combine with other offers.",
        "category": BenefitCategory.SHOPPING,
    },
    {
        "id": "o005",
        "merchant_name": "Chai Point",
        "offer_title": "Student Fuel Package",
        "discount": "₹50 Off",
        "description": "Any chai + snack combo for late-night study sessions",
        "location": "IIT Madras Research Park",
        "distance_km": 0.5,
        "valid_until": "2026-12-31",
        "terms": "Valid after 8 PM. One per student per day. Show valid ID card.",
        "category": BenefitCategory.DINING,
    },
    {
        "id": "o006",
        "merchant_name": "Urban Company",
        "offer_title": "Room Cleaning Service",
        "discount": "30% Off",
        "description": "Deep cleaning service for hostel rooms and PG accommodations",
        "location": "Serves IIT Campus Area",
        "distance_km": 0.0,
        "valid_until": "2026-06-30",
        "terms": "First booking only. Minimum booking ₹500. Available 7 days a week.",
        "category": BenefitCategory.LIFESTYLE,
    },
    {
        "id": "o007",
        "merchant_name": "Ola",
        "offer_title": "Campus Commute Cashback",
        "discount": "₹30 Cashback",
        "description": "On rides starting or ending at IIT Madras",
        "location": "IIT Madras Campus",
        "distance_km": 0.0,
        "valid_until": "2026-07-31",
        "terms": "3 rides per week. Minimum fare ₹100. Cashback credited within 24 hours.",
        "category": BenefitCategory.TRAVEL,
    },
    {
        "id": "o008",
        "merchant_name": "Cult.fit",
        "offer_title": "Student Fitness Pass",
        "discount": "40% Off",
        "description": "Monthly gym and fitness class membership",
        "location": "Adyar, Chennai",
        "distance_km": 3.0,
        "valid_until": "2026-08-31",
        "terms": "Valid for students aged 18-25. ID verification required. 3-month minimum commitment.",
        "category": BenefitCategory.LIFESTYLE,
    },
    {
        "id": "o009",
        "merchant_name": "Amazon",
        "offer_title": "Prime Student",
        "discount": "50% Off",
        "description": "Amazon Prime annual membership at student rates",
        "location": "Online",
        "distance_km": None,
        "valid_until": "2026-12-31",
        "terms": "Valid .edu email required. 6-month free trial, then ₹499/year. Includes Prime Video and Music.",
        "category": BenefitCategory.SHOPPING,
    },
    {
        "id": "o010",
        "merchant_name": "Lenskart",
        "offer_title": "Vision Care Package",
        "discount": "₹500 Off",
        "description": "Prescription glasses and contact lenses",
        "location": "Phoenix Mall, Chennai",
        "distance_km": 7.0,
        "valid_until": "2026-05-31",
        "terms": "Valid on purchases above ₹1500. Free eye checkup included. One per customer.",
        "category": BenefitCategory.LIFESTYLE,
    },
]


def get_offers_by_location(
    location: str = "IIT Chennai", 
    category: Optional[str] = None,
    max_distance: Optional[float] = None
) -> OffersResponse:
    """Get merchant offers near a location (simulates VMORC API)"""
    offers = []
    
    for o in OFFERS_DATABASE:
        # Filter by category if specified
        if category and o["category"].value != category:
            continue
        
        # Filter by distance if specified
        if max_distance and o.get("distance_km") is not None:
            if o["distance_km"] > max_distance:
                continue
        
        offers.append(MerchantOffer(**o))
    
    # Sort by distance (closest first, online last)
    offers.sort(key=lambda x: x.distance_km if x.distance_km is not None else 999)
    
    return OffersResponse(
        location=location,
        total_offers=len(offers),
        offers=offers
    )


def get_offers_by_category(category: str) -> List[MerchantOffer]:
    """Get offers filtered by category"""
    return [
        MerchantOffer(**o) 
        for o in OFFERS_DATABASE 
        if o["category"].value == category
    ]
