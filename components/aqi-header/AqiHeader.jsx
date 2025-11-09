"use client";
import "./aqi-header.scss";

export default function AqiHeader() {
  return (
    <div className="aqi-header">
      <h1 className="aqi-header-title">
        Môn học: Khai thác dữ liệu và ứng dụng
      </h1>
      <h2 className="aqi-header-sub">Nhóm 13</h2>
      <p className="aqi-header-topic">
        Chủ đề:{" "}
        <strong>Xây dựng mô hình dự đoán chất lượng không khí (AQI)</strong>
      </p>
    </div>
  );
}
