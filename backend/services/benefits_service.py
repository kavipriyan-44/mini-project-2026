"""
Mock Benefits Service
Simulates Visa Digital Benefits Platform (VDBP) API responses
"""
from typing import List, Dict
from models.benefits import Benefit, BenefitCategory, BenefitsResponse


# Mock benefits data structured like Visa VDBP API
BENEFITS_DATABASE: Dict[str, List[Dict]] = {
    "classic": [
        {
            "id": "b001",
            "title": "Basic Purchase Protection",
            "description": "Coverage for eligible purchases against damage or theft for 90 days",
            "category": BenefitCategory.INSURANCE,
            "terms_and_conditions": "Coverage applies to items purchased entirely with your Visa Classic card. Maximum coverage of ₹50,000 per claim. Claims must be filed within 90 days of purchase. Excludes motorized vehicles, living things, and items over ₹2,00,000. Pre-existing damage not covered. Original receipt required.",
            "value": "Up to ₹50,000",
            "icon": "shield"
        },
        {
            "id": "b002",
            "title": "Zero Liability Protection",
            "description": "You won't be held responsible for unauthorized purchases",
            "category": BenefitCategory.INSURANCE,
            "terms_and_conditions": "Visa's Zero Liability Policy protects you from unauthorized use of your card. You must report any suspicious activity within 2 business days. Liability may apply if gross negligence is determined.",
            "value": "100% Protection",
            "icon": "lock"
        },
        {
            "id": "b003",
            "title": "Student Discount - Zomato",
            "description": "Get 15% off on all orders above ₹200",
            "category": BenefitCategory.DINING,
            "terms_and_conditions": "Valid for students with verified .edu email. Maximum discount ₹100 per order. Valid on orders above ₹200. Cannot be combined with other offers. Valid Monday to Thursday only.",
            "value": "15% Off",
            "merchant": "Zomato",
            "validity": "Valid till Mar 2026",
            "icon": "utensils"
        },
    ],
    "gold": [
        {
            "id": "b101",
            "title": "Airport Lounge Access",
            "description": "Complimentary access to airport lounges in India",
            "category": BenefitCategory.TRAVEL,
            "terms_and_conditions": "2 complimentary visits per quarter at domestic airports. Additional visits at ₹1500 per visit. Valid at participating lounges only. Must present physical card. Lounge access includes snacks, beverages, and WiFi. Maximum stay 3 hours per visit.",
            "value": "2 Visits/Quarter",
            "icon": "plane"
        },
        {
            "id": "b102",
            "title": "Extended Warranty",
            "description": "Extends manufacturer warranty by 1 year on eligible items",
            "category": BenefitCategory.INSURANCE,
            "terms_and_conditions": "Extends original manufacturer warranty by 1 additional year. Maximum benefit ₹1,00,000. Original warranty must be 5 years or less. Electronics, appliances, and furniture covered. Registration required within 30 days of purchase.",
            "value": "+1 Year",
            "icon": "clock"
        },
        {
            "id": "b103",
            "title": "Dining Privileges",
            "description": "Up to 20% off at partner restaurants",
            "category": BenefitCategory.DINING,
            "terms_and_conditions": "Discount valid at 1000+ partner restaurants. Maximum discount ₹1000 per transaction. Not valid on alcohol or tobacco. Cannot combine with other offers. Minimum bill ₹500 required.",
            "value": "Up to 20% Off",
            "icon": "utensils"
        },
        {
            "id": "b104",
            "title": "IIT Chennai Food Court Special",
            "description": "Exclusive 25% off at campus food outlets",
            "category": BenefitCategory.DINING,
            "terms_and_conditions": "Valid at IIT Madras campus food court and Gurunath Stores. Student ID verification required. Maximum discount ₹150 per transaction. Valid for lunch and dinner only.",
            "value": "25% Off",
            "merchant": "IIT Campus Outlets",
            "validity": "Academic Year 2025-26",
            "icon": "graduation-cap"
        },
        {
            "id": "b105",
            "title": "BookMyShow Cashback",
            "description": "₹100 cashback on movie tickets every month",
            "category": BenefitCategory.ENTERTAINMENT,
            "terms_and_conditions": "One cashback per calendar month. Minimum transaction ₹200. Cashback credited within 7 days. Valid on movie tickets only, not food or beverages.",
            "value": "₹100/Month",
            "merchant": "BookMyShow",
            "icon": "film"
        },
    ],
    "platinum": [
        {
            "id": "b201",
            "title": "International Lounge Access",
            "description": "Unlimited access to 1300+ airport lounges worldwide",
            "category": BenefitCategory.TRAVEL,
            "terms_and_conditions": "Unlimited access to Priority Pass lounges. One accompanying guest at 50% discount. Spa and dining credits at select lounges. Digital membership card available. Some premium lounges may have restrictions.",
            "value": "Unlimited Access",
            "icon": "globe"
        },
        {
            "id": "b202",
            "title": "Travel Insurance",
            "description": "Comprehensive travel insurance up to ₹1 Crore",
            "category": BenefitCategory.INSURANCE,
            "terms_and_conditions": "Coverage includes: Medical emergencies up to ₹50 lakhs, Trip cancellation up to ₹2 lakhs, Lost baggage up to ₹1 lakh, Flight delay compensation ₹5000 per 6 hours. Travel must be booked with card. Pre-existing conditions excluded.",
            "value": "Up to ₹1 Crore",
            "icon": "briefcase-medical"
        },
        {
            "id": "b203",
            "title": "Luxury Shopping Benefits",
            "description": "Exclusive access to VIP shopping events and early sales",
            "category": BenefitCategory.SHOPPING,
            "terms_and_conditions": "Priority access to brand sales 24 hours before public. Personal shopping assistance at partner stores. Complimentary gift wrapping. Valet parking at select malls.",
            "value": "VIP Access",
            "icon": "shopping-bag"
        },
        {
            "id": "b204",
            "title": "Concierge Services",
            "description": "24/7 personal concierge for travel and lifestyle needs",
            "category": BenefitCategory.LIFESTYLE,
            "terms_and_conditions": "Available 24/7 via phone or chat. Services include: Restaurant reservations, Event tickets, Travel bookings, Gift procurement. Response time within 2 hours. Service charges may apply for premium requests.",
            "value": "24/7 Support",
            "icon": "headset"
        },
        {
            "id": "b205",
            "title": "Academic Resource Access",
            "description": "Free access to online courses and research papers",
            "category": BenefitCategory.LIFESTYLE,
            "terms_and_conditions": "Complimentary Coursera Plus subscription for 6 months. Access to IEEE and ACM digital libraries. Valid for students with .edu email verification. Renewable annually.",
            "value": "₹15,000 Value",
            "merchant": "Coursera, IEEE, ACM",
            "validity": "6 Months",
            "icon": "book"
        },
        {
            "id": "b206",
            "title": "Flipkart SuperCoins Boost",
            "description": "Earn 3X SuperCoins on all purchases",
            "category": BenefitCategory.SHOPPING,
            "terms_and_conditions": "3X SuperCoins on Flipkart purchases. Maximum 500 bonus coins per month. Coins credited within 48 hours. Valid on prepaid orders only.",
            "value": "3X Coins",
            "merchant": "Flipkart",
            "icon": "coins"
        },
    ],
    "signature": [
        {
            "id": "b301",
            "title": "Premium Lounge Access + Guest",
            "description": "Unlimited access for you and one guest at premium lounges",
            "category": BenefitCategory.TRAVEL,
            "terms_and_conditions": "Unlimited access to all Priority Pass and Visa Airport Companion lounges. One complimentary guest per visit. Spa treatments at select locations. Meet & greet services available. Private terminal access at select airports.",
            "value": "Unlimited + Guest",
            "icon": "crown"
        },
        {
            "id": "b302",
            "title": "Comprehensive Insurance Suite",
            "description": "Complete protection including purchase, travel, and medical",
            "category": BenefitCategory.INSURANCE,
            "terms_and_conditions": "Purchase protection up to ₹5 lakhs per item. Travel insurance up to ₹2 Crore. Medical evacuation worldwide. Car rental insurance included. 24/7 emergency assistance. No deductibles on most claims.",
            "value": "₹2 Crore Coverage",
            "icon": "shield-check"
        },
        {
            "id": "b303",
            "title": "Luxury Cashback Program",
            "description": "5% unlimited cashback on all international transactions",
            "category": BenefitCategory.CASHBACK,
            "terms_and_conditions": "5% cashback on all foreign currency transactions. No cap on cashback amount. Forex markup waived. Cashback credited to statement monthly. Valid on all international merchant categories.",
            "value": "5% Unlimited",
            "icon": "percentage"
        },
        {
            "id": "b304",
            "title": "Elite Dining Collection",
            "description": "Complimentary dining at Michelin-starred restaurants",
            "category": BenefitCategory.DINING,
            "terms_and_conditions": "One complimentary meal per quarter at partner fine dining restaurants. Wine pairing included. Advance reservation required. Available at 50+ restaurants across India. Includes private dining room access.",
            "value": "1 Free Meal/Quarter",
            "icon": "star"
        },
        {
            "id": "b305",
            "title": "Research Grant Support",
            "description": "Exclusive funding opportunities for academic research",
            "category": BenefitCategory.LIFESTYLE,
            "terms_and_conditions": "Priority processing for Visa-sponsored research grants. Up to ₹5 lakh in research funding annually. Conference travel support up to ₹1 lakh. Mentorship from Visa technology leaders.",
            "value": "Up to ₹5 Lakh",
            "merchant": "Visa Research",
            "validity": "Annual",
            "icon": "flask"
        },
        {
            "id": "b306",
            "title": "Startup Accelerator Access",
            "description": "Fast-track entry to Visa's startup accelerator program",
            "category": BenefitCategory.LIFESTYLE,
            "terms_and_conditions": "Priority review for Visa Fintech accelerator. Access to Visa's API sandbox. Mentorship hours with industry experts. Networking events with venture partners.",
            "value": "Priority Access",
            "merchant": "Visa Accelerator",
            "icon": "rocket"
        },
    ],
}


def get_benefits_by_card_type(card_type: str) -> BenefitsResponse:
    """Retrieve benefits for a specific card type (simulates VDBP API)"""
    card_type = card_type.lower()
    
    if card_type not in BENEFITS_DATABASE:
        card_type = "classic"  # Default to classic
    
    benefits_data = BENEFITS_DATABASE[card_type]
    benefits = [Benefit(**b) for b in benefits_data]
    
    # Include benefits from lower tiers
    tier_order = ["classic", "gold", "platinum", "signature"]
    current_index = tier_order.index(card_type)
    
    for i in range(current_index):
        lower_tier = tier_order[i]
        for b in BENEFITS_DATABASE[lower_tier]:
            benefits.append(Benefit(**b))
    
    categories = list(set(b.category.value for b in benefits))
    
    return BenefitsResponse(
        card_type=card_type,
        total_benefits=len(benefits),
        benefits=benefits,
        categories=categories
    )


def get_all_categories() -> List[str]:
    """Get all available benefit categories"""
    return [c.value for c in BenefitCategory]
