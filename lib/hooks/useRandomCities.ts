import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useRandomCities = () => {
  const { data, error, isValidating, mutate } = useSWR<City[], Error>(
    `/api/randomCities`,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateIfStale: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    error,
    isValidating,
    mutate,
  };
};

export default useRandomCities;
