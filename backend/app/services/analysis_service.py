import re


def contains_any(text: str, keywords: list[str]) -> bool:
    return any(keyword in text for keyword in keywords)


def analyze_prompt(prompt: str):
    text = prompt.lower().strip()

    threats = {
        "prompt_injection": False,
        "jailbreak": False,
        "unsafe_request": False,
        "privacy_risk": False,
        "data_leakage": False,
    }

    injection_keywords = [
        "ignore previous instructions",
        "ignore all instructions",
        "ignore your instructions",
        "system prompt",
        "reveal your instructions",
        "override instructions",
        "forget your rules",
        "disregard the rules",
    ]

    jailbreak_keywords = [
        "jailbreak",
        "bypass restrictions",
        "bypass safety",
        "without restrictions",
        "disable safety",
        "act as an unrestricted ai",
        "do anything now",
        "developer mode",
    ]

    unsafe_keywords = [
        "make a bomb",
        "build a bomb",
        "create malware",
        "write ransomware",
        "hack someone's account",
        "steal password",
        "phishing attack",
        "create a weapon",
        "harm someone",
    ]

    privacy_keywords = [
        "aadhaar",
        "pan card",
        "password",
        "phone number",
        "email address",
        "personal information",
        "home address",
        "credit card number",
        "bank account",
    ]

    leakage_keywords = [
        "reveal confidential data",
        "show secret information",
        "database credentials",
        "api key",
        "private data",
        "secret key",
        "access token",
        "internal documents",
        "confidential information",
    ]

    if contains_any(text, injection_keywords):
        threats["prompt_injection"] = True

    if contains_any(text, jailbreak_keywords):
        threats["jailbreak"] = True

    if contains_any(text, unsafe_keywords):
        threats["unsafe_request"] = True

    if contains_any(text, privacy_keywords):
        threats["privacy_risk"] = True

    if contains_any(text, leakage_keywords):
        threats["data_leakage"] = True

    # Detect common sensitive-information patterns
    if re.search(r"\b\d{12}\b", text):
        threats["privacy_risk"] = True

    if re.search(r"\b[\w.-]+@[\w.-]+\.\w+\b", text):
        threats["privacy_risk"] = True

    weights = {
        "prompt_injection": 25,
        "jailbreak": 25,
        "unsafe_request": 30,
        "privacy_risk": 10,
        "data_leakage": 10,
    }

    risk_score = min(
        100,
        sum(
            weights[threat]
            for threat, detected in threats.items()
            if detected
        ),
    )

    if risk_score >= 70:
        risk_level = "HIGH"
    elif risk_score >= 40:
        risk_level = "MEDIUM"
    else:
        risk_level = "LOW"

    detected_count = sum(threats.values())
    confidence = round(min(0.99, 0.60 + detected_count * 0.08), 2)

    detected_threats = [
        threat.replace("_", " ")
        for threat, detected in threats.items()
        if detected
    ]

    if not detected_threats:
        explanation = "No known security threats were detected in the prompt."
        recommendation = "The prompt appears safe to use."
    else:
        explanation = (
            "Potential threats detected: "
            + ", ".join(detected_threats)
            + "."
        )

        recommendation = (
            "Review the prompt carefully and avoid sharing sensitive "
            "information or following unsafe instructions."
        )

    return {
        "prompt": prompt,
        "risk_score": risk_score,
        "risk_level": risk_level,
        "confidence": confidence,
        "threats": threats,
        "explanation": explanation,
        "recommendation": recommendation,
    }