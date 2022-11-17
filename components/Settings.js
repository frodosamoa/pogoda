import { useState } from "react";
import { Settings as SettingsIcon } from "react-feather";

const WIDTH = 200;

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

const Settings = ({ handleClick, isMetric, setTheme, setText }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className="has-background-black-ter has-text-light"
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? 0 : -WIDTH,
          width: WIDTH,
          height: "100%",
          transition: "right 200ms ease-in-out",
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
          <div>
            <p className="is-size-4">pogoda</p>
            <p className="is-size-6">your weather dashboard</p>
          </div>

          <div>
            <p className="is-size-6 m-b-16">theme</p>
            {THEMES.map((theme) => (
              <div
                key={theme}
                className={`has-background-${theme}`}
                style={{
                  height: 20,
                  borderRadius: 4,
                  marginBottom: 8,
                  cursor: "pointer",
                }}
                onClick={() => {
                  setTheme(theme);
                  setText(
                    theme === "warning" || theme === "light"
                      ? "has-text-dark"
                      : "has-text-light"
                  );
                }}
              ></div>
            ))}
          </div>

          <div>
            <button className="button is-black" onClick={handleClick}>
              use {isMetric ? "Imperial" : "Metric"}
            </button>
          </div>
        </div>
      </div>

      <SettingsIcon
        size={42}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: 24,
          right: isOpen ? WIDTH + 24 : 24,
          cursor: "pointer",
          transition: "right 200ms ease-in-out",
        }}
      />
    </>
  );
};
export default Settings;
