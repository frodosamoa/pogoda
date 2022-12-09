type Theme =
  | "primary"
  | "link"
  | "info"
  | "success"
  | "warning"
  | "danger"
  | "dark"
  | "light";

type City = {
  cityId: string;
  name: string;
  adminCode: string;
  country: string;
  coordinates: [number, number];
};

type Weather = {
  daily: [];
  current: object;
};
