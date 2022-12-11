import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { fadeIn } from "../../constants/animations";
import Loader from "../Loader";
import City from "./City";

type CitiesListProps = {
  cityIndex: number;
  cities: City[];
  isInputEmptyString: boolean;
  isLoading: boolean;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const Container = styled.div`
  width: 450px;
  margin-top: 100px;
  position: absolute;
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoaderContainer = styled.div`
  margin-top: ${({ theme }) => theme.units.lg}px;
  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
`;

const CitiesList = ({
  cities,
  isInputEmptyString,
  cityIndex,
  isLoading,
  setLatLon,
  setCity,
}: CitiesListProps) => (
  <Container>
    {isLoading ? (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    ) : (
      <>
        {cities.map((city, index) => (
          <City
            key={index}
            city={city}
            isSelected={index === cityIndex}
            setLatLon={setLatLon}
            setCity={setCity}
          />
        ))}
        {cities.length === 0 && !isInputEmptyString && (
          <p className="is-size-4">no results</p>
        )}
      </>
    )}
  </Container>
);

export default CitiesList;
