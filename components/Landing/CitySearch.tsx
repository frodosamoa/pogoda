import {
  useEffect,
  useRef,
  useState,
  useMemo,
  KeyboardEventHandler,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";
import debounce from "lodash.debounce";
import chroma from "chroma-js";

import colors from "../../constants/colors";
import { getCityLabel } from "../../lib/weatherUtils";

import CitiesList from "./CitiesList";

type CitySearchProps = {
  theme: Theme;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCityName: Dispatch<SetStateAction<string>>;
};

const CitySearch = ({ setLatLon, setCityName, theme }: CitySearchProps) => {
  const [cities, setCities] = useState<City[] | []>([]);
  const [cityIndex, setCityIndex] = useState(0);
  const inputRef = useRef(null);

  const isLightTheme = theme === "warning" || theme === "light";

  const getCities = async (city: string) => {
    if (city !== "") {
      const res = await fetch(
        `${window.location.href}/api/cities?query=${city}`
      );
      const json = await res.json();

      setCities(json);
    } else {
      setCities([]);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      getCities(e.target.value);
      setCityIndex(0);
    },
    []
  );

  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCityIndex(cityIndex - 1 === -1 ? cities.length - 1 : cityIndex - 1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCityIndex((cityIndex + 1) % cities.length);
    }
  };

  const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter" && inputRef.current?.value !== "") {
      const city = cities[cityIndex];
      setLatLon(city.coordinates);
      setCityName(getCityLabel(city));
      setCityIndex(0);
    }
  };

  const debouncedHandleChange = useMemo(
    () => debounce(handleChange, 200),
    [handleChange]
  );

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    return () => {
      debouncedHandleChange.cancel();
    };
  }, [debouncedHandleChange]);

  return (
    <>
      <div style={{ width: 450 }}>
        <input
          ref={inputRef}
          placeholder="Search for a city..."
          className={`input citySearch is-${theme} is-large is-rounded has-background-${theme} ${
            isLightTheme ? "has-text-dark" : "has-text-light"
          }`}
          style={{
            boxShadow: "inherit",
            fontSize: "2rem",
            borderColor: isLightTheme
              ? chroma(colors[theme]).darken(0.3).css()
              : chroma(colors[theme]).brighten(0.3).css(),
          }}
          onChange={debouncedHandleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      </div>
      <CitiesList
        cities={cities}
        theme={theme}
        inputValue={inputRef?.current?.value || ""}
        cityIndex={cityIndex}
        setLatLon={setLatLon}
        setCityName={setCityName}
      />
      <style jsx>{`
        .citySearch::placeholder {
          color: ${isLightTheme ? "hsl(0, 0%, 21%)" : "hsl(0, 0%, 96%)"};
        }
      `}</style>
    </>
  );
};

export default CitySearch;
