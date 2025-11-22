const aqiLevels = [
  {
    range: "0",
    label: "Good",
    description: "Không ảnh hưởng tới sức khỏe.",
    color: "#00e400",
  },
  {
    range: "1",
    label: "Moderate",
    description: "Nhạy cảm có thể bị ảnh hưởng.",
    color: "#ffff00",
  },
  {
    range: "2",
    label: "Unhealthy",
    description: "Người nhạy cảm nên hạn chế hoạt động ngoài trời.",
    color: "#ff7e00",
  },
  {
    range: "3",
    label: "Very Unhealthy",
    description: "Gây ảnh hưởng xấu đến sức khỏe.",
    color: "#ff0000",
  },
  {
    range: "4",
    label: "Hazardous",
    description: "Mọi người nên ở trong nhà.",
    color: "#8f3f97",
  },
];

export { aqiLevels };
