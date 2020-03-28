import { cropBoard, padBoard } from "./board";
import { renderBoard } from "./game.test";
import { ALIVE, DEAD } from "./game";

describe("Utils::board", () => {
  describe("cropBoard", () => {
    it("should return a board state equal to the input if the new board size is the same as the current board size", () => {
      // prettier-ignore
      const sampleBoard = [
          0, 0, 0, 1,
          0, 0, 1, 1,
          0, 1, 1, 1
      ];

      const render = renderBoard(4, 3);

      expect(render(cropBoard(sampleBoard, 3, 4, 3, 4))).toEqual(
        render(sampleBoard)
      );
    });

    it("should return a board state with `n` less columns of data where there are `n` less columns in `newCols`", () => {
      // prettier-ignore
      const sampleBoard = [
        0, 0, 0, 1, 1, 0,
        0, 0, 1, 1, 0, 0,
        0, 1, 1, 1, 0, 1,
      ];

      // prettier-ignore
      const resultBoard = [
          0, 0, 0, 1,
          0, 0, 1, 1,
          0, 1, 1, 1,
      ];

      const render = renderBoard(4, 3);

      expect(render(cropBoard(sampleBoard, 3, 6, 3, 4))).toEqual(
        render(resultBoard)
      );
    });

    it("should return a board state with `n` less rows of data where there are `n` less rows in `newRows`", () => {
      // prettier-ignore
      const sampleBoard = [
        0, 0, 0, 1, 1, 0,
        0, 0, 1, 1, 0, 0,
        0, 1, 1, 1, 0, 1,
      ];

      // prettier-ignore
      const resultBoard = [
        0, 0, 0, 1, 1, 0,
      ];

      const render = renderBoard(6, 1);

      expect(render(cropBoard(sampleBoard, 3, 6, 1, 6))).toEqual(
        render(resultBoard)
      );
    });

    /**
     * @todo: other good tests here would include:
     *
     * - Empty board state
     * - Cropping to zero columns
     * - Cropping to zero rows
     * - Cropping entirely to zero
     * - invalid bounds
     * - what if we accidentally try to crop bigger instead of smaller?
     */
  });

  describe("padBoard", () => {
    it("should return value equal to input if no new rows or cols are to be added", () => {
      // prettier-ignore
      const sampleBoard = [
          0, 1, 1, 1,
          1, 0, 0, 0,
          0, 1, 0, 1,
          1, 1, 0, 0,
          1, 0, 0, 1
      ];

      const outputBoard = sampleBoard;

      const render = renderBoard(4, 5);

      expect(render(padBoard(sampleBoard, 5, 4, 0, 0, DEAD))).toEqual(
        render(outputBoard)
      );
    });

    it("should add `n` new rows of `fillValue` when `rowsToAdd` is a positive number", () => {
      // prettier-ignore
      const sampleBoard = [
        0, 1, 1, 1,
        1, 0, 0, 0,
        0, 1, 0, 1,
        1, 1, 0, 0,
        1, 0, 0, 1
      ];

      // prettier-ignore
      const outputBoard = [
        0, 1, 1, 1,
        1, 0, 0, 0,
        0, 1, 0, 1,
        1, 1, 0, 0,
        1, 0, 0, 1,
        DEAD, DEAD, DEAD, DEAD,
        DEAD, DEAD, DEAD, DEAD,
      ];
      const render = renderBoard(4, 7);

      expect(render(padBoard(sampleBoard, 5, 4, 2, 0, DEAD))).toEqual(
        render(outputBoard)
      );
    });

    it("should add `n` new cols of `fillValue` when `colsToAdd` is a positive number", () => {
      // prettier-ignore
      const sampleBoard = [
        0, 1, 1, 1,
        1, 0, 0, 0,
        0, 1, 0, 1,
        1, 1, 0, 0,
        1, 0, 0, 1
      ];

      // prettier-ignore
      const outputBoard = [
        0, 1, 1, 1, ALIVE, ALIVE, ALIVE,
        1, 0, 0, 0, ALIVE, ALIVE, ALIVE,
        0, 1, 0, 1, ALIVE, ALIVE, ALIVE,
        1, 1, 0, 0, ALIVE, ALIVE, ALIVE,
        1, 0, 0, 1, ALIVE, ALIVE, ALIVE,
      ];
      const render = renderBoard(7, 5);

      expect(render(padBoard(sampleBoard, 5, 4, 0, 3, ALIVE))).toEqual(
        render(outputBoard)
      );
    });

    /**
     * @todo: other could tests to add here could include:
     *
     * - Starting with empty board
     * - What if the board is only 1x1?
     * - What if `rowsToAdd` or `colsToAdd` is a negative number? or a float?
     */
  });
});
