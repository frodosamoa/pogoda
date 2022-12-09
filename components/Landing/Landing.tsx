import { SetStateAction, Dispatch } from "react";

import CitySearch from "./CitySearch";

type LandingProps = {
  theme: Theme;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCityName: Dispatch<SetStateAction<string>>;
};

const Landing = ({ setLatLon, setCityName, theme }: LandingProps) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <CitySearch setLatLon={setLatLon} setCityName={setCityName} theme={theme} />
  </div>
);

export default Landing;
