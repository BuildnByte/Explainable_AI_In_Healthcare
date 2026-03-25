from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
import uvicorn
import json

from ml_logic import get_explanation, FEATURES
from ollama_client import generate_clinical_summary

app = FastAPI(title="Explainable AI in Healthcare - Backend")

# Enable CORS for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, restrict this
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PatientData(BaseModel):
    HTT_CAG_Repeat_Length: float
    Motor_Symptoms: float
    Cognitive_Decline: float
    Chorea_Score: float
    Brain_Volume_Loss: float
    Functional_Capacity: float
    HTT_Gene_Expression_Level: float
    Protein_Aggregation_Level: float

@app.get("/")
def read_root():
    return {"message": "XAI Healthcare API is running"}

@app.post("/diagnose")
async def diagnose(data: PatientData):
    try:
        explanation = get_explanation(data.model_dump())
        return explanation
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/summarize")
async def summarize(explanation: dict):
    # This endpoint streams the LLM-generated summary
    # Expects the JSON structure returned by /diagnose
    try:
        return StreamingResponse(
            generate_clinical_summary(
                explanation["shap"], 
                explanation["lime"], 
                {
                    "prediction": explanation["prediction"],
                    "confidence": explanation["confidence"],
                    "raw_features": explanation["raw_features"]
                }
            ),
            media_type="text/plain"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
