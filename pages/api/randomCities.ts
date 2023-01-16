import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "@/lib/prisma";

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
  const { method } = req;

  if (method === "GET") {
    const cities = await prisma.$queryRawUnsafe(
      `SELECT ${COLUMNS_TO_INCLUDE.map((c) => `"${c}"`).join(
        ", "
      )} FROM "City" ORDER BY RANDOM() LIMIT 3;`
    );

    res.status(200).json(cities);
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
};
