export const hcmDistrictInfo = {
  79784: {
    name: "Huyện Hóc Môn, TP. Hồ Chí Minh",
    shortName: "Huyện Hóc Môn",
    aqi: 0,
  },
  79783: {
    name: "Huyện Củ Chi, TP. Hồ Chí Minh",
    shortName: "Huyện Củ Chi",
    aqi: 0,
  },
  79787: {
    name: "Huyện Cần Giờ, TP. Hồ Chí Minh",
    shortName: "Huyện Cần Giờ",
    aqi: 0,
  },
  79785: {
    name: "Huyện Bình Chánh, TP. Hồ Chí Minh",
    shortName: "Huyện Bình Chánh",
    aqi: 0,
  },
  79762: {
    name: "Thành phố Thủ Đức, TP. Hồ Chí Minh",
    shortName: "Thành phố Thủ Đức",
    aqi: 0,
  },
  79766: {
    name: "Quận Tân Bình, TP. Hồ Chí Minh",
    shortName: "Quận Tân Bình",
    aqi: 0,
  },
  79764: {
    name: "Quận Gò Vấp, TP. Hồ Chí Minh",
    shortName: "Quận Gò Vấp",
    aqi: 0,
  },
  79786: {
    name: "Huyện Nhà Bè, TP. Hồ Chí Minh",
    shortName: "Huyện Nhà Bè",
    aqi: 0,
  },
  79768: {
    name: "Quận Phú Nhuận, TP. Hồ Chí Minh",
    shortName: "Quận Phú Nhuận",
    aqi: 0,
  },
  79767: {
    name: "Quận Tân Phú, TP. Hồ Chí Minh",
    shortName: "Quận Tân Phú",
    aqi: 0,
  },
  79777: {
    name: "Quận Bình Tân, TP. Hồ Chí Minh",
    shortName: "Quận Bình Tân",
    aqi: 0,
  },
  79765: {
    name: "Quận Bình Thạnh, TP. Hồ Chí Minh",
    shortName: "Quận Bình Thạnh",
    aqi: 0,
  },
  79775: { name: "Quận 6, TP. Hồ Chí Minh", shortName: "Quận 6", aqi: 0 },
  79776: { name: "Quận 8, TP. Hồ Chí Minh", shortName: "Quận 8", aqi: 0 },
  79774: { name: "Quận 5, TP. Hồ Chí Minh", shortName: "Quận 5", aqi: 0 },
  79773: { name: "Quận 4, TP. Hồ Chí Minh", shortName: "Quận 4", aqi: 0 },
  79778: { name: "Quận 7, TP. Hồ Chí Minh", shortName: "Quận 7", aqi: 0 },
  79772: { name: "Quận 11, TP. Hồ Chí Minh", shortName: "Quận 11", aqi: 0 },
  79771: { name: "Quận 10, TP. Hồ Chí Minh", shortName: "Quận 10", aqi: 0 },
  79770: { name: "Quận 3, TP. Hồ Chí Minh", shortName: "Quận 3", aqi: 0 },
  79760: { name: "Quận 1, TP. Hồ Chí Minh", shortName: "Quận 1", aqi: 0 },
  79769: { name: "Quận 2, TP. Hồ Chí Minh", shortName: "Quận 2", aqi: 0 },
  79761: { name: "Quận 12, TP. Hồ Chí Minh", shortName: "Quận 12", aqi: 0 },
  79763: { name: "Quận 9, TP. Hồ Chí Minh", shortName: "Quận 9", aqi: 0 },
};

export function generateMockAqi(data) {
  const newData = {};
  for (const code in data) {
    const randomAqi = Math.floor(Math.random() * 200) + 10;
    newData[code] = { ...data[code], aqi: randomAqi };
  }
  return newData;
}
