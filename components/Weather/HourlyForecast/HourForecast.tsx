import styled from "styled-components";
import { Sunrise, Sunset } from "lucide-react";

const Container = styled.div<{ $wider: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  height: 100%;
  flex: ${({ $wider }) => ($wider ? "0 0 11.1%" : "0 0 8.33%")};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    flex: ${({ $wider }) => ($wider ? "0 0 16.66%" : "0 0 11.1%")};
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    flex: ${({ $wider }) => ($wider ? "0 0 25%" : "0 0 16.6%")};
  }
`;

const Date = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const Icon = styled.i`
  height: ${({ theme }) => theme.fontSizes[6]};
  font-size: ${({ theme }) => theme.fontSizes[6]};
`;

const Temp = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

const PercentChance = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[9]};
`;

const SunriseSunset = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[7]};
`;

type HourForecastProps = {
  hour: HourlyForecast | SunriseSunset;
};

const Hour = ({ hour }: { hour: HourlyForecast }) => (
  <>
    <div>
      <Icon title={hour.label} className={hour.iconClassName} />
      {hour.precipitationChance > 0 && (
        <PercentChance>{hour.precipitationChance}%</PercentChance>
      )}
    </div>
    <Temp>{hour.temp}°</Temp>
  </>
);

const SunriseSunsetComponent = ({ hour }: { hour: SunriseSunset }) => (
  <>
    <div>
      {hour.type === "Sunrise" && <Sunrise size={24} />}
      {hour.type === "Sunset" && <Sunset />}
    </div>
    <SunriseSunset>{hour.type}</SunriseSunset>
  </>
);

const HourForecast = ({ hour }: HourForecastProps) => (
  <Container $wider={Boolean((hour as SunriseSunset).type)}>
    <Date>{hour.date}</Date>
    {!(hour as SunriseSunset).type ? (
      <Hour hour={hour as HourlyForecast} />
    ) : (
      <SunriseSunsetComponent hour={hour as SunriseSunset} />
    )}
  </Container>
);

export default HourForecast;
