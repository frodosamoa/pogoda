import type { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";

import { getCurrentWeatherData, getAirPollutionData } from "@/lib/utils/api";

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

    const [weather, airPollution] = await Promise.all([
      getCurrentWeatherData({
        latitude,
        longitude,
      }),
      getAirPollutionData({
        latitude,
        longitude,
      }),
    ]);

    res.status(200).json({ ...weather, airPollution });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
