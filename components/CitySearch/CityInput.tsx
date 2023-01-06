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
import { XCircle } from "lucide-react";

import { fadeIn } from "@/lib/constants/animations";

type CityInputProps = {
  cities: City[] | [];
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  cityIndex: number;
  isLoading: boolean;
  setCity: Dispatch<SetStateAction<City>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCityIndex: Dispatch<SetStateAction<number>>;
};

const StyledInput = styled.input`
  box-shadow: none;
  width: 400px;
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
    width: 250px;
  }

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    grid-column: 1 / 3;
    width: 175px;
  }
`;

const StyledXCircleIcon = styled(XCircle)`
  position: absolute;
  cursor: pointer;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 8px;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    display: none;
  }
`;

const Container = styled.div`
  position: relative;
`;

const CityInput = forwardRef<HTMLInputElement, CityInputProps>(
  (
    {
      cities,
      inputValue,
      setInputValue,
      cityIndex,
      setCityIndex,
      setCity,
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
      if (e.key === "Enter" && cities?.length > 0) {
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
        }
      },
      [setInputValue, setCityIndex]
    );

    return (
      <Container>
        <StyledInput
          ref={ref}
          value={inputValue}
          placeholder="Search for a city..."
          className={"input"}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        {inputValue !== "" && (
          <StyledXCircleIcon size={18} onClick={() => setInputValue("")} />
        )}
      </Container>
    );
  }
);

CityInput.displayName = "CityInput";

export default CityInput;
