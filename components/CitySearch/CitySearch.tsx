import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import useCities from "../../lib/hooks/useCities";
import useDebounce from "../../lib/hooks/useDebounce";

import CitiesList from "./CitiesList";
import CityInput from "./CityInput";

type CitySearchProps = {
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CitySearch = ({ setLatLon, setCity }: CitySearchProps) => {
  const [cityIndex, setCityIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const debouncedInputValue = useDebounce(inputValue, 300);
  const {
    data: cities,
    isLoading,
    error,
    mutate: setCities,
  } = useCities(debouncedInputValue);

  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const onError = () => {
    setCities([]);
    setInputValue("");
    inputRef?.current?.focus();
  };

  return (
    <Container>
      <CityInput
        ref={inputRef}
        inputValue={inputValue}
        isLoading={isLoading}
        setInputValue={setInputValue}
        isInputEmptyString={inputValue === ""}
        cities={cities}
        cityIndex={cityIndex}
        setCityIndex={setCityIndex}
        setCities={setCities}
        setCity={setCity}
        setLatLon={setLatLon}
      />
      <CitiesList
        cities={cities}
        error={error}
        onError={onError}
        isInputEmptyString={inputValue === ""}
        cityIndex={cityIndex}
        setLatLon={setLatLon}
        setCity={setCity}
        isLoading={isLoading}
      />
    </Container>
  );
};

export default CitySearch;
