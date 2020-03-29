/******************************************************************************\
*
* The top-most level of the React application. This component manages the
* entire game state and opens an interface for manipulating the board via
* state-setting callbacks.
*
* There might be some good candidates in here for exposing some getters/setters
* to deeper child components using the React Context API instead of some of the
* borderline prop-drilling seen here.
*
/******************************************************************************/

/**
 * External dependencies
 */
import React, { useCallback, useEffect, useState } from "react";

/**
 * Internal non-component deps
 */
import { BoardState, GameState } from "../../types";
import { ALIVE, DEAD } from "../../constants";
import { getNextGeneration } from "../../util/game";
import { cropBoard, padBoard, repeat } from "../../util/board";
import {
  hashState,
  readStateFromUrl,
  sampleState,
  saveState
} from "../../util/url";

/**
 * Components
 */
import Board from "../Board";
import Stage from "../Stage";
import Toolbar from "../Toolbar";

/**
 * Locally-defined styled components
 */
import { Root } from "./styled";

/******************************************************************************/

const initialGameState = readStateFromUrl();
const historyChangeEventName = "popstate";

function App() {
  /**
   * Here we own and manage the board's size and values.
   *
   * Since the game board is a rectangle, we architect its representation as a
   * table of J rows by K columns.
   *
   * As we store the size of the board in the `rows`/`cols` state containers,
   * we can store the actual value of the cells in a linear list without regard
   * to each cell's position.
   *
   * For example, a simple game board might look like this:
   *
   * /---------------------\
   * | DEAD   ALIVE   DEAD |                           [ 0, 1, 0,
   * | ALIVE  ALIVE  ALIVE |  ----- (stored as) ---->    1, 1, 1,
   * | DEAD   ALIVE   DEAD |                             0, 1, 0 ]
   * \---------------------/
   *
   * Which can be serialised and stored in state, collapsed to the following:
   *
   * [ 0, 1, 0, 1, 1, 1, 0, 1, 0 ]
   *
   * This representation is very simple to store, read, write and serialize.
   * It is advantageous for setting in bulk, and also for iteration through.
   * It's disadvantageous for finding any particular value at a particular
   * co-ordinate, but the lookups are done cheaply via mathematical index
   * positioning rather than find-via-loop.
   *
   * A more complex representation that could provide easier lookup of
   * values-by-position could encode the cells' positions with them, such as
   * a list (rows) of lists (cols), or use a Graph-like structure so neighbors
   * can be instantly identified.
   *
   * With all that said... let's get on with it!
   */
  const [rows, setRows] = useState<number>(initialGameState.rows);
  const [cols, setCols] = useState<number>(initialGameState.cols);
  const [boardState, setBoardState] = useState<BoardState>(
    initialGameState.boardState
  );

  /**
   * This method will update the co-dependent parts of the App's state all at
   * once, without exposing the implementation of how the state is stored.
   */
  const setGameState = (gameState: GameState) => {
    setBoardState(gameState.boardState);
    setRows(gameState.rows);
    setCols(gameState.cols);
  };

  /**
   * This method will set all cells on the board to be dead.
   */
  const clearBoard = () => {
    setBoardState(repeat(DEAD, boardState.length));
  };

  /**
   * This will make the board show a nice small sample pattern that I think
   * is a good starting point for players.
   */
  const resetBoard = () => {
    setGameState(sampleState);
  };

  /**
   * This is a fun one, setting each cell on the board to either dead or alive
   * with even probability.
   */
  const randomiseBoard = () => {
    setBoardState(boardState.map(_ => (Math.random() > 0.5 ? DEAD : ALIVE)));
  };

  /**
   * This is the main "generation" mutator -- the function that actually
   * triggers the rules to apply to the game board and modify the values of the
   * cells.
   *
   * We memoize it with `useCallback` so it can be passed elsewhere without
   * being redefined on every render.
   *
   * @see https://reactjs.org/docs/hooks-reference.html#usecallback
   */
  const step = useCallback(
    () => setBoardState(getNextGeneration(boardState, rows, cols)),
    [setBoardState, boardState, rows, cols]
  );

  /**
   * The <Toolbar> provides the user with the ability to change the size of the
   * game board on the stage. When that happens, we need to ensure that the
   * cell values stored in the `boardState` has the right number of cells for
   * the user to interact with.
   */
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

    setGameState({
      boardState: newBoardState,
      rows: newRows,
      cols: newCols
    });
  };

  /**
   * When the game state changes, save it to the URL for sharing or for history
   * navigation (stepping through time).
   */
  useEffect(() => {
    const urlState = readStateFromUrl();

    /**
     * Only do it if the state is different than what we've already got in the URL
     */
    if (
      hashState(boardState, rows, cols) !==
      hashState(urlState.boardState, urlState.rows, urlState.cols)
    ) {
      saveState(boardState, rows, cols);
    }
  }, [boardState, rows, cols]);

  /**
   * Watch the URL for external changes and import the game state from there.
   */
  useEffect(() => {
    const handleHistoryChange = ({ state }: any) => {
      if (state) {
        setBoardState(state.boardState);
      }
    };

    window.addEventListener(historyChangeEventName, handleHistoryChange);

    return () =>
      window.removeEventListener(historyChangeEventName, handleHistoryChange);
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
