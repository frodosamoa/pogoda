import { ReactNode } from "react";

type SettingsContainerProps = {
  isSettingsOpen: boolean;
  children: ReactNode;
};

const WIDTH = 250;

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

export default SettingsContainer;
