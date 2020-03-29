import styled from "styled-components";

const Button = styled.button<{ vibrant?: boolean }>`
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0 solid rgba(255, 255, 255, 0.25);
  font: inherit;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  background: ${props => (props.vibrant ? "#E64A19" : "#22222299")};
  padding: 10px;
  line-height: 1;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 0.7px;
  cursor: pointer;

  &:hover,
  &:focus {
    background: ${props => (props.vibrant ? "#FF5722" : "#22222266")};
  }

  &:active {
    background: ${props => (props.vibrant ? "#BF360C" : "#222222ff")};
  }
`;

export default Button;
