import React, {useState} from 'react';
import './App.css';
import Board from "./components/Board";
import {BoardState, getNextGeneration} from "./util/game";

// const initialState: BoardState = [
//   0, 0, 0, 0, 0, 0, 0, 0,
//   0, 1, 0, 0, 0, 0, 1, 0,
//   0, 1, 1, 1, 1, 1, 1, 0,
//   1, 0, 0, 1, 1, 0, 1, 1,
//   0, 1, 1, 0, 0, 1, 1, 0,
//   0, 0, 0, 1, 1, 0, 0, 0,
//   0, 0, 0, 0, 0, 0, 0, 0
// ]

const initialState: BoardState = [
  0,0,0,0,0,
  0,0,0,0,0,
  0,0,0,0,0,
  0,0,0,0,0,
  0,0,0,0,0,
]

const noop = () => {}

function App() {
  const [boardState, setBoardState] = useState<BoardState>(initialState)

  const rows = 5
  const cols = 5

  return (
    <div className="App">
      <Board boardState={boardState} cols={cols} rows={rows} onBoardStateChanged={setBoardState} />
      <Board boardState={getNextGeneration(boardState, rows, cols)} cols={cols} rows={rows} onBoardStateChanged={noop} />
      <Board boardState={getNextGeneration(getNextGeneration(boardState, rows, cols), rows, cols)} cols={cols} rows={rows} onBoardStateChanged={noop} />
      <Board boardState={getNextGeneration(getNextGeneration(getNextGeneration(boardState, rows, cols), rows, cols), rows, cols)} cols={cols} rows={rows} onBoardStateChanged={noop} />
    </div>
  );
}

export default App;
