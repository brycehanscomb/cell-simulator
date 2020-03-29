import { ALIVE, DEAD } from "../constants";

export const loadImage = (
  url: string,
  allowCrossOrigin: boolean = false
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    /**
     * Only allow this if you know the image is safe to access with the user's
     * current cookies and such.
     *
     * This current implementation is not Enterprise-grade, but good enough for
     * a tech demo.
     *
     * @see http://scary.beasts.org/security/CESA-2008-009.html
     */
    if (allowCrossOrigin) {
      img.setAttribute("crossOrigin", "Anonymous");
    }

    img.onload = resolve;
    img.onerror = (_, __, ___, ____, error) => {
      reject(error);
    };
    img.src = url;
  });
};

/**
 * Given an [rgba] pixel, determine whether that pixel is bright enough to
 * warrant being mapped to an ALIVE pixel or a DEAD pixel.
 *
 * Each subpixel value is a Uint8 (0 to 255)
 */
export const getCellValueFromPixelColors = ([r, g, b, a]: number[]) => {
  if (a < 128) {
    return DEAD;
  }

  // decide based on this pixel's brightness
  if ((r + g + b) / 3 >= 100) {
    return ALIVE;
  } else {
    return DEAD;
  }
};
