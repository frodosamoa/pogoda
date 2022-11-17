import classNames from "classnames";
import { useState } from "react";
import {
  Settings as SettingsIcon,
  Check as CheckIcon,
  Thermometer as ThermometerIcon,
  Wind as WindIcon,
  CloudRain as CloudRainIcon,
} from "react-feather";
import UseUserLocation from "./UseUserLocation";

const WIDTH = 250;

const THEMES = [
  "primary",
  "link",
  "info",
  "success",
  "warning",
  "danger",
  "dark",
  "light",
];

const Theme = ({ theme, globalTheme, setTheme }) => {
  return (
    <div
      className={`has-background-${theme}`}
      style={{
        height: 20,
        borderRadius: 4,
        marginBottom: 8,
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => setTheme(theme)}
    >
      {globalTheme === theme && (
        <CheckIcon
          size={16}
          className={
            theme === "warning" || theme === "light"
              ? "has-text-dark"
              : "has-text-light"
          }
        />
      )}
    </div>
  );
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
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p className="is-size-6 m-b-16">theme</p>
            {THEMES.map((theme) => (
              <Theme
                key={theme}
                theme={theme}
                globalTheme={globalTheme}
                setTheme={setTheme}
              />
            ))}
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
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
          </div>

          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
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
          </div>
          <UseUserLocation
            latLon={latLon}
            setLatLon={setLatLon}
            setCityName={setCityName}
            setIsSettingsOpen={setIsSettingsOpen}
          />
          <div
            style={{
              // flex: 1,
              display: "flex",
              justifyContent: "end",
              flexDirection: "column",
            }}
          >
            <p className="is-size-6">made by </p>
            <p className="is-size-6  is-underlined">
              <a
                className="has-text-light"
                target="_blank"
                href={"https://www.andrewkowalczyk.com"}
              >
                Andrew Kowalczyk
              </a>
            </p>
          </div>
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
