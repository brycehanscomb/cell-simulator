import { BoardState, CellValue, GameState } from "../types";
import { ALIVE, DEAD, MIN_COLS, MIN_ROWS } from "../constants";

/**
 * How the values of the board state as serialised in the URL map to their
 * equivalents in the app itself.
 *
 * Yes, `DEAD` happens to be `0`, but since we're using constants everywhere,
 * there's no guarantee that the serialised representation is the same as used
 * in the app, so it is wise to do a simple mapping here.
 */
const parseMap = {
  "0": DEAD,
  "1": ALIVE
};

/**
 * Constantize the keys that we read and write into the URL when doing history
 * manipulation
 */
const URL_PARAMS = {
  BOARD_STATE: "boardState",
  ROWS: "rows",
  COLS: "cols"
};

/**
 * Create a hash of the current state of the board. Since `GameState` is an
 * interface with a low shape complexity, it's fine to basically encode all of
 * its information as the hash, rather than employ any fancy masking or other
 * tricks such as bloom filters.
 */
export const hashState = (
  boardState: BoardState,
  rows: number,
  cols: number
): string => {
  return `${boardState.join("")}@${cols}x${rows}`;
};

/**
 * Nothing special about this other than it looks interesting when run
 */
// prettier-ignore
const sampleBoard = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 0, 0, 1, 1, 0,
    1, 1, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 0, 0, 1, 1, 0,
    0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
];

export const sampleState: GameState = {
  boardState: sampleBoard,
  rows: 7,
  cols: 8
};

export const readStateFromUrl = (): GameState => {
  const { searchParams } = new URL(window.location.href);

  let boardState: BoardState;
  let rows: number;
  let cols: number;

  if (searchParams.has(URL_PARAMS.COLS)) {
    cols = Math.max(parseInt(searchParams.get(URL_PARAMS.COLS)!, 10), MIN_COLS);
  } else {
    cols = sampleState.cols;
  }

  if (searchParams.has(URL_PARAMS.ROWS)) {
    rows = Math.max(parseInt(searchParams.get(URL_PARAMS.ROWS)!, 10), MIN_ROWS);
  } else {
    rows = sampleState.rows;
  }

  if (searchParams.has(URL_PARAMS.BOARD_STATE)) {
    /**
     * If there's an issue de-serialising the board state, just allow the next
     * block to fall back to using the sample board
     */
    try {
      boardState = searchParams
        .get(URL_PARAMS.BOARD_STATE)!
        .split("")
        .map(value => parseMap[value as "0" | "1"] as CellValue);
    } catch (e) {
      boardState = [];
    }

    /**
     * World's dumbest validation:
     */
    if (boardState.length !== rows * cols) {
      boardState = sampleState.boardState;
      rows = sampleState.rows;
      cols = sampleState.cols;
    }
  } else {
    boardState = sampleState.boardState;
  }

  return {
    boardState,
    rows,
    cols
  };
};

export const saveState = (
  boardState: BoardState,
  rows: number,
  cols: number
) => {
  const newUrl = new URL(window.location.href);
  newUrl.searchParams.set(URL_PARAMS.BOARD_STATE, boardState.join(""));
  newUrl.searchParams.set(URL_PARAMS.ROWS, rows.toString());
  newUrl.searchParams.set(URL_PARAMS.COLS, cols.toString());

  window.history.pushState({ boardState, rows, cols }, "", newUrl.toString());
};
