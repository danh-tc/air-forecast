from pydantic import BaseModel
from typing import Optional, List

class AQIRawInput(BaseModel):
    dt: str
    aqi: Optional[float] = None
    co: float
    no: float
    no2: float
    o3: float
    so2: float
    pm2_5: float
    pm10: float
    nh3: float

class AQIResponse(BaseModel):
    predicted_aqi_numeric: float
    predicted_aqi_label: str

class AQIBatchResponse(BaseModel):
    results: List[AQIResponse]
