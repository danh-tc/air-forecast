import pandas as pd
import numpy as np
from typing import List, Dict, Any


def create_advanced_features(df: pd.DataFrame, pollutants: List[str]) -> pd.DataFrame:
    """Generate lag and rolling mean/std features for each pollutant."""
    features_list = []
    lags = [1, 2, 3, 4, 6, 8]
    windows = [4, 6, 8]

    for col in pollutants:
        for lag in lags:
            lag_series = df[col].shift(lag)
            lag_series.name = f"{col}_lag_{lag}h"
            features_list.append(lag_series)

        for window in windows:
            roll_mean_series = df[col].rolling(window=window).mean()
            roll_mean_series.name = f"{col}_roll_mean_{window}h"
            features_list.append(roll_mean_series)

            roll_std_series = df[col].rolling(window=window).std()
            roll_std_series.name = f"{col}_roll_std_{window}h"
            features_list.append(roll_std_series)

        diff_series = df[col].diff(1)
        diff_series.name = f"{col}_diff_over_1hour"
        features_list.append(diff_series)

    ratio_series = df["pm2_5"] / df["pm10"]
    ratio_series.name = "pm_ratio"
    features_list.append(ratio_series)

    ratio_series = df["no2"] / df["no"]
    ratio_series.name = "nitro_oxide_ratio"
    features_list.append(ratio_series)

    ratio_series = df["co"] * df["no"]
    ratio_series.name = "co_no_product"
    features_list.append(ratio_series)

    df_feat = pd.concat([df] + features_list, axis=1)
    return df_feat


def map_to_model_input(data: List[Dict[str, Any]]) -> pd.Series:
    """Map raw JSON data → single enriched record for model."""
    df = pd.DataFrame(data)
    df["dt"] = pd.to_datetime(df["dt"])
    df = df.sort_values("dt").set_index("dt")

    # Remove non-predictor fields
    for col in ["lat", "lon"]:
        if col in df.columns:
            df = df.drop(columns=[col])

    # Time-based features
    df["hour"] = df.index.hour
    df["dayofweek"] = df.index.dayofweek
    df["month"] = df.index.month
    df["hour_sin"] = np.sin(2 * np.pi * df["hour"] / 24)
    df["hour_cos"] = np.cos(2 * np.pi * df["hour"] / 24)
    df["dayofweek_sin"] = np.sin(2 * np.pi * df["dayofweek"] / 7)
    df["dayofweek_cos"] = np.cos(2 * np.pi * df["dayofweek"] / 7)

    df["month_sin"] = np.sin(2 * np.pi * df["month"] / 12)
    df["month_cos"] = np.cos(2 * np.pi * df["month"] / 12)

    pollutants = ["co", "no2", "pm2_5", "pm10", "o3", "so2", "nh3", "no"]

    df_feat = create_advanced_features(df, pollutants)

    return df_feat.iloc[-1].dropna()
