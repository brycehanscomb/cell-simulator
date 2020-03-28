import { ALIVE, BoardState, CellValue, DEAD } from "./game";
import { MIN_COLS, MIN_ROWS } from "../components/Toolbar";
import { GameState } from "../components/App";

const parseMap = {
  "0": DEAD,
  "1": ALIVE
};

export const hashState = (
  boardState: BoardState,
  rows: number,
  cols: number
): string => {
  return `${boardState.join("")}@${cols}x${rows}`;
};

// prettier-ignore
const sampleBoard = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
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

  if (searchParams.has("cols")) {
    cols = Math.max(parseInt(searchParams.get("cols")!, 10), MIN_COLS);
  } else {
    cols = sampleState.cols;
  }

  if (searchParams.has("rows")) {
    rows = Math.max(parseInt(searchParams.get("rows")!, 10), MIN_ROWS);
  } else {
    rows = sampleState.rows;
  }

  if (searchParams.has("boardState")) {
    // todo: validate values in here and also check for board size params
    boardState = searchParams
      .get("boardState")!
      .split("")
      .map(value => parseMap[value as "0" | "1"] as CellValue);

    /**
     * World's dumbest validation:
     */
    if (boardState.length !== rows * cols) {
      boardState = sampleState.boardState;
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
  const url = new URL(window.location.href);
  url.searchParams.set("boardState", boardState.join(""));
  url.searchParams.set("rows", rows.toString());
  url.searchParams.set("cols", cols.toString());

  window.history.pushState({ boardState, rows, cols }, "", url.toString());
};
