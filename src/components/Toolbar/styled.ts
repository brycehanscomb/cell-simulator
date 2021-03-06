import styled from "styled-components";
import { colors } from "../Cell/styled";
import { DEAD } from "../../constants";

const paddingSize = "10px";

export const Root = styled.nav`
  background: ${colors[DEAD]};
  color: white;
  padding: ${paddingSize};
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  grid-row-gap: ${paddingSize};
  align-content: start;
  border-top: 2px solid rgba(255, 255, 255, 0.7);

  @media only screen and (min-width: 640px) {
    border-top: 0;
    border-left: 2px solid rgba(255, 255, 255, 0.7);
  }
`;

export const SideBySide = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: ${paddingSize};
`;

export const ThreeUp = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: ${paddingSize};
  text-align: center;
  align-items: center;
`;

/**
 * @todo: don't use HRs if it's not semantic HTML
 */
export const Splitter = styled.hr`
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-top: none;
  width: 100%;
`;

export const Text = styled.p`
  margin: 0 0 5px;
  font-size: 0.9em;
  font-style: italic;
  text-align: center;
`;
