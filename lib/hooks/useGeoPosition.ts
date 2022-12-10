import { useEffect, useState } from "react";

const useGeoPosition = (fetch = false) => {
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

  let mounted = true;

  const onEvent: PositionCallback = (event) => {
    if (mounted) {
      setState({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        timestamp: event.timestamp,
      });
    }
  };

  const onEventError: PositionErrorCallback = (error) => {
    if (mounted) {
      setState((oldState) => ({ ...oldState, error }));
    }
  };

  useEffect(() => {
    if (fetch) {
      navigator.geolocation.getCurrentPosition(onEvent, onEventError);
    }

    return () => {
      mounted = false;
    };
  }, [fetch]);

  return state;
};

export default useGeoPosition;
