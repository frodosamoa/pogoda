import {
  useEffect,
  useMemo,
  KeyboardEventHandler,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  forwardRef,
} from "react";
import debounce from "lodash.debounce";
import chroma from "chroma-js";
import styled from "styled-components";

import { fadeIn } from "../../lib/constants/animations";

type CityInputProps = {
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

const StyledInput = styled.input`
  box-shadow: none;
  font-size: 2rem;
  width: 500px;
  background-color: ${({ theme: { theme, themes } }) => themes[theme]};
  color: ${({ theme: { themes, theme } }) =>
    theme === "yellow" || theme === "light" ? themes.dark : themes.light};
  border-width: 2px;
  border-color: ${({ theme: { theme, colors } }) =>
    theme === "yellow" || theme === "light"
      ? colors.greyDark
      : colors.whiteTer};

  opacity: 0;
  animation: 300ms ease-in-out 0ms 1 normal forwards running ${fadeIn};

  transition: background-color 150ms ease-in-out, color 150ms ease-in-out,
    border-color 150ms ease-in-out, box-shadow 150ms ease-in-out;

  &:focus {
    border-color: ${({ theme: { theme, colors } }) =>
      theme === "yellow" || theme === "light"
        ? colors.greyDark
        : colors.whiteTer};
    box-shadow: 0px 0px 0px 2px
      ${({ theme: { theme, colors } }) =>
        theme === "yellow" || theme === "light"
          ? chroma(colors.greyDark).alpha(0.5).css()
          : chroma(colors.whiteTer).alpha(0.5).css()};
  }

  &:hover {
    border-color: ${({ theme: { theme, colors } }) =>
      theme === "yellow" || theme === "light"
        ? colors.greyDark
        : colors.whiteTer};
    box-shadow: 0px 0px 0px 2px
      ${({ theme: { theme, colors } }) =>
        theme === "yellow" || theme === "light"
          ? chroma(colors.greyDark).alpha(0.5).css()
          : chroma(colors.whiteTer).alpha(0.5).css()};
  }

  &::placeholder {
    color: ${({ theme: { theme, colors } }) =>
      theme === "yellow" || theme === "light"
        ? colors.greyDark
        : colors.whiteTer};
    opacity: 0.5;
    transition: color 150ms ease-in-out;
  }
`;

const CityInput = forwardRef<HTMLInputElement, CityInputProps>(
  (
    {
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
      <StyledInput
        ref={ref}
        placeholder="Search for a city..."
        className={"input is-large is-rounded"}
        onChange={debouncedHandleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
    );
  }
);

CityInput.displayName = "CityInput";

export default CityInput;
