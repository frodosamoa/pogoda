import styled from "styled-components";

import { fadeUp } from "@/lib/constants/animations";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  height: 200px;
  background-color: ${({ theme: { theme, themes } }) => themes[theme]};
  transition: background-color 150ms ease-in-out;

  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeUp};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    height: 160px;
  }
`;

const Temperature = styled.div`
  line-height: 1;
  font-size: ${({ theme }) => theme.fontSizes[0]};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    font-size: ${({ theme }) => theme.fontSizes[1]};
  }
`;

const Label = styled.div`
  line-height: 1;
  margin-top: 8px;
  font-size: ${({ theme }) => theme.fontSizes[5]};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    font-size: ${({ theme }) => theme.fontSizes[6]};
  }
`;

const Name = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[3]};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    font-size: ${({ theme }) => theme.fontSizes[4]};
  }
`;

const HL = styled.div`
  margin-top: 4px;
  font-weight: 500;
  font-size: ${({ theme }) => theme.fontSizes[6]};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    font-size: ${({ theme }) => theme.fontSizes[7]};
  }
`;

type CityProps = {
  city?: City;
  current: CurrentWeather;
  min: number;
  max: number;
};

const City = ({ city, current, min, max }: CityProps) => (
  <Container>
    {city?.name && <Name>{city.name}</Name>}
    <Temperature>{current.temp}°</Temperature>
    <Label>{current.label}</Label>
    <HL>
      H:{max}° L:{min}°
    </HL>
  </Container>
);

export default City;
