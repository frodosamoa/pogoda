import { useEffect, useRef, useState, useMemo } from "react";
import debounce from "lodash.debounce";
import chroma from "chroma-js";

import CitiesList from "./CitiesList";

import colors from "../../constants/colors";

const CitySearch = ({ setLatLon, setCityName, theme }) => {
  const [cities, setCities] = useState([]);
  const [cityIndex, setCityIndex] = useState(0);
  const inputRef = useRef(null);

  const isLightTheme = theme === "warning" || theme === "light";

  const getCities = async (city) => {
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

  const handleChange = (e) => {
    getCities(e.target.value);
    setCityIndex(0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setCityIndex(cityIndex - 1 === -1 ? cities.length - 1 : cityIndex - 1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setCityIndex((cityIndex + 1) % cities.length);
    }
  };

  const handleKeyUp = (e) => {
    if (e.key === "Enter" && inputRef.current?.value !== "") {
      const city = cities[cityIndex];
      setLatLon(city.coordinates);
      setCityName(city.label);
      setCityIndex(0);
    }
  };

  const debouncedHandleChange = useMemo(() => debounce(handleChange, 200), []);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    return () => {
      debouncedHandleChange.cancel();
    };
  }, []);

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
              ? chroma(colors[theme]).darken(0.3)
              : chroma(colors[theme]).brighten(0.3),
          }}
          onChange={debouncedHandleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
      </div>
      <CitiesList
        cities={cities}
        theme={theme}
        inputValue={inputRef.current}
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
