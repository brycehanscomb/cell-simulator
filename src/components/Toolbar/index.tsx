import * as React from "react";
import { useEffect, useState } from "react";

import { GameState } from "../../types";
import { MIN_COLS, MIN_ROWS } from "../../constants";

import Button from "../Button";
import ImageImporter from "../ImageImporter";

import { Root, SideBySide, Splitter, Text, ThreeUp } from "./styled";
import { pluralize } from "../../util/string";

/**
 * Milliseconds between generations when auto-playing
 */
const STEP_TIME = 333;

interface Props {
  rows: number;
  cols: number;
  onStep: () => void;
  onChangeBoardSize: (newRows: number, newCols: number) => void;
  onClearBoard: () => void;
  onResetBoard: () => void;
  onRandomiseBoard: () => void;
  onSetGameState: (newState: GameState) => void;
}

const Toolbar = ({ onStep, ...props }: Props) => {
  const [isImageImporterShowing, setIsImageImporterShowing] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const toggleAutoPlay = () => setIsAutoPlaying(!isAutoPlaying);

  const handleResizeButtonClick = (which: "row" | "col", delta: -1 | 1) => (
    e: React.MouseEvent
  ) => {
    /**
     * Override the user if they try to make the board too small.
     */
    props.onChangeBoardSize(
      which === "row" ? Math.max(props.rows + delta, MIN_ROWS) : props.rows,
      which === "col" ? Math.max(props.cols + delta, MIN_COLS) : props.cols
    );
  };

  /**
   * We implement "auto-play" functionality by simply calling the step function
   * on a timed loop here. This way the App doesn't know anything about it.
   */
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
        <ImageImporter
          onCancel={() => setIsImageImporterShowing(false)}
          onSubmit={s => {
            setIsImageImporterShowing(false);
            props.onSetGameState(s);
          }}
        />
      )}
    </Root>
  );
};

export default Toolbar;
