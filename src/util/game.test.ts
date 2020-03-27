import { getNextGeneration, BoardState } from './game'

const renderBoard = (cols: number, rows: number) => (board: BoardState) : string => {
    const arr = board.join('')
    let result = ''
    for (let ii = 0; ii < rows; ii++) {
        const offset = cols * ii
        result += arr.slice(offset, offset + cols) + '\n'
    }
    return result
}

const show = renderBoard(3, 3)

describe('getNextGeneration', () => {
    it('aaa', () => {
        const before: BoardState = [
            0,0,0,
            0,0,0,
            0,0,0
        ]

        const after: BoardState = [
            0,0,0,
            0,0,0,
            0,0,0
        ]

        expect(
            show(getNextGeneration(before, 3, 3))
        ).toEqual(
            show(after)
        )
    })

    it('bbb', () => {
        const before: BoardState = [
            0,0,0,
            0,1,0,
            0,0,0
        ]

        const after: BoardState = [
            0,0,0,
            0,0,0,
            0,0,0
        ]

        expect(
            show(getNextGeneration(before, 3, 3))
        ).toEqual(
            show(after)
        )
    })

    it('ccc', () => {
        const before: BoardState = [
            0,1,0,
            1,0,0,
            0,1,0
        ]

        const after: BoardState = [
            0,0,0,
            0,1,0,
            0,0,0
        ]

        expect(
            show(getNextGeneration(before, 3, 3))
        ).toEqual(
            show(after)
        )
    })

    it('ddd', () => {
        const before: BoardState = [
            1,1,1,
            0,1,0,
            1,1,0
        ]

        const after: BoardState = [
            1,0,1,
            1,1,0,
            1,1,1
        ]

        expect(
            show(getNextGeneration(before, 3, 3))
        ).toEqual(
            show(after)
        )
    })

    it('eee', () => {
        const before: BoardState = [
            1,0,0,0,0,
            0,1,0,0,0,
            1,0,0,0,0,
            0,0,0,0,0,
            0,0,0,0,0,
        ]

        const after: BoardState = [
            0,0,0,0,0,
            1,0,0,0,0,
            0,0,0,0,0,
            0,0,0,0,0,
            0,0,0,0,0,
        ]

        expect(
            renderBoard(5,5)(getNextGeneration(before, 5, 5))
        ).toEqual(
            renderBoard(5,5)(after)
        )
    })
})
