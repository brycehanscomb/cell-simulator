import { repeat } from "./array";

describe("Utils::array", () => {
  describe("repeat", () => {
    it("should return an empty array if `howManyTimes` is zero", () => {
      const input = Math.random();
      expect(repeat(input, 0)).toEqual([]);
    });

    it("should return an array containing `val` if `howManyTimes` is one", () => {
      const input = Math.random();
      expect(repeat(input, 1)).toEqual([input]);
    });

    it("should return an array of length `howManyTimes` containing only `val` at each index", () => {
      const input = Math.random();
      const length = Math.floor(Math.random() * 100);

      expect(repeat(input, length)).toEqual(Array(length).fill(input));
    });
  });

  /**
   * Other valuable tests would include:
   *
   * - What happens if `howManyTimes` is a negative number
   * - What happens if `val` is a reference in a WeakMap that has expired by the time the operation is finished?
   */
});
