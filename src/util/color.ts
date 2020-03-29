/**
 * Change the brightness of a six-digit hex color.
 *
 * Stolen from David Sherret via:
 * @see https://stackoverflow.com/a/13532993
 *
 * @param color - a hex color in the format of `#RRGGBB`
 * @param percent - an int from -100 to 100
 */
export function shadeColor(color: string, percent: number) {
  let R: number | string = parseInt(color.substring(1, 3), 16);
  let G: number | string = parseInt(color.substring(3, 5), 16);
  let B: number | string = parseInt(color.substring(5, 7), 16);

  R = parseInt(String((R * (100 + percent)) / 100));
  G = parseInt(String((G * (100 + percent)) / 100));
  B = parseInt(String((B * (100 + percent)) / 100));

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  R = R.toString(16);
  G = G.toString(16);
  B = B.toString(16);

  const RR = R.length === 1 ? "0" + R : R;
  const GG = G.length === 1 ? "0" + G : G;
  const BB = B.length === 1 ? "0" + B : B;

  return `#${RR}${GG}${BB}`;
}
