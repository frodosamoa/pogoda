import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import { fadeIn } from "../../lib/constants/animations";
import Loader from "../Loader";

import City from "./City";
import ErrorMessage from "./ErrorMessage";

const LoaderContainer = styled.div`
  margin-top: ${({ theme }) => theme.units.lg}px;
  opacity: 0;
  animation: 500ms cubic-bezier(0, 0, 0.16, 1) 200ms 1 normal forwards running
    ${fadeIn};
`;

const NoResults = styled.p`
  font-size: ${({ theme }) => theme.fontSizes[4]};
`;

type CitiesListContentProps = {
  cityIndex: number;
  error: Error;
  cities: City[];
  isInputEmptyString: boolean;
  isLoading: boolean;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  onError: () => void;
};

const CitiesListContent = ({
  isLoading,
  error,
  cities,
  setCity,
  setLatLon,
  cityIndex,
  isInputEmptyString,
  onError,
}: CitiesListContentProps) => {
  if (isLoading) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  if (cities) {
    if (cities?.length === 0 && !isInputEmptyString) {
      return <NoResults>no results</NoResults>;
    }

    return (
      <>
        {cities?.map((city, index) => (
          <City
            key={city.cityId}
            city={city}
            isSelected={index === cityIndex}
            setLatLon={setLatLon}
            setCity={setCity}
          />
        ))}
      </>
    );
  }

  if (error) {
    return <ErrorMessage onError={onError} />;
  }

  return null;
};

export default CitiesListContent;
