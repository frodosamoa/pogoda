import type { NextApiRequest, NextApiResponse } from "next";
import queryString from "query-string";

import prisma from "../../lib/prisma";

import { normalizeString } from "../../lib/utils/string";

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
        OR: [
          "normalizedName",
          "normalizedAdministrativeName",
          "normalizedCountryCode",
          "normalizedCountryName",
        ].map((columnName) => ({
          [columnName]: {
            contains: normalizedQuery,
          },
        })),
      },
      select: {
        cityId: true,
        administrativeName: true,
        countryCode: true,
        latitude: true,
        longitude: true,
        name: true,
        countryName: true,
      },
      take: 7,
    });

    res.status(200).json(cities);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
