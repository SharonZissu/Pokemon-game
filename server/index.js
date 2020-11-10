const express = require("express");
const app = express();
const socketio = require("socket.io");
const cors = require("cors");
const PORT = process.env.PORT || 5000;

const expressServer = app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
const io = socketio(expressServer);

const onDisconnectFactory = require("./handlers/onDisconnect");
const createGameFactory = require("./handlers/createGameFactory");
const joinGameFactory = require("./handlers/joinGameFactory");
const leaveGameFactory = require("./handlers/leaveGameFactory");
const chooseFlagFactory = require("./handlers/chooseFlagFactory");
const chooseTrapFactory = require("./handlers/chooseTrapFactory");
const moveSoldierFactory = require("./handlers/moveSoldierFactory");
const chatMessageFactory = require("./handlers/chatMessageFactory");
const chooseWeaponFactory = require("./handlers/chooseWeaponFactory");
const sendGames = require("./helpers/sendGames");

app.use(cors());
io.on("connection", (socket) => {
  sendGames(socket);
  console.log("socket" + socket.id + "is enter the web");
  socket.on("disconnect", onDisconnectFactory({ io, socket }));
  socket.on("create-game", createGameFactory({ io, socket }));
  socket.on("join-game", joinGameFactory({ io, socket }));
  socket.on("leave-game", leaveGameFactory({ socket, io }));
  socket.on("choose-flag", chooseFlagFactory({ io, socket }));
  socket.on("choose-trap", chooseTrapFactory({ io, socket }));
  socket.on("move-soldier", moveSoldierFactory({ io, socket }));
  socket.on("chat-message", chatMessageFactory({ io, socket }));
  socket.on("choose-weapon", chooseWeaponFactory({ io, socket }));
  // socket.on("disconnect", onDisconnectFactory({ io, socket }));
});
