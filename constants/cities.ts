import cities from "all-the-cities";

const citiesSortedByPopulation = cities.sort(
  (a, b) => b.population - a.population
);

const mappedCitiesSortedByPopulation = citiesSortedByPopulation.map(
  ({ cityId, name, adminCode, country, loc }) => ({
    cityId,
    name,
    coordinates: loc.coordinates,
    country,
    adminCode,
  })
);

export default mappedCitiesSortedByPopulation;
