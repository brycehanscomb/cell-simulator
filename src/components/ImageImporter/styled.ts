import styled from "styled-components";
import Button from "../Button";

export const Root = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Overlay = styled.button`
  -webkit-appearance: none;
  -moz-appearance: none;
  margin: 0;
  border: 0;
  padding: 0;
  font: inherit;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div`
  background: #f2f2f2;
  padding: 20px;
  width: 600px;
  height: 440px;
  position: relative;
  z-index: 10;
  color: #222;
`;

export const Title = styled.h2`
  margin-top: 0;
`;

export const CloseButton = styled(Button)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
