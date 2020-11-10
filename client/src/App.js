import React, { useState, useEffect, useRef, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import socket from "./socketConfig";
import Lobby from "./Pages/Lobby";
import CreateNewGame from "./Pages/CreateNewGame";
import Game from "./Pages/Game";
import Modal from "./WarModal";
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
  const [warDraw, setWarDraw] = useState(false);
  const [warResult, setWarResult] = useState("");
  const [attackerBeforeWar, setAttackerBeforeWar] = useState({});
  const [defenderBeforeWar, setDefenderBeforeWar] = useState({});
  const [isChooseWeapon, setIsChooseWeapon] = useState(false);

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
      // console.log("GAME NOT FOUND FROM USEEEFECT");

      setGame({
        board: [],
      });
    } else {
      // console.log(game);
      // console.log("GAME FROM USEEEFECT", game);
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
      // console.log("socket.on(disconnect)");
      setGameId(null);
      setColor("");
      setPage(PAGE_LOBBY);

      alert("The server crashed or restarted");
    });

    socket.on("games", (games) => {
      // console.log("socket.on(games)");

      // console.log(games);
      setGames(games);
    });

    socket.on("your-game-created", (gameId) => {
      // console.log("socket.on(your-game-created)");

      // console.log(gameId);
      setGameId(gameId);
    });

    socket.on("color", (color) => {
      // console.log("socket.on(color)");
      // console.log(color);

      setColor(color);
    });

    socket.on("game-start", () => {
      setGameStartAfterFlagsAndTraps(true);
    });

    socket.on("move-soldier-result", ({ result, attacker, defender }) => {
      // console.log("attacker from move-soldier", attacker);
      // console.log("defender from move-soldier", defender);
      // setAttackerIndex(attacker.index);
      if (result !== "empty" && result !== "draw") {
        // console.log("YESSSSSSSSSSSSSSSSSSSSSSSSSSSS");
        console.log(
          '"move-soldier-result:" setWar to true and setWarDraw to false'
        );

        setWar(true);
        setWarDraw(false);
        // warModalTimeout.current = setTimeout(() => {
        //   setWar(false);
        //   stopWarSound();
        //   playBattleSound();
        //   // setWarResult("");
        //   // setAttackerBeforeWar("");
        //   // setDefenderBeforeWar("");
        // }, 9000);
        // pauseBattleSound();
        // playWarSound();

        setWarResult(result);
        setAttackerBeforeWar(attacker);
        setDefenderBeforeWar(defender);
        setDirection("");
      } else if (result === "draw") {
        // console.log("inside IFFIFIFIFIFIF");
        // console.log(result);
        setWarDraw(true);
        setWar(false);

        console.log(
          '"move-soldier-result:" setWarDraw to true and setWar to false'
        );

        setWarResult(result);

        setAttackerBeforeWar(attacker);
        setDefenderBeforeWar(defender);
        setDirection("");
      } else {
        checkDirection(attacker.index, defender.index);
        setWarDraw(false);
        setWar(false);
      }

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

    socket.on("choises-after-draw", ({ warArr, turn }) => {
      // console.log("WarArr:", warArr);
      // console.log("Turn:", turn);
      const red = warArr.find((item) => item.color === "red");
      red.player.weapon = red.weapon;
      const blue = warArr.find((item) => item.color === "blue");
      blue.player.weapon = blue.weapon;
      setWarDraw(false);
      // console.log("RED", red);
      // console.log("BLUE", blue);
      // console.log("GAMEEEEEEEEEEEEEE", game);
      if (turn === "red") {
        moveSoldierAfterDraw(blue.player, red.player);
      } else {
        moveSoldierAfterDraw(red.player, blue.player);
      }
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
    // console.log("HANDLE ATTACK");
    // console.log(soldier);
    setAttackSoldier(soldier);
  };

  const moveSoldier = (cellToAttack, player) => {
    // console.log("INDEX1", game.board[attackSoldier/index].color);
    // console.log("INDEX2", game.board[cellToAttack.index].color);
    // console.log("ATTACK SOLDIER", attackSoldier);
    // console.log("PLAYER", player);
    if (
      game.board[attackSoldier.index].color !==
        game.board[cellToAttack.index].color &&
      game.board[cellToAttack.index].color !== "grey"
    ) {
      // playWarSound();
    } else {
      checkDirection(attackSoldier.index, cellToAttack.index);
    }
    console.log('"moveSoldier:" setWar and setWarDraw to false');
    setWar(false);
    setWarDraw(false);
    setWarResult("");
    setAttackerBeforeWar({});
    setDefenderBeforeWar({});
    setIsChooseWeapon(false);
    let type = "war";
    socket.emit("move-soldier", { player, attackSoldier, cellToAttack, type });
    console.log('"moveSoldier:" socket.emit move-soldier');

    if (attackSoldier.weapon !== cellToAttack.weapon) {
      // console.log("if(attackSoldier.weapon !== cellToAttack.weapon)");
      setAttackSoldier();
    }
  };

  const moveSoldierAfterDraw = (attackSoldier, cellToAttack, player) => {
    // console.log("attackerBeforeWar", attackerBeforeWar);
    // console.log("attackerBeforeWar", defenderBeforeWar);
    let type = "warDraw";

    socket.emit("move-soldier", { player, attackSoldier, cellToAttack, type });
    setWarDraw(false);
    setWar(false);
    setWarResult("");
    setAttackerBeforeWar({});
    setDefenderBeforeWar({});
    setIsChooseWeapon(false);
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

  const chooseWeaponDrawWar = (weapon, player) => {
    // console.log(weapon);
    // console.log(color);
    setIsChooseWeapon(true);
    socket.emit("choose-weapon", { weapon, color, player });
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
          warDraw={warDraw}
          warResult={warResult}
          attackerBeforeWar={attackerBeforeWar}
          defenderBeforeWar={defenderBeforeWar}
          closeModal={closeModal}
          chooseWeaponDrawWar={chooseWeaponDrawWar}
          isChooseWeapon={isChooseWeapon}
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
