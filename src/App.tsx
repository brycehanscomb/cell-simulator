import React, {useEffect, useState} from 'react';
import './App.css';
import Board from "./components/Board";
import {ALIVE, BoardState, CellValue, DEAD, getNextGeneration} from "./util/game";


let initialState: BoardState = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    1, 0, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 0, 0, 1, 1, 0,
    0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
];

const { searchParams } = new URL(window.location.href)

const parseMap = {
    '0': DEAD,
    '1': ALIVE
};

if (searchParams.has('boardState')) {
    // todo: validate values in here and also check for board size params
    initialState = searchParams.get('boardState')!.split('').map((value) => parseMap[value as '0'|'1'] as CellValue)
}


// const initialState: BoardState = [
//   0,0,0,0,0,
//   0,0,0,0,0,
//   0,0,0,0,0,
//   0,0,0,0,0,
//   0,0,0,0,0,
// ]

const noop = () => {
}

const saveState = (boardState: BoardState, rows: number, cols: number) => {
    const url = new URL(window.location.href)
    url.searchParams.set('boardState', boardState.join(''));
    url.searchParams.set('rows', rows.toString());
    url.searchParams.set('cols', cols.toString());

    window.history.pushState({ boardState, rows, cols}, '', url.toString())
}

function App() {
    const [boardState, setBoardState] = useState<BoardState>(initialState)

    const rows = 7
    const cols = 8

    const step = () => setBoardState(
        getNextGeneration(boardState, rows, cols)
    )

    useEffect(() => {
        saveState(boardState, rows, cols)
    }, [boardState, rows, cols])

    return (
        <div className="App">
            <button onClick={step}>Next generation</button>
            <Board boardState={boardState} cols={cols} rows={rows} onBoardStateChanged={setBoardState}/>
            <Board boardState={getNextGeneration(boardState, rows, cols)} cols={cols} rows={rows}
                   onBoardStateChanged={noop}/>
            <Board boardState={getNextGeneration(getNextGeneration(boardState, rows, cols), rows, cols)} cols={cols}
                   rows={rows} onBoardStateChanged={noop}/>
            <Board
                boardState={getNextGeneration(getNextGeneration(getNextGeneration(boardState, rows, cols), rows, cols), rows, cols)}
                cols={cols} rows={rows} onBoardStateChanged={noop}/>
        </div>
    );
}

export default App;
