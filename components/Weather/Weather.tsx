import { Loader as LoaderIcon } from "react-feather";
import ADMIN_CODES from "../../constants/adminCodes";
import COUNTRIES from "../../constants/countries";

import CurrentWeather from "./CurrentWeather";
import DailySummary from "./DailySummary";

type WeatherProps = {
  city: City;
  isMetric: boolean;
  dailyForecastView: string;
  weather: Weather;
};

const Weather = ({
  weather,
  city,
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
      <div style={{ padding: 24 }}>
        <p className="up-fade is-size-2">{city.name}</p>
        <p className="up-fade is-size-3">
          {city.adminCode
            ? `${ADMIN_CODES[`${city.country}.${city.adminCode}`]}, `
            : ""}
          {COUNTRIES[city.country]}
        </p>
      </div>
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
