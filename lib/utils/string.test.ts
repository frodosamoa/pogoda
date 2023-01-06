import { capitalize, normalizeString } from "@/lib/utils/string";

test("capitalize", () => {
  expect(capitalize("lowercase")).toBe("Lowercase");
});

test("normalizeString", () => {
  expect(normalizeString("~`!@#$%^&*()-=+[{]}|;:'\",<.>/?")).toBe("");
  expect(normalizeString("ã")).toBe("a");
  expect(normalizeString("UPPERCASE")).toBe("uppercase");
});
