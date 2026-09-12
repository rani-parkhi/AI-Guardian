from typing import Dict


def generate_explanation(
    threat_result: Dict[str, object],
    pii_result: Dict[str, object],
    llm_result: Dict[str, object],
) -> Dict[str, object]:
    """Generate an explainable security assessment from analysis results."""

    threat_score = float(threat_result.get("threat_score", 0.0))
    pii_detected = bool(pii_result.get("pii_detected", False))
    pii_types = pii_result.get("pii_types", [])

    if threat_score >= 80:
        risk_level = "High"
    elif threat_score >= 50:
        risk_level = "Medium"
    else:
        risk_level = "Low"

    reasons = []

    if threat_score >= 50:
        reasons.append(
            f"Threat detection model reported a threat score of {threat_score:.2f}%."
        )

    if pii_detected:
        reasons.append(
            f"Potential PII detected: {', '.join(pii_types)}."
        )

    if not reasons:
        reasons.append("No significant security indicators were detected.")

    return {
        "risk_level": risk_level,
        "risk_score": round(threat_score, 2),
        "reasons": reasons,
        "explanation": " ".join(reasons),
        "llm_analysis_available": bool(llm_result.get("analysis")),
    }