import Head from "next/head";
import type { AppProps } from "next/app";
import { useState } from "react";
import { ThemeProvider, DefaultTheme } from "styled-components";

import { DEFAULT_THEME } from "../lib/constants/theme";
import usePrefersDarkMode from "../lib/hooks/usePrefersDarkMode";
import "../styles/styles.css";

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<Theme>("light");
  usePrefersDarkMode({ setTheme });

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
        <Component {...pageProps} setTheme={setTheme} />
      </ThemeProvider>
    </>
  );
};

export default App;
