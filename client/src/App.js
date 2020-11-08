import React, { useState, useEffect, useRef, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import socket from "./socketConfig";
import Lobby from "./Pages/Lobby";
import CreateNewGame from "./Pages/CreateNewGame";
import Game from "./Pages/Game";
import Modal from "./Modal";
import styled from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import JoinGame from "./Pages/JoinGame";
import { AudioContext } from "./audio-context";
// import ReactAudioPlayer from "react-audio-player";

const PAGE_GAME = "Game";
const PAGE_LOBBY = "Lobby";
const PAGE_CREATE_NEW_GAME = "CreateNewGame";
const PAGE_JOIN_GAME = "JoinGame";

function App() {
  const [page, setPage] = useState("Lobby");
  const [games, setGames] = useState([]);
  const [game, setGame] = useState({ board: [], chat: [], players: [] });
  const [gameId, setGameId] = useState("");
  const [color, setColor] = useState("");
  const [direction, setDirection] = useState("");
  const [attackerIndex, setAttackerIndex] = useState();
  const [cellToMoveIndex, setCellToMoveIndex] = useState();
  const [
    gameStartAfterFlagsAndTraps,
    setGameStartAfterFlagsAndTraps,
  ] = useState(false);
  const [attackSoldier, setAttackSoldier] = useState();
  const [warDetails, setWarDetails] = useState();
  const [showModal, setShowModal] = useState(false);
  const [created, setCreated] = useState(false);
  const [showOnSoundIcon, setShowOnSoundIcon] = useState(false);
  const [war, setWar] = useState(false);
  const [warResult, setWarResult] = useState("");
  const [attackerBeforeWar, setAttackerBeforeWar] = useState({});
  const [defenderBeforeWar, setDefenderBeforeWar] = useState({});
  const {
    playSound,
    playWarSound,
    pauseBattleSound,
    stopWarSound,
    playBattleSound,
  } = useContext(AudioContext);
  const warModalTimeout = useRef();
  useEffect(() => {
    if (page !== "Lobby") playSound();
  }, [page]);

  useEffect(() => {
    const game = games.find((g) => g.id === gameId);
    if (!game) {
      setGame({
        board: [],
      });
    } else {
      // console.log(game);

      setGame(game);
    }
  }, [games, gameId]);

  // useEffect(() => {
  //   return () => {
  //     clearTimeout(warModalTimeout);
  //   };
  // }, [war]);

  useEffect(() => {
    socket.on("disconnect", () => {
      console.log("socket.on(disconnect)");
      setGameId(null);
      setColor("");
      setPage(PAGE_LOBBY);

      alert("The server crashed or restarted");
    });

    socket.on("games", (games) => {
      console.log("socket.on(games)");

      console.log(games);
      setGames(games);
    });

    socket.on("your-game-created", (gameId) => {
      console.log("socket.on(your-game-created)");

      // console.log(gameId);
      setGameId(gameId);
    });

    socket.on("color", (color) => {
      console.log("socket.on(color)");
      // console.log(color);

      setColor(color);
    });

    socket.on("game-start", () => {
      setGameStartAfterFlagsAndTraps(true);
    });

    socket.on("move-soldier-result", ({ result, attacker, defender }) => {
      // console.log("attacker", attacker);
      // console.log("defender", defender);
      // setAttackerIndex(attacker.index);
      if (result !== "empty") {
        setWar(true);
        // warModalTimeout.current = setTimeout(() => {
        //   setWar(false);
        //   stopWarSound();
        //   playBattleSound();
        //   // setWarResult("");
        //   // setAttackerBeforeWar("");
        //   // setDefenderBeforeWar("");
        // }, 9000);
        pauseBattleSound();
        playWarSound();

        setWarResult(result);
        setAttackerBeforeWar(attacker);
        setDefenderBeforeWar(defender);
      }
      checkDirection(attacker.index, defender.index);

      // setWarDetails({ result, attacker, defender });
      // setShowModal(true);
    });

    socket.on("end-game", () => {
      setGameId(null);
      setColor("");
      setPage(PAGE_LOBBY);
      // setShowModal(true);
      // setModalText('Your opponent has left the game');
      // setModalTitle('Game Over');
    });
  }, []);

  const createGame = (gameName, playerName) => {
    socket.emit("create-game", { gameName, playerName });
    setPage(PAGE_GAME);
  };

  const joinGame = (gameId, playerName) => {
    socket.emit("join-game", { gameId, playerName });
    setPage(PAGE_GAME);
    setGameId(gameId);
  };

  const leaveGame = () => {
    setGame(PAGE_LOBBY);
    socket.emit("leave-game");
  };

  const chooseFlag = (cellId) => {
    socket.emit("choose-flag", { cellId, gameId });
  };

  const chooseTrap = (cellId) => {
    socket.emit("choose-trap", { cellId, gameId });
  };

  const handleAttack = (soldier) => {
    console.log("HANDLE ATTACK");
    // console.log(soldier);
    setAttackSoldier(soldier);
  };

  const moveSoldier = (cellToAttack, player) => {
    console.log("INDEX1", game.board[attackSoldier.index].color);
    console.log("INDEX2", game.board[cellToAttack.index].color);
    if (
      game.board[attackSoldier.index].color !==
        game.board[cellToAttack.index].color &&
      game.board[cellToAttack.index].color !== "grey"
    ) {
      playWarSound();
    } else {
      checkDirection(attackSoldier.index, cellToAttack.index);
    }
    setWar(false);
    socket.emit("move-soldier", { player, attackSoldier, cellToAttack });
    setAttackSoldier();
  };

  const checkDirection = (attackerIndex, defenderIndex) => {
    // console.log(attackerIndex);
    setCellToMoveIndex(defenderIndex);
    // setAttackerIndex(attackerIndex);
    if (attackerIndex + 7 === defenderIndex) {
      setDirection("down");
    } else if (attackerIndex + 1 === defenderIndex) {
      setDirection("right");
    } else if (attackerIndex - 1 === defenderIndex) {
      setDirection("left");
    } else if (attackerIndex === defenderIndex + 7) {
      setDirection("up");
    }
  };

  const closeModal = () => {
    setWar(false);
    setWarResult("");
    setAttackerBeforeWar("");
    setDefenderBeforeWar("");
  };
  const sendMessage = (message) => {
    socket.emit("chat-message", message);
  };
  return (
    <Container>
      {/* <input
        id="myInput"
        type="button"
        className="btn btn-primary mr-2"
        value="Play"
        onClick={playSound}
      ></input>
      <input
        type="button"
        className="btn btn-warning mr-2"
        value="Pause"
        onClick={pauseSound}
      ></input>
      <input
        type="button"
        className="btn btn-danger mr-2"
        value="Stop"
        onClick={stopSound}
      ></input> */}

      {page === PAGE_LOBBY && (
        <Lobby
          games={games}
          joinGame={joinGame}
          setPage={setPage}
          showOnSoundIcon={showOnSoundIcon}
        />
      )}
      {page === PAGE_CREATE_NEW_GAME && (
        <CreateNewGame createGame={createGame} setPage={setPage} />
      )}
      {page === PAGE_JOIN_GAME && (
        <JoinGame games={games} joinGame={joinGame} setPage={setPage} />
      )}
      {page === PAGE_GAME && (
        <Game
          game={game}
          color={color}
          chooseFlag={chooseFlag}
          chooseTrap={chooseTrap}
          gameStartAfterFlagsAndTraps={gameStartAfterFlagsAndTraps}
          handleAttack={handleAttack}
          attackSoldier={attackSoldier}
          moveSoldier={moveSoldier}
          leaveGame={leaveGame}
          direction={direction}
          attackerIndex={attackerIndex}
          setAttackerIndex={setAttackerIndex}
          cellToMoveIndex={cellToMoveIndex}
          setCellToMoveIndex={setCellToMoveIndex}
          sendMessage={sendMessage}
          players={game.newPlayers}
          war={war}
          warResult={warResult}
          attackerBeforeWar={attackerBeforeWar}
          defenderBeforeWar={defenderBeforeWar}
          closeModal={closeModal}
        />
      )}
      <GlobalStyle />
    </Container>
  );
}

export default App;

const Container = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
`;
