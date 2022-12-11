import { ReactNode } from "react";

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

export default SettingsItem;
