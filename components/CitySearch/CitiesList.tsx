import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { fadeIn } from "../../lib/constants/animations";

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
  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 0ms 1 normal forwards running
    ${fadeIn};
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
