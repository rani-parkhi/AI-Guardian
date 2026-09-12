import os
from typing import Dict

from dotenv import load_dotenv
from google import genai


load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

MODEL_NAME = "gemini-3.6-flash"


def analyze_with_llm(prompt: str) -> Dict[str, object]:
    """Analyze a prompt using Gemini."""

    interaction = client.interactions.create(
        model=MODEL_NAME,
        input=prompt,
    )

    return {
        "analysis": interaction.output_text,
        "model": MODEL_NAME,
        "confidence": None,
    }