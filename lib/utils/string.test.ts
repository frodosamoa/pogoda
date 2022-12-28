import { capitalize } from "@/lib/utils/string";

test("capitalize", () => {
  expect(capitalize("lowercase")).toBe("Lowercase");
});
