"use client";
import "./aqi-ranking-table.scss";

export default function AqiRankingTable({
  title = "Xếp hạng chất lượng không khí",
  subtitle = "Chủ Nhật, ngày 12/10/2025",
  leftHeader = "Quận huyện",
  rightHeader = "Quận huyện",
  dataLeft = [],
  dataRight = [],
  colorScale = [
    { min: 0, max: 50, color: "#00E400" },
    { min: 51, max: 100, color: "#FFFF00" },
    { min: 101, max: 150, color: "#FF7E00" },
    { min: 151, max: 200, color: "#FF0000" },
    { min: 201, max: 300, color: "#8F3F97" },
    { min: 301, max: 500, color: "#7E0023" },
  ],
}) {
  const getAqiColor = (value) => {
    const range = colorScale.find((r) => value >= r.min && value <= r.max);
    return range ? range.color : "#ccc";
  };

  return (
    <div className="aqi-table-wrapper">
      <div className="aqi-table-title">{title}</div>
      <div className="aqi-table-subtitle">{subtitle}</div>

      <table className="aqi-table">
        <thead>
          <tr>
            <th>{leftHeader}</th>
            <th>AQI</th>
            <th>{rightHeader}</th>
            <th>AQI</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({
            length: Math.max(dataLeft.length, dataRight.length),
          }).map((_, i) => (
            <tr key={i}>
              <td>{dataLeft[i]?.name || ""}</td>
              <td
                style={{
                  backgroundColor: getAqiColor(dataLeft[i]?.aqi ?? -1),
                }}
              >
                {dataLeft[i]?.aqi ?? ""}
              </td>
              <td>{dataRight[i]?.name || ""}</td>
              <td
                style={{
                  backgroundColor: getAqiColor(dataRight[i]?.aqi ?? -1),
                }}
              >
                {dataRight[i]?.aqi ?? ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
