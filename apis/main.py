from fastapi import FastAPI, HTTPException
from schemas import AQIRawInput, AQIBatchResponse
from utils import predict_from_raw_list
from typing import List

app = FastAPI(title="AQI Prediction API")

@app.post("/predict", response_model=AQIBatchResponse)
def predict_endpoint(input_data: List[AQIRawInput]):
    """
    Accepts a list of AQI records:
    [
        {
            "dt": "2024-09-27 14:00:00",
            "aqi": 4,
            "co": 1094.82,
            "no": 6.37,
            "no2": 52.78,
            "o3": 118.73,
            "so2": 57.7,
            "pm2_5": 62.9,
            "pm10": 71.11,
            "nh3": 8.61
        },
        {...}
    ]
    """
    try:
        result = predict_from_raw_list([item.dict() for item in input_data])
        return {"results": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
