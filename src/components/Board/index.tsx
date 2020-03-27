import * as React from 'react'
import {ALIVE, BoardState, DEAD, getCoordsFor} from "../../util/game";
import Cell from "../Cell";
import {Root} from "./styled";

interface Props {
    boardState: BoardState;
    cols: number;
    rows: number;
    onBoardStateChanged: (newBoardState: BoardState) => void;
}

const replaceAtValue = (list: any, index: number, newValue: any) => {
    const result = [...list];
    result[index] = newValue;
    return result;
}

const Board = ({ boardState, rows, cols, onBoardStateChanged}: Props) => {
    const handleCellClicked = (index: number) => {
        onBoardStateChanged(
            replaceAtValue(boardState, index, boardState[index] === ALIVE ? DEAD : ALIVE)
        )
    }
    return (
        <Root rows={rows} cols={cols}>
            {boardState.map((value, index) => {
                const rowOffset = getCoordsFor(index, rows, cols).row / rows;

                return (
                    <Cell value={value} key={index} rowOffset={rowOffset} onClick={handleCellClicked.bind(null, index)} />
                )
            })}
        </Root>
    )
}

export default Board
