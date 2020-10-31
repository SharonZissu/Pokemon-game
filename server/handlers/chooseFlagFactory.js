const { updateBoardForFlag } = require("../gameManager");
const sendGames = require("../helpers/sendGames");

module.exports = ({ io, socket }) => ({ cellId, gameId }) => {
  updateBoardForFlag(cellId, gameId);
  sendGames(io);
};
