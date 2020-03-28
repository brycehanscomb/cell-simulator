import styled from "styled-components";

export const Root = styled.div<{ rows: number; cols: number }>`
  display: grid;
  grid-template-rows: repeat(${props => props.rows}, 50px);
  grid-template-columns: repeat(${props => props.cols}, 50px);
  grid-gap: 3px;
`;
