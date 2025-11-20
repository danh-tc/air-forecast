from fastapi import FastAPI, Body, Path
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any
from model_service.feature_engineering import map_to_model_input
from model_service.predictor import load_model, predict
from datetime import datetime, timedelta, timezone

app = FastAPI(title="AQI Prediction Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/predict_aqi/{model_name}")
def predict_aqi_by_model(
    model_name: str = Path(..., description="Model key, e.g. 'next_hour', 'next_4hours'"),
    payload: Dict[str, Any] = Body(...)
):
    """
    e.g.
    POST /predict_aqi/next_hour
    POST /predict_aqi/next_4hours

    Receives: { "data": [ {dt, co, no, ...}, ... ] }
    → Enrich features
    → Run selected model
    → Return prediction + meta
    """
    data = payload.get("data", [])
    if not data:
        return {"error": "Missing 'data' array"}

    try:
        model = load_model(model_name)
        features = map_to_model_input(data)
        y_pred, feature_count = predict(model, features)

        last_row = data[-1]
        return {
            "prediction": y_pred,
            "model_name": model_name,
            "feature_count": feature_count,
            "lat": last_row.get("lat"),
            "lon": last_row.get("lon"),
            "dt": datetime.now(timezone(timedelta(hours=7))).strftime("%d/%m/%Y %H:%M:%S"),
        }
    except Exception as e:
        return {"error": f"{model_name} → Prediction failed: {str(e)}"}
