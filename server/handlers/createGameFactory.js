const { createGame } = require("../gameManager");
const sendGames = require("../helpers/sendGames");

module.exports = ({ io, socket }) => ({ gameName, playerName }) => {
  const game = createGame({ player: socket, gameName, playerName });
  socket.join(game.gameName);
  sendGames(io);
  socket.emit("your-game-created", game.id);
  socket.emit("color", "red");
};

// const { createGame } = require("../gameManager");
// const sendGames = require("../helpers/sendGames");

// module.exports = ({ io, socket }) => ({ gameName, playerName }) => {
//   const game = createGame({ player: socket, gameName, playerName });
//   sendGames(io);
//   socket.emit("your-game-created", game.id);
//   socket.emit("color", "red");
// };
