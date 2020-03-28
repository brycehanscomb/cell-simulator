import * as React from "react";
import { Root, SideBySide, ThreeUp, Splitter, Text } from "./styled";
import Button from "../Button";
import { useEffect, useState } from "react";
import ImageImporter from "../ImageImporter";

export const MIN_ROWS = 4;
export const MIN_COLS = 4;

const STEP_TIME = 333;

interface Props {
  onStep: () => void;
  onChangeBoardSize: (newRows: number, newCols: number) => void;
  onClearBoard: () => void;
  onResetBoard: () => void;
  onRandomiseBoard: () => void;
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

const Toolbar = ({ onStep, ...props }: Props) => {
  const handleResizeButtonClick = (which: "row" | "col", delta: -1 | 1) => (
    e: React.MouseEvent
  ) => {
    props.onChangeBoardSize(
      which === "row" ? Math.max(props.rows + delta, MIN_ROWS) : props.rows,
      which === "col" ? Math.max(props.cols + delta, MIN_COLS) : props.cols
    );
  };

  const [isImageImporterShowing, setIsImageImporterShowing] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying);

  useEffect(() => {
    let timer: number;

    if (isAutoPlaying) {
      timer = setTimeout(onStep, STEP_TIME);
    }

    return () => clearTimeout(timer);
  }, [isAutoPlaying, onStep]);

  return (
    <Root>
      <Text>
        Use these controls to manipulate life-cycle of the cells according to
        the rules.
      </Text>
      <SideBySide>
        <Button onClick={onStep}>Next Generation</Button>
        <Button onClick={toggleAutoPlay} vibrant={isAutoPlaying}>
          {isAutoPlaying ? "Stop" : "Auto-Play"}
        </Button>
      </SideBySide>
      <Splitter />
      <Text>
        Use these controls to manipulate the size of the board on the stage.
      </Text>
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
      <Text>
        Use these shortcut controls to manipulate which cells are alive.
      </Text>
      <SideBySide>
        <Button onClick={props.onClearBoard}>Empty Board</Button>
        <Button onClick={props.onResetBoard}>Reset</Button>
      </SideBySide>
      <SideBySide>
        <Button onClick={props.onRandomiseBoard}>Randomise</Button>
        <Button vibrant onClick={() => setIsImageImporterShowing(true)}>
          Import Image
        </Button>
      </SideBySide>
      <Text>
        <small>(You can also click the cells to change them!)</small>
      </Text>
      {isImageImporterShowing && (
        <ImageImporter onCancel={() => setIsImageImporterShowing(false)} />
      )}
    </Root>
  );
};

export default Toolbar;
