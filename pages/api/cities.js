import queryString from "query-string";
import CITIES from "../../constants/cities";
import { cors, runMiddleware } from "../../lib/apiUtils";

const normalizeString = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

module.exports = async (req, res) => {
  const { method, url } = req;

  await runMiddleware(req, res, cors);

  if (method === "GET") {
    const { query } = queryString.parse(url.slice(url.indexOf("?")));

    console.log(CITIES.length);

    res
      .status(200)
      .json(
        CITIES.filter((city) =>
          normalizeString(city.name).match(normalizeString(query))
        ).slice(0, 10)
      );
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
