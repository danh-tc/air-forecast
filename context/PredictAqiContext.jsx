"use client";

import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAqi } from "./AqiContext";
import { getAqiColor, getAqiLabel } from "../libs/utils";

const PredictAqiContext = createContext();

const MODEL_ENDPOINTS = {
  next_hour: "http://localhost:8000/predict_aqi/next_hour",
  next_4_hours: "http://localhost:8000/predict_aqi/next_4hours",
};

export function PredictAqiProvider({ children }) {
  const { aqiData, loading: baseLoading, error: baseError } = useAqi();

  const [predictions, setPredictions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const calledRef = useRef(false);

  function buildDistrictPayload(feature) {
    const [lon, lat] = feature.properties.center;

    return feature.list.map((item) => ({
      dt: new Date(item.dt * 1000)
        .toLocaleString("en-GB", {
          timeZone: "Asia/Bangkok",
          hour12: false,
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(",", ""),

      co: item.components.co,
      no: item.components.no,
      no2: item.components.no2,
      o3: item.components.o3,
      so2: item.components.so2,
      pm2_5: item.components.pm2_5,
      pm10: item.components.pm10,
      nh3: item.components.nh3,

      lat,
      lon,
    }));
  }

  async function fetchPredictionForModel(modelKey, aqiData) {
    const endpoint = MODEL_ENDPOINTS[modelKey];
    if (!endpoint) {
      throw new Error(`No endpoint defined for model: ${modelKey}`);
    }

    const tasks = aqiData.features.map((f) => {
      const code = f.properties.Code_re;
      const payload = {
        code,
        data: buildDistrictPayload(f),
      };

      return fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then(async (res) => {
          if (!res.ok) {
            throw new Error(`HTTP ${res.status}`);
          }
          const json = await res.json();
          return { code, result: json };
        })
        .catch((err) => {
          console.warn(`Prediction failed for ${code} @ ${modelKey}`, err);
          return { code, result: null };
        });
    });

    const results = await Promise.allSettled(tasks);

    const newFeatures = aqiData.features.map((f) => {
      const code = f.properties.Code_re;
      const entry = results.map((x) => x.value).find((x) => x.code === code);

      const match = entry?.result;
      const predicted = match?.prediction ?? null;
      const aqiValue = predicted !== null ? predicted + 1 : null;

      return {
        ...f,
        properties: {
          ...f.properties,
          aqi: aqiValue,
          predicted_aqi: aqiValue,
          predicted_color: getAqiColor(aqiValue),
          predicted_desc: getAqiLabel(aqiValue),
          modelKey,
        },
      };
    });

    return {
      ...aqiData,
      features: newFeatures,
    };
  }

  useEffect(() => {
    if (!aqiData || baseLoading || baseError) return;
    if (calledRef.current) return;
    calledRef.current = true;

    async function fetchAllModels() {
      try {
        setLoading(true);
        setError(null);

        const entries = {};

        const modelKeys = Object.keys(MODEL_ENDPOINTS);

        for (const modelKey of modelKeys) {
          try {
            const geojson = await fetchPredictionForModel(modelKey, aqiData);
            entries[modelKey] = geojson;
          } catch (err) {
            console.error(`Predict API error for model ${modelKey}:`, err);
          }
        }

        setPredictions(entries);
        setLoading(false);
      } catch (err) {
        console.error("Predict API error (global):", err);
        setError("Không thể tải dữ liệu AQI dự đoán");
        setLoading(false);
      }
    }

    fetchAllModels();
  }, [aqiData, baseLoading, baseError]);

  const availableModels = Object.keys(MODEL_ENDPOINTS);

  return (
    <PredictAqiContext.Provider
      value={{
        predictions,
        loading,
        error,
        baseLoading,
        baseError,
        availableModels,
      }}
    >
      {children}
    </PredictAqiContext.Provider>
  );
}

export const usePredictAqi = () => useContext(PredictAqiContext);
