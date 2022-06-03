// Libs
import React, { useEffect, useRef } from "react";
import { css } from "@emotion/css";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";

// Components
import Navigation from "./components/Navigation";

// Pages
import Solitaire7 from "./features/solitaire7/Solitaire7";

// Styles
import colors from "./styles/colors";
import breakpoints from "./styles/breakpoints";

const App = () => {
  const containerRef = useRef();

  useEffect(() => {
    disableBodyScroll(containerRef.current);
    return () => {
      enableBodyScroll(containerRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className={componentStyle()}>
      <div className="app-container">
        <Solitaire7 />
        <Navigation />
      </div>
    </div>
  );
};

const componentStyle = () => css`
  height: 100vh;
  width: 100vw;

  .app-container {
    margin: 0 auto;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    max-width: ${breakpoints.lg}px;
    background-color: ${colors.black};
  }
`;

export default App;
