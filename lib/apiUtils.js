import Cors from "cors";
const isProduction = process.env.NODE_ENV === "production";

export const BASE_URL = isProduction
  ? "https://pogoda.vercel.app"
  : "http://localhost:3000";

export const cors = Cors({
  methods: ["GET"],
});

export function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}
