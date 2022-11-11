import { useEffect, useState } from "react";

const CitySearch = ({ setLatLon }) => {
  const [value, setValue] = useState("");
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const getCities = async () => {
      const res = await fetch(
        `${window.location.href}/api/cities?query=${value}`
      );
      const json = await res.json();

      setCities(json);
    };

    if (value !== "") {
      getCities(value);
    } else {
      setCities([]);
    }
  }, [value]);

  return (
    <>
      <div style={{ width: 300 }}>
        <input
          placeholder="Enter a city name..."
          className="input is-small"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      {cities.length > 0 && (
        <div
          className="select is-multiple is-small"
          style={{
            width: 300,
            marginTop: 50,
            position: "absolute",
            zIndex: 100,
          }}
        >
          <select
            multiple
            size={cities.length > 5 ? 5 : cities.length}
            style={{ width: 300 }}
          >
            {cities.map((city) => (
              <option
                value={city.cityId}
                key={city.cityId}
                onClick={() => {
                  setLatLon(city.coordinates);
                  setValue("");
                }}
              >
                {city.label}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
};

export default CitySearch;
