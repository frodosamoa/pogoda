import styled from "styled-components";
import { CalendarDays } from "lucide-react";
import chroma from "chroma-js";
import { fadeIn } from "../../../lib/constants/animations";
import DayForecast from "./DayForecast";

type DailyForecastProps = {
  daily: DailyForecast[];
  isMetric: boolean;
  dailyForecastView: string;
};

const Container = styled.div`
  grid-column: 1 / 3;
  grid-row: 2 / 5;
  padding: 8px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  opacity: 0;

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "yellow" || theme === "light"
      ? chroma(colors.greyDark).alpha(0.3).css()
      : chroma(colors.whiteTer).alpha(0.3).css()};

  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 600ms 1 normal forwards running
    ${fadeIn};
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 4px;
`;

const Title = styled.div`
  text-align: start;
  font-size: ${({ theme }) => theme.fontSizes[7]};
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

function withIconStyles<T>(Component: React.ComponentType<T>) {
  return styled(Component)`
    margin-right: 6px;
    width: ${({ theme }) => theme.fontSizes[7]};
    height: ${({ theme }) => theme.fontSizes[7]};
  `;
}

const DailyForecast = ({
  daily = [],
  isMetric,
  dailyForecastView,
}: DailyForecastProps) => {
  const StyledIcon = withIconStyles(CalendarDays);
  const minTemp = Math.min(...daily.map((day) => day.temp.min));
  const maxTemp = Math.max(...daily.map((day) => day.temp.max));
  return (
    <Container>
      <TitleContainer>
        <StyledIcon />
        <Title>Daily Forecast</Title>
      </TitleContainer>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {daily.map((day, index) => (
          <DayForecast
            key={index}
            index={index}
            day={day}
            isMetric={isMetric}
            dailyForecastView={dailyForecastView}
            minTemp={minTemp}
            maxTemp={maxTemp}
          />
        ))}
      </div>
    </Container>
  );
};

export default DailyForecast;
