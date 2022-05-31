// Libs
import React, { useEffect, useRef } from "react";
import { css } from "@emotion/css";

// Styles
import colors from "../../styles/colors";

const Solitaire7 = () => {
  const ref = useRef();

  function startLiveFeed({ mediaStreamObject }) {
    ref.current.srcObject = mediaStreamObject;

    ref.current.addEventListener(
      "loadedmetadata",
      (e) => void ref.current.play()
    );
  }

  async function main() {
    ref.current.setAttribute("playsinline", true);

    const mediaStreamObject = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    });

    startLiveFeed({ mediaStreamObject });
  }

  useEffect(() => {
    main();
  }, []);

  return (
    <div className={componentStyle()}>
      <div className="info">
        <p className="title">Tag et billede</p>
        <p className="description">
          Prøv at fang kortenes placering
          <br /> indenfor de angivne felter
        </p>
      </div>
      <div className="game-template" />
      <div className="take-image-wrapper">
        <button />
      </div>
      <video ref={ref} />
    </div>
  );
};

const componentStyle = () => css`
  height: 100%;
  width: 100%;
  position: relative;
  
  

  .info {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;
    top: 40px;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;

    .title {
      font-size: 1.5rem;
      color: ${colors.white};
      font-weight: bold;
      text-align: center;
    }

    .description {
      margin-top: 0.5rem;
      font-weight: 500;
      line-height: 1.3;
      color: ${colors.white};
      text-align: center;
    }
  }

  .take-image-wrapper {
    position: absolute;
    text-align: center;
    background-color: white;
    height: 4.5rem;
    width: 4.5rem;
    border-radius: 50%;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, -30%);
    border: 2px solid ${colors.black};
    object-fit: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    border: transparent;

    button {
      border-radius: 50%;
      height: 4rem;
      width: 4rem;
      border: 1px solid ${colors.black};
    }
  }

  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    background-color: ${colors.black};
    border-radius: 3px;
    border: 1px solid ${colors.black};
  }
`;

export default Solitaire7;
