import { useState } from "react";
import { Settings as SettingsIcon } from "react-feather";

const Settings = ({ handleClick, isMetric }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <div
      className="has-background-light"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        cursor: "pointer",
        width: 150,
        height: "100%",
      }}
    >
      {/* <SettingsIcon size={36} /> */}
      <button className="button is-black" onClick={handleClick}>
        use {isMetric ? "Imperial" : "Metric"}
      </button>
    </div>
  );
};
export default Settings;
