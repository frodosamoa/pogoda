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
  background-color: ${({ $isSelected, theme: { theme, colors } }) =>
    $isSelected
      ? theme === "light"
        ? chroma(colors.greyDark).alpha(0.3).css()
        : chroma(colors.whiteTer).alpha(0.3).css()
      : "inherit"};
  padding: 4px 6px;
  margin-bottom: 2px;
  border-radius: 6px;
  transition: background-color 150ms ease-in-out;
  font-size: 18px;
  max-width: 500px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    grid-column: 1 / 4;
    max-width: 350px;
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    grid-column: 1 / 3;
    max-width: 250px;
  }
`;

const AdministrativeName = styled.span`
  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    display: none;
  }
`;

const City = ({ city, isSelected, setLatLon, setCity }: CityProps) => (
  <Container
    $isSelected={isSelected}
    onClick={() => {
      setLatLon([city.latitude, city.longitude]);
      setCity(city);
    }}
  >
    {city.name},{" "}
    <AdministrativeName>
      {city.administrativeName ? `${city.administrativeName}, ` : ""}
    </AdministrativeName>{" "}
    {city.countryName}
  </Container>
);

export default City;
