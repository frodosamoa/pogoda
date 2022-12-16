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

type CurrentWeather = {
  dt: number;
  sunset: number;
  sunrise: number;
  visibility: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  temp: number;
  weather: { id: number; main: string; description: string; icon: string }[];
  rain: number | { "1h": number };
};

type DailyWeather = {
  dt: number;
  sunset: number;
  sunrise: number;
  wind_speed: number;
  wind_deg: number;
  weather: { id: number; main: string; description: string; icon: string }[];
  temp: { min: number; max: number; day: number };
  rain: number;
};

type Weather = {
  daily: DailyWeather[];
  current: CurrentWeather;
};
