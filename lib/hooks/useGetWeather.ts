import { useEffect, useState, Dispatch, SetStateAction } from "react";

const useGetWeather = ({
  latLon,
}: {
  latLon: [number, number];
}): [Weather, Dispatch<SetStateAction<Weather>>] => {
  const [weather, setWeather] = useState<Weather>(null);

  useEffect(() => {
    const getWeather = async (latitude: number, longitude: number) => {
      const res = await fetch(
        `${window.location.href}/api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const json = await res.json();

      setWeather(json);
    };

    if (latLon?.length > 0) {
      getWeather(latLon[1], latLon[0]);
    }
  }, [latLon]);

  return [weather, setWeather];
};

export default useGetWeather;
