import React, { useCallback, useEffect, useState } from "react";
import Board from "../Board";
import { ALIVE, BoardState, DEAD, getNextGeneration } from "../../util/game";

import { Root } from "./styled";
import Stage from "../Stage";
import Toolbar from "../Toolbar";
import { cropBoard, padBoard, repeat } from "../../util/board";
import {
  hashState,
  readStateFromUrl,
  sampleState,
  saveState
} from "../../util/url";

export interface GameState {
  boardState: BoardState;
  rows: number;
  cols: number;
}

const initialGameState = readStateFromUrl();

function App() {
  const [boardState, setBoardState] = useState<BoardState>(
    initialGameState.boardState
  );

  const [rows, setRows] = useState<number>(initialGameState.rows);
  const [cols, setCols] = useState<number>(initialGameState.cols);

  const step = useCallback(
    () => setBoardState(getNextGeneration(boardState, rows, cols)),
    [setBoardState, boardState, rows, cols]
  );

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

  const setGameState = (gameState: GameState) => {
    setBoardState(gameState.boardState);
    setRows(gameState.rows);
    setCols(gameState.cols);
  };

  const clearBoard = () => {
    setBoardState(repeat(DEAD, boardState.length));
  };

  const resetBoard = () => {
    setRows(sampleState.rows);
    setCols(sampleState.cols);
    setBoardState(sampleState.boardState);
  };

  const randomiseBoard = () => {
    setBoardState(boardState.map(_ => (Math.random() > 0.5 ? DEAD : ALIVE)));
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
      <Stage cols={cols} rows={rows}>
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
        onClearBoard={clearBoard}
        onResetBoard={resetBoard}
        onRandomiseBoard={randomiseBoard}
        onSetGameState={setGameState}
        rows={rows}
        cols={cols}
      />
    </Root>
  );
}

export default App;
