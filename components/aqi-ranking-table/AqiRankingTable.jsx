"use client";

import { useMemo } from "react";
import { useAqi } from "../../context/AqiContext";
import { usePredictAqi } from "../../context/PredictAqiContext";
import { getAqiColor, mapMapDataToTableData } from "../../libs/utils";

import "./aqi-ranking-table.scss";

export default function AqiRankingTable({
  mode = "current",
  modelKey = "next_hour",
  title = "Xếp hạng chất lượng không khí - 24 Quận/Huyện TP.HCM",
  subtitle = "Nguồn dữ liệu: OpenWeatherMap",
}) {
  const { aqiData, loading: loadingCurrent, error: errorCurrent } = useAqi();

  const {
    predictions,
    loading: loadingPredict,
    error: errorPredict,
    baseLoading,
    baseError,
  } = usePredictAqi();

  const isPredict = mode === "predict";
  const dataSource = isPredict ? predictions?.[modelKey] : aqiData;

  const loading = isPredict ? loadingPredict || baseLoading : loadingCurrent;
  const error = isPredict ? errorPredict || baseError : errorCurrent;

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
        {!isPredict && (
          <div className="aqi-table-subtitle time">
            {getCurrentDateTimeUTC7().toString()}
          </div>
        )}
        {isPredict && (
          <div className="aqi-table-subtitle time">
            {getNext4HoursUTC7().toString()}
          </div>
        )}
      </div>

      {error && <div className="aqi-error-banner">{error}</div>}

      <table className="aqi-table">
        <thead>
          <tr>
            <th>Districts</th>
            <th>AQI levels</th>
            <th>Districts</th>
            <th>AQI levels</th>
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
                {/* LEFT COLUMN */}
                <td>{left?.name || (loading ? "…" : "")}</td>
                <td
                  style={{
                    backgroundColor: left ? leftBg : "#eee",
                    color: left ? getTextColor(leftBg) : "#333",
                  }}
                >
                  {left?.aqi ?? (loading ? "…" : "")}
                </td>

                {/* RIGHT COLUMN */}
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

export function getCurrentDateTimeUTC7() {
  return new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" })
  );
}

export function getNext4HoursUTC7() {
  const now = getCurrentDateTimeUTC7();
  const result = new Date(now);
  let hour = now.getHours();
  let rounded = Math.ceil((hour + 0.0001) / 4) * 4;
  if (rounded >= 24) {
    rounded = 0;
    result.setDate(result.getDate() + 1);
  }
  result.setHours(rounded, 0, 0, 0);
  return result;
}
