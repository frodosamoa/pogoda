import { SetStateAction, Dispatch } from "react";

import CitySearch from "./CitySearch";

type LandingProps = {
  theme: Theme;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const Landing = ({ theme, setLatLon, setCity }: LandingProps) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <CitySearch setLatLon={setLatLon} setCity={setCity} theme={theme} />
  </div>
);

export default Landing;
