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

type CurrentWeather = {
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

type DailyForecast = {
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

type HourlyForecast = {
  dt: number;
  wind_speed: number;
  wind_deg: number;
  pop: number;
  temp: number;
  rain: number;
  weather: WeatherCondition[];
};

type Weather = {
  timezone: string;
  daily: DailyForecast[];
  hourly: HourlyForecast[];
  current: CurrentWeather;
};
