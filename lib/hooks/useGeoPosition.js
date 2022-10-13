import { useEffect, useState } from "react";

const useGeolocation = (fetch = false, options) => {
  const [state, setState] = useState({
    latitude: null,
    longitude: null,
    timestamp: Date.now(),
  });

  let mounted = true;

  const onEvent = (event) => {
    if (mounted) {
      setState({
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        timestamp: event.timestamp,
      });
    }
  };

  const onEventError = (error) =>
    mounted && setState((oldState) => ({ ...oldState, error }));

  useEffect(() => {
    if (fetch) {
      navigator.geolocation.getCurrentPosition(onEvent, onEventError, options);
    }

    return () => {
      mounted = false;
    };
  }, [fetch]);

  return state;
};

export default useGeolocation;
