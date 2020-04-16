import {
  kelvinToFahrenheit,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../lib/weather";
import classnames from "classnames";
import { format, addDays } from "date-fns";
import styled from "styled-components";

const DaySummaryContainer = styled.div`
  // background-color: hsl(0, 0%, 29%);
  // border-radius: 0.75rem;
`;

const DaySummary = ({ index, weather, temp }) => {
  const iconClassName = classnames(weatherToIcon(weather.id), {
    "is-size-2": true,
  });

  return (
    <div className={"column"}>
      <DaySummaryContainer>
        <p
          title={format(addDays(new Date(), index), "PP")}
          className="is-size-4"
        >
          {format(addDays(new Date(), index), "ccc")}
        </p>
        <br></br>
        <p>
          <i
            title={getWeatherCodeIconInfo(weather.id).label}
            className={iconClassName}
          ></i>
        </p>
        <br></br>
        <p className="is-size-4">{kelvinToFahrenheit(temp.max)}°</p>
        <p className="is-size-6">{kelvinToFahrenheit(temp.min)}°</p>
      </DaySummaryContainer>
    </div>
  );
};

const WeekSummary = ({ daily }) => (
  <div className="section">
    <div className="columns is-centered is-2 is-variable">
      {daily.map((d, index) => (
        <DaySummary
          key={index}
          index={index}
          weather={d.weather[0]}
          temp={d.temp}
        />
      ))}
    </div>
  </div>
);

export default WeekSummary;
