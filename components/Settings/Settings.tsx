import classNames from "classnames";
import { Dispatch, SetStateAction, ReactNode } from "react";
import {
  Settings as SettingsIcon,
  Thermometer as ThermometerIcon,
  Wind as WindIcon,
  CloudRain as CloudRainIcon,
} from "react-feather";

import Themes from "./Themes";
import UseUserLocation from "./UseUserLocation";
import MadeBy from "./MadeBy";

const WIDTH = 250;

type SettingsItemProps = {
  children: ReactNode;
};

const SettingsItem = ({ children }: SettingsItemProps) => (
  <div
    style={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    {children}
  </div>
);

type SettingsContainerProps = {
  isSettingsOpen: boolean;
  children: ReactNode;
};

const SettingsContainer = ({
  isSettingsOpen,
  children,
}: SettingsContainerProps) => (
  <div
    className="has-background-black-ter has-text-light has-text-centered"
    style={{
      position: "fixed",
      top: 0,
      right: 0,
      width: WIDTH,
      height: "100%",
      transform: `translateX(${isSettingsOpen ? 0 : WIDTH}px)`,
      transition: "transform 400ms ease-out",
      padding: 24,
    }}
  >
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
      }}
    >
      {children}
    </div>
  </div>
);

type SettingProps = {
  theme: Theme;
  latLon: [number, number];
  isMetric: boolean;
  dailyForecastView: string;
  isSettingsOpen: boolean;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCity: Dispatch<SetStateAction<City>>;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
  setTheme: Dispatch<SetStateAction<Theme>>;
  setDailyForecastView: Dispatch<SetStateAction<string>>;
  setWeather: Dispatch<SetStateAction<Weather>>;
};

const Settings = ({
  isSettingsOpen,
  setIsSettingsOpen,
  isMetric,
  setIsMetric,
  setTheme,
  latLon,
  setLatLon,
  theme: globalTheme,
  dailyForecastView,
  setDailyForecastView,
  setCity,
  setWeather,
}: SettingProps) => {
  return (
    <>
      <SettingsContainer isSettingsOpen={isSettingsOpen}>
        <SettingsItem>
          <Themes globalTheme={globalTheme} setTheme={setTheme} />
        </SettingsItem>

        <SettingsItem>
          <p className="is-size-6 m-b-16">settings</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={"buttons has-addons"}>
              <button
                className={classNames("button", !isMetric && "is-black")}
                onClick={() => setIsMetric(true)}
              >
                °C, m/s
              </button>
              <button
                className={classNames("button", isMetric && "is-black")}
                onClick={() => setIsMetric(false)}
              >
                °F, mph
              </button>
            </div>
          </div>
        </SettingsItem>

        <SettingsItem>
          <p className="is-size-6 m-b-16">daily forecast</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className={"buttons has-addons"}>
              <button
                title="temperature"
                className={classNames(
                  "button",
                  dailyForecastView !== "temperature" && "is-black"
                )}
                onClick={() => setDailyForecastView("temperature")}
              >
                <ThermometerIcon size={16} />
              </button>
              <button
                title="precipitation"
                className={classNames(
                  "button",
                  dailyForecastView !== "precipitation" && "is-black"
                )}
                onClick={() => setDailyForecastView("precipitation")}
              >
                <CloudRainIcon size={16} />
              </button>
              <button
                title="wind"
                className={classNames(
                  "button",
                  dailyForecastView !== "wind" && "is-black"
                )}
                onClick={() => setDailyForecastView("wind")}
              >
                <WindIcon size={16} />
              </button>
            </div>
          </div>
        </SettingsItem>

        <UseUserLocation
          latLon={latLon}
          setLatLon={setLatLon}
          setCity={setCity}
          setIsSettingsOpen={setIsSettingsOpen}
          setWeather={setWeather}
        />

        <MadeBy />
      </SettingsContainer>

      <SettingsIcon
        size={42}
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          cursor: "pointer",
          transform: `translateX(-${isSettingsOpen ? WIDTH : 0}px) rotate(${
            isSettingsOpen ? 0 : 90
          }deg)`,
          transition: "transform 400ms ease-out",
        }}
      />
    </>
  );
};
export default Settings;
