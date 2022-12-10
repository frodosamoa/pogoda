import { SetStateAction, Dispatch } from "react";
import classNames from "classnames";

import Weather from "../components/Weather";
import Landing from "../components/Landing";

type HeroProps = {
  theme: Theme;
  cityName: string;
  latLon: [number, number];
  isMetric: boolean;
  dailyForecastView: string;
  weather: Weather;
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
    style={{
      transition: "background-color 150ms ease-in-out, color 150ms ease-in-out",
    }}
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

export default Hero;
