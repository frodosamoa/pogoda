import { useEffect, useState } from "react";

const useGeolocation = (fetch = false, options) => {
  const [state, setState] = useState({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: null,
    longitude: null,
    speed: null,
    timestamp: Date.now(),
  });

  let mounted = true;

  const onEvent = (event) => {
    if (mounted) {
      setState({
        accuracy: event.coords.accuracy,
        altitude: event.coords.altitude,
        altitudeAccuracy: event.coords.altitudeAccuracy,
        heading: event.coords.heading,
        latitude: event.coords.latitude,
        longitude: event.coords.longitude,
        speed: event.coords.speed,
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
