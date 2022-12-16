export const THEMES: { [K in Theme]: string } = {
  light: "hsl(0, 0%, 96%)",
  dark: "hsl(0, 0%, 21%)",
  red: "hsl(348, 86%, 61%)",
  orange: "hsl(14, 100%, 53%)",
  yellow: "hsl(44, 100%, 77%)",
  green: "hsl(153, 53%, 53%)",
  turquoise: "hsl(171, 100%, 41%)",
  cyan: "hsl(207, 61%, 53%)",
  blue: "hsl(229, 53%, 53%)",
  purple: "hsl(271, 100%, 71%)",
};

export const COLORS = {
  black: "hsl(0, 0%, 14%)",
  grey: "hsl(0, 0%, 86%)",
};

export const UNITS: { [K in Sizes]: number } = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 32,
  xxl: 48,
};

export const FONT_SIZES = {
  1: "3rem",
  2: "2.5rem",
  3: "2rem",
  4: "1.5rem",
  5: "1.25rem",
  6: "1rem",
  7: "0.75rem",
};
