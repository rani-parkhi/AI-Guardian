from typing import Dict

import torch
from transformers import pipeline


MODEL_NAME = "protectai/deberta-v3-base-prompt-injection-v2"

_classifier = None


def _get_classifier():
    global _classifier

    if _classifier is None:
        _classifier = pipeline(
            "text-classification",
            model=MODEL_NAME,
            tokenizer=MODEL_NAME,
            device=0 if torch.cuda.is_available() else -1,
            truncation=True,
            max_length=512,
        )

    return _classifier


def detect_threats(prompt: str) -> Dict[str, object]:
    """
    Detect prompt-injection threats using a fine-tuned
    DeBERTa model.

    Returns the model prediction and confidence.
    """

    if not prompt or not prompt.strip():
        return {
            "prompt_injection": False,
            "jailbreak": False,
            "unsafe_request": False,
            "privacy_risk": False,
            "data_leakage": False,
            "threat_score": 0.0,
            "confidence": 0.0,
        }

    classifier = _get_classifier()
    result = classifier(prompt)[0]

    label = result["label"].upper()
    confidence = float(result["score"])

    is_injection = label == "INJECTION"

    return {
        "prompt_injection": is_injection,
        "jailbreak": False,
        "unsafe_request": False,
        "privacy_risk": False,
        "data_leakage": False,
        "threat_score": round(confidence * 100, 2)
        if is_injection
        else round((1 - confidence) * 100, 2),
        "confidence": round(confidence, 4),
        "model": MODEL_NAME,
    }