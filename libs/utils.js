export const colorScale = [
  { level: 1, label: "Good", color: "#00E400" },
  { level: 2, label: "Fair", color: "#FFFF00" },
  { level: 3, label: "Moderate", color: "#FF7E00" },
  { level: 4, label: "Poor", color: "#FF0000" },
  { level: 5, label: "Very Poor", color: "#8F3F97" },
];

export function getAqiColor(aqi) {
  const entry = colorScale.find((r) => r.level === aqi);
  return entry ? entry.color : "#7E0023";
}

export function getAqiLabel(aqi) {
  const entry = colorScale.find((r) => r.level === aqi);
  return entry ? entry.label : "Hazardous";
}

export function mapMapDataToTableData(aqiGeojson) {
  if (!aqiGeojson?.features)
    return { dataLeft: [], dataRight: [], colorScale: [] };

  const items = aqiGeojson.features
    .map((f) => ({
      name: f.properties.name,
      aqi: f.properties.aqi ?? 0,
      color: getAqiColor(f.properties.aqi),
    }))
    .sort((a, b) => -b.aqi + a.aqi);

  const midpoint = Math.ceil(items.length / 2);
  const dataLeft = items.slice(0, midpoint);
  const dataRight = items.slice(midpoint);

  return { dataLeft, dataRight, colorScale };
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

export function convertToUTC7(dt) {
  const date = new Date(dt * 1000);
  const utc7 = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  const year = utc7.getFullYear();
  const month = String(utc7.getMonth() + 1).padStart(2, "0");
  const day = String(utc7.getDate()).padStart(2, "0");
  const hours = String(utc7.getHours()).padStart(2, "0");
  const minutes = String(utc7.getMinutes()).padStart(2, "0");
  const seconds = String(utc7.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function getUnixRange() {
  const now = new Date();

  const endUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    now.getUTCHours(),
    0,
    0,
    0
  );

  const startUTC = endUTC - 24 * 60 * 60 * 1000;

  return {
    start: Math.floor(startUTC / 1000),
    end: Math.floor(endUTC / 1000),
  };
}
