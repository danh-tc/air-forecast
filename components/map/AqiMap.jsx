"use client";
import * as maptilersdk from "@maptiler/sdk";
import "@maptiler/sdk/dist/maptiler-sdk.css";
import { useEffect, useRef } from "react";
import "./aqi-map.scss";

export default function AqiMap({
  geojsonUrl = "data/hochiminh.json",
  aqiData = {},
}) {
  const mapContainer = useRef(null);
  const map = useRef(null);

  const getAqiColor = (aqi) => {
    if (aqi <= 50) return "#00E400";
    if (aqi <= 100) return "#FFFF00";
    if (aqi <= 150) return "#FF7E00";
    if (aqi <= 200) return "#FF0000";
    if (aqi <= 300) return "#8F3F97";
    return "#7E0023";
  };

  const getAqiDescription = (aqi) => {
    if (aqi <= 50) return "Chất lượng không khí tốt";
    if (aqi <= 100) return "Chấp nhận được, ít ảnh hưởng";
    if (aqi <= 150) return "Nhạy cảm nên hạn chế hoạt động ngoài trời";
    if (aqi <= 200) return "Không khí xấu, nên hạn chế ra ngoài";
    if (aqi <= 300) return "Rất xấu, khuyến cáo ở trong nhà";
    return "Nguy hại! Tránh mọi hoạt động ngoài trời";
  };

  useEffect(() => {
    if (map.current) return;

    maptilersdk.config.apiKey = process.env.NEXT_PUBLIC_MAPTILER_KEY;

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [106.660172, 10.762622],
      zoom: 8.5,
    });

    map.current.on("load", async () => {
      const response = await fetch(geojsonUrl);
      const geojson = await response.json();

      geojson.features.forEach((f) => {
        const code = f.properties.Code_re;
        const name = aqiData[code]?.name;
        f.properties["Location Short Name"] || f.properties.District || code;
        const aqi = aqiData[code]?.aqi || Math.floor(Math.random() * 200);
        f.properties.name = name;
        f.properties.aqi = aqi;
        f.properties.desc = getAqiDescription(aqi);
        f.properties.color = getAqiColor(aqi);
      });

      map.current.addSource("hcm-borders", {
        type: "geojson",
        data: geojson,
      });

      map.current.addLayer({
        id: "districts-fill",
        type: "fill",
        source: "hcm-borders",
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": 0.5,
        },
      });

      map.current.addLayer({
        id: "districts-outline",
        type: "line",
        source: "hcm-borders",
        paint: {
          "line-color": "#333",
          "line-width": 1.2,
        },
      });

      const popup = new maptilersdk.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      map.current.on("mousemove", "districts-fill", (e) => {
        map.current.getCanvas().style.cursor = "pointer";
        const props = e.features[0].properties;

        const popupHTML = `
          <div style="font-family: Inter, sans-serif;">
            <b>${props.name}</b><br/>
            <span style="font-weight:600;">AQI: ${props.aqi}</span><br/>
            <small>${props.desc}</small>
          </div>
        `;

        popup.setLngLat(e.lngLat).setHTML(popupHTML).addTo(map.current);
      });

      map.current.on("mouseleave", "districts-fill", () => {
        map.current.getCanvas().style.cursor = "";
        popup.remove();
      });
    });

    return () => map.current?.remove();
  }, [geojsonUrl, aqiData]);

  return <div ref={mapContainer} className="aqi-map" />;
}
