import { useEffect, useState, Dispatch, SetStateAction } from "react";

import useGeoPosition from "../../lib/hooks/useGeoPosition";

type UserResponseProps = {
  latitude: number;
  longitude: number;
  fetchGeo: boolean;
  setFetchGeo: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setCityName: Dispatch<SetStateAction<string>>;
  latLon: [number, number];
};

const UserResponse = ({
  latitude,
  longitude,
  latLon,
  fetchGeo,
  setFetchGeo,
  setCityName,
  setIsSettingsOpen,
  setLatLon,
}: UserResponseProps) => {
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
          your location isn&apos;t stored
        </div>
      </>
    );
  }

  return (
    <>
      {latitude === (latLon && latLon[1]) &&
        longitude === (latLon && latLon[0]) && (
          <p className="is-size-6 has-text-grey">using your location</p>
        )}
      {latitude !== (latLon && latLon[1]) &&
        longitude !== (latLon && latLon[0]) && (
          <button
            className="button is-black"
            onClick={() => {
              setLatLon([longitude, latitude]);
              setIsSettingsOpen(false);
              setCityName(null);
            }}
          >
            use your location
          </button>
        )}
    </>
  );
};

type UseUserLocationProps = {
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setCityName: Dispatch<SetStateAction<string>>;
  latLon: [number, number];
};

const UseUserLocation = ({
  setLatLon,
  setCityName,
  setIsSettingsOpen,
  latLon,
}: UseUserLocationProps) => {
  const [fetchGeo, setFetchGeo] = useState(false);
  const { latitude, longitude, error } = useGeoPosition(fetchGeo);

  useEffect(() => {
    if (latitude && longitude) {
      setLatLon([longitude, latitude]);
      setIsSettingsOpen(false);
      setCityName(null);
    }
  }, [latitude, longitude, setLatLon, setIsSettingsOpen, setCityName]);

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
        setIsSettingsOpen={setIsSettingsOpen}
        setCityName={setCityName}
      />
    </div>
  );
};

export default UseUserLocation;
