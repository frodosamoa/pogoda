import { SetStateAction, Dispatch } from "react";
import { Check as CheckIcon } from "react-feather";

import THEMES from "../../constants/themes";

type ThemeProps = {
  theme: Theme;
  globalTheme: Theme;
  setTheme: Dispatch<SetStateAction<string>>;
};

const Theme = ({ theme, globalTheme, setTheme }: ThemeProps) => (
  <div
    style={{
      flex: "0 0 25%",
      height: 40,
      marginBottom: 8,
      cursor: "pointer",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    onClick={() => setTheme(theme)}
  >
    <div
      className={`has-background-${theme}`}
      style={{
        height: "100%",
        width: 40,
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CheckIcon
        size={24}
        style={{
          opacity: globalTheme === theme ? 1 : 0,
          transition: "opacity 150ms ease-in-out",
        }}
        className={
          theme === "warning" || theme === "light"
            ? "has-text-dark"
            : "has-text-light"
        }
      />
    </div>
  </div>
);

type ThemesProps = {
  globalTheme: Theme;
  setTheme: Dispatch<SetStateAction<string>>;
};

const Themes = ({ globalTheme, setTheme }: ThemesProps) => (
  <>
    <p className="is-size-6 m-b-16">theme</p>
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {THEMES.map((theme) => (
        <Theme
          key={theme}
          theme={theme}
          globalTheme={globalTheme}
          setTheme={setTheme}
        />
      ))}
    </div>
  </>
);

export default Themes;
