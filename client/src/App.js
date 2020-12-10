import React, { useState, useEffect, useRef, useContext } from "react";
import logo from "./logo.svg";
// import "./App.css";
import socket from "./socketConfig";
import Lobby from "./Pages/Lobby";
import CreateNewGame from "./Pages/CreateNewGame";
import Game from "./Pages/Game";
import styled from "styled-components";
import { GlobalStyle } from "./styles/globalStyle";
import JoinGame from "./Pages/JoinGame";
import { AudioContext } from "./audio-context";
import Modal from "./Modal";
import Rules from "./Pages/Rules";
import ReactGA from "react-ga";

// import ReactAudioPlayer from "react-audio-player";

const PAGE_GAME = "Game";
const PAGE_LOBBY = "Lobby";
const PAGE_CREATE_NEW_GAME = "CreateNewGame";
const PAGE_JOIN_GAME = "JoinGame";
const PAGE_RULES = "Rules";

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
  const [warDrawHelpForDesign, setWarDrawHelpForDesign] = useState(false);
  const [warResult, setWarResult] = useState("");
  const [attackerBeforeWar, setAttackerBeforeWar] = useState({});
  const [defenderBeforeWar, setDefenderBeforeWar] = useState({});
  const [isChooseWeapon, setIsChooseWeapon] = useState(false);
  const [leaveModal, setLeaveModal] = useState(false);
  const [winner, setWinner] = useState({});
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [gameIsFullMsg, setGameIsFullMsg] = useState(false);
  const [gameNameExistsMsg, setGameNameExistsMsg] = useState(false);
  const [playerNameExistsMsg, setPlayerNameExistsMsg] = useState(false);

  const {
    playSound,
    playWarSound,
    pauseBattleSound,
    stopWarSound,
    playBattleSound,
  } = useContext(AudioContext);
  const warModalTimeout = useRef();

  useEffect(() => {
    const trackingId = "UA-184859803-1"; // Replace with your Google Analytics tracking ID
    ReactGA.initialize(trackingId);
    ReactGA.pageview(window.location.pathname);
  }, []);
  useEffect(() => {
    // if (page !== "Lobby") playSound();
  }, [page]);

  useEffect(() => {
    const game = games.find((g) => g.id === gameId);

    if (!game) {
      setGame({
        board: [],
      });
    } else {
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
      setGameId(null);
      setColor("");
      setPage(PAGE_LOBBY);

      alert("The server crashed or restarted");
    });

    socket.on("games", (games) => {
      setGames(games);
    });

    socket.on("your-game-created", (gameId) => {
      setGameId(gameId);
      setPage(PAGE_GAME);
    });

    socket.on("color", (color) => {
      setColor(color);
      setPage(PAGE_GAME);
    });

    socket.on("game-start", () => {
      setGameStartAfterFlagsAndTraps(true);
    });

    socket.on("move-soldier-result", ({ result, attacker, defender }) => {
      if (
        result !== "empty" &&
        result !== "draw" &&
        result !== "trap" &&
        result !== "winner"
      ) {
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
        setWarDraw(true);
        setTimeout(() => {
          setWarDrawHelpForDesign(true);
        }, 5000);
        setWar(false);

        setWarResult(result);

        setAttackerBeforeWar(attacker);
        setDefenderBeforeWar(defender);
        setDirection("");
      } else if (result === "winner") {
        setWinner(attacker);
        // setIsGameFinished(true);

        return;
      } else if (result === "trap") {
        return;
      } else {
        checkDirection(attacker.index, defender.index);
        setWarDraw(false);
        setWar(false);
        // setWarDrawHelpForDesign(false);
      }

      // setWarDetails({ result, attacker, defender });
      // setShowModal(true);
    });

    socket.on("winner", (winner) => {
      setWinner(winner);
    });
    socket.on("end-game", () => {
      setGameId(null);
      setColor("");
      setPage(PAGE_LOBBY);
      openLeaveModal(true);
      setWinner({});
      // setShowModal(true);
      // setModalText('Your opponent has left the game');
      // setModalTitle('Game Over');
    });

    socket.on("choises-after-draw", ({ warArr, turn, gameId }) => {
      const red = warArr.find((item) => item.color === "red");
      red.player.weapon = red.weapon;
      const blue = warArr.find((item) => item.color === "blue");
      blue.player.weapon = blue.weapon;
      setWarDraw(false);

      if (turn === "red") {
        moveSoldierAfterDraw(blue.player, red.player, gameId);
      } else {
        moveSoldierAfterDraw(red.player, blue.player, gameId);
      }
    });
  }, []);

  const createGame = (gameName, playerName) => {
    socket.emit("create-game", { gameName, playerName }, (errorMsg) => {
      setGameNameExistsMsg(true);
    });
  };

  const joinGame = (gameId, playerName) => {
    const game = games.find((g) => g.id === gameId);
    if (game.newPlayers.length > 2) {
      alert("Error");
      return;
    }
    socket.emit("join-game", { gameId, playerName }, (msg) => {
      if (!msg) {
        setGameId(gameId);
      } else if (msg === "name") {
        console.log("YESSSSSSSSSSSSSSSSSSSSSSSSS");
        console.log("YESSSSSSSSSSSSSSSSSSSSSSSSS");
        console.log("YESSSSSSSSSSSSSSSSSSSSSSSSS");
        console.log("YESSSSSSSSSSSSSSSSSSSSSSSSS");
        setPlayerNameExistsMsg(true);
      } else {
        setGameIsFullMsg(true);
      }
    });
  };

  const leaveGame = () => {
    // setGame(PAGE_LOBBY);
    setPage(PAGE_LOBBY);
    setGame({});
    setGameId(null);
    setGameStartAfterFlagsAndTraps(false);
    setWinner({});

    socket.emit("leave-game");
  };

  const chooseFlag = (cellId) => {
    socket.emit("choose-flag", { cellId, gameId });
  };

  const chooseTrap = (cellId) => {
    socket.emit("choose-trap", { cellId, gameId });
  };

  const handleAttack = (soldier) => {
    setAttackSoldier(soldier);
  };

  const moveSoldier = (cellToAttack, player) => {
    if (
      game.board[attackSoldier.index].color !==
        game.board[cellToAttack.index].color &&
      game.board[cellToAttack.index].color !== "grey"
    ) {
      // playWarSound();
    } else {
      checkDirection(attackSoldier.index, cellToAttack.index);
    }
    setWar(false);
    // setWarDrawHelpForDesign(false);
    setWarDraw(false);
    setWarResult("");
    setAttackerBeforeWar({});
    setDefenderBeforeWar({});
    setIsChooseWeapon(false);
    let type = "war";

    socket.emit("move-soldier", {
      player,
      attackSoldier,
      cellToAttack,
      type,
      gameId,
    });

    if (attackSoldier.weapon !== cellToAttack.weapon) {
      setAttackSoldier();
    }
  };

  const moveSoldierAfterDraw = (attackSoldier, cellToAttack, gameId) => {
    let type = "warDraw";

    socket.emit("move-soldier", {
      attackSoldier,
      cellToAttack,
      type,
      gameId,
    });
    setWarDraw(false);
    setWar(false);
    // setWarDrawHelpForDesign(false);
    setWarResult("");
    setAttackerBeforeWar({});
    setDefenderBeforeWar({});
    setIsChooseWeapon(false);
  };

  const checkDirection = (attackerIndex, defenderIndex) => {
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
    // setWarDrawHelpForDesign(false);
    setWarDrawHelpForDesign(false);
    setWarResult("");
    setAttackerBeforeWar("");
    setDefenderBeforeWar("");
  };
  const sendMessage = (message) => {
    socket.emit("chat-message", message);
  };

  const chooseWeaponDrawWar = (weapon, player) => {
    setIsChooseWeapon(true);
    socket.emit("choose-weapon", { weapon, color, player });
  };

  const closeLeaveModal = () => setLeaveModal(false);
  const openLeaveModal = () => {
    setLeaveModal(true);
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
        <>
          <Modal
            type="leave"
            show={leaveModal}
            closeLeaveModal={closeLeaveModal}
          />
          <Lobby
            games={games}
            joinGame={joinGame}
            setPage={setPage}
            showOnSoundIcon={showOnSoundIcon}
          />
        </>
      )}
      {page === PAGE_CREATE_NEW_GAME && (
        <CreateNewGame
          createGame={createGame}
          setPage={setPage}
          gameNameExistsMsg={gameNameExistsMsg}
          setGameNameExistsMsg={setGameNameExistsMsg}
        />
      )}
      {page === PAGE_JOIN_GAME && (
        <JoinGame
          games={games}
          joinGame={joinGame}
          setPage={setPage}
          gameIsFullMsg={gameIsFullMsg}
          setGameIsFullMsg={setGameIsFullMsg}
          playerNameExistsMsg={playerNameExistsMsg}
          setPlayerNameExistsMsg={setPlayerNameExistsMsg}
        />
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
          warDrawHelpForDesign={warDrawHelpForDesign}
          attackerBeforeWar={attackerBeforeWar}
          defenderBeforeWar={defenderBeforeWar}
          closeModal={closeModal}
          chooseWeaponDrawWar={chooseWeaponDrawWar}
          isChooseWeapon={isChooseWeapon}
          openLeaveModal={openLeaveModal}
          setPage={setPage}
          winner={winner}
        />
      )}
      {page === PAGE_RULES && <Rules setPage={setPage} />}

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
