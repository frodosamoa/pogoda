import { useEffect, useReducer, useState } from "react";
import { Loader } from "react-feather";

import WeekSummary from "../components/WeekSummary";
import DayWeather from "../components/DayWeather";
import CitySearch from "../components/CitySearch";
import Settings from "../components/Settings";
import UseUserLocation from "../components/UseUserLocation";

const Landing = ({ setLatLon, setCityName }) => {
  return (
    <>
      <h1 className="title is-1">pogoda</h1>
      <h4 className="subtitle is-4">weather dashboard</h4>
      <br />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CitySearch setLatLon={setLatLon} setCityName={setCityName} />
      </div>
      <br />
      <h5>or</h5>
      <br />
      <UseUserLocation setLatLon={setLatLon} />
    </>
  );
};

const Weather = ({ weather, cityName, isMetric, setIsMetric }) => {
  if (!weather) {
    return (
      <div className="quick-fade spin">
        <Loader size={36} />
      </div>
    );
  }

  return (
    <>
      <p className="up-fade is-size-2">{cityName}</p>
      <DayWeather current={weather.current} isMetric={isMetric} />
      <WeekSummary daily={weather.daily} isMetric={isMetric} />
      <Settings
        handleClick={() => setIsMetric(!isMetric)}
        isMetric={isMetric}
      />
    </>
  );
};

const Home = () => {
  const [latLon, setLatLon] = useState([]);
  const [cityName, setCityName] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const getWeather = async (latitude, longitude) => {
      const res = await fetch(
        `${window.location.href}/api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const json = await res.json();

      setWeather({
        ...json,
        daily: json.daily.slice(1).map((day) => ({
          ...day,
          temp: {
            ...day.temp,
            min: Math.round(day.temp.min),
            max: Math.round(day.temp.max),
          },
        })),
      });
    };

    if (latLon.length > 0) {
      getWeather(latLon[1], latLon[0]);
    }
  }, [latLon]);

  return (
    <>
      <section className="hero is-dark is-fullheight">
        <div className="hero-body has-text-centered">
          <div className="container">
            {!(latLon.length > 0) ? (
              <Landing setLatLon={setLatLon} setCityName={setCityName} />
            ) : (
              <Weather
                cityName={cityName}
                weather={weather}
                isMetric={isMetric}
                setIsMetric={setIsMetric}
              />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
