import { PrismaClient } from "@prisma/client";
import cities from "all-the-cities";

import COUNTRIES from "./seeds/countries";
import ADMIN_CODES from "./seeds/adminCodes";

import { normalizeString } from "@/lib/utils/string";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  console.log();

  console.log(`Start seeding cities ...`);
  const citiesWithAdminCodes = cities.map(
    ({ cityId, name, adminCode, country, population, loc }) => ({
      cityId,
      name,
      normalizedName: normalizeString(name),
      administrativeName: ADMIN_CODES[`${country}.${adminCode}`]
        ? ADMIN_CODES[`${country}.${adminCode}`]
        : null,
      normalizedAdministrativeName: ADMIN_CODES[`${country}.${adminCode}`]
        ? normalizeString(ADMIN_CODES[`${country}.${adminCode}`])
        : null,
      countryCode: country,
      normalizedCountryCode: normalizeString(country),
      countryName: COUNTRIES[country],
      normalizedCountryName: normalizeString(COUNTRIES[country]),
      population,
      latitude: loc.coordinates[0],
      longitude: loc.coordinates[1],
    })
  );

  await prisma.city.createMany({ data: citiesWithAdminCodes });

  console.log(`Finished seeding cities ...`);
  console.log();

  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
