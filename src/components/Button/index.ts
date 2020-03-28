import styled from "styled-components";

const Button = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0px solid rgba(255, 255, 255, 0.25);
  font: inherit;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: #22222299;
  padding: 10px;
  line-height: 1;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 0.7px;
  cursor: pointer;

  &:hover,
  &:focus {
    background: #22222266;
  }

  &:active {
    background: #222222ff;
  }
`;

export default Button;
