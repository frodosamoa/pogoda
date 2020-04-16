import {
  degreeToCompass,
  kelvinToFahrenheit,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../lib/weather";
import { format } from "date-fns";

const LargeDailySummary = ({ weather, temp }) => {
  let weatherLabel = getWeatherCodeIconInfo(weather.id).label;
  weatherLabel = weatherLabel.charAt(0).toUpperCase() + weatherLabel.slice(1);

  return (
    <>
      <p className="is-size-1">
        <i className={weatherToIcon(weather.id)}></i> {kelvinToFahrenheit(temp)}{" "}
        °F
      </p>

      <p className="is-size-4">{format(new Date(), "EEEE p")}</p>
      <p className="is-size-4">{weatherLabel}</p>
    </>
  );
};

const AdditionalDailyInfo = ({ rain, humidity, windSpeed, windDegree }) => {
  let rainStr;
  if (typeof rain === "number") {
    rainStr = rain;
  }

  if (typeof rain === "object") {
    rainStr = rain["1h"] || rain["3h"];
  }

  return (
    <div>
      <p className="is-size-4">Precipitation: {rainStr}mm</p>
      <p className="is-size-4">Humidity: {humidity}%</p>
      <p className="is-size-4">
        Wind: {degreeToCompass(windDegree)} {windSpeed} mph
      </p>
    </div>
  );
};

const DayWeather = ({ current }) => {
  const {
    weather,
    temp,
    wind_speed: windSpeed,
    wind_deg: windDegree,
    humidity,
    rain = 0,
  } = current;

  if (!weather) {
    return null;
  }

  return (
    <div className="section">
      <div className="columns is-centered is-v-centered">
        <div className="column">
          <LargeDailySummary weather={weather && weather[0]} temp={temp} />
        </div>
        <div
          className="column"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AdditionalDailyInfo
            windSpeed={windSpeed}
            windDegree={windDegree}
            humidity={humidity}
            rain={rain}
          />
        </div>
      </div>
    </div>
  );
};

export default DayWeather;
