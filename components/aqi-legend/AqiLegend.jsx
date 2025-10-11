"use client";
import "./aqi-legend.scss";

export default function AqiLegend({ levels = [] }) {
  return (
    <div className="aqi-legend">
      {levels.map((level, i) => (
        <div
          key={i}
          className="aqi-level"
          style={{ backgroundColor: level.color }}
        >
          <div className="aqi-range">{level.range}</div>
          <div className="aqi-label">{level.label}</div>
          <div className="aqi-description">{level.description}</div>
        </div>
      ))}
    </div>
  );
}
