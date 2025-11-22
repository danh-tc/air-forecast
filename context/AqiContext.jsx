"use client";
import { createContext, useContext, useState } from "react";
import * as turf from "@turf/turf";
import geoData from "@/../public/data/hochiminh.json";
import { getAqiColor, getAqiLabel, getUnixRange } from "../libs/utils";

const AqiContext = createContext();

export function AqiProvider({ children }) {
  const [aqiData, setAqiData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadAqiData = async () => {
    if (aqiData) return;

    try {
      setLoading(true);
      setError(null);

      const features = geoData.features;
      const { start, end } = getUnixRange();

      const results = await Promise.allSettled(
        features.map(async (f) => {
          const code = f.properties.Code_re;
          const centroid = turf.centroid(f.geometry);
          const [lon, lat] = centroid.geometry.coordinates;
          const appId = process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY;
          const url = `https://api.openweathermap.org/data/2.5/air_pollution/history?lat=${lat}&lon=${lon}&appid=${appId}&start=${start}&end=${end}`;
          try {
            const res = await fetch(url);
            if (!res.ok) return Promise.reject(`HTTP ${res.status}`);

            const data = await res.json();
            return { code, data };
          } catch (e) {
            return Promise.reject(e);
          }
        })
      );

      const failed = results.some((r) => r.status === "rejected");

      if (failed) {
        setError("Không thể tải dữ liệu AQI");
        setLoading(false);
        return;
      }

      const updatedGeo = {
        ...geoData,
        features: features.map((f) => {
          const code = f.properties.Code_re;
          const match = results.find((r) => r.value?.code === code)?.value
            ?.data;
          f.coord = match?.coord ?? null;
          f.list = match?.list ?? [];
          const latestAqiEntry = match?.list?.length ? match.list.at(-1) : null;
          const aqi = latestAqiEntry?.main?.aqi - 1 ?? null;
          f.properties.aqi = aqi;
          f.properties.color = getAqiColor(aqi);
          f.properties.desc = getAqiLabel(aqi);
          f.properties.name = f.properties.District;
          f.properties.center = turf.centroid(f).geometry.coordinates;

          return f;
        }),
      };

      setAqiData(updatedGeo);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Không thể tải dữ liệu AQI");
      setLoading(false);
    }
  };

  return (
    <AqiContext.Provider
      value={{
        aqiData,
        loading,
        error,
        loadAqiData,
      }}
    >
      {children}
    </AqiContext.Provider>
  );
}

export const useAqi = () => useContext(AqiContext);
