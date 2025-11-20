"use client";
import { useEffect, useRef } from "react";
import "./aqi-map.scss";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useAqi } from "../../context/AqiContext";
import { getCurrentDateTimeUTC7 } from "../aqi-ranking-table/AqiRankingTable";

export default function AqiMap({
  mapTitle = "Bản đồ chất lượng không khí TP.HCM",
}) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const { aqiData, loading, error, loadAqiData } = useAqi();
  
  useEffect(() => {
    loadAqiData();
  }, []);

  useEffect(() => {
    if (!aqiData || loading || error) return;
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
      map.addSource("hcm-borders", { type: "geojson", data: aqiData });

      map.addLayer({
        id: "districts-fill",
        type: "fill",
        source: "hcm-borders",
        paint: { "fill-color": ["get", "color"], "fill-opacity": 0.5 },
      });

      map.addLayer({
        id: "districts-outline",
        type: "line",
        source: "hcm-borders",
        paint: { "line-color": "#333", "line-width": 1.2 },
      });

      const popup = new maptilersdk.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.on("mousemove", "districts-fill", (e) => {
        const p = e.features[0].properties;
        popup
          .setLngLat(e.lngLat)
          .setHTML(
            `<div><b>${p.name}</b><br/>AQI: ${p.aqi}<br/><small>${p.desc}</small></div>`
          )
          .addTo(map);
      });

      map.on("mouseleave", "districts-fill", () => popup.remove());
    });

    return () => map.remove();
  }, [aqiData, loading, error]);

  return (
    <div className="map-wrapper">
      <h3 className="map-title">{mapTitle}</h3>
      <p className="time">{getCurrentDateTimeUTC7().toString()}</p>
      <div className="aqi-map">
        <div ref={mapContainer} className="map-inner" />

        {loading && (
          <div className="map-overlay">
            <div className="spinner"></div>
            <p>Đang tải dữ liệu AQI...</p>
          </div>
        )}

        {error && (
          <div className="map-overlay error">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
