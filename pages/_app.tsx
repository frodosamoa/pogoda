import Head from "next/head";
import type { AppProps } from "next/app";
import { useState } from "react";
import Div100vh from "react-div-100vh";
import styled, { ThemeProvider, DefaultTheme } from "styled-components";

import { DEFAULT_THEME } from "@/lib/constants/theme";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import useGreeting from "@/lib/hooks/useGreeting";
import useWeather from "@/lib/hooks/useWeather";
import MenuBar from "@/components/MenuBar";

import "../styles/styles.css";

const Container = styled(Div100vh)`
  transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
  background-color: ${({ theme: { theme, themes } }) => themes[theme]};
  color: ${({ theme: { themes, theme } }) =>
    theme === "light" ? themes.dark : themes.light};
`;

const HeroBody = styled.div`
  height: 100%;
  padding-top: 100px;

  @media screen and (max-width: ${({ theme: { breakpoints } }) =>
      breakpoints.mobile}px) {
    padding-top: 70px;
  }
`;

const ComponentContainer = styled.div`
  height: 100%;
  position: relative;
`;

const getAppTitle = ({ city, weather }: { city?: City; weather?: Weather }) =>
  [
    weather?.current && `${weather.current.temp}°`,
    weather?.current && city && `${city.name}, ${city.countryName}`,
    weather?.current?.label,
    "Pogoda - Weather Dashboard",
  ]
    .filter(Boolean)
    .join(" - ");

const App = ({ Component, pageProps }: AppProps) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [isMetric, setIsMetric] = useState(true);
  const [is24hr, setIs24hr] = useState(false);
  useLocalStorage({
    setTheme,
    theme,
    isMetric,
    setIsMetric,
    is24hr,
    setIs24hr,
  });

  const [latLon, setLatLon] = useState<[number, number] | null>(null);
  const [city, setCity] = useState<City | null>(null);

  const {
    data: weather,
    error,
    isValidating,
    mutate: setWeather,
  } = useWeather({
    latLon,
    isMetric,
    is24hr,
  });

  useGreeting();

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
        <title>{getAppTitle({ city, weather })}</title>
      </Head>
      <ThemeProvider theme={providedTheme}>
        <Container className="hero">
          <HeroBody className="hero-body">
            <ComponentContainer className="container is-max-desktop">
              <Component
                {...pageProps}
                setTheme={setTheme}
                isMetric={isMetric}
                setIsMetric={setIsMetric}
                is24hr={is24hr}
                setIs24hr={setIs24hr}
                latLon={latLon}
                city={city}
                weather={weather}
                setWeather={setWeather}
                isValidating={isValidating}
                error={error}
              />
              <MenuBar
                setTheme={setTheme}
                setLatLon={setLatLon}
                setCity={setCity}
                latLon={latLon}
              />
            </ComponentContainer>
          </HeroBody>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default App;
