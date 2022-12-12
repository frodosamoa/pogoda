export const normalizeString = (s: string) =>
  s
    .normalize("NFD")
    // removes diacritical marks
    .replace(/[\u0300-\u036f]/g, "")
    // removes non-word and non-space characters
    .replace(/[^\w\s]/g, "")
    .toLowerCase();
