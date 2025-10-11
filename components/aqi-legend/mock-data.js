const aqiLevels = [
  {
    range: "0 - 50",
    label: "Tốt",
    description: "Không ảnh hưởng tới sức khỏe.",
    color: "#00e400",
  },
  {
    range: "51 - 100",
    label: "Trung bình",
    description: "Nhạy cảm có thể bị ảnh hưởng.",
    color: "#ffff00",
  },
  {
    range: "101 - 150",
    label: "Kém",
    description: "Người nhạy cảm nên hạn chế hoạt động ngoài trời.",
    color: "#ff7e00",
  },
  {
    range: "151 - 200",
    label: "Xấu",
    description: "Gây ảnh hưởng xấu đến sức khỏe.",
    color: "#ff0000",
  },
  {
    range: "201 - 300",
    label: "Rất xấu",
    description: "Mọi người nên ở trong nhà.",
    color: "#8f3f97",
  },
  {
    range: "301 - 500",
    label: "Nguy hại",
    description: "Không nên ra ngoài.",
    color: "#7e0023",
  },
];

export { aqiLevels };
