import useSWR from "swr";

import { formatWeather } from "@/lib/utils/weather";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useWeather = ({
  latLon,
  isMetric,
  is24hr,
}: {
  latLon: [number, number];
  isMetric: boolean;
  is24hr: boolean;
}) => {
  const shouldFetch = latLon?.length > 0;
  const { data, error, isValidating, mutate } = useSWR<WeatherResponse, Error>(
    shouldFetch
      ? `/api/weather?latitude=${latLon[1]}&longitude=${latLon[0]}&exclude=minutely`
      : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );

  return {
    data: formatWeather({ data, isMetric, is24hr }),
    error,
    isValidating,
    mutate,
  };
};

export default useWeather;
