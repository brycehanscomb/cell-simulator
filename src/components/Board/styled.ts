import styled from "styled-components";

export const CELL_SIDE_LENGTH = 50;
export const CELL_GAP = 3;

export const Root = styled.div<{ rows: number; cols: number }>`
  display: grid;
  grid-template-rows: repeat(${props => props.rows}, ${CELL_SIDE_LENGTH}px);
  grid-template-columns: repeat(${props => props.cols}, ${CELL_SIDE_LENGTH}px);
  grid-gap: ${CELL_GAP}px;
`;
