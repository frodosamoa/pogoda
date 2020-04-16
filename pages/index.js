import useGeoPosition from "../lib/useGeoPosition";
import { useEffect, useState } from "react";
import { BASE_URL } from "../lib/api";

import ErrorMessage from "../components/ErrorMessage";
import WeekSummary from "../components/WeekSummary";
import DayWeather from "../components/DayWeather";
import Footer from "../components/Footer";

// const Hourly = ({ hourly }) => (
//   <div className="section">
//     <div className="columns is-centered is-v-centered">
//       {hourly.slice(0, 12).map((h, index) => (
//         <div key={index} className={"column is-narrow"}>
//           <p>{kelvinToFahrenheit(h.temp)} °F</p>
//           <p>{format(addHours(new Date(), index), "h a")}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// );

const Home = () => {
  const state = useGeoPosition();
  const [currentWeatherData, setCurrentWeatherData] = useState();

  const { error, latitude, longitude } = state;

  if (error) {
    return <ErrorMessage error={error} />;
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

  if (!currentWeatherData) {
    return null;
  }

  const { current, daily } = currentWeatherData;

  const {
    weather,
    temp,
    wind_speed: windSpeed,
    wind_deg: windDegree,
    humidity,
    rain = 0,
  } = current;

  return (
    <>
      <div className="hero-body has-text-centered">
        <div className="container">
          <DayWeather
            windDegree={windDegree}
            windSpeed={windSpeed}
            rain={rain}
            humidity={humidity}
            weather={weather[0]}
            temp={temp}
          />
          <WeekSummary daily={daily} />
        </div>
      </div>
      <Footer latitude={latitude} longitude={longitude} />
    </>
  );
};

export default Home;
