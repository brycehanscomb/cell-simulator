import * as React from "react";
import { Root, SideBySide, ThreeUp, Splitter } from "./styled";
import Button from "../Button";

interface Props {
  onStep: () => void;
  onChangeBoardSize: (newRows: number, newCols: number) => void;
  rows: number;
  cols: number;
}

const Toolbar = (props: Props) => {
  const handleResizeButtonClick = (which: "row" | "col", delta: -1 | 1) => (
    e: React.MouseEvent
  ) => {
    props.onChangeBoardSize(
      which === "row" ? props.rows + delta : props.rows,
      which === "col" ? props.cols + delta : props.cols
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
        <span>{props.rows} Rows</span>
        <Button onClick={handleResizeButtonClick("row", 1)}>+</Button>
      </ThreeUp>
      <ThreeUp>
        <Button onClick={handleResizeButtonClick("col", -1)}>-</Button>
        <span>{props.rows} Columns</span>
        <Button onClick={handleResizeButtonClick("col", 1)}>+</Button>
      </ThreeUp>
    </Root>
  );
};

export default Toolbar;
