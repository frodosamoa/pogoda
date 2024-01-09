import { useEffect, Dispatch, SetStateAction } from "react";

import { THEMES } from "@/lib/constants/theme";

const useLocalStorage = ({
  setTheme,
  setIsMetric,
  isMetric,
  theme,
  is24hr,
  setIs24hr,
}: {
  setTheme: Dispatch<SetStateAction<Theme>>;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
  isMetric: boolean;
  theme: Theme;
  is24hr: boolean;
  setIs24hr: Dispatch<SetStateAction<boolean>>;
}) => {
  useEffect(() => {
    if (window) {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      let preferences;

      try {
        preferences = JSON.parse(
          localStorage.getItem(window.location.origin) || "{}"
        );
      } catch (e) {
        preferences = {};
      }

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

      if (preferences?.is24hr !== is24hr) {
        setIs24hr(!is24hr);
      }

      localStorage.setItem(
        window.location.origin,
        JSON.stringify({
          isMetric,
          theme,
          is24hr,
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
          is24hr,
        })
      );
    }
  }, [isMetric, theme, is24hr]);
};

export default useLocalStorage;
