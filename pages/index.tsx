import { useState, Dispatch, SetStateAction } from "react";

import Application from "../components/Application";
import Hero from "../components/Hero";
import useGetWeather from "../lib/hooks/useGetWeather";

type IndexProps = { setTheme: Dispatch<SetStateAction<Theme>> };

const Index = ({ setTheme }: IndexProps) => {
  const [latLon, setLatLon] = useState<[number, number] | null>(null);
  const [city, setCity] = useState<City | null>(null);
  const [isMetric, setIsMetric] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [weather, setWeather] = useGetWeather({ latLon, isMetric });

  return (
    <>
      <Hero
        latLon={latLon}
        setLatLon={setLatLon}
        setCity={setCity}
        setIsSettingsOpen={setIsSettingsOpen}
        city={city}
        weather={weather}
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
