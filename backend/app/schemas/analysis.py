from pydantic import BaseModel


class AnalyzeRequest(BaseModel):
    prompt: str


class AnalyzeResponse(BaseModel):
    prompt: str
    risk_score: float
    risk_level: str
    confidence: float
    threats: dict
    explanation: str
    recommendation: str