const { updateWarArr, getWarArr, clearWarArr } = require("../gameManager");
const sendGames = require("../helpers/sendGames");

module.exports = ({ io, socket }) => ({ weapon, color, player }) => {
  const [check, turn] = updateWarArr({ weapon, color, player });
  if (check) {
    const warArr = getWarArr();
    io.emit("choises-after-draw", { warArr, turn });
    clearWarArr();
  }
};
