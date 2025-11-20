import joblib
import os
import pandas as pd

MODEL_PATH = "aqi_model.pkl"

MODEL_PATHS = {
    "next_hour": "aqi_model.pkl",
    "next_4hours": "aqi_model_4H.pkl",
}

_MODEL_CACHE = {}

def load_model(model_name: str = None):
    """
    Load model by name, with caching.
    - model_name=None → use legacy MODEL_PATH (aqi_model.pkl)
    - model_name="next_hour" → aqi_model.pkl
    - model_name="next_4hours" → aqi_model_4H.pkl
    """
    if model_name is None:
        if "default" in _MODEL_CACHE:
            return _MODEL_CACHE["default"]
        if not os.path.exists(MODEL_PATH):
            print("Default model not found, prediction disabled.")
            return None
        model = joblib.load(MODEL_PATH)
        print(f"Default model loaded from {MODEL_PATH}")
        _MODEL_CACHE["default"] = model
        return model

    if model_name in _MODEL_CACHE:
        return _MODEL_CACHE[model_name]

    path = MODEL_PATHS.get(model_name)
    if not path:
        raise ValueError(f"Unknown model_name: {model_name}")

    if not os.path.exists(path):
        raise ValueError(f"Model file not found: {path}")

    model = joblib.load(path)
    print(f"Model '{model_name}' loaded from {path}")
    _MODEL_CACHE[model_name] = model
    return model


def predict(model, features: pd.Series):
    """Run model prediction from enriched features."""
    if model is None:
        raise ValueError("Model not loaded.")
    X = pd.DataFrame([features])
    y_pred = model.predict(X)
    return float(y_pred[0]), X.shape[1]
