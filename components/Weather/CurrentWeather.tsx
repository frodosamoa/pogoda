import { format } from "date-fns";

import {
  METERS_TO_MILES,
  MM_TO_INCHES,
  MPS_TO_MPH,
} from "../../constants/conversion";
import {
  degreeToCompass,
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

const AdditionalInfo = ({ info }: { info: string[] }) => (
  <div>
    {info.map((i, index) => (
      <p key={index} className="is-size-4">
        {i}
      </p>
    ))}
  </div>
);

const getRainString = (rain: number | { "1h": number }, isMetric: boolean) => {
  let rainStr;
  if (typeof rain === "number") {
    rainStr = rain;
  }

  if (typeof rain === "object") {
    rainStr = rain["1h"] || 0;
  }

  rainStr = isMetric ? rainStr : rainStr * MM_TO_INCHES;

  return rainStr;
};

type CurrentWeatherProps = {
  current: CurrentWeather;
  isMetric: boolean;
};

const CurrentWeather = ({ current, isMetric }: CurrentWeatherProps) => {
  const {
    weather,
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
        `Visibility: ${Math.round(visibility * METERS_TO_MILES)} miles`
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
      `Wind: ${(windSpeed * MPS_TO_MPH).toFixed(1)}mph ${degreeToCompass(
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
          <LargeDailySummary current={current} isMetric={isMetric} />
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
