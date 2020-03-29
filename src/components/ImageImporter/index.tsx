import * as React from "react";

import {
  Root,
  Overlay,
  Content,
  CloseButton,
  Title,
  BackgroundPreview,
  ImageGallery,
  ImageGalleryOption,
  URLInput
} from "./styled";
import { useEffect, useState } from "react";
import { SideBySide } from "../Toolbar/styled";
import ImagePreview from "../ImagePreview";
import Button from "../Button"; // todo: move this somewhere more common

import sampleImage1 from "../../assets/sample-image-1.jpg";
import sampleImage2 from "../../assets/sample-image-2.jpg";
import sampleImage3 from "../../assets/sample-image-3.jpg";
import { GameState } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (newState: GameState) => void;
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
  const [targetUrl, setTargetUrl] = useState<string>("");
  const [err, setErr] = useState<Error>();
  const [step, setStep] = useState(0);

  const [
    allowCrossOriginImageLoading,
    setAllowCrossOriginImageLoading
  ] = useState(false);

  useEffect(() => {
    if (targetUrl && !err) {
      loadImage(
        targetUrl,
        allowCrossOriginImageLoading || targetUrl.startsWith("/")
      ).catch(e => {
        setErr(e || new Error(`Could not load "${targetUrl}"`));
      });
    }
  }, [targetUrl, setErr, err, allowCrossOriginImageLoading]);

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

  const [importedGameState, setImportedGameState] = useState();

  const handleImageClicked = (src: string) => {
    setTargetUrl(src);
    setErr(undefined);
  };

  const isLocalImage = targetUrl.startsWith("/");
  const needsCORSPermission = !allowCrossOriginImageLoading && !isLocalImage;

  return (
    <Root>
      <Overlay onClick={props.onCancel} />
      <Content>
        <CloseButton onClick={props.onCancel}>&times;</CloseButton>
        <Title>Import Image</Title>
        <p>
          You can generate cells on the board based on the pixels in an image.
        </p>
        {step === 0 && (
          <div>
            <h3>Select a sample image</h3>
            <ImageGallery>
              {[sampleImage2, sampleImage1, sampleImage3].map(src => (
                <ImageGalleryOption
                  src={src}
                  key={src}
                  onClick={() => handleImageClicked(src)}
                />
              ))}
            </ImageGallery>
            <h3>Or import from a URL</h3>
            <URLInput
              placeholder={"Paste a URL here..."}
              type="url"
              value={targetUrl}
              onChange={handleUrlChange}
            />
            {targetUrl.length > 0 && !isLocalImage && (
              <div>
                <p>
                  <label>
                    <input
                      type={"checkbox"}
                      checked={allowCrossOriginImageLoading}
                      onChange={e =>
                        setAllowCrossOriginImageLoading(e.target.checked)
                      }
                    />
                    I want to allow loading of cross-origin images (required for
                    this demo)
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
                    to be aware of. Additionally, only images served with CORS
                    headers set to `*` will work here.
                  </small>
                </p>
              </div>
            )}
            {err && <p>{err.message}</p>}
            {!err && targetUrl && !needsCORSPermission && (
              <SideBySide style={{ height: 200 }}>
                <BackgroundPreview src={targetUrl} />
              </SideBySide>
            )}
            <hr />
            {!err && targetUrl && (
              <Button onClick={() => setStep(1)}>Continue and Analyze</Button>
            )}
            <Button onClick={props.onCancel}>Cancel</Button>
          </div>
        )}
        {step === 1 && (
          <div>
            <ImagePreview
              src={targetUrl}
              allowCrossOriginImageLoading={
                allowCrossOriginImageLoading || targetUrl.startsWith("/")
              }
              onSubmit={setImportedGameState}
            />
            <hr />
            <Button onClick={() => setStep(0)}>Go back</Button>
            <Button onClick={() => props.onSubmit(importedGameState)}>
              Import Now
            </Button>
          </div>
        )}
      </Content>
    </Root>
  );
};

export default ImageImporter;
