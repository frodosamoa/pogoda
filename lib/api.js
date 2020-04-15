const isProduction = process.env.NODE_ENV === "production";

export const BASE_URL = isProduction
  ? "palmetto-take-home-challenge.now.sh"
  : "http://localhost:3000";
