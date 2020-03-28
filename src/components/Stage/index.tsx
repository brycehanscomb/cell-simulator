import * as React from "react";
import { Root, SizeMonitor } from "./styled";
import { useCallback, useEffect, useRef, useState } from "react";
import { CELL_GAP, CELL_SIDE_LENGTH } from "../Board/styled";

interface Props {
  rows: number;
  cols: number;
  children: React.ReactNode;
}

const OVERSIZE_RESCALE_MARGIN = 0.05;

const Stage = (props: Props) => {
  const sizeMonitor = useRef<HTMLDivElement>();
  const rootNode = useRef<HTMLDivElement>();
  const [scaleSize, setScaleSize] = useState(1);

  const zoomBoardIfNeeded = useCallback(() => {
    if (rootNode.current) {
      const stageSize = rootNode.current.getBoundingClientRect();

      const boardHeight =
        CELL_SIDE_LENGTH * props.rows + CELL_GAP * (props.rows - 1);

      if (boardHeight > stageSize.height) {
        const ratio = stageSize.height / boardHeight - OVERSIZE_RESCALE_MARGIN;
        setScaleSize(ratio);
      } else {
        setScaleSize(1);
      }
    }
  }, [rootNode, props.cols, props.rows, setScaleSize]);

  /**
   * Zoom out on the board if it gets too big for the viewport
   * @todo: add horizontal oversizing handling as well
   */
  useEffect(zoomBoardIfNeeded, [props.cols, props.rows]);

  return (
    <Root ref={rootNode as any}>
      <SizeMonitor ref={sizeMonitor as any} scale={scaleSize}>
        {props.children}
      </SizeMonitor>
    </Root>
  );
};

export default Stage;
