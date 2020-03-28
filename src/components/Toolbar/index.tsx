import * as React from "react";

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
    <div>
      <button onClick={props.onStep}>Next generation</button>
      <p>
        Rows:
        <button onClick={handleResizeButtonClick("row", -1)}>-</button>
        <button onClick={handleResizeButtonClick("row", 1)}>+</button>
      </p>
      <p>
        Columns:
        <button onClick={handleResizeButtonClick("col", -1)}>-</button>
        <button onClick={handleResizeButtonClick("col", 1)}>+</button>
      </p>
    </div>
  );
};

export default Toolbar;
