import joblib
import os
import pandas as pd

MODEL_PATH = "aqi_model.pkl"

def load_model():
    """Load model once at startup."""
    if not os.path.exists(MODEL_PATH):
        print("⚠️ Model not found, prediction disabled.")
        return None
    model = joblib.load(MODEL_PATH)
    print(f"✅ Model loaded from {MODEL_PATH}")
    return model


def predict(model, features: pd.Series):
    """Run model prediction from enriched features."""
    if model is None:
        raise ValueError("Model not loaded.")
    X = pd.DataFrame([features])
    y_pred = model.predict(X)
    return float(y_pred[0]), X.shape[1]
