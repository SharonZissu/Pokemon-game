const { getGameById, addPlayerToGame } = require("../gameManager");
const sendGames = require("../helpers/sendGames");

module.exports = ({ io, socket }) => ({ gameId, playerName }, cb) => {
  const game = getGameById(gameId);
  console.log("game", game);
  if (game.numberOfPlayers < 2) {
    console.log("numberOfPlayers < 2");
    // console.log("numberOfPlayers < 2");
    // console.log("numberOfPlayers < 2");
    console.log("gameId", gameId);
    console.log("playerName", playerName);
    const color = addPlayerToGame({
      player: socket,
      gameId,
      playerName,
    });

    socket.join(game.gameName);
    socket.emit("color", color);
    sendGames(io);
    cb();
    return;
  }
  cb("Game Is Full!");
  // sendGames(io);
};

// const { getGameById, addPlayerToGame } = require("../gameManager");
// const sendGames = require("../helpers/sendGames");

// module.exports = ({ io, socket }) => ({ gameId, playerName }) => {
//   const game = getGameById(gameId);
//   if (game.numberOfPlayers < 2) {
//     const color = addPlayerToGame({
//       player: socket,
//       gameId,
//       playerName,
//     });
//     sendGames(io);
//     socket.emit("color", color);
//   }
//   // sendGames(io);
// };
