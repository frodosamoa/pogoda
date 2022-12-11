import { SetStateAction, Dispatch } from "react";
import styled from "styled-components";

import CitySearch from "./CitySearch";

type LandingProps = {
  theme: Theme;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Landing = ({ theme, setLatLon, setCity }: LandingProps) => (
  <Container>
    <CitySearch setLatLon={setLatLon} setCity={setCity} theme={theme} />
  </Container>
);

export default Landing;
