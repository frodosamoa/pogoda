import { useTheme } from "styled-components";
import { SetStateAction, Dispatch } from "react";

import Theme from "./Theme";

type ThemesProps = {
  globalTheme: Theme;
  setTheme: Dispatch<SetStateAction<string>>;
};

const Themes = ({ globalTheme, setTheme }: ThemesProps) => {
  const theme = useTheme();

  return (
    <>
      <p style={{ marginBottom: 16 }} className="is-size-6">
        theme
      </p>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {Object.keys(theme.themes).map((theme) => (
          <Theme
            key={theme}
            theme={theme as Theme}
            globalTheme={globalTheme}
            setTheme={setTheme}
          />
        ))}
      </div>
    </>
  );
};

export default Themes;
