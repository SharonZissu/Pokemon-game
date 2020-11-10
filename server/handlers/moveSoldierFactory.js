const {
  moveSoldier,
  isGameOver,
  endGame,
  getGameById,
} = require("../gameManager");
const sendGames = require("../helpers/sendGames");

module.exports = ({ io, socket }) => ({
  player,
  attackSoldier,
  cellToAttack,
  type,
}) => {
  const result = moveSoldier({
    player,
    attackSoldier,
    cellToAttack,
    type,
  });
  io.emit("move-soldier-result", {
    result,
    attacker: attackSoldier,
    defender: cellToAttack,
  });
  // const winner = isGameOver({ player: socket });
  // if (winner !== false) {
  //   endGame({ player: socket, winner });
  // }
  //   console.log("logggggggggggggggggggg", getGameById(gameId));
  sendGames(io);
};
