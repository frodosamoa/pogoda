import useGeoPosition from "../lib/useGeoPosition";
import { useEffect, useState } from "react";
import { BASE_URL } from "../lib/api";

const Conditions = ({ currentWeatherData }) => {
  if (!currentWeatherData) {
    return null;
  }
  const { main, weather } = currentWeatherData;

  return (
    <h2 className="subtitle">
      It is currently {weather.main} and {main.temp} degrees Fahrenheit.
    </h2>
  );
};

const Home = () => {
  const state = useGeoPosition();
  const [currentWeatherData, setCurrentWeatherData] = useState();

  const { error, latitude, longitude } = state;

  if (error) {
    return <div>{error.message}</div>;
  }

  useEffect(() => {
    const getWeather = async (latitude, longitude) => {
      const res = await fetch(
        `${BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const json = await res.json();

      setCurrentWeatherData(json);
    };

    if (latitude && longitude) {
      getWeather(latitude, longitude);
    }
  }, [latitude, longitude]);

  return (
    <section className="hero is-link is-fullheight">
      <div className="hero-body has-text-centered">
        <div className="container">
          <h1 className="title">
            Hello! You are located at {latitude}, {longitude}.
          </h1>

          <Conditions currentWeatherData={currentWeatherData} />
        </div>
      </div>
    </section>
  );
};

export default Home;
