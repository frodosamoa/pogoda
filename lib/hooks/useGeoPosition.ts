import { useEffect, useState, useRef } from "react";

const useGeoPosition = (fetch = false, options?: PositionOptions) => {
  const [state, setState] = useState<{
    latitude: number | null;
    longitude: number | null;
    timestamp: number;
    error?: GeolocationPositionError;
  }>({
    latitude: null,
    longitude: null,
    timestamp: Date.now(),
  });
  const mounted = useRef(true);

  const onEvent: PositionCallback = (event) => {
    if (mounted) {
      setState({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        timestamp: event.timestamp,
      });
    }
  };

  const onEventError: PositionErrorCallback = (error) =>
    mounted.current && setState((oldState) => ({ ...oldState, error }));

  useEffect(() => {
    if (fetch) {
      navigator.geolocation.getCurrentPosition(onEvent, onEventError, options);
    }

    return () => {
      mounted.current = false;
    };
  }, [fetch, options]);

  return state;
};

export default useGeoPosition;
