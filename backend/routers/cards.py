from fastapi import APIRouter, HTTPException
from pydantic import ValidationError
from models.card import CardInput, CardValidationResponse, TEST_CARDS

router = APIRouter()


@router.post("/validate", response_model=CardValidationResponse)
async def validate_card(card_input: CardInput):
    """Validate a Visa card number and return card type"""
    
    card_number = card_input.card_number
    
    # Check if it's a known test card
    if card_number in TEST_CARDS:
        card_info = TEST_CARDS[card_number]
        return CardValidationResponse(
            valid=True,
            card_type=card_info["card_type"],
            last_four=card_number[-4:],
            message=f"Valid {card_info['name']} detected"
        )
    
    # For other valid-format cards, default to classic
    if card_number.startswith("4"):
        return CardValidationResponse(
            valid=True,
            card_type="classic",
            last_four=card_number[-4:],
            message="Valid Visa card detected (defaulting to Classic tier for demo)"
        )
    
    raise HTTPException(
        status_code=400,
        detail="Invalid card number. Only Visa cards (starting with 4) are accepted."
    )


@router.get("/test-cards")
async def get_test_cards():
    """Get list of available test card numbers for demo"""
    return {
        "test_cards": [
            {"number": "4000 0000 0000 0000", "type": "Visa Classic", "tier": "Standard"},
            {"number": "4000 0000 0000 1000", "type": "Visa Gold", "tier": "Premium"},
            {"number": "4000 0000 0000 2000", "type": "Visa Platinum", "tier": "Elite"},
            {"number": "4000 0000 0000 3000", "type": "Visa Signature", "tier": "Luxury"},
        ],
        "note": "Use these test card numbers to explore different benefit tiers"
    }
