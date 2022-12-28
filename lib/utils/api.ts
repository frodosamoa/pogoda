import fetch from "node-fetch";
import queryString from "query-string";

import {
  AIR_POLLUTION_DATA_URL,
  CURRENT_WEATHER_DATA_URL,
} from "@/lib/constants/api";

export const getCurrentWeatherData = async ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  const params = queryString.stringify({
    lat: latitude,
    lon: longitude,
    appid: process.env.OPENWEATHER_API_KEY,
  });

  const currentWeatherDataURL = `${CURRENT_WEATHER_DATA_URL}?${params}`;
  const currentWeatherData = await fetch(currentWeatherDataURL);

  return await currentWeatherData.json();
};

export const getAirPollutionData = async ({
  latitude,
  longitude,
}: {
  latitude: string;
  longitude: string;
}) => {
  const params = queryString.stringify({
    lat: latitude,
    lon: longitude,
    appid: process.env.OPENWEATHER_API_KEY,
  });

  const airPollutionDataURL = `${AIR_POLLUTION_DATA_URL}?${params}`;
  const airPollutionData = await fetch(airPollutionDataURL);

  return await airPollutionData.json();
};
