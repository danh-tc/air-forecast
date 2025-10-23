from fastapi import FastAPI, Body
from fastapi.middleware.cors import CORSMiddleware
from typing import Dict, Any
from model_service.feature_engineering import map_to_model_input
from model_service.predictor import load_model, predict

app = FastAPI(title="AQI Prediction Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = load_model()


@app.post("/predict_aqi")
def predict_aqi(payload: Dict[str, Any] = Body(...)):
    """
    Receives: { "data": [ {dt, co, no, ...}, ... ] }
    → Enrich features
    → Run XGBoost model
    → Return prediction + lat/lon/dt
    """
    data = payload.get("data", [])
    if not data:
        return {"error": "Missing 'data' array"}

    try:
        features = map_to_model_input(data)
        y_pred, feature_count = predict(model, features)

        last_row = data[-1]
        return {
            "prediction": y_pred,
            "unit": "AQI",
            "feature_count": feature_count,
            "lat": last_row.get("lat"),
            "lon": last_row.get("lon"),
            "dt": last_row.get("dt"),
        }
    except Exception as e:
        return {"error": f"Prediction failed: {str(e)}"}
