import React from "react";
import styled from "styled-components";
const Modal = ({ show, warDetails }) => {
  console.log("SHOW:", show);
  const { attacker, defender, result } = warDetails;
  return (
    <Container show={show}>
      <h1>Attacker: {attacker}</h1>
      <h1>Defender: {defender}</h1>
      <h1>Result: {result}</h1>
    </Container>
  );
};

export default Modal;

const Container = styled.div`
  opacity: ${({ show }) => (show ? "1" : "0")};
  visibility: ${({ show }) => (show ? "visible" : "hidden")};
  height: 500px;
  width: 100%;
  background-color: red;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
