import Head from "next/head";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

import { DEFAULT_THEME } from "@/lib/constants/theme";
import useLocalStorage from "@/lib/hooks/useLocalStorage";

import "../styles/styles.css";

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isMetric, setIsMetric] = useState(true);
  useLocalStorage({ setTheme, theme, isMetric, setIsMetric });

  const providedTheme: DefaultTheme = {
    theme,
    ...DEFAULT_THEME,
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          href={theme === "light" ? "/sun-light.svg" : "/sun-dark.svg"}
        />
        <title>Pogoda - Weather Dashboard</title>
      </Head>
      <ThemeProvider theme={providedTheme}>
        <Component
          {...pageProps}
          setTheme={setTheme}
          isMetric={isMetric}
          setIsMetric={setIsMetric}
        />
      </ThemeProvider>
    </>
  );
};

export default App;
