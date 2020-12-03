import React from "react";
import styled, { css } from "styled-components";
import winnerBG from "./images/winner.png";

const WinnerModal = ({
  winner,
  players,
  handleBackToLobby,
  stopBattleSound,
}) => {
  let winnerColor;
  if (Object.keys(winner).length !== 0) {
    stopBattleSound();
    if (winner.color === players[0].color) {
      winnerColor = "red";
    } else {
      winnerColor = "blue";
    }
  }
  return (
    <>
      <WinnerModalContainer winner={winnerColor}>
        {Object.keys(winner).length !== 0 && (
          <>
            <WinnerName winnerColor={winnerColor}>
              {winner.color === players[0].color
                ? players[0].name
                : players[1].name}{" "}
              <br />
              Wins!
            </WinnerName>
            <Pics>
              <PokemonPic
                src={require(`./images/charmander-${winnerColor}.png`).default}
              />
              <PokemonPic
                src={require(`./images/squirtle-${winnerColor}.png`).default}
              />
              <PokemonPic
                src={require(`./images/balbazor-${winnerColor}.png`).default}
              />
            </Pics>
            <BackToLobbyBtn onClick={handleBackToLobby}>
              Back To Lobby
            </BackToLobbyBtn>
          </>
        )}
      </WinnerModalContainer>
    </>
  );
};

export default WinnerModal;

const WinnerModalContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  width: 100vw;
  background-image: ${({ winner }) =>
    winner &&
    css`
            url(${winnerBG});
          `};

  background-size: cover;
  z-index: ${({ winner }) => (winner ? "1000" : "0")};
  margin-left: ${({ winner }) => (winner ? "0" : "-100vw")};
  transition: all 1.2s;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  padding-bottom: 1rem;
  padding-left: 10%;
`;
const WinnerName = styled.h1`
  font-size: 4rem;
  width: 45%;

  text-align: center;
  color: ${({ winnerColor }) => (winnerColor === "blue" ? "#a236d2" : "red")};
  /* position: absolute;
  top: 20%;
  left: 10%; */
`;

const Pics = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 45%;
`;

const PokemonPic = styled.img`
  width: 12rem;
  height: 15rem;
  &:not(:last-child) {
    margin-bottom: 2rem;
  }
`;

const BackToLobbyBtn = styled.button`
  background-color: transparent;
  padding: 0.5rem 2rem;
  font-size: 2rem;
  color: ${({ winnerColor }) => (winnerColor === "blue" ? "#a236d2" : "red")};
  border: ${({ winnerColor }) =>
    winnerColor === "blue" ? "1px solid #a236d2" : "1px solid red"};
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`;
