import { useEffect, useState } from "react";
import classNames from "classnames";

import Weather from "../components/Weather";
import Landing from "../components/Landing";
import Application from "../components/Application";

const Home = () => {
  const [latLon, setLatLon] = useState([]);
  const [cityName, setCityName] = useState(null);
  const [isMetric, setIsMetric] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [weather, setWeather] = useState(null);
  const [theme, setTheme] = useState("dark");
  const [dailyForecastView, setDailyForecastView] = useState("temperature");

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

  return (
    <>
      <section
        className={classNames(
          "hero is-fullheight",
          `has-background-${theme}`,
          theme === "warning" || theme === "light"
            ? "has-text-dark"
            : "has-text-light"
        )}
      >
        <div
          className="hero-body has-text-centered"
          onClick={() => setIsSettingsOpen(false)}
        >
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
                dailyForecastView={dailyForecastView}
              />
            )}
          </div>
        </div>
      </section>
      <Application
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        isMetric={isMetric}
        setIsMetric={setIsMetric}
        setTheme={setTheme}
        theme={theme}
        latLon={latLon}
        setLatLon={setLatLon}
        dailyForecastView={dailyForecastView}
        setDailyForecastView={setDailyForecastView}
        setCityName={setCityName}
        setWeather={setWeather}
        weather={weather}
      />
    </>
  );
};

export default Home;
