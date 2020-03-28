import styled from "styled-components";
import { ALIVE, CellValue, DEAD } from "../../util/game";
import { shadeColor } from "../../util/color";

const colors = {
  [ALIVE]: "#FF9800",
  [DEAD]: "#607D8B",
  pressed: "#37474F"
};

/**
 * We have a nice shading effect on each cell depending on where it is,
 * but if not tempered, the effect can be too much. This will attenuate it a bit.
 */
const gradientStrengthCoefficient = 0.4;
/**
 * The shading effect needn't just start from the base color, we an shift the "zero"
 * value to be a bit lighter than that if we want.
 */
const gradientBrightnessShift = -0.2;

/**
 * `rowOffset` is the number from 0 to 1 representing the distance that the Cell's
 * containing row is from the first row.
 *
 * First row = 0
 * Last row = 1
 */
export const Root = styled.button<{
  value: CellValue;
  rowOffset: number;
  hasEntered: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  transition: transform 0.1s ease-out, background 0.1s ease-out,
    opacity 0.1s linear;
  cursor: pointer;
  -webkit-appearance: none;
  -moz-appearance: none;
  border: none;
  margin: 0;
  opacity: ${props => (props.hasEntered ? 1 : 0)};

  background: ${props => {
    const baseColor = props.value === ALIVE ? colors[ALIVE] : colors[DEAD];

    /**
     * Let's build up the shading strength here, step-by-step
     */
    let colorChangeAmount = props.rowOffset * 100;
    colorChangeAmount = colorChangeAmount * gradientStrengthCoefficient;
    colorChangeAmount = colorChangeAmount + gradientBrightnessShift * 100;

    return shadeColor(baseColor, colorChangeAmount * -1);
  }};

  &:hover,
  &:focus {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
    background: ${colors.pressed};
  }
`;
