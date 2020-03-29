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
