import { useEffect, useRef, useState } from "react";

const CitySearch = ({ setLatLon, setCityName, theme }) => {
  const [value, setValue] = useState("");
  const [cities, setCities] = useState([]);
  const inputRef = useRef(null);

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

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <div style={{ width: 300 }}>
        <input
          ref={inputRef}
          placeholder="Search for a city..."
          className={`input citySearch is-large is-${theme} has-background-${theme} ${
            theme === "warning" || theme === "light"
              ? "has-text-dark"
              : "has-text-light"
          }`}
          style={{ boxShadow: "inherit" }}
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
                  setCityName(city.label);
                  setValue("");
                }}
              >
                {city.label}
              </option>
            ))}
          </select>
        </div>
      )}

      <style jsx>{`
        .citySearch::placeholder {
          color: ${theme === "warning" || theme === "light"
            ? "hsl(0, 0%, 21%)"
            : "hsl(0, 0%, 96%)"};
        }
      `}</style>
    </>
  );
};

export default CitySearch;
