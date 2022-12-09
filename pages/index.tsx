import { useEffect, useState, SetStateAction, Dispatch } from "react";
import classNames from "classnames";

import Weather from "../components/Weather";
import Landing from "../components/Landing";
import Application from "../components/Application";

type HeroProps = {
  theme: Theme;
  cityName: string;
  latLon: [number, number];
  isMetric: boolean;
  dailyForecastView: string;
  weather: { daily: []; current: object };
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCityName: Dispatch<SetStateAction<string>>;
};

const Hero = ({
  theme,
  latLon,
  cityName,
  weather,
  isMetric,
  dailyForecastView,
  setLatLon,
  setCityName,
  setIsSettingsOpen,
}: HeroProps) => (
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
        {!(latLon?.length > 0) ? (
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
);

const Home = () => {
  const [latLon, setLatLon] = useState<[number, number] | null>(null);
  const [cityName, setCityName] = useState<string | null>(null);
  const [isMetric, setIsMetric] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [weather, setWeather] = useState<{ daily: []; current: object }>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const [dailyForecastView, setDailyForecastView] = useState("temperature");

  useEffect(() => {
    const getWeather = async (latitude: number, longitude: number) => {
      const res = await fetch(
        `${window.location.href}/api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const json = await res.json();

      setWeather(json);
    };

    if (latLon?.length > 0) {
      getWeather(latLon[1], latLon[0]);
    }
  }, [latLon]);

  return (
    <>
      <Hero
        theme={theme}
        latLon={latLon}
        setLatLon={setLatLon}
        setCityName={setCityName}
        setIsSettingsOpen={setIsSettingsOpen}
        cityName={cityName}
        weather={weather}
        isMetric={isMetric}
        dailyForecastView={dailyForecastView}
      />
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
