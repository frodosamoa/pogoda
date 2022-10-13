import {
  kelvinToFahrenheit,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../lib/weatherUtils";
import classnames from "classnames";
import { format } from "date-fns";
import { useState } from "react";

const DaySummaryContainer = ({ children, isActive }) => (
  <div>
    {children}
    <style jsx>{`
       {
        padding-top: 12px;
        padding-bottom: 12px;
        cursor: pointer;
      }

      ${isActive &&
      `
          background-color: hsl(0, 0%, 29%);
          border-radius: 0.75rem;
        `}
    `}</style>
  </div>
);

const DaySummary = ({
  index,
  day,
  count,
  setSelectedDayIndex,
  selectedDayIndex,
}) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const { weather: weatherArray, temp, dt: date } = day;
  const weather = weatherArray[0];
  const isFirstDay = index === 0;
  const isActive =
    index === selectedDayIndex || (selectedDayIndex === null && isFirstDay);
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
    <div
      className={`column quick-fade stagger-quick-${staggerNumber}`}
      onClick={() => setSelectedDayIndex(index)}
      onMouseEnter={() => setHoveredDay(index)}
      onMouseLeave={() => setHoveredDay(null)}
    >
      <DaySummaryContainer isActive={isActive}>
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

const WeekSummary = ({ daily = [], setSelectedDayIndex, selectedDayIndex }) => (
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
          setSelectedDayIndex={setSelectedDayIndex}
          selectedDayIndex={selectedDayIndex}
        />
      ))}
    </div>
  </div>
);

export default WeekSummary;
