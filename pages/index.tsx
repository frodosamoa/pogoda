import { useState, Dispatch, SetStateAction, useEffect } from "react";

import Application from "../components/Application";
import Hero from "../components/Hero";
import useWeather from "../lib/hooks/useWeather";

type IndexProps = {
  setTheme: Dispatch<SetStateAction<Theme>>;
  isMetric: boolean;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
};

const Index = ({ setTheme, isMetric, setIsMetric }: IndexProps) => {
  const [latLon, setLatLon] = useState<[number, number] | null>(null);
  const [city, setCity] = useState<City | null>(null);

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const {
    data: weather,
    error,
    isLoading,
    mutate: setWeather,
  } = useWeather({
    latLon,
    isMetric,
  });

  return (
    <>
      <Hero
        setLatLon={setLatLon}
        setCity={setCity}
        setIsSettingsOpen={setIsSettingsOpen}
        city={city}
        weather={weather}
        error={error}
        isLoading={isLoading}
        setWeather={setWeather}
      />
      <Application
        isSettingsOpen={isSettingsOpen}
        setIsSettingsOpen={setIsSettingsOpen}
        isMetric={isMetric}
        setIsMetric={setIsMetric}
        setTheme={setTheme}
        latLon={latLon}
        setLatLon={setLatLon}
        setCity={setCity}
        setWeather={setWeather}
        weather={weather}
      />
    </>
  );
};

export default Index;
