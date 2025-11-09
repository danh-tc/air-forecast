import AqiHeader from "../../components/aqi-header/AqiHeader";
import AqiLegend from "../../components/aqi-legend/AqiLegend";
import { aqiLevels } from "../../components/aqi-legend/mock-data";
import AqiRankingTable from "../../components/aqi-ranking-table/AqiRankingTable";
import AqiMap from "../../components/map/AqiMap";
import PredictAqiMap from "../../components/map/PredictAqiMap";

export default function Home() {
  return (
    <div className="rethink-air-forecast">
      <AqiHeader />
      <div className="two-cols-container">
        <AqiMap mapTitle="Chất lượng không khí TP.HCM hiện tại" />
        <PredictAqiMap mapTitle="Dự đoán chất lượng không khí TP.HCM trong 1 giờ tới" />
      </div>
      <div className="two-cols-container">
        <AqiRankingTable
          title="Chất lượng không khí tại TP.HCM"
          subtitle="Dữ liệu từ OpenWeatherMap"
          leftHeader="Quận/Huyện"
          rightHeader="Quận/Huyện"
          mode="current"
        />
        <AqiRankingTable
          title="Dự đoán chất lượng không khí TP.HCM"
          subtitle="Dữ liệu dự đoán từ mô hình ML"
          leftHeader="Quận/Huyện"
          rightHeader="Quận/Huyện"
          mode="predict"
        />
      </div>
      <AqiLegend levels={aqiLevels} />
    </div>
  );
}
