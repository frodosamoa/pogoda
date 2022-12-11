import { Loader as LoaderIcon } from "react-feather";
import { Dispatch, SetStateAction } from "react";

import City from "./City";

type CitiesListProps = {
  theme: Theme;
  cityIndex: number;
  cities: City[];
  isInputEmptyString: boolean;
  isLoading: boolean;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
};

const CitiesList = ({
  theme,
  cities,
  isInputEmptyString,
  cityIndex,
  isLoading,
  setLatLon,
  setCity,
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
    {isLoading ? (
      <div style={{ marginTop: 16 }} className="quick-fade-in">
        <LoaderIcon size={36} className="spin" />
      </div>
    ) : (
      <>
        {cities.map((city, index) => (
          <City
            key={index}
            city={city}
            theme={theme}
            isSelected={index === cityIndex}
            setLatLon={setLatLon}
            setCity={setCity}
          />
        ))}
        {cities.length === 0 && !isInputEmptyString && (
          <p className="is-size-4">no results</p>
        )}
      </>
    )}
  </div>
);

export default CitiesList;
