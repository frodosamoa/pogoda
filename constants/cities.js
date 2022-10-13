import cities from "all-the-cities";

import ADMIN_CODES from "./adminCodes";
import COUNTRIES from "./countries";

export default cities
  .sort((a, b) => b.population - a.population)
  .map(({ cityId, name, adminCode, country, loc }) => ({
    cityId,
    name,
    coordinates: loc.coordinates,
    label: `${name}, ${
      adminCode ? `${ADMIN_CODES[`${country}.${adminCode}`]}, ` : " "
    } ${COUNTRIES[country]}`,
  }));
