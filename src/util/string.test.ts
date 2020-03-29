import { pluralize } from "./string";

describe("Utils::string", () => {
  describe("pluralize", () => {
    const SINGULAR = "Knife";
    const PLURAL = "Knives";

    it("should return the plural for zero items", () => {
      expect(pluralize(SINGULAR, PLURAL, 0)).toEqual(PLURAL);
    });

    it("should return the singular for one item", () => {
      expect(pluralize(SINGULAR, PLURAL, 1)).toEqual(SINGULAR);
    });

    it("should return the plural for more than one item", () => {
      [2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(quantity => {
        expect(pluralize(SINGULAR, PLURAL, quantity)).toEqual(PLURAL);
      });
    });
  });

  /**
   * Other valuable tests could include:
   *
   * - What happens if the quantity is negative?
   * - What happens if the quantity is bigger than MAX_INTEGER
   * - What happens if the quantity is a float?
   * - What happens if singular and plural is the same?
   */
});
