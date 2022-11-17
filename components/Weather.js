import { Loader } from "react-feather";

import CurrentWeather from "./CurrentWeather";
import DailySummary from "./DailySummary";
import HourlySummary from "./HourlySummary";

const Weather = ({ weather, cityName, isMetric, setIsMetric }) => {
  if (!weather) {
    return (
      <div className="quick-fade spin">
        <Loader size={36} />
      </div>
    );
  }

  return (
    <>
      <p className="up-fade is-size-2">{cityName}</p>
      <CurrentWeather current={weather.current} isMetric={isMetric} />
      <DailySummary daily={weather.daily} isMetric={isMetric} />
      {/* <HourlySummary hourly={weather.hourly} isMetric={isMetric} /> */}
    </>
  );
};

export default Weather;
