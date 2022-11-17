import {
  kelvinToFahrenheit,
  kelvinToCelcius,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../lib/weatherUtils";
import classnames from "classnames";
import { format } from "date-fns";

const DaySummaryContainer = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
       {
        padding-top: 12px;
        padding-bottom: 12px;
        cursor: pointer;
      }
    `}</style>
  </div>
);

const DaySummary = ({ index, day, count, isMetric }) => {
  const { weather: weatherArray, temp, dt: date } = day;
  const weather = weatherArray[0];
  const isFirstDay = index === 0;
  const currentDate = new Date().getTime() / 1000;

  const isDay =
    (isFirstDay && (day.sunrise > currentDate || currentDate < day.sunset)) ||
    !isFirstDay;

  const iconClassName = classnames(weatherToIcon(weather.id, isDay), {
    "is-size-2": true,
  });
  const indexOffset = index + 1;
  const staggerNumber =
    indexOffset > count / 2 ? count - indexOffset + 1 : indexOffset;

  return (
    <div className={`column quick-fade stagger-quick-${staggerNumber}`}>
      <DaySummaryContainer>
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
        <p className="is-size-4">
          {isMetric
            ? `${kelvinToCelcius(temp.max)}  °C`
            : `${kelvinToFahrenheit(temp.max)} °F`}
        </p>
        <p className="is-size-6">
          {isMetric
            ? `${kelvinToCelcius(temp.min)}  °C`
            : `${kelvinToFahrenheit(temp.min)} °F`}
        </p>
      </DaySummaryContainer>
    </div>
  );
};

const DailySummary = ({ daily = [], isMetric }) => (
  <div className="section">
    <div className="columns is-centered is-2 is-variable">
      {daily.map((d, index) => (
        <DaySummary
          key={index}
          count={daily.length}
          index={index}
          day={d}
          weather={d.weather[0]}
          temp={d.temp}
          date={d.dt}
          isMetric={isMetric}
        />
      ))}
    </div>
  </div>
);

export default DailySummary;
