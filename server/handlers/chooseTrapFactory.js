const {
  updateBoardForTrap,
  checkIfStartGame,
  updateBoardForStart,
  getGameById,
} = require("../gameManager");
const sendGames = require("../helpers/sendGames");

module.exports = ({ io, socket }) => ({ cellId, gameId }) => {
  updateBoardForTrap(cellId, gameId);
  const isGameStart = checkIfStartGame(gameId);
  if (isGameStart) {
    updateBoardForStart(gameId);
    const game = getGameById(gameId);
    io.in(game.gameName).emit("game-start");
  }
  sendGames(io);
};

// const {
//   updateBoardForTrap,
//   checkIfStartGame,
//   updateBoardForStart,
// } = require("../gameManager");
// const sendGames = require("../helpers/sendGames");

// module.exports = ({ io, socket }) => ({ cellId, gameId }) => {
//   updateBoardForTrap(cellId, gameId);
//   const isGameStart = checkIfStartGame(gameId);
//   if (isGameStart) {
//     updateBoardForStart(gameId);
//     io.emit("game-start");
//   }
//   sendGames(io);
// };
