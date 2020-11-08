const { addChatMessage } = require("../gameManager");
const sendGames = require("../helpers/sendGames");

module.exports = ({ io, socket }) => (message) => {
  addChatMessage({ player: socket.id, message });
  sendGames(io);
};
