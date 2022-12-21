import { useEffect, Dispatch, SetStateAction } from "react";

const usePrefersDarkMode = ({
  setTheme,
}: {
  setTheme: Dispatch<SetStateAction<Theme>>;
}) => {
  useEffect(() => {
    if (window) {
      const prefersDarkScheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );

      if (prefersDarkScheme.matches) {
        setTheme("dark");
      }
    }
  }, [setTheme]);
};

export default usePrefersDarkMode;
