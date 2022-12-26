export const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const normalizeString = (s: string) =>
  s
    .normalize("NFD")
    // removes diacritical marks
    .replace(/[\u0300-\u036f]/g, "")
    // removes non-word and non-space characters
    .replace(/[^\w\s]/g, "")
    .toLowerCase();
