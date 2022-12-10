type Theme =
  | "primary"
  | "link"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "dark"
  | "light";

type City = {
  cityId: string;
  name: string;
  adminCode: string;
  country: string;
  loc: {
    coordinates: [number, number];
  };
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
  lat: number;
  lon: number;
  daily: DailyWeather[];
  current: CurrentWeather;
};
