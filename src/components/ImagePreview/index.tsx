import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { loadImage } from "../ImageImporter";
import { chunk } from "lodash";
import { colorsRGBA } from "../Cell/styled";
import { GameState } from "../../types";
import { ALIVE, DEAD } from "../../constants";

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
  const rootNode = useRef<HTMLCanvasElement>();
  const visibleNode = useRef<HTMLCanvasElement>();

  const [imageData, setImageData] = useState<{
    data: Uint8ClampedArray;
    width: number;
    height: number;
  }>();

  useEffect(() => {
    /**
     * @see https://stackoverflow.com/a/27705693
     */
    loadImage(src, allowCrossOriginImageLoading).then(evt => {
      if (rootNode.current) {
        const cvs = rootNode.current;
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
    if (imageData && visibleNode.current) {
      let pixelChunks = chunk<number>(imageData.data, 4).map(([r, g, b, a]) => {
        if (a < 128) {
          return DEAD;
        }

        // decide based on this pixel's brightness
        if ((r + g + b) / 3 >= 100) {
          return ALIVE;
        } else {
          return DEAD;
        }
      });

      const canvas = visibleNode.current;

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
        visibleNode.current.width,
        visibleNode.current.height
      );

      for (
        let ii = 0;
        ii < visibleNode.current.width * visibleNode.current.height * 4;
        ii++
      ) {
        newImage.data[ii] = pixelStream[ii];
      }

      ctx.putImageData(newImage, 0, 0);

      /**
       * @see https://stackoverflow.com/a/24468840
       */
      // create an image from the canvas
      // clear & scale the canvas
      // draw the image to the canvas
      var imageObject = new Image();
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
      <canvas style={{ display: "none" }} ref={rootNode as any} />
      <canvas ref={visibleNode as any} />
    </>
  ); // todo: don't do `as any` here
};

export default ImagePreview;

/*
https://cdn.glitch.com/4c9ebeb9-8b9a-4adc-ad0a-238d9ae00bb5%2Fmdn_logo-only_color.svg?1535749917189
 */
