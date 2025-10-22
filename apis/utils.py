SAMPLE_INPUT = {
    "co": 304.05,
    "no": 0.13,
    "no2": 5.76,
    "o3": 48.47,
    "so2": 1.28,
    "pm2_5": 12.69,
    "pm10": 16.65,
    "nh3": 1.69,
    "hour": 8,
    "dayofweek": 4,
    "month": 6,
    "hour_sin": 0.8660254037844387,
    "hour_cos": -0.4999999999999998,
    "dayofweek_sin": -0.433883739117558,
    "dayofweek_cos": -0.9009688679024191,
    "co_lag_1h": 382.13,
    "co_lag_2h": 409.83,
    "co_lag_4h": 416.15,
    "co_lag_8h": 403.01,
    "co_lag_12h": 330.69,
    "co_lag_24h": 564.47,
    "co_roll_mean_3h": 365.3366666666696,
    "co_roll_std_3h": 54.85311416328408,
    "co_roll_mean_6h": 389.9199999999997,
    "co_roll_std_6h": 44.13014706386649,
    "co_roll_mean_9h": 393.2688888888887,
    "co_roll_std_9h": 35.27572552203328,
    "co_roll_mean_12h": 390.54749999999996,
    "co_roll_std_12h": 31.73178650839578,
    "co_roll_mean_24h": 342.7708333333333,
    "co_roll_std_24h": 83.76462130219801,
    "no2_lag_1h": 7.93,
    "no2_lag_2h": 8.8,
    "no2_lag_4h": 9.28,
    "no2_lag_8h": 9.94,
    "no2_lag_12h": 8.62,
    "no2_lag_24h": 11.19,
    "no2_roll_mean_3h": 7.496666666666663,
    "no2_roll_std_3h": 1.5656415085847935,
    "no2_roll_mean_6h": 8.365,
    "no2_roll_std_6h": 1.373357200452428,
    "no2_roll_mean_9h": 8.756666666666668,
    "no2_roll_std_9h": 1.250199983986524,
    "no2_roll_mean_12h": 9.016666666666666,
    "no2_roll_std_12h": 1.1768550797528246,
    "no2_roll_mean_24h": 7.52375,
    "no2_roll_std_24h": 2.306936256441419,
    "pm2_5_lag_1h": 15.01,
    "pm2_5_lag_2h": 15.67,
    "pm2_5_lag_4h": 15.19,
    "pm2_5_lag_8h": 12.67,
    "pm2_5_lag_12h": 8.61,
    "pm2_5_lag_24h": 15.54,
    "pm2_5_roll_mean_3h": 14.45666666666658,
    "pm2_5_roll_std_3h": 1.565162398552635,
    "pm2_5_roll_mean_6h": 14.778333333333334,
    "pm2_5_roll_std_6h": 1.1352253815177726,
    "pm2_5_roll_mean_9h": 14.212222222222223,
    "pm2_5_roll_std_9h": 1.254220652207169,
    "pm2_5_roll_mean_12h": 13.449166666666665,
    "pm2_5_roll_std_12h": 1.8109789333353767,
    "pm2_5_roll_mean_24h": 10.930416666666666,
    "pm2_5_roll_std_24h": 3.2572507467934355,
    "pm10_lag_1h": 19.01,
    "pm10_lag_2h": 19.35,
    "pm10_lag_4h": 18.56,
    "pm10_lag_8h": 15.32,
    "pm10_lag_12h": 10.06,
    "pm10_lag_24h": 17.5,
    "pm10_roll_mean_3h": 18.336666666666726,
    "pm10_roll_std_3h": 1.4705554504558263,
    "pm10_roll_mean_6h": 18.394999999999943,
    "pm10_roll_std_6h": 1.0840987039285386,
    "pm10_roll_mean_9h": 17.544444444444434,
    "pm10_roll_std_9h": 1.5625948861655679,
    "pm10_roll_mean_12h": 16.531666666666666,
    "pm10_roll_std_12h": 2.3505312102053715,
    "pm10_roll_mean_24h": 12.957500000000001,
    "pm10_roll_std_24h": 4.3936389295679,
    "o3_lag_1h": 41.39,
    "o3_lag_2h": 37.93,
    "o3_lag_4h": 34.12,
    "o3_lag_8h": 25.91,
    "o3_lag_12h": 23.5,
    "o3_lag_24h": 8.42,
    "o3_roll_mean_3h": 42.59666666666672,
    "o3_roll_std_3h": 5.372609545955348,
    "o3_roll_mean_6h": 38.40666666666663,
    "o3_roll_std_6h": 5.790870976513595,
    "o3_roll_mean_9h": 35.11333333333333,
    "o3_roll_std_9h": 6.859961734590945,
    "o3_roll_mean_12h": 32.150833333333345,
    "o3_roll_std_12h": 7.937678225150231,
    "o3_roll_mean_24h": 29.818749999999998,
    "o3_roll_std_24h": 8.02040512502889,
    "so2_lag_1h": 1.43,
    "so2_lag_2h": 1.38,
    "so2_lag_4h": 1.38,
    "so2_lag_8h": 1.63,
    "so2_lag_12h": 1.43,
    "so2_lag_24h": 1.87,
    "so2_roll_mean_3h": 1.3633333333333624,
    "so2_roll_std_3h": 0.07637626168970156,
    "so2_roll_mean_6h": 1.375,
    "so2_roll_std_6h": 0.05049752464421105,
    "so2_roll_mean_9h": 1.4244444444444444,
    "so2_roll_std_9h": 0.09812124011243714,
    "so2_roll_mean_12h": 1.4916666666666665,
    "so2_roll_std_12h": 0.15080591591295858,
    "so2_roll_mean_24h": 1.32625,
    "so2_roll_std_24h": 0.3032263110008984,
    "nh3_lag_1h": 2.23,
    "nh3_lag_2h": 2.34,
    "nh3_lag_4h": 2.34,
    "nh3_lag_8h": 2.39,
    "nh3_lag_12h": 1.83,
    "nh3_lag_24h": 2.61,
    "nh3_roll_mean_3h": 2.08666666666667,
    "nh3_roll_std_3h": 0.34789845261351265,
    "nh3_roll_mean_6h": 2.215,
    "nh3_roll_std_6h": 0.26113215046019783,
    "nh3_roll_mean_9h": 2.26,
    "nh3_roll_std_9h": 0.21794494717564294,
    "nh3_roll_mean_12h": 2.2691666666666666,
    "nh3_roll_std_12h": 0.19860689054752229,
    "nh3_roll_mean_24h": 1.8904166666666669,
    "nh3_roll_std_24h": 0.5194602480219491,
    "no_lag_1h": 0.07,
    "no_lag_2h": 0.060000000000000005,
    "no_lag_4h": 0.04,
    "no_lag_8h": 0.01,
    "no_lag_12h": 0.02,
    "no_lag_24h": 2.26,
    "no_roll_mean_3h": 0.08666666666666727,
    "no_roll_std_3h": 0.03785938848327718,
    "no_roll_mean_6h": 0.06333333333332179,
    "no_roll_std_6h": 0.03559026080008752,
    "no_roll_mean_9h": 0.04666666666665265,
    "no_roll_std_9h": 0.037749172518984686,
    "no_roll_mean_12h": 0.04,
    "no_roll_std_12h": 0.03437758196459378,
    "no_roll_mean_24h": 0.3266666666666666,
    "no_roll_std_24h": 0.6555029046285455
}

import joblib
import os
import pandas as pd

base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "aqi_model.pkl")

try:
    model = joblib.load(model_path)
except Exception as e:
    raise RuntimeError(f"Error loading model: {e}")

def map_raw_to_sample(raw_data: dict):
    mapped = SAMPLE_INPUT.copy()
    return mapped


def predict_from_raw_list(raw_list: list):
    """Handle single or multiple AQI records."""
    if not raw_list:
        return []

    mapped_list = [map_raw_to_sample(r) for r in raw_list]
    df_input = pd.DataFrame(mapped_list)

    preds = model.predict(df_input)
    aqi_labels_map = {
        0: "Tốt",
        1: "Trung bình",
        2: "Kém",
        3: "Xấu",
        4: "Rất xấu"
    }

    results = []
    for val in preds:
        results.append({
            "predicted_aqi_numeric": float(val),
            "predicted_aqi_label": aqi_labels_map.get(int(round(val)), "Không xác định")
        })
    return results

