import React, { useEffect, useState, useRef, useContext } from "react";
import styled, { keyframes, css } from "styled-components";
import socket from "../socketConfig";
import Cell from "../Cell";
import Soldier from "../Soldier";
import Spinner from "../Spinner";
import seaImg from "../images/sea.png";
import Message from "../Message";
import { AudioContext } from "../audio-context";
import Modal from "../Modal";
// import battleSound from "../sounds/battle-sound.mp3";
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
  sendMessage,
  players,
  war,
  warResult,
  attackerBeforeWar,
  defenderBeforeWar,
  closeModal,
}) => {
  // console.log(game);

  const [flag, setFlag] = useState(false);
  const [trap, setTrap] = useState(false);
  const [arrayOfArrows, setArrayOfArrows] = useState([]);
  const [message, setMessage] = useState("");
  const screenEndRef = useRef(null);
  const { playBattleSound, stopBattleSound, stopSound } = useContext(
    AudioContext
  );

  useEffect(() => {
    // battleAudio.load();
    return () => {
      console.log("pauseeeee");
      // battleAudio.pause();
      // battleAudio.currentTime = 0;
      stopBattleSound();
      leaveGame();
    };
  }, []);

  // const playAudio = () => {
  //   battleAudio.play();
  // };

  const scrollToBottom = () => {
    screenEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    console.log("CHATTTT:", game.chat);
    console.log("GAMEEE:", game);
    console.log(Object.keys(game));
    if (Object.keys(game).includes("chat")) {
      if (game.chat.length !== 0) {
        scrollToBottom();
      }
    }
  }, [game.chat]);

  const checkArrows = (index) => {
    let arrayOfArrows = [];
    if (
      index + 7 <= game.board.length - 1 &&
      game.board[index + 7].color !== color
    ) {
      if (index < 35) {
        arrayOfArrows.push("down");
      }
    }
    if (index - 7 >= 0 && game.board[index - 7].color !== color) {
      if (index > 6) {
        arrayOfArrows.push("up");
      }
    }
    if (
      index + 1 <= game.board.length - 1 &&
      game.board[index + 1].color !== color
    ) {
      if (
        index !== 6 &&
        index !== 13 &&
        (index !== 20) & (index !== 27) & (index !== 35) &&
        index !== 42
      ) {
        arrayOfArrows.push("right");
      }
    }
    if (index - 1 >= 0 && game.board[index - 1].color !== color) {
      if (index % 7 !== 0 && index !== 0) {
        arrayOfArrows.push("left");
      }
    }

    setArrayOfArrows(arrayOfArrows);
  };

  const chooseFlagClicked = (cellId) => {
    if (game.board[cellId].color !== color) return;
    setFlag(true);

    chooseFlag(cellId);
  };

  const chooseTrapClicked = (cellId) => {
    if (
      game.board[cellId].color !== color ||
      game.board[cellId].weapon === "flag"
    )
      return;
    setTrap(true);
    chooseTrap(cellId);
    stopSound();
    playBattleSound();
  };

  const isTwoPlayersInRoom = () => {
    return game.numberOfPlayers === 2;
  };

  const handleSendMessageClicked = () => {
    const findName = players.find((player) => player.color === color);
    const newMessage = {
      text: message,
      color: color,
      playerName: findName.name,
    };
    sendMessage(newMessage);
    setMessage("");
  };

  const renderBoard = () => (
    <BoardContainer>
      <RedPlayerName>{players[0].name}</RedPlayerName>

      <Place hide={flag && trap && gameStartAfterFlagsAndTraps}>
        <>
          <PlaceYourFlag flag={flag}>Place Your Flag</PlaceYourFlag>
          <PlaceYourTrap trap={trap}>Place Your Trap</PlaceYourTrap>

          <MiddleSpinner show={!gameStartAfterFlagsAndTraps && flag && trap}>
            <Spinner />
            <h2>Waiting for opponent</h2>
          </MiddleSpinner>
        </>
      </Place>

      <Board war={war}>
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
            checkArrows={checkArrows}
            arrayOfArrows={arrayOfArrows}
          />
        ))}
      </Board>
      <BluePlayerName>{players[1].name}</BluePlayerName>
      <Modal
        show={war}
        warResult={warResult}
        attackerBeforeWar={attackerBeforeWar}
        defenderBeforeWar={defenderBeforeWar}
        playerColor={color}
        closeModal={closeModal}
      />
    </BoardContainer>
  );

  const renderWaiting = () => (
    <Waiting>
      <Spinner />
      <WaitingTextBeforeStart turn={game.turn}>
        Waiting for opponent..
      </WaitingTextBeforeStart>
    </Waiting>
  );

  const renderChat = () => (
    <ChatContainer>
      <ChatScreen>
        {game.chat.map((mes, i) => (
          <>
            <Message
              key={i}
              text={mes.text}
              color={mes.color}
              playerName={mes.playerName}
              playerColor={color}
            />
          </>
        ))}
        <div ref={screenEndRef}></div>
      </ChatScreen>
      <SendMessage>
        <Input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <SendBtn onClick={handleSendMessageClicked}>Send</SendBtn>
      </SendMessage>
    </ChatContainer>
  );

  const renderInitialGame = () => (
    <>
      <RefereeContainer>
        <RefereeImg
          src={require("../images/pikachu.png").default}
          alt="referee"
          turn={game.turn}
        />
      </RefereeContainer>
      {renderBoard()}
      {renderChat()}
    </>
  );

  const renderGameStart = () => (
    <>
      <RefereeContainer>
        {!war ? (
          <>
            <RedTurn turn={game.turn}>Red Turn</RedTurn>

            <LeftFlagImg
              src={require("../images/left-flag.png").default}
              turn={game.turn}
              alt="flag"
            />

            <RefereeImg
              src={require("../images/pikachu.png").default}
              alt="referee"
              turn={game.turn}
            />
            <RightFlagImg
              src={require("../images/right-flag.png").default}
              turn={game.turn}
              alt="flag"
            />
            <PurpleTurn turn={game.turn}>Purple Turn</PurpleTurn>
          </>
        ) : (
          <RefereeBattleImg
            src={require("../images/pickachu-battle.png").default}
            alt="referee battle"
          />
        )}
      </RefereeContainer>
      {renderBoard()}
      {game.turn !== color && !war && (
        <SpinnerContainer turn={game.turn}>
          <Spinner />
          <WaitingText turn={game.turn}>
            Waiting
            <br /> for
            <br /> opponent
            <br />
          </WaitingText>
        </SpinnerContainer>
      )}
      {renderChat()}
    </>
  );

  let renderContent;

  if (!isTwoPlayersInRoom()) {
    renderContent = renderWaiting();
  } else {
    if (!gameStartAfterFlagsAndTraps) {
      renderContent = renderInitialGame();
    } else {
      renderContent = renderGameStart();
    }
  }

  return <Container>{renderContent}</Container>;
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

const warAnimation = keyframes`
0%{
  background-color: red;
  opacity: 1;
  visibility: visible;
  /* display: block; */


}
100%{
  background-color: #f86262;
  opacity: 1;
  visibility: visible;

  /* display: block; */



}

`;
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

////////////////ONE PLAYER IN ROOM
const WaitingTextBeforeStart = styled.h1``;

////////////////GAME WAITING
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
  right: ${({ turn }) => (turn === "red" ? "2rem" : "auto")};
  left: ${({ turn }) => (turn === "blue" ? "2rem" : "auto")};
  top: 2rem;
  width: 60%;
  opacity: ${animateOpacity} 0.2s 5s 3;
  font-size: 1.2rem;
  text-align: center;
`;

////////////////REFEREE
const RefereeContainer = styled.div`
  width: 100%;
  height: 10vh;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 5;
  background-image: url(${seaImg});
  background-size: 100% 100%;
`;

const Turn = styled.h1`
  position: absolute;
  top: 0;
  transition: all 0.8s 0.2s;
`;

const PurpleTurn = styled(Turn)`
  opacity: ${({ turn }) => (turn === "blue" ? "1" : "0")};
  color: #a236d2;
  right: 0.5rem;
`;

const RedTurn = styled(Turn)`
  opacity: ${({ turn }) => (turn === "red" ? "1" : "0")};
  color: red;
  left: 0.5rem;
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

const RefereeBattleImg = styled.img`
  width: 10rem;
  height: 9rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -25%);
`;

const Flag = styled.img`
  width: 9rem;
  height: 5rem;
  position: absolute;
  bottom: 0;
  transition: all 0.8s 0.1s;
`;

const LeftFlagImg = styled(Flag)`
  opacity: ${({ turn }) => (turn === "blue" ? "0" : "1")};
  left: 24%;
  z-index: 2;
`;

const RightFlagImg = styled(Flag)`
  opacity: ${({ turn }) => (turn === "red" ? "0" : "1")};
  right: 24%;
`;

////////////////BOARD
const BoardContainer = styled.div`
  width: 100vw;

  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #a5ce21;
  position: relative;
`;

const Board = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 85%;
  height: 65%;
  line-height: 0;
  position: relative;
  border: 0.2rem solid #e8f4c0;
  &::after {
    content: "Battle!!";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    visibility: hidden;
    opacity: 0;
    z-index: 150;
    font-size: 5rem;
    text-align: center;
    padding-top: 5rem;
    display: ${({ war }) => (!war ? "none" : "block")};
    /* background-color: red; */
  }

  ${({ war }) =>
    war &&
    css`
      &::after {
        animation: ${warAnimation} 0.4s 10;
      }
    `}
`;

const Place = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  visibility: ${({ hide }) => (hide ? "hidden" : "vissible")};
  transition: all 0.8s 0.2s;
  z-index: 5;
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

const MiddleSpinner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.8s 0.6s;
  opacity: ${({ show }) => (show ? "1" : "0")};
  h2 {
    font-size: 1.2rem;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const PlayerName = styled.h1``;

const RedPlayerName = styled(PlayerName)`
  color: red;
  margin-bottom: 1rem;
`;

const BluePlayerName = styled(PlayerName)`
  color: #a236d2;
  margin-top: 1rem;
`;

const Waiting = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

//////////CHAT
const ChatContainer = styled.div`
  background-color: #eee;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
  padding-top: 0.6rem;
  padding-bottom: 0.6rem;
`;

const ChatScreen = styled.div`
  background-color: #eee;
  height: 13vh;
  border: 2px dashed #a5ce21;
  width: 95%;
  margin-bottom: 1rem;
  overflow-y: scroll;
  padding: 0.6rem;
`;

const SendMessage = styled.div`
  flex: 1;
  display: flex;
  width: 95%;
`;
const Input = styled.input`
  width: 70%;
  padding: 0.5rem;
  font-size: 1.6rem;
  border: none;
  background-color: #c6de83;
  &:focus {
    outline: none;
  }
`;

const SendBtn = styled.button`
  width: 30%;
  border: none;
  background-color: #a5ce21;
  &:focus {
    outline: none;
  }
`;
