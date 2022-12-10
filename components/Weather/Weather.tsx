import { Loader as LoaderIcon } from "react-feather";

import CurrentWeather from "./CurrentWeather";
import DailySummary from "./DailySummary";

type WeatherProps = {
  cityName: string;
  isMetric: boolean;
  dailyForecastView: string;
  weather: Weather;
};

const Weather = ({
  weather,
  cityName,
  isMetric,
  dailyForecastView,
}: WeatherProps) => {
  if (!weather) {
    return (
      <div className="quick-fade-in">
        <LoaderIcon size={36} className="spin" />
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
    </>
  );
};

export default Weather;
