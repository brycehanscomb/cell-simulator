import { getNextGeneration, getIndexFromCoords } from "./game";
import { BoardState } from "../types";

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
  it("aaa", () => {
    const before: BoardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const after: BoardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    expect(show(getNextGeneration(before, 3, 3))).toEqual(show(after));
  });

  it("bbb", () => {
    const before: BoardState = [0, 0, 0, 0, 1, 0, 0, 0, 0];

    const after: BoardState = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    expect(show(getNextGeneration(before, 3, 3))).toEqual(show(after));
  });

  it("ccc", () => {
    const before: BoardState = [0, 1, 0, 1, 0, 0, 0, 1, 0];

    const after: BoardState = [0, 0, 0, 0, 1, 0, 0, 0, 0];

    expect(show(getNextGeneration(before, 3, 3))).toEqual(show(after));
  });

  it("ddd", () => {
    const before: BoardState = [1, 1, 1, 0, 1, 0, 1, 1, 0];

    const after: BoardState = [1, 0, 1, 1, 1, 0, 1, 1, 1];

    expect(show(getNextGeneration(before, 3, 3))).toEqual(show(after));
  });

  it("eee", () => {
    const before: BoardState = [
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];

    const after: BoardState = [
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];

    expect(renderBoard(5, 5)(getNextGeneration(before, 5, 5))).toEqual(
      renderBoard(5, 5)(after)
    );
  });

  it("fff", () => {
    const before: BoardState = [
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];

    const after: BoardState = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0
    ];

    expect(renderBoard(8, 7)(getNextGeneration(before, 7, 8))).toEqual(
      renderBoard(8, 7)(after)
    );
  });
});

describe("getIndexFromCoords", () => {
  it("should get the first", () => {
    expect(getIndexFromCoords({ row: 0, col: 0 }, 10, 20)).toEqual(0);
  });

  it("should get the last", () => {
    expect(getIndexFromCoords({ row: 1, col: 1 }, 2, 2)).toEqual(3);
  });

  it("should", () => {
    expect(getIndexFromCoords({ row: 6, col: 2 }, 7, 8)).toEqual(50);
  });
});
