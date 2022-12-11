import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";

import CitiesList from "./CitiesList";
import CityInput from "./CityInput";

type CitySearchProps = {
  theme: Theme;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const CitySearch = ({ theme, setLatLon, setCity }: CitySearchProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cities, setCities] = useState<City[] | []>([]);
  const [cityIndex, setCityIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const isInputEmptyString = (inputRef?.current?.value || "") === "";

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <CityInput
        ref={inputRef}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isInputEmptyString={isInputEmptyString}
        cities={cities}
        theme={theme}
        cityIndex={cityIndex}
        setCityIndex={setCityIndex}
        setCities={setCities}
        setCity={setCity}
        setLatLon={setLatLon}
      />
      <CitiesList
        cities={cities}
        isInputEmptyString={isInputEmptyString}
        cityIndex={cityIndex}
        setLatLon={setLatLon}
        setCity={setCity}
        isLoading={isLoading}
      />
    </>
  );
};

export default CitySearch;
