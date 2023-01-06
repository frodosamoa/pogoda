import { Dispatch, SetStateAction } from "react";

import Weather from "@/components/Weather";
import useWeather from "@/lib/hooks/useWeather";

type IndexProps = {
  setTheme: Dispatch<SetStateAction<Theme>>;
  isMetric: boolean;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
  latLon: [number, number];
  city?: City;
};

const Index = ({ latLon, city, isMetric, setIsMetric }: IndexProps) => {
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
    <Weather
      city={city}
      weather={weather}
      error={error}
      isLoading={isLoading}
      setWeather={setWeather}
      isMetric={isMetric}
      setIsMetric={setIsMetric}
    />
  );
};

export default Index;
