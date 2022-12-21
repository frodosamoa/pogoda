import styled from "styled-components";
import { weatherToIcon } from "../../../lib/utils/weather";

const Icon = styled.i`
  height: ${({ theme }) => theme.fontSizes[6]};
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
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

const Date = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const Temp = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

type HourForecastProps = {
  hour: HourlyForecast;
};

const HourForecast = ({ hour }: HourForecastProps) => (
  <Container>
    <Date>{hour.date}</Date>
    <Icon title={hour.label} className={weatherToIcon(hour.iconId, false)} />
    <Temp>{hour.temp}°</Temp>
  </Container>
);

export default HourForecast;
