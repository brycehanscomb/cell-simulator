import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { loadImage } from "../ImageImporter";
import { chunk } from "lodash";
import { ALIVE, DEAD } from "../../util/game";

interface Props {
  src: string;
  allowCrossOriginImageLoading: boolean;
}

const ImagePreview = ({ src, allowCrossOriginImageLoading }: Props) => {
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
    console.log(imageData);
    if (imageData && visibleNode.current) {
      let pixelChunks = chunk<number>(imageData.data, 4).map(([r, g, b, a]) => {
        if (a < 128) {
          return ALIVE;
        }

        if ((r + g + b) / 3 >= 128) {
          return ALIVE;
        } else {
          return DEAD;
        }
      });

      visibleNode.current.width = imageData.width;
      visibleNode.current.height = imageData.height;
      const ctx = visibleNode.current.getContext("2d")!;

      const ditheredPixelChunks = pixelChunks.map(chunk => {
        if (chunk === ALIVE) {
          return [255, 0, 0, 255];
        } else {
          return [0, 0, 0, 0];
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
    }
  }, [imageData]);

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
