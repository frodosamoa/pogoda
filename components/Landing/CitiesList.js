import chroma from "chroma-js";

import colors from "../../constants/colors";

const CitiesList = ({
  theme,
  cities,
  inputValue,
  cityIndex,
  setLatLon,
  setCityName,
}) => {
  return (
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
        <div
          style={{
            cursor: "pointer",
            backgroundColor:
              index === cityIndex
                ? chroma(colors[theme]).darken(0.3)
                : "inherit",
            padding: 4,
            borderRadius: 6,
          }}
          key={city.cityId}
          onClick={() => {
            setLatLon(city.coordinates);
            setCityName(city.label);
          }}
        >
          {city.label}
        </div>
      ))}
      {cities.length === 0 && inputValue && inputValue?.value !== "" && (
        <p className="is-size-4">no results</p>
      )}
    </div>
  );
};

export default CitiesList;
