import { Dispatch, SetStateAction } from "react";

import Weather from "@/components/Weather";
import useWeather from "@/lib/hooks/useWeather";

type IndexProps = {
  setTheme: Dispatch<SetStateAction<Theme>>;
  isMetric: boolean;
  setIsMetric: Dispatch<SetStateAction<boolean>>;
  latLon: [number, number];
  city?: City;
  is24hr: boolean;
  setIs24hr: Dispatch<SetStateAction<boolean>>;
};

const Index = ({
  latLon,
  city,
  isMetric,
  setIsMetric,
  is24hr,
  setIs24hr,
}: IndexProps) => {
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

  return (
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
};

export default Index;
