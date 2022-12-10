import { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";

import CitiesList from "./CitiesList";
import CityInput from "./CityInput";

type CitySearchProps = {
  theme: Theme;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCityName: Dispatch<SetStateAction<string>>;
};

const CitySearch = ({ theme, setLatLon, setCityName }: CitySearchProps) => {
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
        setCityName={setCityName}
        setLatLon={setLatLon}
      />
      <CitiesList
        cities={cities}
        theme={theme}
        isInputEmptyString={isInputEmptyString}
        cityIndex={cityIndex}
        setLatLon={setLatLon}
        setCityName={setCityName}
        isLoading={isLoading}
      />
    </>
  );
};

export default CitySearch;
