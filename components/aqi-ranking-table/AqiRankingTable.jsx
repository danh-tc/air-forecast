"use client";
import { useMemo } from "react";
import { useAqi } from "../../context/AqiContext";
import { usePredictAqi } from "../../context/PredictAqiContext";
import { getAqiColor, mapMapDataToTableData } from "../../libs/utils";

import "./aqi-ranking-table.scss";

export default function AqiRankingTable({
  mode = "current",
  title = "Xếp hạng chất lượng không khí - 24 Quận/Huyện TP.HCM",
  subtitle = "Nguồn dữ liệu: OpenWeatherMap",
}) {
  const { aqiData, loading: loadingCurrent, error: errorCurrent } = useAqi();
  const {
    predictedData,
    loading: loadingPredict,
    error: errorPredict,
  } = usePredictAqi();
  const isPredict = mode === "predict";
  const dataSource = isPredict ? predictedData : aqiData;
  const loading = isPredict ? loadingPredict : loadingCurrent;
  const error = isPredict ? errorPredict : errorCurrent;
  const { dataLeft, dataRight } = useMemo(() => {
    if (!dataSource) return { dataLeft: [], dataRight: [] };
    return mapMapDataToTableData(dataSource);
  }, [dataSource]);

  const getTextColor = (bgColor) => {
    if (!bgColor) return "#000";
    const c = bgColor.substring(1);
    const rgb = parseInt(c, 16);
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >> 8) & 0xff;
    const b = rgb & 0xff;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    return lum > 160 ? "#000" : "#fff";
  };

  const rowCount = 12;
  return (
    <div className="aqi-table-wrapper">
      <div className="aqi-table-header">
        <div className="aqi-table-title">{title}</div>
        <div className="aqi-table-subtitle">{subtitle}</div>
      </div>

      {error && <div className="aqi-error-banner">{error}</div>}

      <table className="aqi-table">
        <thead>
          <tr>
            <th>Quận/Huyện</th>
            <th>AQI</th>
            <th>Quận/Huyện</th>
            <th>AQI</th>
          </tr>
        </thead>

        <tbody>
          {Array.from({ length: rowCount }).map((_, i) => {
            const left = dataLeft[i];
            const right = dataRight[i];

            const leftBg = getAqiColor(left?.aqi ?? -1);
            const rightBg = getAqiColor(right?.aqi ?? -1);

            const isLoading = loading && !(left || right);

            return (
              <tr key={i} className={isLoading ? "loading-row" : ""}>
                <td>{left?.name || (loading ? "…" : "")}</td>
                <td
                  style={{
                    backgroundColor: left ? leftBg : "#eee",
                    color: left ? getTextColor(leftBg) : "#333",
                  }}
                >
                  {left?.aqi ?? (loading ? "…" : "")}
                </td>

                <td>{right?.name || (loading ? "…" : "")}</td>
                <td
                  style={{
                    backgroundColor: right ? rightBg : "#eee",
                    color: right ? getTextColor(rightBg) : "#333",
                  }}
                >
                  {right?.aqi ?? (loading ? "…" : "")}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {loading && (
        <div className="aqi-loading-inline">
          <div className="spinner-small" />
          <span>Đang tải dữ liệu...</span>
        </div>
      )}
    </div>
  );
}
