import { getNextGeneration, getIndexFromCoords } from "./game";
import { BoardState } from "../types";

/**
 * Render the board in a multi-line string for valuable diffing
 */
export const renderBoard = (cols: number, rows: number) => (
  board: BoardState
): string => {
  const arr = board.join("");
  let result = "";
  for (let ii = 0; ii < rows; ii++) {
    const offset = cols * ii;
    result += arr.slice(offset, offset + cols) + "\n";
  }
  return result.trim();
};

const show = renderBoard(3, 3);

describe("getNextGeneration", () => {
  it("when there are no living cells, the next generation should have no living cells either", () => {
    // prettier-ignore
    const before: BoardState = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ];

    // prettier-ignore
    const after: BoardState = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ];

    expect(show(getNextGeneration(before, 3, 3))).toEqual(show(after));
  });

  it("when a living cell has no living neighbors, it should not live on to the next generation", () => {
    // prettier-ignore
    const before: BoardState = [
      0, 0, 0,
      0, 1, 0,
      0, 0, 0
    ];

    // prettier-ignore
    const after: BoardState = [
      0, 0, 0,
      0, 0, 0,
      0, 0, 0
    ];

    expect(show(getNextGeneration(before, 3, 3))).toEqual(show(after));
  });

  it("when a dead cell has 3 living neighbors, it should come to life in the next generation", () => {
    // prettier-ignore
    const before: BoardState = [
      0, 1, 0,
      1, 0, 0,
      0, 1, 0
    ];

    // prettier-ignore
    const after: BoardState = [
      0, 0, 0,
      0, 1, 0,
      0, 0, 0
    ];

    expect(show(getNextGeneration(before, 3, 3))).toEqual(show(after));
  });

  it("when a living cell has 4 living neighbors (including on wrapping edges of the board), it should die in the next generation", () => {
    // prettier-ignore
    const before: BoardState = [
      1, 1, 1,
      0, 1, 0,
      1, 1, 0
    ];

    // prettier-ignore
    const after: BoardState = [
      1, 0, 1,
      1, 1, 0,
      1, 1, 1
    ];

    expect(show(getNextGeneration(before, 3, 3))).toEqual(show(after));
  });

  it("the neighbors rule should apply for a board of any size", () => {
    // prettier-ignore
    const before: BoardState = [
      1, 0, 0, 0, 0,
      0, 1, 0, 0, 0,
      1, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0
    ];

    // prettier-ignore
    const after: BoardState = [
      0, 0, 0, 0, 0,
      1, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0,
      0, 0, 0, 0, 0
    ];

    expect(renderBoard(5, 5)(getNextGeneration(before, 5, 5))).toEqual(
      renderBoard(5, 5)(after)
    );
  });

  it("cells that are sparsely populated amongst the board should all die in the next generation if they are not within neighbor-distance of any other living cells", () => {
    // prettier-ignore
    const before: BoardState = [
      0, 0, 0, 1, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0
    ];

    // prettier-ignore
    const after: BoardState = [
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0
    ];

    expect(renderBoard(8, 7)(getNextGeneration(before, 7, 8))).toEqual(
      renderBoard(8, 7)(after)
    );
  });

  /**
   * Other useful tests could include:
   *
   * - Testing for one neighbor
   * - Testing for two neighbors
   * - Testing already-living cells for 3 neighbors
   * - Edge and Corner wrapping behaviour
   */
});

describe("getIndexFromCoords", () => {
  it("should get the first", () => {
    expect(getIndexFromCoords({ row: 0, col: 0 }, 10, 20)).toEqual(0);
  });

  it("should get the last", () => {
    expect(getIndexFromCoords({ row: 1, col: 1 }, 2, 2)).toEqual(3);
  });

  it("should get the correct index given a set of co-ordinates", () => {
    expect(getIndexFromCoords({ row: 6, col: 2 }, 7, 8)).toEqual(50);
    expect(getIndexFromCoords({ row: 2, col: 2 }, 3, 8)).toEqual(50);
    expect(getIndexFromCoords({ row: 6, col: 2 }, 10, 3)).toEqual(50);
  });
});
