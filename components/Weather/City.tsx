import styled from "styled-components";

import { fadeUp } from "../../lib/constants/animations";
import {
  kelvinToFahrenheit,
  kelvinToCelcius,
  getWeatherCodeIconInfo,
} from "../../lib/utils/weather";

const Container = styled.div`
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0;

  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeUp};
`;

const Temperature = styled.div`
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes[0]};
`;

const Label = styled.div`
  line-height: 1;
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSizes[5]};
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[3]};
`;

type CityProps = {
  city?: City;
  isMetric: boolean;
  weather: Weather;
};

const City = ({ city, weather, isMetric }: CityProps) => {
  if (!city) return null;

  const { weather: currentWeather, temp } = weather.current;
  const weatherIconInfo = currentWeather && currentWeather[0];
  let weatherLabel = getWeatherCodeIconInfo(weatherIconInfo.id).label;
  weatherLabel = weatherLabel.charAt(0).toUpperCase() + weatherLabel.slice(1);

  return (
    <Container>
      <Name>{city.name}</Name>
      <Temperature>
        {isMetric ? kelvinToCelcius(temp) : kelvinToFahrenheit(temp)}°
      </Temperature>
      <Label>{weatherLabel}</Label>
    </Container>
  );
};

export default City;
