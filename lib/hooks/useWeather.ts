import useSWR from "swr";

import { formatWeather } from "@/lib/utils/weather";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useWeather = ({
  latLon,
  isMetric,
}: {
  latLon: [number, number];
  isMetric: boolean;
}) => {
  const shouldFetch = latLon?.length > 0;
  const { data, error, isLoading, mutate } = useSWR<WeatherResponse, Error>(
    shouldFetch
      ? `/api/weather?latitude=${latLon[1]}&longitude=${latLon[0]}&exclude=minutely`
      : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );

  return {
    data: formatWeather(data, isMetric),
    error,
    isLoading,
    mutate,
  };
};

export default useWeather;
