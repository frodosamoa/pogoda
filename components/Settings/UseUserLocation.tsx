import { useEffect, useState, Dispatch, SetStateAction } from "react";

import useGeoPosition from "../../lib/hooks/useGeoPosition";

type UserResponseProps = {
  latitude: number;
  longitude: number;
  fetchGeo: boolean;
  latLon: [number, number];
  setFetchGeo: Dispatch<SetStateAction<boolean>>;
  setLatLon: Dispatch<SetStateAction<[number, number]>>;
  setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
  setCity: Dispatch<SetStateAction<City>>;
  setWeather: Dispatch<SetStateAction<Weather>>;
};

const UserResponse = ({
  latitude,
  longitude,
  latLon,
  fetchGeo,
  setFetchGeo,
  setCity,
  setIsSettingsOpen,
  setLatLon,
  setWeather,
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
        <div
          style={{ marginTop: 8, fontStyle: "italic" }}
          className="is-size-7"
        >
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
              setWeather(null);
              setLatLon([longitude, latitude]);
              setIsSettingsOpen(false);
              setCity(null);
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
  setCity: Dispatch<SetStateAction<City>>;
  setWeather: Dispatch<SetStateAction<Weather>>;
  latLon: [number, number];
};

const UseUserLocation = ({
  setLatLon,
  setCity,
  setIsSettingsOpen,
  setWeather,
  latLon,
}: UseUserLocationProps) => {
  const [fetchGeo, setFetchGeo] = useState(false);
  const { latitude, longitude, error } = useGeoPosition(fetchGeo);

  useEffect(() => {
    if (latitude && longitude) {
      setWeather(null);
      setLatLon([longitude, latitude]);
      setIsSettingsOpen(false);
      setCity(null);
    }
  }, [latitude, longitude, setLatLon, setIsSettingsOpen, setCity, setWeather]);

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
        setCity={setCity}
        setWeather={setWeather}
      />
    </div>
  );
};

export default UseUserLocation;
