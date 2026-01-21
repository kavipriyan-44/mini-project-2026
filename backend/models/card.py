from pydantic import BaseModel, field_validator
from typing import Optional
import re


class CardInput(BaseModel):
    card_number: str
    
    @field_validator('card_number')
    @classmethod
    def validate_card_number(cls, v: str) -> str:
        # Remove spaces and dashes
        cleaned = re.sub(r'[\s-]', '', v)
        
        # Must be 16 digits
        if not re.match(r'^\d{16}$', cleaned):
            raise ValueError('Card number must be 16 digits')
        
        # Must start with 4 (Visa)
        if not cleaned.startswith('4'):
            raise ValueError('Only Visa cards (starting with 4) are accepted')
        
        return cleaned


class CardValidationResponse(BaseModel):
    valid: bool
    card_type: str
    last_four: str
    message: str


class CardInfo(BaseModel):
    card_type: str  # classic, gold, platinum, signature
    tier: str
    last_four: str
    issuer: str = "Visa"


# Test card mapping
TEST_CARDS = {
    "4000000000000000": {"card_type": "classic", "tier": "Standard", "name": "Visa Classic"},
    "4000000000001000": {"card_type": "gold", "tier": "Premium", "name": "Visa Gold"},
    "4000000000002000": {"card_type": "platinum", "tier": "Elite", "name": "Visa Platinum"},
    "4000000000003000": {"card_type": "signature", "tier": "Luxury", "name": "Visa Signature"},
}
