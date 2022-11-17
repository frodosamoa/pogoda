import cities from "all-the-cities";

import ADMIN_CODES from "./adminCodes";
import COUNTRIES from "./countries";

const citiesSortedByPopulation = cities.sort(
  (a, b) => b.population - a.population
);

const mappedCitiesSortedByPopulation = citiesSortedByPopulation.map(
  ({ cityId, name, adminCode, country, loc }) => ({
    cityId,
    name,
    coordinates: loc.coordinates,
    label: `${name}, ${
      adminCode && ADMIN_CODES[`${country}.${adminCode}`]
        ? `${ADMIN_CODES[`${country}.${adminCode}`]}, `
        : " "
    } ${country}`,
  })
);

export default mappedCitiesSortedByPopulation;
