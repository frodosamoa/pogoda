import type { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";

import CITIES from "../../constants/cities";

const normalizeString = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, url } = req;

  if (method === "GET") {
    const { query: queryParam } = queryString.parse(
      url.slice(url.indexOf("?"))
    );
    const qury = Array.isArray(queryParam) ? queryParam[0] : queryParam;

    res
      .status(200)
      .json(
        CITIES.filter((city) =>
          normalizeString(city.name).match(normalizeString(qury))
        ).slice(0, 7)
      );
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
