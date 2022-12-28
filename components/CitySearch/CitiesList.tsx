import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import CitiesListContent from "./CitiesListContent";

type CitiesListProps = {
  cityIndex: number;
  cities: City[];
  error: Error;
  isInputEmptyString: boolean;
  isLoading: boolean;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  onError: () => void;
};

const Container = styled.div`
  width: 500px;
  margin-top: 100px;
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    grid-column: 1 / 4;
    width: 350px;
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    grid-column: 1 / 3;
    width: 250px;
  }
`;

const CitiesList = ({
  cities,
  error,
  isInputEmptyString,
  cityIndex,
  isLoading,
  setLatLon,
  setCity,
  onError,
}: CitiesListProps) => (
  <Container>
    <CitiesListContent
      cities={cities}
      cityIndex={cityIndex}
      isLoading={isLoading}
      error={error}
      setCity={setCity}
      setLatLon={setLatLon}
      onError={onError}
      isInputEmptyString={isInputEmptyString}
    />
  </Container>
);

export default CitiesList;
