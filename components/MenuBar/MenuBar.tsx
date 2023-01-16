import { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

import CitySearch from "../CitySearch";

import Info from "./Info";
import UseLocation from "./UseLocation";
import Theme from "./Theme";

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  z-index: 150;
  transition: color 150ms ease-in-out;
  color: ${({ theme: { themes, theme } }) =>
    theme === "light" ? themes.dark : themes.light};
`;

const TitleContainer = styled.div`
  user-select: none;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.tablet}px) {
    display: none;
  }
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[4]};
  font-weight: 700;
  line-height: 1.2;
`;

const Subtitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes[6]};
  line-height: 1.2;
`;

const Bar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  height: 70px;
  border-radius: 0 0 8px 8px;

  color: ${({ theme: { themes, theme } }) =>
    theme === "light" ? themes.dark : themes.light};
  background-color: ${({ theme: { theme, colors } }) =>
    theme === "light" ? colors.greyLighter : colors.blackTer};

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.desktop}px) {
    border-radius: 0;
  }
`;

const MenuIcons = styled.div`
  display: flex;
  position: relative;
  gap: 12px;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    gap: 8px;
  }
`;

type MenuBarProps = {
  setTheme: Dispatch<SetStateAction<Theme>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  latLon: [number, number];
};

const MenuBar = ({ setTheme, setLatLon, setCity, latLon }: MenuBarProps) => (
  <Container>
    <Bar className="container is-max-desktop">
      <TitleContainer>
        <Title>pogoda</Title>
        <Subtitle>weather dashboard</Subtitle>
      </TitleContainer>

      <CitySearch setLatLon={setLatLon} setCity={setCity} />

      <MenuIcons>
        <Theme setTheme={setTheme} />

        <UseLocation setCity={setCity} setLatLon={setLatLon} latLon={latLon} />
        <Info />
      </MenuIcons>
    </Bar>
  </Container>
);

export default MenuBar;
