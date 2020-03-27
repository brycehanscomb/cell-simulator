import styled from 'styled-components'
import {ALIVE, CellValue} from "../../util/game";

export const Root = styled.button<{ value: CellValue }>`
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 1px solid pink;
  background: ${props => props.value === ALIVE 
    ? '#FF9800' 
    : '#607D8B'};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
`
