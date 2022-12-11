import { SetStateAction, Dispatch } from "react";

import THEMES from "../../constants/themes";

import Theme from "./Theme";

type ThemesProps = {
  globalTheme: Theme;
  setTheme: Dispatch<SetStateAction<string>>;
};

const Themes = ({ globalTheme, setTheme }: ThemesProps) => (
  <>
    <p style={{ marginBottom: 16 }} className="is-size-6">
      theme
    </p>
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
