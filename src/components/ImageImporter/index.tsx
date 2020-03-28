import * as React from "react";

import {
  Root,
  Overlay,
  Content,
  CloseButton,
  Title,
  BackgroundPreview
} from "./styled";
import { useEffect, useState } from "react";

interface Props {
  onCancel: () => void;
}

const loadImage = (url: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = (_, __, ___, ____, error) => reject(error);
    img.src = url;
  });
};

const ImageImporter = (props: Props) => {
  const [targetUrl, setTargetUrl] = useState<string>("");
  const [err, setErr] = useState<Error>();

  useEffect(() => {
    if (targetUrl && !err) {
      loadImage(targetUrl)
        .then(() => {})
        .catch(e => {
          setErr(e || new Error(`Could not load "${targetUrl}"`));
        });
    }
  }, [targetUrl, setErr, err]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;

    let isValidUrl = false;

    try {
      new URL(value);
      isValidUrl = true;
    } catch (e) {
      console.log("no");
      if (e instanceof TypeError) {
        setErr(new Error("Please enter a valid URL"));
      } else {
        setErr(e);
      }
    } finally {
      setTargetUrl(value);
      if (isValidUrl) {
        console.log("nup");
        setErr(undefined);
      }
    }
  };

  return (
    <Root>
      <Overlay onClick={props.onCancel} />
      <Content>
        <CloseButton onClick={props.onCancel}>&times;</CloseButton>
        <Title>Import Image</Title>
        <p>
          You can generate cells on the board based on the pixels in an image.
        </p>
        <input type="url" value={targetUrl} onChange={handleUrlChange} />
        {err && <p>{err.message}</p>}
        {!err && targetUrl && <BackgroundPreview src={targetUrl} />}
      </Content>
    </Root>
  );
};

export default ImageImporter;
