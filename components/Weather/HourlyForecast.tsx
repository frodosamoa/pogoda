import { formatInTimeZone } from "date-fns-tz";
import styled from "styled-components";
import chroma from "chroma-js";
import { Clock } from "lucide-react";
import {
  getWeatherCodeIconInfo,
  kelvinToCelcius,
  kelvinToFahrenheit,
  weatherToIcon,
} from "../../lib/utils/weather";
import { fadeIn } from "../../lib/constants/animations";

type HourlyForecastProps = {
  hourly: HourlyForecast[];
  isMetric: boolean;
  timezone: string;
};

const Icon = styled.i`
  height: ${({ theme }) => theme.fontSizes[6]};
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const Container = styled.div`
  grid-column: 1 / 5;
  grid-row: 1;
  padding: 8px;
  border-radius: 8px;
  overflow: scroll;
  opacity: 0;

  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 400ms 1 normal forwards running
    ${fadeIn};

  background-color: ${({ theme: { theme, colors } }) =>
    theme === "yellow" || theme === "light"
      ? chroma(colors.greyDark).alpha(0.3).css()
      : chroma(colors.whiteTer).alpha(0.3).css()};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    grid-column: 1 / 4;
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    grid-column: 1 / 3;
  }
`;

const Hour = styled.div`
  flex: 0 0 8.33%;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    flex: 0 0 11.11%;
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    flex: 0 0 16.66%;
  }
`;

const HourContainer = styled.div`
  display: flex;
  overflow: scroll;
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

const HourlyForecast = ({
  hourly = [],
  isMetric,
  timezone,
}: HourlyForecastProps) => {
  const StyledIcon = withIconStyles(Clock);
  return (
    <Container>
      <TitleContainer>
        <StyledIcon />
        <Title>Hourly Forecast</Title>
      </TitleContainer>
      <HourContainer>
        {hourly.map((hour, index) => (
          <Hour key={index}>
            <div>
              {index === 0
                ? "Now"
                : formatInTimeZone(new Date(hour.dt * 1000), timezone, "HH")}
            </div>
            <Icon
              title={getWeatherCodeIconInfo(hour.weather[0].id).label}
              className={weatherToIcon(hour.weather[0].id, false)}
            />
            <div>
              {isMetric
                ? kelvinToCelcius(hour.temp)
                : kelvinToFahrenheit(hour.temp)}
              °
            </div>
          </Hour>
        ))}
      </HourContainer>
    </Container>
  );
};

export default HourlyForecast;
