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
