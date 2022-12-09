import { Dispatch, MutableRefObject, SetStateAction } from "react";

import chroma from "chroma-js";

import colors from "../../constants/colors";
import ADMIN_CODES from "../../constants/adminCodes";

import { THEME } from "../../constants/themes";

type City = {
  cityId: string;
  name: string;
  adminCode: string;
  country: string;
  coordinates: [number, number];
};

type CityProps = {
  city: City;
  isSelected: boolean;
  theme: THEME;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCityName: Dispatch<SetStateAction<string>>;
};

const City = ({
  city,
  isSelected,
  theme,
  setLatLon,
  setCityName,
}: CityProps) => {
  const label = `${city.name}, ${
    city.adminCode && ADMIN_CODES[`${city.country}.${city.adminCode}`]
      ? `${ADMIN_CODES[`${city.country}.${city.adminCode}`]}, `
      : " "
  } ${city.country}`;

  return (
    <div
      style={{
        cursor: "pointer",
        backgroundColor: isSelected
          ? chroma(colors[theme]).darken(0.3).css()
          : "inherit",
        padding: 4,
        borderRadius: 6,
      }}
      key={city.cityId}
      onClick={() => {
        setLatLon(city.coordinates);
        setCityName(label);
      }}
    >
      {label}
    </div>
  );
};

type CitiesListProps = {
  theme: THEME;
  cityIndex: number;
  cities: City[];
  inputValue: string;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCityName: Dispatch<SetStateAction<string>>;
};

const CitiesList = ({
  theme,
  cities,
  inputValue,
  cityIndex,
  setLatLon,
  setCityName,
}: CitiesListProps) => (
  <div
    style={{
      width: 450,
      marginTop: 100,
      position: "absolute",
      zIndex: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    {cities.map((city, index) => (
      <City
        key={index}
        city={city}
        theme={theme}
        isSelected={index === cityIndex}
        setLatLon={setLatLon}
        setCityName={setCityName}
      />
    ))}
    {cities.length === 0 && inputValue && inputValue !== "" && (
      <p className="is-size-4">no results</p>
    )}
  </div>
);

export default CitiesList;
