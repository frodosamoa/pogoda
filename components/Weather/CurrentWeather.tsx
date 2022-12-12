import styled from "styled-components";
import { format } from "date-fns";

import {
  METERS_TO_MILES,
  MM_TO_INCHES,
  MPS_TO_MPH,
} from "../../lib/constants/conversion";
import { degreeToCompass } from "../../lib/utils/weather";
import { fadeUp } from "../../lib/constants/animations";

import LargeDailySummary from "./LargeDailySummary";

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

const StyledDiv = styled.div<{ $animationDelay: number }>`
  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeUp};
  animation-delay: ${({ $animationDelay = 200 }) => $animationDelay}ms;
`;

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

  const additionalInfo = [];
  if (sunrise) {
    additionalInfo.push(`Sunrise: ↑${format(new Date(sunrise * 1000), "pp")}`);
  }
  if (sunset) {
    additionalInfo.push(`Sunset: ↓${format(new Date(sunset * 1000), "pp")}`);
  }
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
    <div style={{ padding: 24 }}>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}>
        <StyledDiv
          $animationDelay={600}
          style={{
            display: "flex",
            flex: 1,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AdditionalInfo info={additionalInfo} />
        </StyledDiv>
        <StyledDiv $animationDelay={200} style={{ flex: 1 }}>
          <LargeDailySummary current={current} isMetric={isMetric} />
        </StyledDiv>
        <StyledDiv
          $animationDelay={600}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AdditionalInfo info={additionalInfoTwo} />
        </StyledDiv>
      </div>
    </div>
  );
};

export default CurrentWeather;
