type Theme = "light" | "dark";
// | "red"
// | "orange"
// | "yellow"
// | "green"
// | "turquoise"
// | "cyan"
// | "blue"
// | "purple"

type UnitSizes = "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

type City = {
  administrativeName: string;
  cityId: string;
  countryName: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  name: string;
};

type WeatherCondition = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

type CurrentWeatherResponse = {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  moon_phase?: number;
  pressure: number;
  rain?: { "1h": number };
  snow?: { "1h": number };
  sunrise?: number;
  sunset?: number;
  temp: number;
  uvi: number;
  visibility: number;
  weather: WeatherCondition[];
  wind_deg: number;
  wind_gust?: number;
  wind_speed: number;
};

type DailyForecastResponse = {
  dt: number;
  pop: number;
  rain?: number;
  snow?: number;
  moon_phase: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    max: number;
    min: number;
  };
  weather: WeatherCondition[];
  wind_deg: number;
  wind_gust?: number;
  wind_speed: number;
};

type HourlyForecastResponse = {
  dt: number;
  pop: number;
  rain?: { "1h": number };
  snow?: { "1h": number };
  temp: number;
  uvi: number;
  weather: WeatherCondition[];
  wind_deg: number;
  wind_gust?: number;
  wind_speed: number;
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
  description: string;
  end: number;
  event: string;
  sender_name: string;
};

type WeatherResponse = {
  airPollution: AirPollutionResponse;
  alerts?: AlertResponse[];
  current: CurrentWeatherResponse;
  daily: DailyForecastResponse[];
  hourly: HourlyForecastResponse[];
  timezone: string;
};

type SunriseSunset = {
  date: string;
  dt: Date;
  label: string;
  type: string;
};

type CurrentWeather = {
  airQuality: number;
  airQualityLabel: string;
  airQualityMessage: string;
  dewPoint: number;
  feelsLike: number;
  humidity: number;
  label: string;
  moonPhase: number;
  pressure: number;
  rain: number;
  rainLabel: string;
  rainMessage: string;
  snow: number;
  snowLabel: string;
  snowMessage: string;
  sunrisesSunsets: SunriseSunset[];
  temp: number;
  uvIndex: number;
  uvLabel: string;
  uvMessage: string;
  visibility: number;
  visibilityUnit: string;
  windDirection: string;
  windLabel: string;
  windSpeed: string;
};

type DailyForecast = {
  date: string;
  fullDate: string;
  iconClassName: string;
  label: string;
  precipitationChance: number;
  sunrise: number;
  sunset: number;
  barStart: string;
  barEnd: string;
  temp: {
    max: number;
    min: number;
  };
};

type HourlyForecast = {
  date: string;
  iconClassName: string;
  label: string;
  precipitationChance: number;
  temp: number;
};

type Alert = {
  description: string;
  end: string;
  event: string;
  senderName: string;
};

type Weather = {
  alerts: Alert[];
  current: CurrentWeather;
  daily: DailyForecast[];
  hourly: (HourlyForecast | SunriseSunset)[];
  timezone: string;
};
