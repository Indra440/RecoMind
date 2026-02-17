import hmac
import hashlib
from fastapi import Header, HTTPException, status
from app.core.config import settings


# ============================
# API KEY VALIDATION (Store Level)
# ============================

async def verify_api_key(x_api_key: str = Header(...)):
    """
    Validates API key sent from store widget.
    """
    if x_api_key != settings.API_SECRET_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API Key"
        )
    return True


# ============================
# SHOPIFY WEBHOOK VALIDATION
# ============================

def verify_shopify_webhook(body: bytes, hmac_header: str):
    """
    Validates Shopify webhook authenticity using HMAC SHA256.
    """
    digest = hmac.new(
        settings.SHOPIFY_WEBHOOK_SECRET.encode("utf-8"),
        body,
        hashlib.sha256
    ).digest()

    calculated_hmac = digest.hex()

    if not hmac.compare_digest(calculated_hmac, hmac_header):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid Webhook Signature"
        )

    return True


# ============================
# FUTURE JWT SUPPORT (Optional)
# ============================

from jose import jwt
from datetime import datetime, timedelta

ALGORITHM = "HS256"

def create_access_token(data: dict, expires_delta: int = 60):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=expires_delta)
    to_encode.update({"exp": expire})

    encoded_jwt = jwt.encode(
        to_encode,
        settings.JWT_SECRET_KEY,
        algorithm=ALGORITHM
    )
    return encoded_jwt
