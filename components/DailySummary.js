import {
  kelvinToFahrenheit,
  kelvinToCelcius,
  weatherToIcon,
  getWeatherCodeIconInfo,
  degreeToCompass,
} from "../lib/weatherUtils";
import classnames from "classnames";
import { format } from "date-fns";

const DaySummary = ({ index, day, count, isMetric, dailyForecastView }) => {
  const {
    weather: weatherArray,
    temp,
    dt: date,
    rain,
    wind_speed: windSpeed,
    wind_deg: windDegree,
  } = day;
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
        <div>
          {dailyForecastView === "temperature" && (
            <>
              <p className="is-size-4">
                {isMetric
                  ? `${kelvinToCelcius(temp.max)} °C`
                  : `${kelvinToFahrenheit(temp.max)} °F`}
              </p>
              <p className="is-size-6">
                {isMetric
                  ? `${kelvinToCelcius(temp.min)} °C`
                  : `${kelvinToFahrenheit(temp.min)} °F`}
              </p>
            </>
          )}
          {dailyForecastView === "precipitation" && (
            <p className="is-size-6">
              {isMetric
                ? (rain ?? 0).toFixed(1)
                : ((rain ?? 0) * 0.03937008).toFixed(1)}
              {isMetric ? "mm" : " inches"}
            </p>
          )}
          {dailyForecastView === "wind" && (
            <>
              <p className="is-size-6">
                {isMetric
                  ? `${windSpeed.toFixed(1)}m/s`
                  : `${(windSpeed * 2.236936).toFixed(1)}mph`}
              </p>
              <p className="is-size-6">{degreeToCompass(windDegree)}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const DailySummary = ({ daily = [], isMetric, dailyForecastView }) => (
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
          dailyForecastView={dailyForecastView}
        />
      ))}
    </div>
  </div>
);

export default DailySummary;
