import { Dispatch, SetStateAction } from "react";

import chroma from "chroma-js";

import colors from "../../constants/colors";
import { getCityLabel } from "../../lib/weatherUtils";

type CityProps = {
  city: City;
  isSelected: boolean;
  theme: Theme;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const City = ({ city, isSelected, theme, setLatLon, setCity }: CityProps) => (
  <div
    style={{
      cursor: "pointer",
      backgroundColor: isSelected
        ? chroma(colors[theme]).darken(0.5).css()
        : "inherit",
      padding: 4,
      borderRadius: 6,
      transition: "background-color 150ms ease-in-out",
    }}
    key={city.cityId}
    onClick={() => {
      setLatLon(city.loc.coordinates);
      setCity(city);
    }}
  >
    {getCityLabel(city)}
  </div>
);

export default City;
