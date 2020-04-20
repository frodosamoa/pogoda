import {
  degreeToCompass,
  kelvinToFahrenheit,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../lib/weatherUtils";
import { format } from "date-fns";

const LargeDailySummary = ({ date, weather, temp, isCurrentDay, isDay }) => {
  let weatherLabel = getWeatherCodeIconInfo(weather.id).label;
  weatherLabel = weatherLabel.charAt(0).toUpperCase() + weatherLabel.slice(1);

  return (
    <>
      <p className="is-size-1">
        <i className={weatherToIcon(weather.id, isDay)}></i>{" "}
        {kelvinToFahrenheit(temp)} °F
      </p>

      <p className="is-size-4">
        {format(new Date(date * 1000), "EEEE" + (isCurrentDay ? " p" : ""))}
      </p>
      <p className="is-size-4">{weatherLabel}</p>
    </>
  );
};

const AdditionalInfo = ({ info }) => (
  <div>
    {info.map((i, index) => (
      <p key={index} className="is-size-4">
        {i}
      </p>
    ))}
  </div>
);

const getRainString = (rain) => {
  let rainStr;
  if (typeof rain === "number") {
    rainStr = rain;
  }

  if (typeof rain === "object") {
    rainStr = rain["1h"] || rain["3h"] || 0;
  }

  return rainStr;
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

  const additionalInfo = [
    `Sunrise: ↑${format(new Date(sunrise * 1000), "pp")}`,
    `Sunset: ↓${format(new Date(sunset * 1000), "pp")}`,
  ];
  if (visibility) {
    additionalInfo.push(`Visibility: ${Math.round(visibility / 1000)} km`);
  }

  const additionalInfoTwo = [
    `Precipitation: ${getRainString(rain)}mm`,
    `Humidity: ${humidity}%`,
    `Wind: ${degreeToCompass(windDegree)} ${windSpeed} mph`,
  ];

  return (
    <div className="section">
      <div className="columns is-centered is-v-centered">
        <div
          className="column up-fade stagger-up-2 has-text-grey-light"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AdditionalInfo info={additionalInfo} />
        </div>
        <div className="column up-fade">
          <LargeDailySummary
            isCurrentDay={isCurrentDay}
            weather={weather && weather[0]}
            date={date}
            temp={temp}
            isDay={date > sunrise && date < sunset}
          />
        </div>
        <div
          className="column up-fade stagger-up-2 has-text-grey-light"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AdditionalInfo info={additionalInfoTwo} />
        </div>
      </div>
    </div>
  );
};

export default DayWeather;
