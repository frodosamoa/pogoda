import queryString from "query-string";
import fetch from "node-fetch";
import { cors, runMiddleware } from "../../lib/apiUtils";

const AIR_POLLUTION_DATA_URL =
  "https://api.openweathermap.org/data/2.5/air_pollution";

const getAirPollutionData = async ({ latitude, longitude }) => {
  const params = queryString.stringify({
    lat: latitude,
    lon: longitude,
    appid: process.env.OPENWEATHER_API_KEY,
  });

  const airPollutionDataURL = `${AIR_POLLUTION_DATA_URL}?${params}`;
  const airPollutionData = await fetch(airPollutionDataURL);

  return await airPollutionData.json();
};

module.exports = async (req, res) => {
  const { method, url } = req;

  await runMiddleware(req, res, cors);

  if (method === "GET") {
    const { latitude, longitude } = queryString.parse(
      url.slice(url.indexOf("?"))
    );

    const response = await getAirPollutionData({
      latitude,
      longitude,
    });

    res.status(200).json(response);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
