import { Dispatch, SetStateAction } from "react";
import chroma from "chroma-js";
import styled from "styled-components";

import { getCityLabel } from "../../lib/weatherUtils";

type CityProps = {
  city: City;
  isSelected: boolean;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

type ContainerProps = {
  $isSelected: boolean;
};

const Container = styled.div<ContainerProps>`
  cursor: pointer;
  background-color: ${({ $isSelected, theme }) =>
    $isSelected
      ? chroma(theme.themes[theme.theme]).darken(0.5).css()
      : "inherit"};
  padding: 4px;
  border-radius: 6px;
  transition: background-color 150ms ease-in-out;
`;

const City = ({ city, isSelected, setLatLon, setCity }: CityProps) => (
  <Container
    $isSelected={isSelected}
    onClick={() => {
      setLatLon(city.loc.coordinates);
      setCity(city);
    }}
  >
    {getCityLabel(city)}
  </Container>
);

export default City;
