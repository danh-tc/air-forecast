"use client";
import { useEffect, useRef } from "react";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import "./aqi-map.scss";
import { usePredictAqi } from "../../context/PredictAqiContext";

export default function PredictAqiMap({ mapTitle = "Bản đồ AQI Dự Đoán" }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);

  const { predictedData, loading, error, baseLoading, baseError } =
    usePredictAqi();

  useEffect(() => {
    if (!predictedData || loading || error || baseError) return;
    if (mapRef.current) return;

    maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

    const map = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [106.660172, 10.762622],
      zoom: 8.5,
    });
    mapRef.current = map;
    map.on("load", () => {
      map.addSource("predicted-borders", {
        type: "geojson",
        data: predictedData,
      });

      map.addLayer({
        id: "predicted-fill",
        type: "fill",
        source: "predicted-borders",
        paint: {
          "fill-color": ["get", "predicted_color"],
          "fill-opacity": 0.5,
        },
      });

      map.addLayer({
        id: "predicted-outline",
        type: "line",
        source: "predicted-borders",
        paint: { "line-color": "#222", "line-width": 1.2 },
      });

      const popup = new maptilersdk.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on("mousemove", "predicted-fill", (e) => {
        const p = e.features[0].properties;

        popup
          .setLngLat(e.lngLat)
          .setHTML(
            `<div>
              <b>${p.name}</b><br/>
              AQI Dự đoán: ${p.predicted_aqi}<br/>
              <small>${p.predicted_desc}</small>
            </div>`
          )
          .addTo(map);
      });

      map.on("mouseleave", "predicted-fill", () => popup.remove());
    });

    return () => map.remove();
  }, [predictedData, loading, error, baseError]);

  return (
    <div className="map-wrapper">
      <h3 className="map-title">{mapTitle}</h3>

      <div className="aqi-map">
        <div ref={mapContainer} className="map-inner" />

        {(error || baseError) && (
          <div className="map-overlay error">
            <p>{error || baseError}</p>
          </div>
        )}

        {(loading || baseLoading) && (
          <div className="map-overlay">
            <div className="spinner"></div>
            <p>Đang tải bản đồ AQI dự đoán...</p>
          </div>
        )}
      </div>
    </div>
  );
}
