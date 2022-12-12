import {
  useEffect,
  useMemo,
  KeyboardEventHandler,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  forwardRef,
  useState,
} from "react";
import debounce from "lodash.debounce";
import chroma from "chroma-js";
import classNames from "classnames";

import { COLORS } from "../../lib/constants/theme";

type CityInputProps = {
  theme: Theme;
  cities: City[] | [];
  cityIndex: number;
  isLoading: boolean;
  isInputEmptyString: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setCity: Dispatch<SetStateAction<City>>;
  setCities: Dispatch<SetStateAction<[] | City[]>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCityIndex: Dispatch<SetStateAction<number>>;
};

const CityInput = forwardRef<HTMLInputElement, CityInputProps>(
  (
    {
      theme,
      cities,
      cityIndex,
      isInputEmptyString,
      setCityIndex,
      setCity,
      setCities,
      setLatLon,
      setIsLoading,
    },
    ref
  ) => {
    const themeColor = chroma(COLORS[theme]);
    const getCities = useCallback(
      (city: string) => {
        if (city !== "") {
          fetch(`${window.location.href}/api/cities?query=${city}`)
            .then((res) => res.json())
            .then((json) => {
              setCities(json);
              setIsLoading(false);
            });
        } else {
          setCities([]);
        }
      },
      [setCities, setIsLoading]
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
      if (e.key === "Enter" && !isInputEmptyString) {
        const city = cities[cityIndex];
        setLatLon([city.latitude, city.longitude]);
        setCity(city);
        setCityIndex(0);
      }
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback(
      (e) => {
        // remove non-word characters
        const query = e.target.value.replace(/[^\w\s]/g, "");

        if (query !== "") {
          setIsLoading(true);
          getCities(query);
          setCityIndex(0);
        } else {
          setCities([]);
        }
      },
      [getCities, setCityIndex, setCities, setIsLoading]
    );

    const debouncedHandleChange = useMemo(
      () => debounce(handleChange, 200),
      [handleChange]
    );

    useEffect(() => {
      return () => {
        debouncedHandleChange.cancel();
      };
    }, [debouncedHandleChange]);

    return (
      <>
        <input
          ref={ref}
          placeholder="Search for a city..."
          className={classNames(
            "input",
            "city-input",
            `$is-${theme}`,
            "is-large",
            "is-rounded",
            `has-background-${theme}`,
            theme === "warning" || theme === "light"
              ? "has-text-dark"
              : "has-text-light"
          )}
          style={{
            width: 500,
            boxShadow: "inherit",
            fontSize: "2rem",
            borderColor:
              theme === "warning" ||
              theme === "light" ||
              theme === "danger" ||
              theme === "success"
                ? themeColor.darken(0.3).css()
                : themeColor.brighten(0.3).css(),
            transition:
              "background-color 150ms ease-in-out, color 150ms ease-in-out, border-color 150ms ease-in-out",
          }}
          onChange={debouncedHandleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />

        <style jsx>{`
          .city-input::placeholder {
            color: ${theme === "warning" ||
            theme === "light" ||
            theme === "danger" ||
            theme === "success"
              ? themeColor.darken(0.7).css()
              : themeColor.brighten(0.7).css()};
            transition: color 150ms ease-in-out;
          }
        `}</style>
      </>
    );
  }
);

CityInput.displayName = "CityInput";

export default CityInput;
