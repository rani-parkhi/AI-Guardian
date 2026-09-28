from typing import Dict

from app.services.threat_detection_service import detect_threats
from app.services.pii_service import detect_pii, mask_pii
from app.services.llm_service import analyze_with_llm
from app.services.xai_service import generate_explanation


def analyze_prompt(prompt: str) -> Dict[str, object]:
    """Run the complete AI Guardian security analysis pipeline."""

    threat_result = detect_threats(prompt)
    pii_result = detect_pii(prompt)
    
    masked_prompt = mask_pii(prompt)
    
    llm_result = analyze_with_llm(masked_prompt)

    threat_result["privacy_risk"] = pii_result["pii_detected"]

    xai_result = generate_explanation(
        threat_result=threat_result,
        pii_result=pii_result,
        llm_result=llm_result,
    )

    return {
        "prompt": prompt,
        "masked_prompt": masked_prompt,
        "risk_score": xai_result["risk_score"],
        "risk_level": xai_result["risk_level"],
        "confidence": threat_result["confidence"],
        "threats": threat_result,
        "explanation": xai_result["explanation"],
        "recommendation": (
            "Sensitive information detected. Review or mask PII before processing."
            if pii_result["pii_detected"]
            else (
                "Prompt appears safe."
                if xai_result["risk_level"] == "Low"
                else "Review this prompt carefully before processing."
            )
            ),
    }