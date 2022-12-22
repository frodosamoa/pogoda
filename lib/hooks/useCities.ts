import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useCities = (query: string) => {
  const formattedQuery = query.replace(/[^\w\s]/g, ""); // remove non-word characters
  const shouldFetch = formattedQuery?.length > 0;
  const { data, error, isLoading, mutate } = useSWR<City[], Error>(
    shouldFetch ? `/api/cities?query=${formattedQuery}` : null,
    fetcher,
    {
      shouldRetryOnError: false,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCities;
