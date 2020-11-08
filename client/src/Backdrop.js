import React from "react";
import styled from "styled-components";

const Backdrop = ({ show, closeModal }) => {
  return <Container show={show} onClick={closeModal}></Container>;
};

export default Backdrop;

const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: ${({ show }) => (show ? ".8" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  transition: all 0.8s;
  z-index: 2;
`;
