import Head from "next/head";
import type { AppProps } from "next/app";
import { useState } from "react";
import styled, { ThemeProvider, DefaultTheme } from "styled-components";

import { DEFAULT_THEME } from "@/lib/constants/theme";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import MenuBar from "@/components/MenuBar";

import "../styles/styles.css";

const Container = styled.div`
  transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
  background-color: ${({ theme: { theme, themes } }) => themes[theme]};
  color: ${({ theme: { themes, theme } }) =>
    theme === "light" ? themes.dark : themes.light};
`;

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isMetric, setIsMetric] = useState(true);
  useLocalStorage({ setTheme, theme, isMetric, setIsMetric });

  const [latLon, setLatLon] = useState<[number, number] | null>(null);
  const [city, setCity] = useState<City | null>(null);

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
        <Container className="hero">
          <div
            className="hero-body"
            style={{ height: "100vh", paddingTop: 100 }}
          >
            <div
              className="container is-max-desktop"
              style={{
                height: "100%",
                position: "relative",
              }}
            >
              <Component
                {...pageProps}
                setTheme={setTheme}
                isMetric={isMetric}
                setIsMetric={setIsMetric}
                latLon={latLon}
                city={city}
              />
              <MenuBar
                setTheme={setTheme}
                setLatLon={setLatLon}
                setCity={setCity}
                latLon={latLon}
              />
            </div>
          </div>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
