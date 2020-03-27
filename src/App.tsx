import React, {useEffect, useState} from 'react';
import './App.css';
import Board from "./components/Board";
import {ALIVE, BoardState, CellValue, DEAD, getNextGeneration} from "./util/game";

export interface GameState {
    boardState: BoardState;
    rows: number;
    cols: number;
}

const parseMap = {
    '0': DEAD,
    '1': ALIVE
};

const hashState = (boardState: BoardState, rows: number, cols: number) : string => {
    return `${boardState.join('')}@${cols}x${rows}`
}

const readStateFromUrl = () : GameState => {
    const { searchParams } = new URL(window.location.href)

    let boardState: BoardState;
    let rows: number;
    let cols: number;

    if (searchParams.has('cols')) {
        cols = parseInt(searchParams.get('cols')!, 10)
    } else {
        cols = 8
    }

    if (searchParams.has('rows')) {
        rows = parseInt(searchParams.get('rows')!, 10)
    } else {
        rows = 8
    }

    if (searchParams.has('boardState')) {
        // todo: validate values in here and also check for board size params
        boardState = searchParams.get('boardState')!.split('').map((value) => parseMap[value as '0'|'1'] as CellValue)
    } else {
        boardState = Array(rows * cols).fill(DEAD)
    }

    return {
        boardState,
        rows,
        cols
    }
}

let initialState: BoardState = [
    0, 0, 0, 0, 0, 0, 0, 0,
    0, 1, 0, 0, 0, 0, 1, 0,
    0, 1, 1, 1, 1, 1, 1, 0,
    1, 0, 0, 1, 1, 0, 1, 1,
    0, 1, 1, 0, 0, 1, 1, 0,
    0, 0, 0, 1, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0
];

initialState = readStateFromUrl().boardState

const noop = () => {}

const saveState = (boardState: BoardState, rows: number, cols: number) => {
    const url = new URL(window.location.href)
    url.searchParams.set('boardState', boardState.join(''));
    url.searchParams.set('rows', rows.toString());
    url.searchParams.set('cols', cols.toString());

    window.history.pushState({ boardState, rows, cols}, '', url.toString())
}

const initialGameState = readStateFromUrl()

function App() {
    const [boardState, setBoardState] = useState<BoardState>(initialGameState.boardState)

    /**
     * @todo: just keep these in mutable state like boardstate is
     */
    const rows = initialGameState.rows
    const cols = initialGameState.cols

    const step = () => setBoardState(
        getNextGeneration(boardState, rows, cols)
    )

    useEffect(() => {
        if (hashState(boardState, rows, cols) !== hashState(readStateFromUrl().boardState, rows, cols)) { // todo: read ros/cols from url too
            saveState(boardState, rows, cols)
        }
    }, [boardState, rows, cols])

    useEffect(() => {
        const handleHistoryChange = ({ state }: any) => {
            if (state) {
                setBoardState(state.boardState);
            }
        };

        window.addEventListener('popstate', handleHistoryChange)

        return () => window.removeEventListener('popstate', handleHistoryChange)
    }, [setBoardState]);

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
