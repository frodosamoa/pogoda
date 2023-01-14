import { KeyedMutator } from "swr";
import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import City from "./City";
import ErrorMessage from "./ErrorMessage";

import Loader from "@/components/Loader";
import { fadeIn } from "@/lib/constants/animations";

const NoResults = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[5]};
  align-self: center;

  opacity: 0;
  animation: 400ms cubic-bezier(0, 0, 0.16, 1) 100ms 1 normal forwards running
    ${fadeIn};
`;

const Container = styled.div`
  width: 400px;
  margin-top: 55px;
  min-height: 80px;
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  opacity: 0;
  animation: 200ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
  background-color: ${({ theme: { theme, colors } }) =>
    theme === "light" ? colors.greyLighter : colors.blackTer};
  padding: 8px;
  border-radius: 0px 0px 8px 8px;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    width: 250px;
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    width: 175px;
  }
`;

type CitiesListProps = {
  cityIndex: number;
  error: Error;
  cities: City[];
  isValidating: boolean;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  setInputValue: Dispatch<SetStateAction<string>>;
  setCities: KeyedMutator<City[]>;
};

const CitiesList = ({
  isValidating,
  error,
  cities,
  setCity,
  setLatLon,
  cityIndex,
  setCities,
  setInputValue,
}: CitiesListProps) => {
  if (isValidating) {
    return (
      <Container>
        <Loader />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <ErrorMessage setCities={setCities} />
      </Container>
    );
  }

  if (cities && cities?.length === 0) {
    return (
      <Container>
        <NoResults>no results</NoResults>
      </Container>
    );
  }

  if (!cities) return null;

  return (
    <Container>
      {cities?.map((city, index) => (
        <City
          key={city.cityId}
          city={city}
          isSelected={index === cityIndex}
          setLatLon={setLatLon}
          setCity={setCity}
          setCities={setCities}
          setInputValue={setInputValue}
        />
      ))}
    </Container>
  );
};

export default CitiesList;
