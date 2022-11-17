import {
  kelvinToFahrenheit,
  kelvinToCelcius,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../lib/weatherUtils";
import classnames from "classnames";
import { format } from "date-fns";

const HourSummary = ({ index, hour, count, isMetric }) => {
  const { weather: weatherArray, temp, dt: date } = hour;
  const weather = weatherArray[0];
  const isFirstDay = index === 0;
  const currentDate = new Date().getTime() / 1000;

  const isDay =
    (isFirstDay && (hour.sunrise > currentDate || currentDate < hour.sunset)) ||
    !isFirstDay;

  const iconClassName = classnames(weatherToIcon(weather.id, isDay), {
    "is-size-2": true,
  });
  const indexOffset = index + 1;
  const staggerNumber =
    indexOffset > count / 2 ? count - indexOffset + 1 : indexOffset;

  return (
    <div className={`column quick-fade-in stagger-quick-${staggerNumber}`}>
      <div>
        <p title={format(new Date(date * 1000), "PP")} className="is-size-4">
          {format(new Date(date * 1000), "ccc")}
        </p>
        <p className="is-size-6">{format(new Date(date * 1000), "MMM d")}</p>
        <br></br>
        <p>
          <i
            title={getWeatherCodeIconInfo(weather.id).label}
            className={iconClassName}
          ></i>
        </p>
        <br></br>
        <p className="is-size-6">
          {isMetric
            ? `${kelvinToCelcius(temp)}  °C`
            : `${kelvinToFahrenheit(temp)} °F`}
        </p>
      </div>
    </div>
  );
};

const HourlySummary = ({ hourly = [], isMetric }) => (
  <div className="section">
    <div
      className="columns is-centered is-2 is-variable"
      style={{ flexWrap: "wrap" }}
    >
      {hourly.map((h, index) => (
        <HourSummary
          key={index}
          count={hourly.length}
          index={index}
          hour={h}
          weather={h.weather[0]}
          temp={h.temp}
          date={h.dt}
          isMetric={isMetric}
        />
      ))}
    </div>
  </div>
);

export default HourlySummary;
