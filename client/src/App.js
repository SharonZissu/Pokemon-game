import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import socket from "./socketConfig";
import Lobby from "./Lobby";
import CreateNewGame from "./CreateNewGame";
import Game from "./Game";
import Modal from "./Modal";
import styled from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
const PAGE_GAME = "Game";
const PAGE_LOBBY = "Lobby";
const PAGE_CREATE_NEW_GAME = "CreateNewGame";

function App() {
  const [page, setPage] = useState("Lobby");
  const [games, setGames] = useState([]);
  const [game, setGame] = useState({ board: [], chat: [] });
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

  useEffect(() => {
    const game = games.find((g) => g.id === gameId);
    if (!game) {
      setGame({
        board: [],
      });
    } else {
      console.log(game);

      setGame(game);
    }
  }, [games, gameId]);

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

      console.log(gameId);
      setGameId(gameId);
    });

    socket.on("color", (color) => {
      console.log("socket.on(color)");
      console.log(color);

      setColor(color);
    });

    socket.on("game-start", () => {
      setGameStartAfterFlagsAndTraps(true);
    });

    socket.on("move-soldier-result", ({ result, attacker, defender }) => {
      console.log("attacker", attacker);
      console.log("defender", defender);
      // setAttackerIndex(attacker.index);
      checkDirection(attacker.index, defender.index);
      setWarDetails({ result, attacker, defender });
      setShowModal(true);
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

  const createGame = (name) => {
    socket.emit("create-game", name);
    setPage(PAGE_GAME);
  };

  const joinGame = (gameId) => {
    socket.emit("join-game", gameId);
    setPage(PAGE_GAME);
    setGameId(gameId);
  };

  const leaveGame = () => {
    setGame(PAGE_LOBBY);
    socket.emit("leave-game");
  };

  // const moveSoldier = ({ selectedCell, destination }) => {
  //   socket.emit("move-soldier", {
  //     selectedCell,
  //     destination,
  //   });
  // };

  const chooseFlag = (cellId) => {
    socket.emit("choose-flag", { cellId, gameId });
  };

  const chooseTrap = (cellId) => {
    socket.emit("choose-trap", { cellId, gameId });
  };

  const handleAttack = (soldier) => {
    console.log("HANDLE ATTACK");
    console.log(soldier);
    setAttackSoldier(soldier);
  };

  const moveSoldier = (cellToAttack, player) => {
    checkDirection(attackSoldier.index, cellToAttack.index);
    socket.emit("move-soldier", { player, attackSoldier, cellToAttack });
    setAttackSoldier();
  };

  const checkDirection = (attackerIndex, defenderIndex) => {
    console.log(attackerIndex);
    console.log(defenderIndex);
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
  return (
    <Container>
      {page === PAGE_LOBBY && (
        <Lobby games={games} joinGame={joinGame} setPage={setPage} />
      )}
      {page === PAGE_CREATE_NEW_GAME && (
        <CreateNewGame createGame={createGame} />
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
        />
      )}
      {/* {showModal && <Modal show={showModal} warDetails={warDetails} />} */}
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
