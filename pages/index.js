import { useEffect, useState } from "react";
import classNames from "classnames";

import Weather from "../components/Weather";
import Landing from "../components/Landing";
import Settings from "../components/Settings";

const Home = () => {
  const [latLon, setLatLon] = useState([]);
  const [cityName, setCityName] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [text, setText] = useState("has-text-light");

  useEffect(() => {
    const getWeather = async (latitude, longitude) => {
      const res = await fetch(
        `${window.location.href}/api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const json = await res.json();

      setWeather(json);
    };

    if (latLon.length > 0) {
      getWeather(latLon[1], latLon[0]);
    }
  }, [latLon]);

  console.log(weather);

  return (
    <>
      <section
        className={classNames(
          "hero is-fullheight",
          `has-background-${theme}`,
          text
        )}
      >
        <div className="hero-body has-text-centered">
          <div className="container">
            {!(latLon.length > 0) ? (
              <Landing
                setLatLon={setLatLon}
                setCityName={setCityName}
                theme={theme}
              />
            ) : (
              <Weather
                cityName={cityName}
                weather={weather}
                isMetric={isMetric}
                setIsMetric={setIsMetric}
              />
            )}
          </div>
          <Settings
            handleClick={() => setIsMetric(!isMetric)}
            isMetric={isMetric}
            setTheme={setTheme}
            setText={setText}
          />
        </div>
      </section>
    </>
  );
};

export default Home;
