import { Loader as LoaderIcon } from "react-feather";

import CurrentWeather from "./CurrentWeather";
import DailySummary from "./DailySummary";
import HourlySummary from "./HourlySummary";

const Weather = ({ weather, cityName, isMetric, dailyForecastView }) => {
  if (!weather) {
    return (
      <div className="quick-fade-in spin">
        <LoaderIcon size={36} />
      </div>
    );
  }

  return (
    <>
      <p className="up-fade is-size-2">{cityName}</p>
      <CurrentWeather current={weather.current} isMetric={isMetric} />
      <DailySummary
        daily={weather.daily}
        isMetric={isMetric}
        dailyForecastView={dailyForecastView}
      />
      {/* <HourlySummary hourly={weather.hourly} isMetric={isMetric} /> */}
    </>
  );
};

export default Weather;
