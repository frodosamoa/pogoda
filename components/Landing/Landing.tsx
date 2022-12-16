import { SetStateAction, Dispatch } from "react";
import styled from "styled-components";

import CitySearch from "./CitySearch";

type LandingProps = {
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Landing = ({ setLatLon, setCity }: LandingProps) => (
  <Container>
    <CitySearch setLatLon={setLatLon} setCity={setCity} />
  </Container>
);

export default Landing;
