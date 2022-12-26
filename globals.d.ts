type Theme = "light" | "dark";
// | "red"
// | "orange"
// | "yellow"
// | "green"
// | "turquoise"
// | "cyan"
// | "blue"
// | "purple"

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
  dew_point: number;
  weather: WeatherCondition[];
  rain?: { "1h": number };
  snow?: { "1h": number };
};

type DailyForecastResponse = {
  dt: number;
  sunset: number;
  sunrise: number;
  wind_speed: number;
  wind_deg: number;
  pop: number;
  rain: number;
  snow: number;
  weather: WeatherCondition[];
  temp: { min: number; max: number; day: number };
};

type HourlyForecastResponse = {
  dt: number;
  wind_speed: number;
  wind_deg: number;
  pop: number;
  uvi: number;
  temp: number;
  rain?: { "1h": number };
  snow?: { "1h": number };
  weather: WeatherCondition[];
};

type AirPollution = {
  components: {
    pm2_5: number;
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

type SunriseSunset = {
  date: string;
  dt: Date;
  type: string;
};

type CurrentWeather = {
  airQuality: number;
  airQualityLabel: string;
  airQualityMessage: string;
  feelsLike: number;
  humidity: number;
  iconId: number;
  label: string;
  pressure: number;
  rain: number;
  dewPoint: number;
  rainLabel: string;
  snow: number;
  snowLabel: string;
  sunrisesSunsets: SunriseSunset[];
  temp: number;
  uvIndex: number;
  uvLabel: string;
  uvMessage: string;
  visibility: number;
  visibilityUnit: string;
  windDirection: string;
  windSpeed: string;
  windLabel: string;
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
  iconClassName: string;
  precipitationChance: number;
};

type HourlyForecast = {
  date: string;
  temp: number;
  label: string;
  iconClassName: string;
  precipitationChance: number;
};

type Alert = {
  senderName: string;
  event: string;
  end: string;
};

type Weather = {
  timezone: string;
  daily: DailyForecast[];
  hourly: (HourlyForecast | SunriseSunset)[];
  current: CurrentWeather;
  alerts: Alert[];
};
