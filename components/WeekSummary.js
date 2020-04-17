import {
  kelvinToFahrenheit,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../lib/weather";
import classnames from "classnames";
import { format, addDays } from "date-fns";
import styled from "styled-components";

const DaySummaryContainer = styled.div`
  padding-top: 12px;
  padding-bottom: 12px;
  cursor: pointer;

  ${({ isActive }) =>
    isActive &&
    `
      background-color: hsl(0, 0%, 29%);
      border-radius: 0.75rem;
    `}
`;

const DaySummary = ({
  index,
  date,
  weather,
  temp,
  setSelectedDayIndex,
  selectedDayIndex,
}) => {
  const iconClassName = classnames(weatherToIcon(weather.id), {
    "is-size-2": true,
  });

  return (
    <div
      className={`column quick-fade stagger-quick-${index + 1}`}
      onClick={() => setSelectedDayIndex(index)}
    >
      <DaySummaryContainer
        isActive={
          index === selectedDayIndex ||
          (selectedDayIndex === null && index === 0)
        }
      >
        <p title={format(new Date(date * 1000), "PP")} className="is-size-4">
          {format(new Date(date * 1000), "ccc")}
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

const WeekSummary = ({ daily, setSelectedDayIndex, selectedDayIndex }) => (
  <div className="section">
    <div className="columns is-centered is-2 is-variable">
      {daily.map((d, index) => (
        <DaySummary
          key={index}
          index={index}
          weather={d.weather[0]}
          temp={d.temp}
          date={d.dt}
          setSelectedDayIndex={setSelectedDayIndex}
          selectedDayIndex={selectedDayIndex}
        />
      ))}
    </div>
  </div>
);

export default WeekSummary;
