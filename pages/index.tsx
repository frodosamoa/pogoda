import { Dispatch, SetStateAction } from "react";
import { KeyedMutator } from "swr";

import Weather from "@/components/Weather";

type IndexProps = {
  setTheme: Dispatch<SetStateAction<Theme>>;
  isMetric: boolean;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
  city?: City;
  is24hr: boolean;
  setIs24hr: Dispatch<SetStateAction<boolean>>;
  weather: Weather;
  isValidating: boolean;
  setWeather: KeyedMutator<WeatherResponse>;
  error: Error;
};

const Index = ({
  city,
  isMetric,
  setIsMetric,
  is24hr,
  setIs24hr,
  weather,
  setWeather,
  isValidating,
  error,
}: IndexProps) => (
  <Weather
    city={city}
    weather={weather}
    error={error}
    isValidating={isValidating}
    setWeather={setWeather}
    isMetric={isMetric}
    setIsMetric={setIsMetric}
    is24hr={is24hr}
    setIs24hr={setIs24hr}
  />
);

export default Index;
