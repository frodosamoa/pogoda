import CitySearch from "./CitySearch";
import UseUserLocation from "./UseUserLocation";

const Landing = ({ setLatLon, setCityName, theme }) => {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CitySearch setLatLon={setLatLon} setCityName={setCityName} />
      </div>
      <br />
      <h5>or</h5>
      <br />
      <UseUserLocation setLatLon={setLatLon} theme={theme} />
    </>
  );
};

export default Landing;
