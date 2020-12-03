import React from "react";
import styled, { keyframes } from "styled-components";

const GameSpinner = ({ size, color }) => {
  return <Spinner></Spinner>;
};

export default GameSpinner;

// const ldsRipple = keyframes`
// 0% {
//       top: 36px;
//       -webkit-top: 36px;
//       left: 36px;
//       -webkit-left: 36px;
//       width: 0;
//       -webkit-width: 0;
//       height: 0;
//       -webkit-height: 0;
//       opacity: 1;
//       -webkit-opacity: 1;
//     }
//     100% {
//       top: 0px;
//       -webkit-top: 0px;
//       left: 0px;
//       -webkit-left: 0px;
//       width: 72px;
//       -webkit-width: 72px;
//       height: 72px;
//       -webkit-height: 72px;
//       opacity: 0;
//       -webkit-opacity: 0;
//     }
// `;
const load7 = keyframes`
   0%,
  80%,
  100% {
    box-shadow: 0 2.5em 0 -1.3em;
    -webkit-box-shadow: 0 2.5em 0 -1.3em;
  }
  40% {
    box-shadow: 0 2.5em 0 0;
    -webkit-box-shadow: 0 2.5em 0 0;
  }
`;

const Spinner = styled.div`
  &,
  &:before,
  &:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    -webkit-animation: ${load7} 1.8s infinite ease-in-out;
    animation: ${load7} 1.8s infinite ease-in-out;
  }

  color: #ffffff;
  font-size: 10px;
  margin: 3rem auto;
  position: relative;
  text-indent: -9999em;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;

  &:before,
  &:after {
    content: "";
    position: absolute;
    top: 0;
  }
  &:before {
    left: -3.5em;
    -webkit-animation-delay: -0.32s;
    animation-delay: -0.32s;
  }
  &:after {
    left: 3.5em;
  }
`;

/* display: inline-block;
  -webkit-display: inline-block;
  position: relative;
  -webkit-position: relative;
  width: 40px;
  -webkit-width: 40px;
  height: 40px;
  -webkit-height: 40px;

  div {
    position: absolute;
    border: 4px solid #fff;
    -webkit-border: 4px solid #fff;
    opacity: 1;
    -webkit-opacity: 1;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    animation: ${ldsRipple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    -webkit-animation: ${ldsRipple} 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.5s;
    -webkit-animation-delay: -0.5s;
  } */
