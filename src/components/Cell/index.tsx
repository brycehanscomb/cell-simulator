import * as React from 'react'
import {CellValue} from "../../util/game";

import {Root} from './styled'

interface Props {
    value: CellValue
    onClick: (e: React.MouseEvent) => void
}

const Cell = ({value, onClick}: Props) => {
    return (
        <Root onClick={onClick} value={value}>
            {value}
        </Root>
    )
}

Cell.displayName = 'Cell'

export default Cell
