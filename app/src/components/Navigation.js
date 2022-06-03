// Libs
import React from "react";
import { css } from "@emotion/css";

// Components
import { MdCenterFocusWeak } from "react-icons/md";

// Styles
import colors from "../styles/colors";

const Navigation = () => {
  return (
    <div className={componentStyle()}>
      <button>
        <div className="circle">
          <MdCenterFocusWeak />
        </div>
        <div className="arrow-up" />
      </button>
    </div>
  );
};

const componentStyle = () => css`
  width: 100%;
  height: 100%;
  padding: 1rem 0;
  max-height: 4rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  button {
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    svg {
      height: 2rem;
      width: 2rem;
      color: ${colors.yellow};
    }

    .arrow-up {
      margin-top: 0.25rem;
      width: 0;
      height: 0;
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 7px solid ${colors.yellow};
    }
  }
`;

export default Navigation;
