const { getGameById, addPlayerToGame } = require("../gameManager");
const sendGames = require("../helpers/sendGames");

module.exports = ({ io, socket }) => ({ gameId, playerName }) => {
  const game = getGameById(gameId);
  if (game.numberOfPlayers < 2) {
    const color = addPlayerToGame({
      player: socket,
      gameId,
      playerName,
    });
    sendGames(io);
    socket.emit("color", color);
  }
  // sendGames(io);
};
