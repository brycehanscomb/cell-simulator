import React, { useEffect, useState } from "react";
import Board from "../Board";
import {
  ALIVE,
  BoardState,
  CellValue,
  DEAD,
  getNextGeneration
} from "../../util/game";

import { Root } from "./styled";
import Stage from "../Stage";
import Toolbar from "../Toolbar";
import { cropBoard, padBoard } from "../../util/board";

export interface GameState {
  boardState: BoardState;
  rows: number;
  cols: number;
}

const parseMap = {
  "0": DEAD,
  "1": ALIVE
};

const hashState = (
  boardState: BoardState,
  rows: number,
  cols: number
): string => {
  return `${boardState.join("")}@${cols}x${rows}`;
};

const readStateFromUrl = (): GameState => {
  const { searchParams } = new URL(window.location.href);

  let boardState: BoardState;
  let rows: number;
  let cols: number;

  if (searchParams.has("cols")) {
    cols = parseInt(searchParams.get("cols")!, 10);
  } else {
    cols = 8;
  }

  if (searchParams.has("rows")) {
    rows = parseInt(searchParams.get("rows")!, 10);
  } else {
    rows = 8;
  }

  if (searchParams.has("boardState")) {
    // todo: validate values in here and also check for board size params
    boardState = searchParams
      .get("boardState")!
      .split("")
      .map(value => parseMap[value as "0" | "1"] as CellValue);
  } else {
    // prettier-ignore
    boardState = [
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 1, 0, 0, 0, 0, 1, 0,
      0, 1, 1, 1, 1, 1, 1, 0,
      1, 0, 0, 1, 1, 0, 1, 1,
      0, 1, 1, 0, 0, 1, 1, 0,
      0, 0, 0, 1, 1, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0
    ];
  }

  return {
    boardState,
    rows,
    cols
  };
};

const saveState = (boardState: BoardState, rows: number, cols: number) => {
  const url = new URL(window.location.href);
  url.searchParams.set("boardState", boardState.join(""));
  url.searchParams.set("rows", rows.toString());
  url.searchParams.set("cols", cols.toString());

  window.history.pushState({ boardState, rows, cols }, "", url.toString());
};

const initialGameState = readStateFromUrl();

function App() {
  const [boardState, setBoardState] = useState<BoardState>(
    initialGameState.boardState
  );
  const [rows, setRows] = useState<number>(initialGameState.rows);
  const [cols, setCols] = useState<number>(initialGameState.cols);

  const step = () => setBoardState(getNextGeneration(boardState, rows, cols));

  const handleBoardSizeChange = (newRows: number, newCols: number) => {
    let newBoardState: BoardState;

    if (newRows < rows || newCols < cols) {
      // If the board is getting smaller
      newBoardState = cropBoard(boardState, rows, cols, newRows, newCols);
    } else {
      // otherwise it's getting bigger
      newBoardState = padBoard(
        boardState,
        rows,
        cols,
        newRows - rows,
        newCols - cols,
        DEAD
      );
    }

    setBoardState(newBoardState);
    setRows(newRows);
    setCols(newCols);
  };

  useEffect(() => {
    const urlState = readStateFromUrl();
    if (
      hashState(boardState, rows, cols) !==
      hashState(urlState.boardState, urlState.rows, urlState.cols)
    ) {
      saveState(boardState, rows, cols);
    }
  }, [boardState, rows, cols]);

  useEffect(() => {
    const handleHistoryChange = ({ state }: any) => {
      if (state) {
        setBoardState(state.boardState);
      }
    };

    window.addEventListener("popstate", handleHistoryChange);

    return () => window.removeEventListener("popstate", handleHistoryChange);
  }, [setBoardState, rows, cols]);

  return (
    <Root>
      <Stage>
        <Board
          boardState={boardState}
          cols={cols}
          rows={rows}
          onBoardStateChanged={setBoardState}
        />
      </Stage>
      <Toolbar
        onStep={step}
        onChangeBoardSize={handleBoardSizeChange}
        rows={rows}
        cols={cols}
      />
    </Root>
  );
}

export default App;
