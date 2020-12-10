import React from "react";
import styled from "styled-components";
import Backdrop from "../UI/Backdrop/Backdrop";
import CloseIcon from "@material-ui/icons/Close";

const Modal = ({
  type,
  show,
  joinGameHandler,
  closeJoinModal,
  closeLeaveModal,
  handleChangeName,
  nameIsEmpty,
  gameIsFullMsg,
  playerNameExistsMsg,
}) => {
  return (
    <>
      <Backdrop
        show={show}
        closeModal={type === "join" ? closeJoinModal : closeLeaveModal}
      />
      {type === "join" && (
        <JoinContainer show={show}>
          <CloseIconContainer>
            <CloseIcon
              onClick={closeJoinModal}
              style={{ height: "3rem", width: "3rem" }}
            />
          </CloseIconContainer>

          {gameIsFullMsg ? (
            <h1>
              Game is full!
              <br /> Someone enter the room before you!
            </h1>
          ) : (
            <>
              {playerNameExistsMsg && (
                <NicknameExists>Nickname is already exists!</NicknameExists>
              )}
              <Input
                type="text"
                placeholder="Enter nickname..."
                onChange={handleChangeName}
                nameIsEmpty={nameIsEmpty}
              />
              {/* joinGame(game.id) */}
              <Button onClick={joinGameHandler}>Let's Play!</Button>
            </>
          )}
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
  h1 {
    text-align: center;
  }
`;

const NicknameExists = styled.h1`
  color: red;
  margin-bottom: 0.5rem;
  font-size: 2rem;
`;
const Input = styled.input`
  font-size: 2rem;
  padding: 1rem;
  border: ${({ nameIsEmpty }) => (nameIsEmpty ? "1px solid red" : " none")};
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

  &:active,
  &:focus {
    outline: none;
  }
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
