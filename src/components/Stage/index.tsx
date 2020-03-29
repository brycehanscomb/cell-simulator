import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { debounce } from "lodash";

import { Root, SizeMonitor } from "./styled";
import { CELL_GAP, CELL_SIDE_LENGTH } from "../../constants";

interface Props {
  rows: number;
  cols: number;
  children: React.ReactNode;
}

/**
 * Ensure there's always a bit of padding between the stage edge and the board
 */
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
      const boardWidth =
        CELL_SIDE_LENGTH * props.cols + CELL_GAP * (props.cols - 1);

      if (boardHeight > stageSize.height || boardWidth > stageSize.width) {
        const heightRatio =
          stageSize.height / boardHeight - OVERSIZE_RESCALE_MARGIN;
        const widthRatio =
          stageSize.width / boardWidth - OVERSIZE_RESCALE_MARGIN;

        setScaleSize(Math.min(heightRatio, widthRatio));
      } else {
        setScaleSize(1);
      }
    }
  }, [rootNode, props.cols, props.rows, setScaleSize]);

  /**
   * Zoom out on the board if it gets too big for the viewport when the BOARD
   * size changes
   */
  useEffect(zoomBoardIfNeeded, [props.cols, props.rows]);

  /**
   * Zoom out on the board if it gets too big for the viewport when the WINDOW
   * size changes
   */
  useEffect(() => {
    const resizeHandler = debounce(zoomBoardIfNeeded, 500);

    window.addEventListener("resize", resizeHandler);

    return () => window.removeEventListener("resize", resizeHandler);
  }, [zoomBoardIfNeeded]);

  return (
    <Root ref={rootNode as any}>
      <SizeMonitor ref={sizeMonitor as any} scale={scaleSize}>
        {props.children}
      </SizeMonitor>
    </Root>
  );
};

export default Stage;
