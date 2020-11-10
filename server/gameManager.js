const moveSoldier = require("./moveSoldier");

let nextGameId = 0;
let games = [];
let warDrawArr = [];
let weapons = [
  "rock",
  "rock",
  "rock",
  "rock",
  "paper",
  "paper",
  "paper",
  "paper",
  "scissors",
  "scissors",
  "scissors",
  "scissors",
];

function shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

const getGameForPlayer = (player) => {
  return games.find((g) => g.players.find((p) => p.socketId === player.id));
};

const getGameForPlayerBySocketId = (socketId) => {
  return games.find((g) => g.players.find((p) => p.socketId === socketId));
};

exports.createBoard = () => {
  let board = [];
  for (let i = 0; i < 14; i++) {
    board[i] = {
      weapon: null,
      player: "red",
      color: "red",
      exposed: false,
    };
  }
  for (let i = 14; i < 28; i++) {
    board[i] = {
      weapon: null,
      player: null,
      color: "grey",
      exposed: false,
    };
  }
  for (let i = 28; i < 42; i++) {
    board[i] = {
      weapon: null,
      player: "blue",
      color: "blue",
      exposed: false,
    };
  }
  return board;
};

exports.getGames = () =>
  games.map((g) => {
    const { players, ...game } = g;
    const newPlayers = players.map((p) => {
      return {
        socketId: p.id,
        color: p.color,
        name: p.name,
      };
    });
    return {
      ...game,
      newPlayers,
      numberOfPlayers: players.length,
    };
  });

exports.createGame = ({ player, gameName, playerName }) => {
  const game = {
    gameName,
    turn: "red",
    players: [
      {
        socket: player,
        socketId: player.id,
        color: "red",
        name: playerName,
      },
    ],
    chat: [],
    id: nextGameId++,
    board: this.createBoard(),
  };
  games.push(game);
  return game;
};

exports.endGame = ({ player, winner }) => {
  const game = getGameForPlayer(player);
  // players might disconnect while in the lobby
  // console.log("PLAYERRR:", player);
  if (!game) return;
  console.log("BEFOREEE SPLICEEE");
  games.splice(games.indexOf(game), 1);
  game.players.forEach((currentPlayer) => {
    if (player !== currentPlayer.socket) {
      currentPlayer.socket.emit("end-game");
    }
    if (winner) currentPlayer.socket.emit("winner", winner);
  });
};

exports.getGameById = (gameId) =>
  exports.getGames().find((g) => g.id === gameId);

exports.addPlayerToGame = ({ player, gameId, playerName }) => {
  const game = games.find((g) => g.id === gameId);

  game.players.push({
    color: "blue",
    socket: player,
    socketId: player.id,
    name: playerName,
  });

  return "blue";
};

exports.updateBoardForFlag = (cellId, gameId) => {
  const game = this.getGameById(gameId);
  game.board[cellId].weapon = "flag";
};

exports.updateBoardForTrap = (cellId, gameId) => {
  const game = this.getGameById(gameId);
  game.board[cellId].weapon = "trap";
};

exports.checkIfStartGame = (gameId) => {
  const game = this.getGameById(gameId);
  let flagsCount = 0;
  let trapsCount = 0;
  game.board.forEach((cell) => {
    if (cell.weapon === "flag") flagsCount++;
    if (cell.weapon === "trap") trapsCount++;
  });
  if (flagsCount === 2 && trapsCount === 2) return true;
  return false;
};

exports.updateBoardForStart = (gameId) => {
  const game = games.find((g) => g.id === gameId);

  const redPlayer = game.players[0].socketId;
  const bluePlayer = game.players[1].socketId;
  shuffle(weapons);
  let weaponsI = 0;
  for (let i = 0; i < 14; i++) {
    if (game.board[i].weapon !== "flag" && game.board[i].weapon !== "trap") {
      game.board[i] = {
        ...game.board[i],
        weapon: weapons[weaponsI],
        player: redPlayer,
      };
      weaponsI++;
    } else if (game.board[i].weapon === "flag") {
      game.board[i] = {
        ...game.board[i],
        weapon: "flag",
        player: redPlayer,
      };
    } else if (game.board[i].weapon === "trap") {
      game.board[i] = {
        ...game.board[i],
        weapon: "trap",
        player: redPlayer,
      };
    }
  }
  shuffle(weapons);
  weaponsI = 0;
  for (let i = 28; i < 42; i++) {
    if (game.board[i].weapon !== "flag" && game.board[i].weapon !== "trap") {
      game.board[i] = {
        ...game.board[i],
        weapon: weapons[weaponsI],
        player: bluePlayer,
      };
      weaponsI++;
    } else if (game.board[i].weapon === "flag") {
      game.board[i] = {
        ...game.board[i],
        weapon: "flag",
        player: bluePlayer,
      };
    } else if (game.board[i].weapon === "trap") {
      game.board[i] = {
        ...game.board[i],
        weapon: "trap",
        player: bluePlayer,
      };
    }
  }
};

exports.moveSoldier = ({ attackSoldier, cellToAttack, type }) => {
  const game = getGameForPlayerBySocketId(attackSoldier.player);
  return moveSoldier({ game, attackSoldier, cellToAttack, type });
};

exports.addChatMessage = ({ player, message }) => {
  const game = getGameForPlayerBySocketId(player);
  game.chat.push(message);
};

exports.updateWarArr = ({ weapon, color, player }) => {
  console.log(weapon);
  console.log(color);
  console.log("PLAYERRR", player);
  const game = getGameForPlayerBySocketId(player.player);

  warDrawArr.push({
    weapon,
    color,
    player,
  });
  console.log("WARDRAWAEE:", warDrawArr);
  if (warDrawArr.length === 2) {
    return [true, game.turn];
  }
  return [false, game.turn];
};

exports.getWarArr = () => {
  return warDrawArr;
};

exports.clearWarArr = () => {
  warDrawArr = [];
};
