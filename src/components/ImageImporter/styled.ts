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
  height: 85vh;
  overflow-y: auto;
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

export const BackgroundPreview = styled.div<{ src: string }>`
  background-color: #cdcdcd;
  background-image: url(${props => props.src});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  &:after {
    content: "";
    padding-bottom: 62.5%;
  }
`;

export const ImageGallery = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  grid-column-gap: 10px;
  justify-content: start;
`;

export const ImageGalleryOption = styled.img.attrs({ height: 100 })`
  border: 2px solid #cdcdcd;
  transition: all 0.2s ease-out;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
    transform: scale(1.1);
  }

  &:active {
    transform: scale(0.95);
  }
`;

export const URLInput = styled.input`
  font: inherit;
  display: block;
  width: 100%;
  padding: 0.5em;
`;
