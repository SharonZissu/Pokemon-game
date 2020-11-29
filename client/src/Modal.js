import React from "react";
import styled from "styled-components";
import Backdrop from "./Backdrop";
import CloseIcon from "@material-ui/icons/Close";

const Modal = ({
  type,
  show,
  joinGameHandler,
  closeJoinModal,
  closeLeaveModal,
  handleChangeName,
}) => {
  return (
    <>
      <Backdrop
        show={show}
        closeModal={type === "join" ? closeJoinModal : closeLeaveModal}
      />
      {type === "join" && (
        <JoinContainer show={show}>
          <Input
            type="text"
            placeholder="Enter nickname..."
            onChange={handleChangeName}
          />
          {/* joinGame(game.id) */}
          <Button onClick={joinGameHandler}>Let's Play!</Button>
        </JoinContainer>
      )}
      {type === "leave" && (
        <LeaveContainer show={show}>
          <CloseIconContainer>
            <CloseIcon
              onClick={closeLeaveModal}
              style={{ height: "4rem", width: "4rem" }}
            />
          </CloseIconContainer>
          <h1>Opponent leave the game!</h1>
        </LeaveContainer>
      )}
    </>
  );
};

export default Modal;

const JoinContainer = styled.div`
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

const LeaveContainer = styled.div`
  background-color: #eee;
  width: 80%;
  height: 30rem;
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
    show ? "translate(-50%,-50%)" : "translate(-50%, -230rem)"};
  transition: all 1s;
`;

const CloseIconContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
