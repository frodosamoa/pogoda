import { format } from "date-fns";

import {
  kelvinToFahrenheit,
  kelvinToCelcius,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../../lib/weatherUtils";

type LargeDailySummaryProps = {
  current: CurrentWeather;
  isMetric: boolean;
};

const LargeDailySummary = ({ current, isMetric }: LargeDailySummaryProps) => {
  const { dt, sunrise, sunset, weather, temp } = current;
  const weatherIconInfo = weather && weather[0];
  let weatherLabel = getWeatherCodeIconInfo(weatherIconInfo.id).label;
  weatherLabel = weatherLabel.charAt(0).toUpperCase() + weatherLabel.slice(1);

  const isDay = dt > sunrise && dt < sunset;

  return (
    <>
      <p className="is-size-1">
        <i className={weatherToIcon(weatherIconInfo.id, isDay)}></i>{" "}
        {isMetric
          ? `${kelvinToCelcius(temp)} °C`
          : `${kelvinToFahrenheit(temp)} °F`}
      </p>

      <p className="is-size-4">{format(new Date(dt * 1000), `EEEE p`)}</p>
      <p className="is-size-4">{format(new Date(dt * 1000), `MMM d`)}</p>
      <p className="is-size-4">{weatherLabel}</p>
    </>
  );
};

export default LargeDailySummary;
