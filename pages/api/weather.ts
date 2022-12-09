import type { NextApiRequest, NextApiResponse } from "next";

import queryString from "query-string";
import fetch from "node-fetch";

const CURRENT_WEATHER_DATA_URL =
  "https://api.openweathermap.org/data/2.5/onecall";

const getCurrentWeatherData = async ({
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

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, url } = req;

  if (method === "GET") {
    const { latitude: latitudeParam, longitude: longitudeParam } =
      queryString.parse(url.slice(url.indexOf("?")));
    const latitude = Array.isArray(latitudeParam)
      ? latitudeParam[0]
      : latitudeParam;
    const longitude = Array.isArray(longitudeParam)
      ? longitudeParam[0]
      : longitudeParam;

    const response = await getCurrentWeatherData({
      latitude,
      longitude,
    });

    res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
