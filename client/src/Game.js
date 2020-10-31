import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import socket from "./socketConfig";
import Cell from "./Cell";
import Soldier from "./Soldier";
import Spinner from "./Spinner";
const Game = ({
  game,
  color,
  chooseFlag,
  chooseTrap,
  gameStartAfterFlagsAndTraps,
  attackSoldier,
  handleAttack,
  moveSoldier,
  leaveGame,
  direction,
  attackerIndex,
  setAttackerIndex,
  cellToMoveIndex,
  setCellToMoveIndex,
}) => {
  console.log(game);

  const [flag, setFlag] = useState(false);
  const [trap, setTrap] = useState(false);

  useEffect(() => {
    return () => leaveGame();
  }, []);

  const chooseFlagClicked = (cellId) => {
    if (game.board[cellId].color !== color) return;
    setFlag(true);

    chooseFlag(cellId);
  };

  const chooseTrapClicked = (cellId) => {
    if (game.board[cellId].color !== color) return;
    setTrap(true);
    chooseTrap(cellId);
  };

  const isGameStarted = () => {
    return game.numberOfPlayers === 2;
  };

  const renderBoard = () => (
    <BoardContainer>
      <RedPlayerName>Player Red Name</RedPlayerName>

      <Place hide={flag && trap}>
        <PlaceYourFlag flag={flag}>Place Your Flag</PlaceYourFlag>
        <PlaceYourTrap trap={trap}>Place Your Trap</PlaceYourTrap>
      </Place>
      <Board>
        {game.board.map((cell, i) => (
          <Soldier
            key={i}
            cellColor={cell.color}
            weapon={cell.weapon}
            player={cell.player}
            playerColor={color}
            index={i}
            turn={game.turn}
            board={game.board}
            handleAttack={handleAttack}
            attackSoldier={attackSoldier}
            moveSoldier={moveSoldier}
            exposed={cell.exposed}
            chooseTrapClicked={chooseTrapClicked}
            chooseFlagClicked={chooseFlagClicked}
            flag={flag}
            trap={trap}
            direction={direction}
            attackerIndex={attackerIndex}
            setAttackerIndex={setAttackerIndex}
            cellToMoveIndex={cellToMoveIndex}
            setCellToMoveIndex={setCellToMoveIndex}
          />
        ))}
      </Board>
      <BluePlayerName>Player Purple Name</BluePlayerName>
    </BoardContainer>
  );

  const renderWaiting = () => <h1>Waiting for opponent...</h1>;

  return (
    <Container>
      <RefereeContainer>
        {gameStartAfterFlagsAndTraps && (
          <>
            <RedTurn turn={game.turn}>Red Turn</RedTurn>

            <LeftFlagImg
              src={require("./images/left-flag.png").default}
              turn={game.turn}
              alt="flag"
            />
            <RefereeImg
              src={require("./images/pikachu.png").default}
              alt="referee"
              turn={game.turn}
            />
            <RightFlagImg
              src={require("./images/right-flag.png").default}
              turn={game.turn}
              alt="flag"
            />
            <PurpleTurn turn={game.turn}>Purple Turn</PurpleTurn>
          </>
        )}
      </RefereeContainer>
      {game.turn !== color && gameStartAfterFlagsAndTraps && (
        <SpinnerContainer turn={game.turn}>
          <Spinner />
          <WaitingText turn={game.turn}>Waiting for opponent</WaitingText>
        </SpinnerContainer>
      )}
      {isGameStarted() && renderBoard()}
      <DetailsContainer>
        <ChatContainer></ChatContainer>

        <h1>You color is: {color}</h1>
        {!isGameStarted() && renderWaiting()}
        {isGameStarted() && !flag && <h1>choose Your flag</h1>}
        {isGameStarted() && !trap && <h1>choose Your trap</h1>}
        {gameStartAfterFlagsAndTraps && game.turn}
      </DetailsContainer>
    </Container>
  );
};

export default Game;

const animateOpacity = keyframes`
0%{
opacity: 0;
}
50% {
  opacity: .5
}
100% {
  opacity: 1;
}
`;

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatContainer = styled.div`
  height: 20vh;
  border: 1px solid black;
`;

const SpinnerContainer = styled.div`
  position: absolute;
  right: ${({ turn }) => (turn === "red" ? "1rem" : "auto")};
  left: ${({ turn }) => (turn === "blue" ? "1rem" : "auto")};
  top: 1rem;
  text-align: center;
  opacity: ${animateOpacity} 0.2s 5s 3;
  z-index: 5;
`;
const WaitingText = styled.h2`
  position: absolute;
  right: ${({ turn }) => (turn === "red" ? "3rem" : "auto")};
  left: ${({ turn }) => (turn === "blue" ? "3rem" : "auto")};
  top: 2rem;
  width: 40%;
  opacity: ${animateOpacity} 0.2s 5s 3;
`;

const Turn = styled.h1``;

const PurpleTurn = styled(Turn)`
  transition: all 0.8s 0.4s;
  opacity: ${({ turn }) => (turn === "blue" ? "1" : "0")};
  color: #a236d2;
  position: absolute;

  right: 0.5rem;
  top: 0;
`;

const RedTurn = styled(Turn)`
  transition: all 0.8s 0.2s;

  opacity: ${({ turn }) => (turn === "red" ? "1" : "0")};
  color: red;
  position: absolute;
  left: 0.5rem;
  top: 0;
`;
const RefereeContainer = styled.div`
  width: 100%;
  height: 10vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 5;
`;

const RefereeImg = styled.img`
  width: 7rem;
  height: 9rem;
  transition: all 0.8s;
  perspective: 40rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({ turn }) =>
    turn === "blue"
      ? "translate(-50%,-50%) translateY(20%) scaleX(-1)"
      : "translate(-50%,-50%) translateY(20%) scaleX(1)"};
`;

const LeftFlagImg = styled.img`
  width: 9rem;
  height: 5rem;
  opacity: ${({ turn }) => (turn === "blue" ? "0" : "1")};
  position: absolute;
  left: 24%;
  bottom: 0;
  z-index: 2;
  transition: all 0.8s 0.1s;
`;

const RightFlagImg = styled.img`
  width: 9rem;
  height: 5rem;
  opacity: ${({ turn }) => (turn === "red" ? "0" : "1")};
  position: absolute;
  right: 24%;
  bottom: 0;
  transition: all 0.8s 0.1s;
`;

const BoardContainer = styled.div`
  width: 100vw;
  height: 75vh;

  /* padding: 8rem 4rem; */
  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
  background-color: #a5ce21;
  position: relative;
`;

const Place = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: ${({ hide }) => (hide ? "none" : "flex")}

  flex-direction: column;
  align-items: center;
  justify-content: center;

`;
const PlaceTitle = styled.h2`
  font-size: 2rem;
  opacity: 0.7;
  transition: all 0.8s 0.2s;
`;
const PlaceYourFlag = styled(PlaceTitle)`
  opacity: ${({ flag }) => (!flag ? "1" : "0")};
`;
const PlaceYourTrap = styled(PlaceTitle)`
  opacity: ${({ trap }) => (!trap ? "1" : "0")};
`;

const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 85%;
  height: 65%;
  /* align-items: center; */
  line-height: 0;
  border: 0.2rem solid #e8f4c0;
  /* outline: 1rem solid #a5ce21; */
`;

const RedPlayerName = styled.h1`
  align-self: flex-start;
  margin-left: 8%;
  color: red;
`;

const BluePlayerName = styled.h1`
  align-self: flex-end;
  margin-right: 8%;
  color: #a236d2;
`;
