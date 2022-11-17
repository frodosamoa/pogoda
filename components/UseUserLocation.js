import { useEffect, useState } from "react";

import useGeoPosition from "../lib/hooks/useGeoPosition";

const UserResponse = ({
  latitude,
  longitude,
  latLon,
  fetchGeo,
  setFetchGeo,
  setLatLon,
}) => {
  if (!latitude && !longitude) {
    return (
      <>
        <button
          className="button is-black"
          onClick={() => {
            if (fetchGeo) {
              setLatLon([longitude, latitude]);
            } else {
              setFetchGeo(true);
            }
          }}
        >
          use your location
        </button>
        <div className="is-size-7 is-italic m-t-8">
          your location isn't stored
        </div>
      </>
    );
  }

  return (
    <>
      {latitude === latLon[1] && longitude === latLon[0] && (
        <p className="is-size-6 has-text-grey">using your location</p>
      )}
      {latitude !== latLon[1] && longitude !== latLon[0] && (
        <button
          className="button is-black"
          onClick={() => {
            setLatLon([longitude, latitude]);
          }}
        >
          use your location
        </button>
      )}
    </>
  );
};

const UseUserLocation = ({
  setLatLon,
  setCityName,
  setIsSettingsOpen,
  latLon,
}) => {
  const [fetchGeo, setFetchGeo] = useState(false);
  const { latitude, longitude, error } = useGeoPosition(fetchGeo);

  useEffect(() => {
    if (latitude && longitude) {
      setLatLon([longitude, latitude]);
      setIsSettingsOpen(false);
      setCityName(null);
    }
  }, [latitude, longitude]);

  return (
    <div
      style={{
        flex: error ? 0 : 1,
        opacity: error ? 0 : 1,
        transition: "all 300ms ease-in-out",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <UserResponse
        latitude={latitude}
        longitude={longitude}
        latLon={latLon}
        fetchGeo={fetchGeo}
        setFetchGeo={setFetchGeo}
        setLatLon={setLatLon}
      />
    </div>
  );
};

export default UseUserLocation;
