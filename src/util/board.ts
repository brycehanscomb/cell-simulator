// this fn could probably be inlined, but in a real-sized project we'd rely
// on external libs anyway
import { chunk } from "lodash";

import { BoardState, CellValue } from "../types";

/**
 * Like cropping off the right- and bottom-edges of an image,
 * this method will crop off the right- and bottom-edges of a BoardState
 * and reduce its size to `newRows * newCols`.
 */
export const cropBoard = (
  boardState: BoardState,
  rows: number,
  cols: number,
  newRows: number,
  newCols: number
): BoardState => {
  const rowChunks = chunk<CellValue>(boardState, cols);

  return rowChunks
    .slice(0, newRows) // crop off extraneous rows
    .map((row: CellValue[]) => row.slice(0, newCols)) // crop off extraneous cols from each remaining row
    .flat(); // stick them all back together again
};

/**
 * This method will "uncrop" the board by adding new rows or columns, and filling
 * the new cells with the specified `fillValue`.
 *
 * @todo: improve the performance of this function by using `Array.splice` to
 *          add elements instead of doing `.map` and `.push`
 */
export const padBoard = (
  boardState: BoardState,
  rows: number,
  cols: number,
  rowsToAdd: number,
  colsToAdd: number,
  fillValue: CellValue
): BoardState => {
  let rowChunks = chunk<CellValue>(boardState, cols);
  const targetColSize = cols + colsToAdd;
  const targetRowSize = rows + rowsToAdd;

  if (rowChunks.length < targetRowSize) {
    const newRow = repeat(fillValue, cols);
    rowChunks.push(...repeat(newRow, rowsToAdd));
  }

  const arbitraryRow = rowChunks[0];

  if (arbitraryRow.length < targetColSize) {
    const newCols = repeat(fillValue, colsToAdd);
    rowChunks = rowChunks.map(row => {
      return [...row, ...newCols];
    });
  }

  return rowChunks.flat();
};

// todo: move this
export const repeat = (val: any, howManyTimes: number) =>
  Array(howManyTimes).fill(val);
