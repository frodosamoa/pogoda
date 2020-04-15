import Cors from "cors";
import queryString from "query-string";
import fetch from "node-fetch";

const cors = Cors({
  methods: ["GET"],
});

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const LOCATION_KEY_BASE_URL =
  "http://dataservice.accuweather.com/locations/v1/cities/geoposition/search.json";

const CONDITIONS_BASE_URL =
  "http://dataservice.accuweather.com/currentconditions/v1";

const API_KEY = `&apikey=${process.env.ACCU_WEATHER_API_KEY}`;

const getLocationKey = async (latitude, longitude) => {
  const locationKeyURL = `${LOCATION_KEY_BASE_URL}?q=${latitude},${longitude}${API_KEY}`;
  const locationKeyRes = await fetch(locationKeyURL);
  return await locationKeyRes.json();
};

const getCurrentConditions = async (locationKey) => {
  const currentConditionURL = new URL(
    `${CONDITIONS_BASE_URL}/${locationKey}?${API_KEY}`
  );

  const currentConditionRes = await fetch(String(currentConditionURL.href));
  return await currentConditionRes.json();
};

module.exports = async (req, res) => {
  const { method, url } = req;

  await runMiddleware(req, res, cors);

  if (method === "GET") {
    const { latitude, longitude } = queryString.parse(
      url.slice(url.indexOf("?"))
    );

    const { Key: locationKey = "" } = await getLocationKey(latitude, longitude);

    const currentConditions = await getCurrentConditions(locationKey);

    res.status(200).json({ conditions: currentConditions });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
