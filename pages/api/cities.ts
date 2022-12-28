import type { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";

import prisma from "@/lib/prisma";
import { normalizeString } from "@/lib/utils/string";

const COLUMNS_TO_SEARCH = [
  "normalizedName",
  "normalizedAdministrativeName",
  "normalizedCountryCode",
  "normalizedCountryName",
];

const COLUMNS_TO_INCLUDE = [
  "cityId",
  "administrativeName",
  "countryCode",
  "latitude",
  "longitude",
  "name",
  "countryName",
];

module.exports = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, url } = req;

  if (method === "GET") {
    const { query: queryParam } = queryString.parse(
      url.slice(url.indexOf("?"))
    );
    const query = Array.isArray(queryParam) ? queryParam[0] : queryParam;
    const normalizedQuery = normalizeString(query);

    const cities = await prisma.city.findMany({
      orderBy: {
        population: "desc",
      },
      where: {
        OR: COLUMNS_TO_SEARCH.map((column) => ({
          [column]: {
            contains: normalizedQuery,
          },
        })),
      },
      select: COLUMNS_TO_INCLUDE.reduce(
        (columns, column) => ({ ...columns, [column]: true }),
        {}
      ),

      take: 7,
    });

    res.status(200).json(cities);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
