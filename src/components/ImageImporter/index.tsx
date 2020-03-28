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
import { SideBySide } from "../Toolbar/styled";
import ImagePreview from "../ImagePreview"; // todo: move this somewhere more common

interface Props {
  onCancel: () => void;
}

export const loadImage = (
  url: string,
  allowCrossOrigin: boolean = false
): Promise<any> => {
  return new Promise((resolve, reject) => {
    const img = new Image();

    /**
     * Only allow this if you know the image is safe to access with the user's
     * current cookies and such.
     *
     * This current implementation is not Enterprise-grade, but good enough for
     * a tech demo.
     *
     * @see http://scary.beasts.org/security/CESA-2008-009.html
     */
    if (allowCrossOrigin) {
      img.setAttribute("crossOrigin", "Anonymous");
    }

    img.onload = resolve;
    img.onerror = (_, __, ___, ____, error) => {
      reject(error);
    };
    img.src = url;
  });
};

const ImageImporter = (props: Props) => {
  const [targetUrl, setTargetUrl] = useState<string>(
    "https://cdn.glitch.com/4c9ebeb9-8b9a-4adc-ad0a-238d9ae00bb5%2Fmdn_logo-only_color.svg?1535749917189\n"
  );
  const [err, setErr] = useState<Error>();

  const [
    allowCrossOriginImageLoading,
    setAllowCrossOriginImageLoading
  ] = useState(false);

  useEffect(() => {
    if (targetUrl && !err) {
      console.log("in!");
      loadImage(targetUrl, allowCrossOriginImageLoading).catch(e => {
        console.log("aaaaaa", e);
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
      if (e instanceof TypeError) {
        setErr(new Error("Please enter a valid URL"));
      } else {
        setErr(e);
      }
    } finally {
      setTargetUrl(value);
      if (isValidUrl) {
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
        <p>
          <label>
            <input
              type={"checkbox"}
              checked={allowCrossOriginImageLoading}
              onChange={e => setAllowCrossOriginImageLoading(e.target.checked)}
            />
            I want to allow loading of cross-origin images (required for this
            demo)
          </label>
        </p>
        <p>
          <small>
            There are{" "}
            <a
              href={
                "https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image"
              }
              target={"blank"}
            >
              security considerations
            </a>{" "}
            to be aware of. Additionally, only images served with CORS headers
            set to `*` will work here.
          </small>
        </p>
        {err && <p>{err.message}</p>}
        {!err && targetUrl && allowCrossOriginImageLoading && (
          <SideBySide style={{ height: 200 }}>
            <BackgroundPreview src={targetUrl} />
            <ImagePreview
              src={targetUrl}
              allowCrossOriginImageLoading={allowCrossOriginImageLoading}
            />
          </SideBySide>
        )}
      </Content>
    </Root>
  );
};

export default ImageImporter;
