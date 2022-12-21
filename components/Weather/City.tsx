import styled from "styled-components";

import { fadeUp } from "../../lib/constants/animations";

const Container = styled.div`
  padding-bottom: 24px;
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
  current: CurrentWeather;
};

const City = ({ city, current }: CityProps) => {
  if (!city) return null;

  return (
    <Container>
      <Name>{city.name}</Name>
      <Temperature>{current.temp}°</Temperature>
      <Label>{current.label}</Label>
    </Container>
  );
};

export default City;
