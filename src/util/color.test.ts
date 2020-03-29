import { shadeColor } from "./color";

describe("Utils::color", () => {
  describe("shadeColor", () => {
    it("should return black when going 100% darker", () => {
      const inputs = ["#05A6B7", "#FF0000", "#FFFFFF"];

      inputs.forEach(input => {
        expect(shadeColor(input, -100)).toEqual("#000000");
      });
    });

    it("should correctly darken images by the specified amount when `percent` is negative", () => {
      const inputs = ["#05A6B7", "#FF0000", "#FFFFFF"];

      /**
       * We've verified the values in the snapshots match the correct outputs.
       */
      inputs.forEach(input => {
        expect(shadeColor(input, -25)).toMatchSnapshot();
      });
    });

    it("should correctly lighten images by the specified amount when `percent` is positive", () => {
      const inputs = ["#05A6B7", "#FF0000", "#00FF25"];

      /**
       * We've verified the values in the snapshots match the correct outputs.
       */
      inputs.forEach(input => {
        expect(shadeColor(input, 25)).toMatchSnapshot();
      });
    });

    /**
     * Other valuable tests that could be done here could include:
     *
     * - What if the input is empty?
     * - What if input is a 3-digit hex code instead of 6-digit?
     * - What if the input is an 8-digit hex code with an alpha channel?
     * - Are the hex letters case-sensitive?
     * - What if we pass zero as the change amount?
     * - What if we exceed the -100 to 100 percentage bounds?
     */
  });
});
