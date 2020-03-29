/**
 * Returns the right word to use given the current `quantity`. ie:
 * If `quantity === 5`, return `Leaves` instead of `Leaf`
 * If `quantity === 1`, return `Leaf` instead of `Leaves`
 *
 * Eventually this could use `Intl.PluralRules` when browser support is good.
 *
 * Currently only supports English pluralization rules, but you get the idea.
 */
export const pluralize = (
  singular: string,
  multiple: string,
  quantity: number
) => {
  if (quantity === 1) {
    return singular;
  } else {
    return multiple;
  }
};
