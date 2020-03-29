import * as React from "react";
import { useEffect, useState } from "react";

import { GameState } from "../../types";
import { loadImage } from "../../util/image";

import Button from "../Button";
import ImagePreview from "../ImagePreview";
import { SideBySide } from "../Toolbar/styled"; // todo: don't use another component's styled bits

import {
  BackgroundPreview,
  CloseButton,
  Content,
  ImageGallery,
  ImageGalleryOption,
  Overlay,
  Root,
  Title,
  URLInput
} from "./styled";

import sampleImage1 from "../../assets/sample-image-1.jpg";
import sampleImage2 from "../../assets/sample-image-2.jpg";
import sampleImage3 from "../../assets/sample-image-3.jpg";

interface Props {
  onCancel: () => void;
  onSubmit: (newState: GameState) => void;
}

const ImageImporter = (props: Props) => {
  /**
   * The URL of the image that the user wants to fetch
   */
  const [targetUrl, setTargetUrl] = useState<string>("");

  /**
   * Any error encountered during loading or analysis of the image
   */
  const [err, setErr] = useState<Error>();

  /**
   * Step 0: Choose which image
   * Step 1: Analyze and import image
   */
  const [step, setStep] = useState(0);

  /**
   * When the `<ImagePreview>` finishes analyzing the importe image,
   * we store the resulting game state here for submission on the next tick.
   */
  const [importedGameState, setImportedGameState] = useState();

  /**
   * Because CORS for images is something we need to override, we want to be
   * responsible and add a disclaimer of informed consent so the user needn't
   * do a cross-origin image request if they're not comfortable with whatever
   * (small) risk it entails.
   */
  const [
    allowCrossOriginImageLoading,
    setAllowCrossOriginImageLoading
  ] = useState(false);

  const isLocalImage = targetUrl.startsWith("/");
  const needsCORSPermission = !allowCrossOriginImageLoading && !isLocalImage;
  const canShowPreview = !err && targetUrl && !needsCORSPermission;

  /**
   * We provide some sample images for the user to click if they don't want to
   * find a cross-origin-compatible image somewhere on the internet.
   */
  const handleImageClicked = (src: string) => {
    setTargetUrl(src);
    setErr(undefined);
  };

  /**
   * When the user types into the "Enter URL" textfield
   */
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    const { value } = target;

    let isValidUrl = false;

    try {
      new URL(value); // this will throw if the URL is not a valid one... handy!
      isValidUrl = true;
    } catch (e) {
      if (e instanceof TypeError) {
        setErr(new Error("Please enter a valid URL"));
      } else {
        setErr(e);
      }
    } finally {
      setTargetUrl(value); // we have to set it regardless of validity, so it actually shows up in the UI
      if (isValidUrl) {
        setErr(undefined);
      }
    }
  };

  /**
   * When we have a valid image URL, we can load it into memory so we can grab
   * the pixels from it.
   *
   * @todo: there might be a bug here where it loads the URL without the last key typed
   */
  useEffect(() => {
    if (targetUrl && !err) {
      loadImage(
        targetUrl,
        allowCrossOriginImageLoading || targetUrl.startsWith("/")
      ).catch(e => {
        setErr(
          e ||
            new Error(
              `Could not load "${targetUrl}". The image server must allow CORS, so maybe that is the issue.`
            )
        );
      });
    }
  }, [targetUrl, setErr, err, allowCrossOriginImageLoading]);

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
            {canShowPreview && (
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
                allowCrossOriginImageLoading || isLocalImage
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
