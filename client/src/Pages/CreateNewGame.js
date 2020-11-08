import React, { useState } from "react";
import createGameImg from "../images/createGameImg.jpg";
import Footer from "../Footer";
import styled from "styled-components";

const CreateNewGame = ({ createGame, setPage }) => {
  const [gameName, setGameName] = useState("");
  const [playerName, setPlayerName] = useState("");

  return (
    <Container>
      <Img src={createGameImg} alt="create game img" />
      <NewGame>
        <Input
          type="text"
          placeholder="Enter nickname"
          onChange={(e) => setPlayerName(e.target.value)}
        />

        <Input
          type="text"
          onChange={(e) => setGameName(e.target.value)}
          placeholder="Enter game name"
        />
      </NewGame>
      <Buttons>
        <CreateNewGameBtn onClick={() => createGame(gameName, playerName)}>
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
  background-color: #f6f6f6;
`;

const Img = styled.img`
  width: 100%;
  flex: 0 0 50%;
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
  font-size: 3rem;
  font-family: inherit;
  text-transform: uppercase;
  padding: 1rem 2rem;
  height: 50%;
`;

const CreateNewGameBtn = styled(Button)`
  background-color: #c6de83;
`;

const Input = styled.input`
  font-size: 2rem;
  padding: 0.8rem;
  ::-webkit-input-placeholder {
    font-family: inherit;
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
