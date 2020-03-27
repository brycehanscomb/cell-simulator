import * as React from 'react'
import {CellValue} from "../../util/game";

import {Root} from './styled'

interface Props {
    value: CellValue
    onClick: (e: React.MouseEvent) => void
    rowOffset: number;
}

const Cell = ({value, onClick, rowOffset}: Props) => {
    return (
        <Root onClick={onClick} value={value} rowOffset={rowOffset}>
            {value}
        </Root>
    )
}

Cell.displayName = 'Cell'

export default Cell
