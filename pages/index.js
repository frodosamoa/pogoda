import useGeoPosition from "../lib/useGeoPosition";
import { useEffect, useState } from "react";
import { BASE_URL } from "../lib/api";

const Conditions = ({ conditions }) => {
  if (!conditions) {
    return null;
  }
  const { Temperature, WeatherText } = conditions;

  return (
    <div>
      It is currently {WeatherText} and {Temperature.Imperial.Value} degrees{" "}
      {Temperature.Imperial.Unit}.
    </div>
  );
};

const Home = () => {
  const state = useGeoPosition();
  const [conditions, setConditions] = useState();

  const { error, latitude, longitude } = state;

  if (error) {
    return <div>{error.message}</div>;
  }

  useEffect(() => {
    const getWeather = async (latitude, longitude) => {
      const res = await fetch(
        `${BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const { conditions } = await res.json();
      setConditions(conditions[0]);
    };

    if (latitude && longitude) {
      getWeather(latitude, longitude);
    }
  }, [latitude, longitude]);

  return (
    <>
      <div>
        Hello! You are located at {latitude}, {longitude}.
      </div>
      <Conditions conditions={conditions} />
    </>
  );
};

export default Home;
