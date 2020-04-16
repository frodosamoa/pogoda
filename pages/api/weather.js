import queryString from "query-string";
import fetch from "node-fetch";
import { cors, runMiddleware } from "../../lib/api";

const CURRENT_WEATHER_DATA_URL =
  "https://api.openweathermap.org/data/2.5/weather";

const getCurrentWeatherData = async (latitude, longitude) => {
  const params = queryString.stringify({
    lat: latitude,
    lon: longitude,
    appid: process.env.OPENWEATHER_API_KEY,
  });

  const currentWeatherDataURL = `${CURRENT_WEATHER_DATA_URL}?${params}`;
  const currentWeatherData = await fetch(currentWeatherDataURL);

  return await currentWeatherData.json();
};

module.exports = async (req, res) => {
  const { method, url } = req;

  await runMiddleware(req, res, cors);

  if (method === "GET") {
    const { latitude, longitude } = queryString.parse(
      url.slice(url.indexOf("?"))
    );

    const response = await getCurrentWeatherData(latitude, longitude);

    res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
