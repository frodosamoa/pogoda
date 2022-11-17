import {
  degreeToCompass,
  kelvinToFahrenheit,
  kelvinToCelcius,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../lib/weatherUtils";
import { format } from "date-fns";

const LargeDailySummary = ({ date, weather, temp, isDay, isMetric }) => {
  let weatherLabel = getWeatherCodeIconInfo(weather.id).label;
  weatherLabel = weatherLabel.charAt(0).toUpperCase() + weatherLabel.slice(1);

  return (
    <>
      <p className="is-size-1">
        <i className={weatherToIcon(weather.id, isDay)}></i>{" "}
        {isMetric
          ? `${kelvinToCelcius(temp)} °C`
          : `${kelvinToFahrenheit(temp)} °F`}
      </p>

      <p className="is-size-4">{format(new Date(date * 1000), `EEEE p`)}</p>
      <p className="is-size-4">{format(new Date(date * 1000), `MMM d`)}</p>
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

const getRainString = (rain, isMetric) => {
  let rainStr;
  if (typeof rain === "number") {
    rainStr = rain;
  }

  if (typeof rain === "object") {
    rainStr = rain["1h"] || rain["3h"] || 0;
  }

  rainStr = isMetric ? rainStr : rainStr * 0.03937008;

  return rainStr;
};

const CurrentWeather = ({ current, isMetric }) => {
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
    if (isMetric) {
      additionalInfo.push(`Visibility: ${Math.round(visibility / 1000)} km`);
    } else {
      additionalInfo.push(
        `Visibility: ${Math.round(visibility * 0.000621371192)} miles`
      );
    }
  }

  const additionalInfoTwo = [
    `Precipitation: ${getRainString(rain, isMetric)}${
      isMetric ? "mm" : " inches"
    }`,
    `Humidity: ${humidity}%`,
  ];

  if (isMetric) {
    additionalInfoTwo.push(
      `Wind: ${windSpeed.toFixed(1)}m/s ${degreeToCompass(windDegree)}`
    );
  } else {
    additionalInfoTwo.push(
      `Wind: ${(windSpeed * 2.236936).toFixed(1)}mph ${degreeToCompass(
        windDegree
      )}`
    );
  }

  return (
    <div className="section">
      <div style={{ display: "flex", alignItems: "center" }}>
        <div
          className="up-fade stagger-up-2"
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AdditionalInfo info={additionalInfo} />
        </div>
        <div className="up-fade" style={{ flex: 1 }}>
          <LargeDailySummary
            weather={weather && weather[0]}
            date={date}
            temp={temp}
            isDay={date > sunrise && date < sunset}
            isMetric={isMetric}
          />
        </div>
        <div
          className="up-fade stagger-up-2"
          style={{
            flex: 1,
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

export default CurrentWeather;
