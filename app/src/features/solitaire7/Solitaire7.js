// Libs
import React, { useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";

// Styles
import colors from "../../styles/colors";
import breakpoints from "../../styles/breakpoints";
import template from "../../styles/template.svg";

// Components
import { BsImages } from "react-icons/bs";
import { AiOutlineRotateLeft } from "react-icons/ai";

// Hooks
import useMediaStream from "../hooks/useMediaStream";

const Solitaire7 = () => {
  const mediaStream = useMediaStream({
    video: { facingMode: "environment" },
    audio: false,
  });

  const canvasRef = useRef();
  const videoRef = useRef();
  const cardTemplateRef = useRef();

  function startLiveFeed({ mediaStream }) {
    videoRef.current.srcObject = mediaStream;

    videoRef.current.addEventListener(
      "loadedmetadata",
      (e) => void videoRef.current.play()
    );
  }

  async function takeImage() {
    const bitmap = await createImageBitmap(videoRef.current);
    console.log(bitmap);
  }



  useEffect(() => {
    if (mediaStream) startLiveFeed({ mediaStream });

  }, [mediaStream]);

  return (
    <div className={componentStyle()}>
      <div className="video-container">
        <div className="info">
          <p className="title">Tag et billede</p>
          <p className="description">
            Prøv at fang kortenes placering
            <br /> indenfor de angivne felter
          </p>
        </div>
        <BsImages ref={cardTemplateRef} className="images" />
        <video ref={videoRef} playsinline />
        <canvas hidden={true}/>
        <div className="take-image-wrapper">
          <button onClick={takeImage} />
        </div>
      </div>
    </div>
  );
};

const componentStyle = () => css`
  position: relative;
  height: 100%;
  width: 100%;

  .video-container {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    height: 100%;
    width: 100%;

    video {
      height: auto;
      width: 100%;
      max-width: ${breakpoints.lg}px;
      background-color: ${colors.black};
      border-radius: 3px;
      border: 1px solid ${colors.black};
      margin-bottom: 1rem;
    }
    
    

    .take-image-wrapper {
      margin: 0 auto;
      position: relative;
      background-color: white;
      height: 4.5rem;
      width: 4.5rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 5;

      button {
        object-fit: fill;
        border-radius: 50%;
        height: 4rem;
        width: 4rem;
        border: 1px solid ${colors.black};
        cursor: pointer;
      }
    }

    .info {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 2rem;
      width: 100%;
      margin-bottom: 1rem;

      .title {
        font-size: 1.5rem;
        color: ${colors.white};
        font-weight: bold;
        text-align: center;
      }

      .description {
        margin-top: 0.25rem;
        font-weight: 500;
        line-height: 1.3;
        color: ${colors.white};
        text-align: center;
      }
    }
  }
`;

export default Solitaire7;
