import React from "react";
import styled, { keyframes } from "styled-components";

const Spinner = ({ size, color }) => {
  let styledSpinner = false;
  if (size === "big" && color === "white") {
    styledSpinner = true;
  }
  return <Loader styledSpinner={styledSpinner}></Loader>;
};

export default Spinner;

const load8 = keyframes`
0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
`;

const Loader = styled.div`
  font-size: 10px;
  position: relative;
  border-radius: 50%;

  text-indent: -9999em;
  width: ${({ styledSpinner }) => (styledSpinner ? "42rem" : "10rem")};
  height: ${({ styledSpinner }) => (styledSpinner ? "42rem" : "10rem")};
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: ${load8} 1.1s infinite linear;
  animation: ${load8} 1.1s infinite linear;
  border-top: ${({ styledSpinner }) =>
    styledSpinner
      ? "1.1em solid rgba(255, 255, 255, 0.2)"
      : "1.1em solid rgba(0, 0, 0, 0.2)"};
  border-right: ${({ styledSpinner }) =>
    styledSpinner
      ? "1.1em solid rgba(255, 255, 255, 0.2)"
      : "1.1em solid rgba(0, 0, 0, 0.2)"};
  border-bottom: ${({ styledSpinner }) =>
    styledSpinner
      ? "1.1em solid rgba(255, 255, 255, 0.2)"
      : "1.1em solid rgba(0, 0, 0, 0.2)"};
  border-left: ${({ styledSpinner }) =>
    styledSpinner ? "1.1em solid #ffffff" : "1.1em solid #000000"};

  &::after {
    border-radius: 50%;
    width: ${({ styledSpinner }) => (styledSpinner ? "42rem" : "10rem")};
    height: ${({ styledSpinner }) => (styledSpinner ? "42rem" : "10rem")};
  }
`;
