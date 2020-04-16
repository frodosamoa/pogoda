import useGeoPosition from "../lib/useGeoPosition";
import { useEffect, useState } from "react";
import { BASE_URL } from "../lib/api";
import {
  degreeToCompass,
  kelvinToFahrenheit,
  weatherToIcon,
  getWeatherCodeIconInfo,
} from "../lib/weather";
import classnames from "classnames";
import { format, addDays, addHours } from "date-fns";

const Hourly = ({ hourly }) => (
  <div className="section">
    <div className="columns is-centered is-v-centered">
      {hourly.slice(0, 12).map((h, index) => (
        <div key={index} className={"column is-narrow"}>
          <p>{kelvinToFahrenheit(h.temp)} °F</p>
          <p>{format(addHours(new Date(), index), "h a")}</p>
        </div>
      ))}
    </div>
  </div>
);

const LargeDailySummary = ({ weather, temp }) => {
  let weatherLabel = getWeatherCodeIconInfo(weather.id).label;
  weatherLabel = weatherLabel.charAt(0).toUpperCase() + weatherLabel.slice(1);

  return (
    <>
      <p className="is-size-1">
        <i className={weatherToIcon(weather.id)}></i> {kelvinToFahrenheit(temp)}{" "}
        °F
      </p>

      <p className="is-size-4">{format(new Date(), "EEEE p")}</p>
      <p className="is-size-4">{weatherLabel}</p>
    </>
  );
};

const AdditionalDailyInfo = ({ rain, humidity, windSpeed, windDegree }) => {
  let rainStr;
  if (typeof rain === "number") {
    rainStr = rain;
  }

  if (typeof rain === "object") {
    rainStr = rain["1h"] || rain["3h"];
  }

  return (
    <div>
      <p className="is-size-4">Precipitation: {rainStr}mm</p>
      <p className="is-size-4">Humidity: {humidity}%</p>
      <p className="is-size-4">
        Wind: {windSpeed} mph {degreeToCompass(windDegree)}
      </p>
    </div>
  );
};

const DayWeather = ({
  weather,
  temp,
  windSpeed,
  windDegree,
  humidity,
  rain,
}) => (
  <div className="section">
    <div className="columns is-centered is-v-centered">
      <div className="column">
        <LargeDailySummary weather={weather} temp={temp} />
      </div>
      <div
        className="column"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AdditionalDailyInfo
          windSpeed={windSpeed}
          windDegree={windDegree}
          humidity={humidity}
          rain={rain}
        />
      </div>
    </div>
  </div>
);

const DaySummary = ({ index, weather, temp }) => {
  const iconClassName = classnames(weatherToIcon(weather.id), {
    "is-size-2": true,
  });

  return (
    <div className={"column is-narrow"}>
      <p title={format(addDays(new Date(), index), "PP")} className="is-size-4">
        {format(addDays(new Date(), index), "ccc")}
      </p>
      <br></br>
      <p>
        <i
          title={getWeatherCodeIconInfo(weather.id).label}
          className={iconClassName}
        ></i>
      </p>
      <br></br>
      <p className="is-size-4">{kelvinToFahrenheit(temp.max)}°</p>
      <p className="is-size-6">{kelvinToFahrenheit(temp.min)}°</p>
    </div>
  );
};

const WeekSummary = ({ daily }) => (
  <div className="section">
    <div className="columns is-centered is-v-centered is-variable is-6">
      {daily.map((d, index) => (
        <DaySummary
          key={index}
          index={index}
          weather={d.weather[0]}
          temp={d.temp}
        />
      ))}
    </div>
  </div>
);

const Conditions = ({ currentWeatherData }) => {
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
      <DayWeather
        windDegree={windDegree}
        windSpeed={windSpeed}
        rain={rain}
        humidity={humidity}
        weather={weather[0]}
        temp={temp}
      />
      <WeekSummary daily={daily} />
      {/* <Hourly hourly={hourly} /> */}
    </>
  );
};

const Home = () => {
  const state = useGeoPosition();
  const [currentWeatherData, setCurrentWeatherData] = useState();

  const { error, latitude, longitude } = state;

  if (error) {
    return (
      <section className="hero is-dark is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <h1 class="title">{error.message}</h1>
          </div>
        </div>
      </section>
    );
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
    <section className="hero is-dark is-fullheight">
      <div className="hero-body has-text-centered">
        <div className="container">
          <Conditions currentWeatherData={currentWeatherData} />
        </div>
      </div>
      <div className="hero-foot has-text-centered">
        {/* <div className="level">
          <div className="level-item">
            <button className="button">Switch to C</button>
          </div>
        </div> */}
        <nav className="tabs is-boxed is-fullwidth">
          <div className="container">
            <p className="has-text-centered has-text-grey-dark is-italic is-size-6">
              {latitude}, {longitude}
            </p>
          </div>
        </nav>
      </div>
    </section>
  );
};

export default Home;
