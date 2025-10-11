import AqiLegend from "../../components/aqi-legend/AqiLegend";
import { aqiLevels } from "../../components/aqi-legend/mock-data";
import AqiRankingTable from "../../components/aqi-ranking-table/AqiRankingTable";
import AqiMap from "../../components/map/AqiMap";
import {
  hcmDistrictInfo,
  generateMockAqi,
} from "../../components/map/mock-data";
import { mapMapDataToTableData } from "../../libs/utils";

const mockAqiData = generateMockAqi(hcmDistrictInfo);
const { dataLeft, dataRight, colorScale } = mapMapDataToTableData(mockAqiData);;

export default function Home() {
  return (
    <div className="rethink-air-forecast">
      <AqiMap geojsonUrl="/data/hochiminh.json" aqiData={mockAqiData} />
      <AqiRankingTable
        title="Xếp hạng chất lượng không khí - 24 Quận/Huyện TP.HCM"
        subtitle="Dữ liệu minh họa (tự sinh ngẫu nhiên theo dải màu AQI)"
        leftHeader="Quận/Huyện"
        rightHeader="Quận/Huyện"
        dataLeft={dataLeft}
        dataRight={dataRight}
        colorScale={colorScale}
      />
      <AqiLegend levels={aqiLevels} />
    </div>
  );
}
