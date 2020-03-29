/**
 * We define the dead/alive state of the cells in int-bools (C-style) because
 * when we store the state in the URL, zeroes and ones are a much more compact
 * data representation than `true`s and `false`s (or `"dead"`s and `"alive"`s).
 *
 * Sure, we could serialise bools into ints just for the URL, but it seems to
 * work well enough; no need to prematurely-optimise further.
 */
export const DEAD = 0;
export const ALIVE = 1;
