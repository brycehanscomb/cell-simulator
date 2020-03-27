export const DEAD = 0;
export const ALIVE = 1;

export enum CellValue {
    DEAD,
    ALIVE
}

export type BoardState = Array<CellValue>

interface Neighbors {
    north: CellValue;
    south: CellValue;
    east: CellValue;
    west: CellValue;
}

interface Coords {
    row: number;
    col: number
}

export const getCoordsFor = (index: number, rows: number, cols: number): Coords => {
    return {
        col: index % cols,
        row: Math.floor(index / cols)
    }
}

export const getIndexFromCoords = ({ row, col }: Coords, rows: number, cols: number): number => {
    return (row * cols) + col
}

const getValueAtIndex = (board: BoardState, index: number): CellValue => {
    return board[index]
}

const getValueAtCoord = (board: BoardState, coords: Coords, rows: number, cols: number): CellValue => {
    let {col, row} = coords

    if (col === -1) {
        col = cols - 1
    } else if (col === cols) {
        col = 0
    }

    if (row === -1) {
        row = rows - 1
    } else if (row === rows) {
        row = 0
    }

    const index = getIndexFromCoords({row, col}, rows, cols)

    return getValueAtIndex(board, index)
}

const getNeighborsFor = (board: BoardState, index: number, rows: number, cols: number): Neighbors => {
    const {col, row} = getCoordsFor(index, rows, cols)
    const northCoords = {row: row - 1, col};
    const north = getValueAtCoord(board, northCoords, rows, cols);
    const eastCoords = {row, col: col + 1};
    const east = getValueAtCoord(board, eastCoords, rows, cols);
    const southCoords = {row: row + 1, col};
    const south = getValueAtCoord(board, southCoords, rows, cols);
    const westCoords = {row, col: col - 1};
    const west = getValueAtCoord(board, westCoords, rows, cols);

    return {
        north, east, south, west
    }
}

export const getNextGeneration = (board: BoardState, rows: number, cols: number): BoardState => {
    return board.map((cellValue, index) => {
        const neighbors = getNeighborsFor(board, index, rows, cols)

        const livingNeighbors = Object.values(neighbors).filter(Boolean).length

        switch (livingNeighbors) {
            /**
             * A Cell with fewer than two live neighbours dies of under-population.
             */
            case 0:
            case 1:
                return DEAD;
            /**
             * A Cell with 2 neighbors lives on to the next generation (if it is
             * currently alive).
             */
            case 2:
                return cellValue;
            /**
             * A Cell with 3 neighbors lives on to the next generation (if it is
             * currently alive), or "comes to life" if not currently alive
             */
            case 3:
                return ALIVE;
            /**
             * A Cell with more than 3 live neighbors dies of over-population.
             */
            default:
                return DEAD;
        }
    })
}

/*
const before: Board = [
            0, 0, 0, 0, 0, 0, 0, 0,
            0, 1, 0, 0, 0, 0, 1, 0,
            0, 1, 1, 1, 1, 1, 1, 0,
            1, 0, 0, 1, 1, 0, 1, 1,
            0, 1, 1, 0, 0, 1, 1, 0,
            0, 0, 0, 1, 1, 0, 0, 0,
            0, 0, 0, 0, 0, 0, 0, 0
        ]
 */
