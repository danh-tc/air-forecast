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
        <AqiMap mapTitle="Current AQI levels across all districts in Ho Chi Minh City" />
        <PredictAqiMap mapTitle="Next-Hour AQI Predictions for All Districts in Ho Chi Minh City" />
      </div>
      <div className="two-cols-container">
        <AqiRankingTable
          title="Current AQI levels across all districts in Ho Chi Minh City"
          subtitle="Data from OpenWeatherMap Apis"
          leftHeader="District"
          rightHeader="District"
          mode="current"
        />
        <AqiRankingTable
          title="Next-Hour AQI Predictions for All Districts in Ho Chi Minh City"
          subtitle="Data from the Next-Hour AQI Prediction Model"
          leftHeader="District"
          rightHeader="District"
          mode="predict"
        />
      </div>
      <AqiLegend levels={aqiLevels} />
    </div>
  );
}
