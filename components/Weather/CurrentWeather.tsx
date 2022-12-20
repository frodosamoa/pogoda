import Visibility from "./Visibility";
import Humidity from "./Humidity";
import SunriseSunset from "./SunriseSunset";
import Wind from "./Wind";
import Precipitation from "./Precipitation";
import FeelsLike from "./FeelsLike";
import UVIndex from "./UVIndex";
import Pressure from "./Pressure";

type CurrentWeatherProps = {
  current: CurrentWeather;
  isMetric: boolean;
};

const CurrentWeather = ({ current, isMetric }: CurrentWeatherProps) => {
  const {
    weather,
    wind_speed: windSpeed,
    wind_deg: windDegree,
    humidity,
    rain = 0,
    sunrise,
    sunset,
    visibility,
    feels_like: feelsLike,
    pressure,
    uvi: uvIndex,
  } = current;

  if (!weather) {
    return null;
  }

  return (
    <>
      <SunriseSunset sunrise={sunrise} sunset={sunset} />
      <Visibility isMetric={isMetric} visibility={visibility} />
      <Humidity humidity={humidity} />
      <Wind isMetric={isMetric} windDegree={windDegree} windSpeed={windSpeed} />
      <Precipitation isMetric={isMetric} rain={rain} />
      <FeelsLike isMetric={isMetric} feelsLike={feelsLike} />
      <UVIndex uvIndex={uvIndex} />
      <Pressure pressure={pressure} />
    </>
  );
};

export default CurrentWeather;
