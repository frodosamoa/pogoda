import { useEffect, useReducer } from "react";

import ErrorMessage from "../components/ErrorMessage";
import WeekSummary from "../components/WeekSummary";
import DayWeather from "../components/DayWeather";
import Footer from "../components/Footer";

import { BASE_URL } from "../lib/api";
import useGeoPosition from "../lib/useGeoPosition";
import weatherReducer, {
  initialState,
  SET_WEATHER,
} from "../lib/weatherReducer";

const Home = () => {
  const geoState = useGeoPosition();
  const { error, latitude, longitude } = geoState;

  const [weatherState, dispatch] = useReducer(weatherReducer, initialState);

  if (error) {
    return <ErrorMessage error={error} />;
  }

  useEffect(() => {
    const getWeather = async (latitude, longitude) => {
      const res = await fetch(
        `${BASE_URL}/api/weather?latitude=${latitude}&longitude=${longitude}`
      );
      const json = await res.json();

      dispatch({ type: SET_WEATHER, payload: json });
    };

    if (latitude && longitude) {
      getWeather(latitude, longitude);
    }
  }, [latitude, longitude]);

  const { current, daily } = weatherState;

  return (
    <>
      <div className="hero-body has-text-centered">
        <div className="container">
          <DayWeather current={current} />
          <WeekSummary daily={daily} />
        </div>
      </div>
      <Footer latitude={latitude} longitude={longitude} />
    </>
  );
};

export default Home;
