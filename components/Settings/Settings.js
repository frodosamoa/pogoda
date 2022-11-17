import classNames from "classnames";
import { useState } from "react";
import {
  Settings as SettingsIcon,
  Check as CheckIcon,
  Thermometer as ThermometerIcon,
  Wind as WindIcon,
  CloudRain as CloudRainIcon,
} from "react-feather";

import Themes from "./Themes";
import UseUserLocation from "./UseUserLocation";
import MadeBy from "./MadeBy";

const WIDTH = 250;

const SettingsItem = ({ children }) => (
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
  setCityName,
}) => {
  return (
    <>
      <div
        className="has-background-black-ter has-text-light has-text-centered"
        style={{
          position: "fixed",
          top: 0,
          right: isSettingsOpen ? 0 : -WIDTH,
          width: WIDTH,
          height: "100%",
          transition: "right 300ms ease-in-out",
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
            setCityName={setCityName}
            setIsSettingsOpen={setIsSettingsOpen}
          />

          <MadeBy />
        </div>
      </div>

      <SettingsIcon
        size={42}
        onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        style={{
          position: "fixed",
          bottom: 24,
          right: isSettingsOpen ? WIDTH + 24 : 24,
          cursor: "pointer",
          transform: `rotate(${isSettingsOpen ? 0 : 180}deg)`,
          transition: "all 300ms ease-in-out",
        }}
      />
    </>
  );
};
export default Settings;
