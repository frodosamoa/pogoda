import { Settings as SettingsIcon } from "react-feather";

const Settings = () => (
  <div
    style={{
      position: "fixed",
      bottom: 12,
      right: 12,
      cursor: "pointer",
      width: 36,
      height: 36,
    }}
  >
    <SettingsIcon size={36} />
  </div>
);

export default Settings;
