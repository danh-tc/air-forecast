/**
 * AQI → color mapping
 */
export const colorScale = [
  { min: 0, max: 50, color: "#00E400" },
  { min: 51, max: 100, color: "#FFFF00" },
  { min: 101, max: 150, color: "#FF7E00" },
  { min: 151, max: 200, color: "#FF0000" },
  { min: 201, max: 300, color: "#8F3F97" },
  { min: 301, max: 500, color: "#7E0023" },
];

/**
 * Helper to find the color for a given AQI
 */
function getAqiColor(aqi) {
  const range = colorScale.find((r) => aqi >= r.min && aqi <= r.max);
  return range ? range.color : "#999";
}

/**
 * Converts districtInfo object → array form
 * Optionally accepts aqiOverride to replace aqi values by name or code
 */
export function mapMapDataToTableData(districtInfo, aqiOverride = {}) {
  const allData = Object.values(districtInfo).map((d) => {
    const newAqi =
      aqiOverride[d.shortName] ?? aqiOverride[d.name] ?? d.aqi ?? 0;

    return {
      name: d.shortName,
      aqi: newAqi,
      color: getAqiColor(newAqi),
    };
  });

  allData.sort((a, b) => -b.aqi + a.aqi);

  const mid = Math.ceil(allData.length / 2);
  const dataLeft = allData.slice(0, mid);
  const dataRight = allData.slice(mid);

  return {
    dataLeft,
    dataRight,
    colorScale,
  };
}

export function buildAQIData(current = new Date(), lat, lon) {
  const data = [];
  for (let i = 24; i >= 0; i--) {
    const dt = new Date(current);
    dt.setHours(current.getHours() - i);

    data.push({
      dt: dt.toISOString().slice(0, 19).replace("T", " "),
      co: 300 + Math.random() * 50,
      no: 0.1 + Math.random() * 0.05,
      no2: 5 + Math.random() * 1,
      o3: 45 + Math.random() * 5,
      so2: 1 + Math.random() * 0.5,
      pm2_5: 12 + Math.random() * 2,
      pm10: 16 + Math.random() * 3,
      nh3: 1.5 + Math.random() * 0.3,
      lat: lat,
      lon: lon,
    });
  }
  return data;
}
