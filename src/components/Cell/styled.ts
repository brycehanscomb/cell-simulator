import styled from 'styled-components'
import {ALIVE, CellValue, DEAD} from "../../util/game";

const colors = {
    [ALIVE]: '#FF9800',
    [DEAD]: '#607D8B'
}

export const Root = styled.button<{ value: CellValue }>`
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  background: ${props => props.value === ALIVE ? colors[ALIVE] : colors[DEAD]};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: transform 0.1s ease-out, background 0.1s ease-out;
  cursor: pointer;
  
  &:hover,
  &:focus {
    transform: scale(1.1);  
  }
  
  &:active {
    transform: scale(1);
    background: #37474F;
  }
`
