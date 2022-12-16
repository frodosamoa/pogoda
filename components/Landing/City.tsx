import { Dispatch, SetStateAction } from "react";
import chroma from "chroma-js";
import styled from "styled-components";

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
  padding: 4px 6px;
  margin-bottom: 2px;
  border-radius: 6px;
  transition: background-color 150ms ease-in-out;
  font-size: 18px;
`;

const City = ({ city, isSelected, setLatLon, setCity }: CityProps) => (
  <Container
    $isSelected={isSelected}
    onClick={() => {
      setLatLon([city.latitude, city.longitude]);
      setCity(city);
    }}
  >
    {city.name}, {city.administrativeName ? `${city.administrativeName}, ` : ""}{" "}
    {city.countryName}
  </Container>
);

export default City;
