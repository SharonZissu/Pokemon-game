import React, { useState, useEffect } from "react";
import createGameImg from "../images/createGameImg.jpg";
import Footer from "../Footer";
import VoulmeIcons from "../VoulmeIcons";
import styled from "styled-components";

const CreateNewGame = ({
  createGame,
  setPage,
  gameNameExistsMsg,
  setGameNameExistsMsg,
}) => {
  const [gameName, setGameName] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [playerNameEmpty, setPlayerNameEmpty] = useState(false);
  const [gameNameEmpty, setGameNameEmpty] = useState(false);

  useEffect(() => {
    if (playerName !== "") {
      setPlayerNameEmpty(false);
    }
    if (gameName !== "") {
      setGameNameEmpty(false);
    }
  }, [playerName, gameName]);

  const createGameHandler = () => {
    if (playerName === "" && gameName === "") {
      setPlayerNameEmpty(true);
      setGameNameEmpty(true);
      return;
    } else if (gameName === "" && playerName !== "") {
      setGameNameEmpty(true);
      return;
    } else if (gameName !== "" && playerName === "") {
      setPlayerNameEmpty(true);
      return;
    }

    createGame(gameName, playerName);
  };

  return (
    <Container>
      <VoulmeIcons />
      <Img src={createGameImg} alt="create game img" />
      <NewGame>
        <InputContainer>
          <Input
            type="text"
            placeholder="Nickname"
            onChange={(e) => setPlayerName(e.target.value)}
            playerNameEmpty={playerNameEmpty}
          />
          <Label for="nickname" class="form__label">
            Nickname
          </Label>
        </InputContainer>
        <InputContainer>
          <Input
            type="text"
            onChange={(e) => {
              setGameName(e.target.value);
              setGameNameExistsMsg(false);
            }}
            placeholder="Game name"
            gameNameEmpty={gameNameEmpty}
          />
          <Label
            for="game-name"
            class="form__label"
            gameNameExistsMsg={gameNameExistsMsg}
          >
            {!gameNameExistsMsg ? "Game name" : "Game Name is already exists!"}
          </Label>
        </InputContainer>
      </NewGame>
      <Buttons>
        <CreateNewGameBtn onClick={createGameHandler}>
          Create New Game
        </CreateNewGameBtn>

        <Button onClick={() => setPage("Lobby")}>Back To Lobby</Button>
      </Buttons>
      <Footer />
    </Container>
  );
};

export default CreateNewGame;
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  height: 100vh;
  /* background-color: #f3f0f0; */
  background-color: #f6f6f6;
`;

const Img = styled.img`
  width: 100%;
  flex: 0 0 40%;
  margin-bottom: 2rem;
`;

const NewGame = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  padding-top: 0;
`;

const Buttons = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
`;

const Button = styled.button`
  border: none;
  background-color: #a5ce21;
  font-size: 2.6rem;
  font-family: inherit;
  text-transform: uppercase;
  padding: 1rem 2rem;
  height: 50%;
`;

const CreateNewGameBtn = styled(Button)`
  background-color: #c6de83;
  &:focus,
  &:active {
    outline: none;
  }
`;

const InputContainer = styled.div`
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
const Input = styled.input`
  font-size: 1.5rem;

  padding: 1.5rem 2rem;
  border: ${({ playerNameEmpty, gameNameEmpty }) =>
    playerNameEmpty || gameNameEmpty ? "1px solid red" : "none"};

  width: 100%;
  border-bottom: ${({ playerNameEmpty, gameNameEmpty }) =>
    playerNameEmpty || gameNameEmpty
      ? "1px solid red"
      : "0.3rem solid transparent"};
  /* border-bottom: 0.3rem solid transparent; */
  color: #999;

  transition: all 0.3s;

  ::-webkit-input-placeholder {
    font-family: inherit;
    color: #999;
  }

  &:focus {
    outline: none;
    border-bottom: 0.3rem solid #c6de83;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  }
  &:focus:invalid {
    border-bottom: 0.3rem solid red;
  }
  &:placeholder-shown + label {
    opacity: 0;
    visibility: hidden;
    transform: translateY(-4rem);
  }
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  margin-left: 2rem;
  margin-top: 0.7rem;
  display: block;
  transition: all 0.3s;
  color: ${({ gameNameExistsMsg }) => (gameNameExistsMsg ? "red" : "#999")};
`;
