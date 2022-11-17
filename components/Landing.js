import CitySearch from "./CitySearch";

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
        <CitySearch
          setLatLon={setLatLon}
          setCityName={setCityName}
          theme={theme}
        />
      </div>
    </>
  );
};

export default Landing;
