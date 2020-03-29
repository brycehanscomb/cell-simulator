/******************************************************************************\
 *
 * WARNING: The code in this file really sucks and is not cleaned up. Please
 * just look away, it's better for everybody that way. :^)
 *
 /******************************************************************************/

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { chunk } from "lodash";

import { ALIVE, DEAD } from "../../constants";
import { GameState } from "../../types";
import { getCellValueFromPixelColors, loadImage } from "../../util/image";

import { colorsRGBA } from "../Cell/styled";

interface Props {
  src: string;
  allowCrossOriginImageLoading: boolean;
  onSubmit: (newState: GameState) => void;
}

const ImagePreview = ({
  src,
  allowCrossOriginImageLoading,
  onSubmit
}: Props) => {
  const hiddenCanvas = useRef<HTMLCanvasElement>();
  const visibleCanvas = useRef<HTMLCanvasElement>();

  const [imageData, setImageData] = useState<ImageData>();

  useEffect(() => {
    /**
     * @see https://stackoverflow.com/a/27705693
     */
    loadImage(src, allowCrossOriginImageLoading).then(evt => {
      if (hiddenCanvas.current) {
        const cvs = hiddenCanvas.current;
        const img = evt.target;

        cvs.width = img.width;
        cvs.height = img.height;

        const context = cvs.getContext("2d")!;

        context.drawImage(evt.target, 0, 0, cvs.width, cvs.height);
        setImageData(context.getImageData(0, 0, cvs.width, cvs.height));
      }
    });
  }, [src, allowCrossOriginImageLoading]);

  useEffect(() => {
    if (imageData && visibleCanvas.current) {
      let pixelChunks = chunk<number>(imageData.data, 4).map(
        getCellValueFromPixelColors
      );

      const canvas = visibleCanvas.current;

      canvas.width = imageData.width;
      canvas.height = imageData.height;
      const ctx = canvas.getContext("2d")!;

      const ditheredPixelChunks = pixelChunks.map(chunk => {
        if (chunk === ALIVE) {
          return colorsRGBA[ALIVE];
        } else {
          return colorsRGBA[DEAD];
        }
      });

      const pixelStream = ditheredPixelChunks.flat();

      const newImage = ctx.createImageData(
        visibleCanvas.current.width,
        visibleCanvas.current.height
      );

      /**
       * Write the pixels from our pixel stream into the image data object.
       * @todo: surely there's a way to do this in O(1) instead of O(n)?
       */
      for (
        let ii = 0;
        ii < visibleCanvas.current.width * visibleCanvas.current.height * 4;
        ii++
      ) {
        newImage.data[ii] = pixelStream[ii];
      }

      ctx.putImageData(newImage, 0, 0);

      /**
       * Create an image from the canvas
       * Clear & scale the canvas
       * Draw the image to the canvas
       *
       * @see https://stackoverflow.com/a/24468840
       */
      const imageObject = new Image();

      /**
       * Write the 1-bit pixel values to the canvas as an image, then read that
       * image here to get them for further analysis and re-sizing to the size
       * of the board.
       */
      imageObject.onload = function() {
        const scale = 30 / canvas.width; // resize to 30px wide (todo: constrain to the biggest size / side)
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.scale(scale, scale);
        ctx.drawImage(imageObject, 0, 0);
        const scaledData = ctx.getImageData(0, 0, 30, 30);
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        ctx.drawImage(imageObject, 0, 0);
        const scaledCellValues = chunk<number>(scaledData.data, 4).map(i =>
          i[0] === 255 ? ALIVE : DEAD
        );

        onSubmit({
          boardState: scaledCellValues,
          rows: 30,
          cols: 30
        });
      };

      canvas.style.width = "auto";
      canvas.style.height = "300px";
      imageObject.src = canvas.toDataURL();
    }
  }, [imageData, onSubmit]);

  return (
    <>
      <canvas style={{ display: "none" }} ref={hiddenCanvas as any} />
      <canvas ref={visibleCanvas as any} />
    </>
  );
};

export default ImagePreview;
