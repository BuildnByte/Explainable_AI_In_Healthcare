import httpx
import json

OLLAMA_URL = "http://localhost:11434/api/generate"

async def generate_clinical_summary(shap_data: dict, lime_data: dict, prediction_data: dict):
    prompt = f"""
    You are a Senior Neurologist reviewing an AI-assisted diagnosis for Huntington's Disease.
    Your job is to synthesize the following XAI feature importances into a concise, evidence-based clinical summary for a medical peer.
    Be precise, avoid speculation, and flag any inconsistencies between the SHAP and LIME explanations.

    Patient Data (Raw): {json.dumps(prediction_data['raw_features'])}
    Predicted Stage: {prediction_data['prediction']}
    Confidence: {prediction_data['confidence']:.2f}%

    SHAP Global Explanations (Feature Impact):
    {json.dumps(shap_data)}

    LIME Local Explanations (Instance Specific):
    {json.dumps(lime_data)}

    Instructions:
    1. Summarize the major drivers (e.g., HTT CAG length, cognitive decline).
    2. Note if SHAP and LIME agree on the most important features.
    3. Provide a brief clinical rationalization of the predicted stage based on these values.
    4. Maintain a professional, clinical tone.
    """
    
    payload = {
        "model": "mistral",
        "prompt": prompt,
        "stream": True
    }
    
    async with httpx.AsyncClient(timeout=60.0) as client:
        try:
            async with client.stream("POST", OLLAMA_URL, json=payload) as response:
                async for chunk in response.aiter_lines():
                    if chunk:
                        chunk_json = json.loads(chunk)
                        if "response" in chunk_json:
                            yield chunk_json["response"]
                        if chunk_json.get("done"):
                            break
        except Exception as e:
            yield f"Error calling Ollama: {str(e)}. Please ensure Ollama is running locally with 'llama3' model."
