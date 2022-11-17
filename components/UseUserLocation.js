import { useEffect, useState } from "react";

import useGeoPosition from "../lib/hooks/useGeoPosition";

const UseUserLocation = ({ setLatLon, setCityName, setIsSettingsOpen }) => {
  const [fetchGeo, setFetchGeo] = useState(false);
  const { latitude, longitude, error } = useGeoPosition(fetchGeo);
  console.log(error);

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
        transition: "all 200ms ease-in-out",
        display: "flex",
        flexDirection: "column",
        justifyContent: "end",
      }}
    >
      <button
        className="button is-black"
        onClick={() => {
          setFetchGeo(true);
        }}
      >
        use your location
      </button>
      <div className="is-size-7 is-italic" style={{ marginTop: 8 }}>
        your location isn't stored
      </div>
    </div>
  );
};

export default UseUserLocation;
