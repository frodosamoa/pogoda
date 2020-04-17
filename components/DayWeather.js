import {
  degreeToCompass,
  kelvinToFahrenheit,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../lib/weather";
import { format } from "date-fns";

const LargeDailySummary = ({ date, weather, temp, isCurrentDay }) => {
  let weatherLabel = getWeatherCodeIconInfo(weather.id).label;
  weatherLabel = weatherLabel.charAt(0).toUpperCase() + weatherLabel.slice(1);

  return (
    <>
      <p className="is-size-1">
        <i className={weatherToIcon(weather.id)}></i> {kelvinToFahrenheit(temp)}{" "}
        °F
      </p>

      <p className="is-size-4">
        {format(new Date(date * 1000), "EEEE" + (isCurrentDay ? " p" : ""))}
      </p>
      <p className="is-size-4">{weatherLabel}</p>
    </>
  );
};

const AdditionalDailyInfoOne = ({ sunrise, sunset, visibility }) => {
  return (
    <div>
      <p className="is-size-4">
        Sunrise: ↑{format(new Date(sunrise * 1000), "pp")}
      </p>
      <p className="is-size-4">
        Sunset: ↓{format(new Date(sunset * 1000), "pp")}
      </p>
      {visibility && (
        <p className="is-size-4">
          Visibility: {Math.round(visibility / 1000)} km
        </p>
      )}
    </div>
  );
};

const AdditionalDailyInfo = ({ rain, humidity, windSpeed, windDegree }) => {
  let rainStr;
  if (typeof rain === "number") {
    rainStr = rain;
  }

  if (typeof rain === "object") {
    rainStr = rain["1h"] || rain["3h"] || 0;
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

const DayWeather = ({ current, isCurrentDay }) => {
  const {
    dt: date,
    weather,
    temp,
    wind_speed: windSpeed,
    wind_deg: windDegree,
    humidity,
    rain = 0,
    sunrise,
    sunset,
    visibility,
  } = current;

  if (!weather) {
    return null;
  }

  return (
    <div className="section">
      <div className="columns is-centered is-v-centered">
        <div
          className="column up-fade stagger-up-2"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AdditionalDailyInfoOne
            sunset={sunset}
            sunrise={sunrise}
            visibility={visibility}
          />
        </div>
        <div className="column up-fade">
          <LargeDailySummary
            isCurrentDay={isCurrentDay}
            weather={weather && weather[0]}
            date={date}
            temp={temp}
          />
        </div>
        <div
          className="column up-fade stagger-up-2"
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
