// Libs
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";

// Styles
import colors from "../../styles/colors";
import template from "../../styles/template.svg";

// Components
import { BsImages } from "react-icons/bs";
import { AiOutlineRotateLeft } from "react-icons/ai";

const Solitaire7 = () => {
  const ref = useRef();
  const canvasRef = useRef();

  const [taken, setTaken] = useState(false);

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

  function takeImage() {
    setTaken(true);

    canvasRef.current
      .getContext("2d")
      .drawImage(ref.current);
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

      <img src={template} alt="SVG as an image" />

      <AiOutlineRotateLeft className="rotate" />
      <div className="take-image-wrapper">
        <button onClick={takeImage} />
      </div>
      <BsImages className="images" />

      {!taken && <video ref={ref} />}
      {taken && <canvas ref={canvasRef} />}
    </div>
  );
};

const componentStyle = () => css`
  position: relative;
  height: 100%;
  width: 100%;

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
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;

    button {
      border-radius: 50%;
      height: 4rem;
      width: 4rem;
      border: 1px solid ${colors.black};
      cursor: pointer;
    }
  }

  .rotate {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-245%, -100%);
    fill: ${colors.white};
    height: 2.5rem;
    width: 2.5rem;
  }

  .images {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(200%, -130%);
    fill: ${colors.white};
    height: 2rem;
    width: 2rem;
  }

  img {
    position: absolute;
    width: 100%;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    background-color: ${colors.black};
    border-radius: 3px;
    border: 1px solid ${colors.black};
  }

  canvas {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;

export default Solitaire7;
