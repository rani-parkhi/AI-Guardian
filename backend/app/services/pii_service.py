import re
from typing import Dict, List


PII_PATTERNS = {
    "email": r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b",
    "phone": r"\b(?:\+91[-\s]?)?[6-9]\d{9}\b",
    "aadhaar": r"\b\d{4}[-\s]\d{4}[-\s]\d{4}\b",
    "credit_card": r"\b(?:\d[ -]*?){13,19}\b",
}


def detect_pii(text: str) -> Dict[str, object]:
    detected: List[str] = []

    for pii_type, pattern in PII_PATTERNS.items():
        if re.search(pattern, text):
            detected.append(pii_type)

    return {
        "pii_detected": bool(detected),
        "pii_types": detected,
        "pii_count": len(detected),
    }