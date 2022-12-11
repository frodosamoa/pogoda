import { Dispatch, SetStateAction } from "react";
import { Search } from "react-feather";
import styled from "styled-components";

type StyledSearchProps = {
  $hasWeather: boolean;
};

const StyledSearch = styled(Search)<StyledSearchProps>`
  position: fixed;
  bottom: 24px;
  left: 24px;
  cursor: pointer;
  opacity: ${({ $hasWeather }) => ($hasWeather ? 1 : 0)};
  transition: opacity 300ms ease-in-out;
`;

type SearchIconProps = {
  hasWeather: boolean;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setWeather: Dispatch<SetStateAction<Weather>>;
};

const SearchIcon = ({
  hasWeather,
  setLatLon,
  setWeather,
  setIsSettingsOpen,
}: SearchIconProps) => (
  <StyledSearch
    size={42}
    onClick={() => {
      setLatLon(null);
      setWeather(null);
      setIsSettingsOpen(false);
    }}
    $hasWeather={hasWeather}
  />
);

export default SearchIcon;
