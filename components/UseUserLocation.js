import { useEffect, useState } from "react";

import useGeoPosition from "../lib/hooks/useGeoPosition";

const UseUserLocation = ({ setLatLon, theme }) => {
  const [fetchGeo, setFetchGeo] = useState(false);
  const { latitude, longitude } = useGeoPosition(fetchGeo);

  useEffect(() => {
    if (latitude && longitude) {
      setLatLon([longitude, latitude]);
    }
  }, [latitude, longitude]);

  return (
    <>
      <button
        className={`button is-${theme} is-light`}
        onClick={() => setFetchGeo(true)}
      >
        use your location
      </button>
      <div className="is-size-7 is-italic" style={{ marginTop: 8 }}>
        your location isn't stored
      </div>
    </>
  );
};

export default UseUserLocation;
