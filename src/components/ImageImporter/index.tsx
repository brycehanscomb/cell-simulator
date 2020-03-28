import * as React from "react";

import { Root, Overlay, Content, CloseButton, Title } from "./styled";

interface Props {
  onCancel: () => void;
}

const ImageImporter = (props: Props) => {
  return (
    <Root>
      <Overlay onClick={props.onCancel} />
      <Content>
        <CloseButton onClick={props.onCancel}>&times;</CloseButton>
        <Title>Import Image</Title>
        <p>
          You can generate cells on the board based on the pixels in an image.
        </p>
      </Content>
    </Root>
  );
};

export default ImageImporter;
