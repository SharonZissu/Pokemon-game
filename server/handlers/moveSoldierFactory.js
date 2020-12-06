const {
  moveSoldier,
  isGameOver,
  endGame,
  getGameById,
  getGameForPlayerBySocketId,
  checkIfNoSoldiers,
} = require("../gameManager");
const sendGames = require("../helpers/sendGames");

module.exports = ({ io, socket }) => ({
  attackSoldier,
  cellToAttack,
  type,
  gameId,
}) => {
  const result = moveSoldier({
    attackSoldier,
    cellToAttack,
    type,
  });
  // console.log("GAME-ID GAME-ID:", gameId);
  const game = getGameById(gameId);
  // console.log("GAME GAME:", game);
  // console.log("GAME-NAME GAME-NAME:", game.gameName);

  io.in(game.gameName).emit("move-soldier-result", {
    result,
    attacker: attackSoldier,
    defender: cellToAttack,
  });
  const gameAfterMoving = getGameById(gameId);

  checkIfNoSoldiers(gameAfterMoving, attackSoldier, cellToAttack);

  // const winner = isGameOver({ player: socket });
  // if (winner !== false) {
  //   endGame({ player: socket, winner });
  // }
  //   console.log("logggggggggggggggggggg", getGameById(gameId));
  sendGames(io);
};

// const {
//   moveSoldier,
//   isGameOver,
//   endGame,
//   getGameById,
// } = require("../gameManager");
// const sendGames = require("../helpers/sendGames");

// module.exports = ({ io, socket }) => ({
//   player,
//   attackSoldier,
//   cellToAttack,
//   type,
// }) => {
//   const result = moveSoldier({
//     player,
//     attackSoldier,
//     cellToAttack,
//     type,
//   });
//   io.emit("move-soldier-result", {
//     result,
//     attacker: attackSoldier,
//     defender: cellToAttack,
//   });
//   // const winner = isGameOver({ player: socket });
//   // if (winner !== false) {
//   //   endGame({ player: socket, winner });
//   // }
//   //   console.log("logggggggggggggggggggg", getGameById(gameId));
//   sendGames(io);
// };
