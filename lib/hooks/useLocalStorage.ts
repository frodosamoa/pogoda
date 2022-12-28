import { useEffect, Dispatch, SetStateAction } from "react";

import { THEMES } from "@/lib/constants/theme";

const useLocalStorage = ({
  setTheme,
  setIsMetric,
  isMetric,
  theme,
}: {
  setTheme: Dispatch<SetStateAction<Theme>>;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
  isMetric: boolean;
  theme: Theme;
}) => {
  useEffect(() => {
    if (window) {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      const preferences = JSON.parse(
        localStorage.getItem(window.location.origin)
      );

      if (preferences?.theme) {
        if (
          THEMES.hasOwnProperty(preferences.theme) &&
          preferences.theme !== theme
        ) {
          setTheme(preferences.theme);
        }
      } else {
        if (prefersDarkScheme.matches) {
          setTheme("dark");
        }
      }

      if (preferences?.isMetric !== isMetric) {
        setIsMetric(!isMetric);
      }

      localStorage.setItem(
        window.location.origin,
        JSON.stringify({
          isMetric,
          theme,
        })
      );
    }
  }, []);

  useEffect(() => {
    if (window) {
      localStorage.setItem(
        window.location.origin,
        JSON.stringify({
          isMetric,
          theme,
        })
      );
    }
  }, [isMetric, theme]);
};

export default useLocalStorage;
