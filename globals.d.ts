type Theme =
  | "light"
  | "dark"
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "turquoise"
  | "cyan"
  | "blue"
  | "purple";

type Sizes = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

type City = {
  cityId: string;
  name: string;
  latitude: number;
  longitude: number;
  countryName: string;
  administrativeName: string;
};

type WeatherCondition = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type CurrentWeatherResponse = {
  dt: number;
  sunset: number;
  sunrise: number;
  visibility: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  temp: number;
  feels_like: number;
  uvi: number;
  pressure: number;
  weather: WeatherCondition[];
  rain: number | { "1h": number };
};

type DailyForecastResponse = {
  dt: number;
  sunset: number;
  sunrise: number;
  wind_speed: number;
  wind_deg: number;
  pop: number;
  rain: number;
  weather: WeatherCondition[];
  temp: { min: number; max: number; day: number };
};

type HourlyForecastResponse = {
  dt: number;
  wind_speed: number;
  wind_deg: number;
  pop: number;
  temp: number;
  rain: number;
  weather: WeatherCondition[];
};

type AirPollution = {
  main: {
    aqi: 1 | 2 | 3 | 4 | 5;
  };
};

type AirPollutionResponse = {
  list: AirPollution[];
};

type AlertResponse = {
  sender_name: string;
  event: string;
  end: number;
};

type WeatherResponse = {
  timezone: string;
  daily: DailyForecastResponse[];
  hourly: HourlyForecastResponse[];
  current: CurrentWeatherResponse;
  airPollution: AirPollutionResponse;
  alerts: AlertResponse[];
};

type CurrentWeather = {
  humidity: number;
  isDay: boolean;
  sunrise: string;
  sunset: string;
  temp: number;
  label: string;
  iconId: number;
  feelsLike: number;
  visibility: string;
  windSpeed: string;
  windDegree: string;
  pressure: number;
  uvIndex: number;
  rain: string;
  airQuality;
};

type DailyForecast = {
  fullDate: string;
  sunset: number;
  sunrise: number;
  date: string;
  temp: {
    min: number;
    max: number;
  };
  label: string;
  iconId: number;
};

type HourlyForecast = {
  date: string;
  temp: number;
  label: string;
  iconId: number;
};

type Alert = {
  senderName: string;
  event: string;
  end: string;
};

type Weather = {
  timezone: string;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  current: CurrentWeather;
  alerts: Alert[];
};
