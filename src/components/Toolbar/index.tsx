import * as React from "react";
import { Root, SideBySide, ThreeUp, Splitter } from "./styled";
import Button from "../Button";

export const MIN_ROWS = 4;
export const MIN_COLS = 4;

interface Props {
  onStep: () => void;
  onChangeBoardSize: (newRows: number, newCols: number) => void;
  rows: number;
  cols: number;
}

// todo: move this
const pluralize = (singular: string, multiple: string, quantity: number) => {
  if (quantity === 1) {
    return singular;
  } else {
    return multiple;
  }
};

const Toolbar = (props: Props) => {
  const handleResizeButtonClick = (which: "row" | "col", delta: -1 | 1) => (
    e: React.MouseEvent
  ) => {
    props.onChangeBoardSize(
      which === "row" ? Math.max(props.rows + delta, MIN_ROWS) : props.rows,
      which === "col" ? Math.max(props.cols + delta, MIN_COLS) : props.cols
    );
  };

  return (
    <Root>
      <SideBySide>
        <Button onClick={props.onStep}>Next Generation</Button>
        <Button>Auto-Play</Button>
      </SideBySide>
      <Splitter />
      <ThreeUp>
        <Button onClick={handleResizeButtonClick("row", -1)}>-</Button>
        <span>
          {props.rows} {pluralize("Row", "Rows", props.rows)}
        </span>
        <Button onClick={handleResizeButtonClick("row", 1)}>+</Button>
      </ThreeUp>
      <ThreeUp>
        <Button onClick={handleResizeButtonClick("col", -1)}>-</Button>
        <span>
          {props.cols} {pluralize("Column", "Columns", props.cols)}
        </span>
        <Button onClick={handleResizeButtonClick("col", 1)}>+</Button>
      </ThreeUp>
      <Splitter />

      <SideBySide>
        <Button>Empty Board</Button>
        <Button>Reset</Button>
      </SideBySide>
      <SideBySide>
        <Button>Randomise</Button>
        <Button>Import Image</Button>
      </SideBySide>
    </Root>
  );
};

export default Toolbar;
