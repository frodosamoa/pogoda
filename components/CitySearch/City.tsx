import { Dispatch, SetStateAction } from "react";
import chroma from "chroma-js";
import styled from "styled-components";

import { fadeIn } from "@/lib/constants/animations";

type CityProps = {
  city: City;
  isSelected: boolean;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  setInputValue: Dispatch<SetStateAction<string>>;
  setCities: Dispatch<SetStateAction<[] | City[]>>;
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
  font-size: 18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  opacity: 0;
  width: 100%;
  animation: 100ms cubic-bezier(0, 0, 0.16, 1) 0ms 1 normal forwards running
    ${fadeIn};
  ${({ $isSelected }) =>
    $isSelected ? "transition: background-color 150ms ease-in-out;" : ""}

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

const CountryName = styled.span`
  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    display: none;
  }
`;

const CountryCode = styled.span`
  @media screen and (min-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    display: none;
  }
`;

const City = ({
  city,
  isSelected,
  setLatLon,
  setCity,
  setInputValue,
}: CityProps) => (
  <Container
    title={`${city.name}, ${
      city.administrativeName ? `${city.administrativeName}, ` : ""
    }${city.countryName}`}
    $isSelected={isSelected}
    onClick={() => {
      setInputValue("");
      setLatLon([city.latitude, city.longitude]);
      setCity(city);
    }}
  >
    {city.name},{" "}
    <AdministrativeName>
      {city.administrativeName ? `${city.administrativeName}, ` : ""}
    </AdministrativeName>{" "}
    <CountryName>{city.countryName}</CountryName>
    <CountryCode>{city.countryCode}</CountryCode>
  </Container>
);

export default City;
