"use client";
import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAqi } from "./AqiContext";
import { getAqiColor, getAqiLabel } from "../libs/utils";

const PredictAqiContext = createContext();

export function PredictAqiProvider({ children }) {
  const { aqiData, loading: baseLoading, error: baseError } = useAqi();

  const [predictedData, setPredictedData] = useState(null);
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

  useEffect(() => {
    if (!aqiData || baseLoading || baseError) return;
    if (calledRef.current) return;
    calledRef.current = true;

    async function fetchPrediction() {
      try {
        setLoading(true);

        const tasks = aqiData.features.map((f) => {
          const code = f.properties.Code_re;

          const payload = {
            code,
            data: buildDistrictPayload(f),
          };

          return fetch("http://localhost:8000/predict_aqi", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
            .then(async (res) => {
              if (!res.ok) throw new Error(`HTTP ${res.status}`);
              const json = await res.json();
              return { code, result: json };
            })
            .catch((err) => {
              console.warn(`Prediction failed for ${code}`, err);
              return { code, result: null };
            });
        });

        const results = await Promise.allSettled(tasks);

        const newFeatures = aqiData.features.map((f) => {
          const code = f.properties.Code_re;
          const entry = results
            .map((x) => x.value)
            .find((x) => x.code === code);
          const match = entry?.result;
          const aqi = match?.prediction + 1 ?? null;
          return {
            ...f,
            properties: {
              ...f.properties,
              aqi: aqi,
              predicted_aqi: aqi,
              predicted_color: getAqiColor(aqi),
              predicted_desc: getAqiLabel(aqi),
            },
          };
        });

        setPredictedData({
          ...aqiData,
          features: newFeatures,
        });

        setLoading(false);
      } catch (err) {
        console.error("Predict API error:", err);
        setError("Không thể tải dữ liệu AQI dự đoán");
        setLoading(false);
      }
    }

    fetchPrediction();
  }, [aqiData, baseLoading, baseError]);

  return (
    <PredictAqiContext.Provider
      value={{ predictedData, loading, error, baseLoading, baseError }}
    >
      {children}
    </PredictAqiContext.Provider>
  );
}

export const usePredictAqi = () => useContext(PredictAqiContext);
