import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const useCities = (query: string) => {
  const formattedQuery = query.replace(/[^\w\s]/g, ""); // remove non-word characters
  const shouldFetch = formattedQuery?.length > 0;
  const { data, error, isValidating, mutate } = useSWR<City[], Error>(
    shouldFetch ? `/api/cities?query=${formattedQuery}` : null,
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

export default useCities;
