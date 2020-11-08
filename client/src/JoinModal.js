import React from "react";
import styled from "styled-components";
import Backdrop from "./Backdrop";

const JoinModal = ({ show, joinGameHandler, closeModal, handleChangeName }) => {
  return (
    <>
      <Backdrop show={show} closeModal={closeModal} />

      <Container show={show}>
        <Input
          type="text"
          placeholder="Enter nickname..."
          onChange={handleChangeName}
        />
        {/* joinGame(game.id) */}
        <Button onClick={joinGameHandler}>Let's Play!</Button>
      </Container>
    </>
  );
};

export default JoinModal;

const Container = styled.div`
  background-color: #eee;
  width: 100%;
  height: 20rem;
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: #c6de83;
  z-index: 90;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: ${({ show }) =>
    show ? "translate(-50%,-50%)" : "translate(30rem, -50%)"};
  transition: all 1s;
`;

const Input = styled.input`
  font-size: 2rem;
  padding: 1rem;
  border: none;
  width: 80%;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  border: none;
  background-color: #a5ce21;
  align-self: auto;
  font-size: 3rem;
  font-family: inherit;
  text-transform: uppercase;
  padding: 1rem 2rem;
  width: 80%;
`;
