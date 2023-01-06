import { Dispatch, SetStateAction } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "styled-components";

import MenuIcon from "./MenuIcon";

type ThemeProps = {
  setTheme: Dispatch<SetStateAction<Theme>>;
};

const Theme = ({ setTheme }: ThemeProps) => {
  const { theme } = useTheme();

  return (
    <MenuIcon
      style={{ cursor: "pointer", position: "relative" }}
      onClick={() =>
        setTheme((theme: Theme) => (theme === "light" ? "dark" : "light"))
      }
    >
      {theme === "dark" ? <Sun /> : <Moon />}
    </MenuIcon>
  );
};

export default Theme;
