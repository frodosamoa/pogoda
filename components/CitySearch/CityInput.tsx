import {
  KeyboardEventHandler,
  ChangeEventHandler,
  Dispatch,
  SetStateAction,
  useCallback,
  forwardRef,
} from "react";
import chroma from "chroma-js";
import styled from "styled-components";

import { fadeIn } from "../../lib/constants/animations";

type CityInputProps = {
  cities: City[] | [];
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  cityIndex: number;
  isLoading: boolean;
  isInputEmptyString: boolean;
  setCity: Dispatch<SetStateAction<City>>;
  setCities: Dispatch<SetStateAction<[] | City[]>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCityIndex: Dispatch<SetStateAction<number>>;
};

const StyledInput = styled.input`
  box-shadow: none;
  width: 500px;
  background-color: ${({ theme: { theme, themes } }) => themes[theme]};
  color: ${({ theme: { themes, theme } }) =>
    theme === "light" ? themes.dark : themes.light};
  border-width: 2px;
  border-color: ${({ theme: { theme, colors } }) =>
    theme === "light" ? colors.greyDark : colors.whiteTer};

  opacity: 0;
  animation: 300ms ease-in-out 0ms 1 normal forwards running ${fadeIn};

  transition: background-color 150ms ease-in-out, color 150ms ease-in-out,
    border-color 150ms ease-in-out, box-shadow 150ms ease-in-out;

  &:focus {
    border-color: ${({ theme: { theme, colors } }) =>
      theme === "light" ? colors.greyDark : colors.whiteTer};
    box-shadow: 0px 0px 0px 2px
      ${({ theme: { theme, colors } }) =>
        theme === "light"
          ? chroma(colors.greyDark).alpha(0.5).css()
          : chroma(colors.whiteTer).alpha(0.5).css()};
  }

  &:hover {
    border-color: ${({ theme: { theme, colors } }) =>
      theme === "light" ? colors.greyDark : colors.whiteTer};
    box-shadow: 0px 0px 0px 2px
      ${({ theme: { theme, colors } }) =>
        theme === "light"
          ? chroma(colors.greyDark).alpha(0.5).css()
          : chroma(colors.whiteTer).alpha(0.5).css()};
  }

  &::placeholder {
    color: ${({ theme: { theme, colors } }) =>
      theme === "light" ? colors.greyDark : colors.whiteTer};
    opacity: 0.5;
    transition: color 150ms ease-in-out;
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    grid-column: 1 / 4;
    width: 350px;
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    grid-column: 1 / 3;
    width: 250px;
  }
`;

const CityInput = forwardRef<HTMLInputElement, CityInputProps>(
  (
    {
      cities,
      inputValue,
      setInputValue,
      cityIndex,
      isInputEmptyString,
      setCityIndex,
      setCity,
      setCities,
      setLatLon,
    },
    ref
  ) => {
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
        const query = e.target.value;

        if (query !== "") {
          setInputValue(query);
          setCityIndex(0);
        } else {
          setInputValue("");
          setCities([]);
        }
      },
      [setInputValue, setCityIndex, setCities]
    );

    return (
      <StyledInput
        ref={ref}
        value={inputValue}
        placeholder="Search for a city..."
        className={"input is-large is-rounded"}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyUp={handleKeyUp}
      />
    );
  }
);

CityInput.displayName = "CityInput";

export default CityInput;
