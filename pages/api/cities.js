import queryString from "query-string";
import cities from "all-the-cities";
import { cors, runMiddleware } from "../../lib/apiUtils";

module.exports = async (req, res) => {
  const { method, url } = req;

  await runMiddleware(req, res, cors);

  if (method === "GET") {
    const { query } = queryString.parse(url.slice(url.indexOf("?")));

    res.status(200).json(
      cities
        .filter((city) =>
          city.name
            .normalize()
            .toLowerCase()
            .match(query.normalize().toLowerCase())
        )
        .sort((a, b) => b.population - a.population)
        .slice(0, 10)
    );
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
