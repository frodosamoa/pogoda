import { useEffect, useState, Dispatch, SetStateAction } from "react";
import { formatWeather } from "../utils/weather";

const useGetWeather = ({
  latLon,
  isMetric,
}: {
  latLon: [number, number];
  isMetric: boolean;
}): [Weather, Dispatch<SetStateAction<WeatherResponse>>] => {
  const [weather, setWeather] = useState<WeatherResponse>(null);

  useEffect(() => {
    const getWeather = (latitude: number, longitude: number) => {
      fetch(
        `${window.location.href}/api/weather?latitude=${latitude}&longitude=${longitude}&exclude=minutely`
      )
        .then((res) => res.json())
        .then((json) => setWeather(json));
    };

    if (latLon?.length > 0) {
      getWeather(latLon[1], latLon[0]);
    }
  }, [latLon]);

  return [formatWeather(weather, isMetric), setWeather];
};

export default useGetWeather;
