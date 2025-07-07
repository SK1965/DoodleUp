const { createRoom, joinRoom, drawing } = require("../controllers/drawControllers");

const drawSocket = (socket, io) => {
  socket.on("create-room", (data) => createRoom(socket, data));
  socket.on("join-room", (data) => joinRoom(socket, data));
  socket.on("drawing", (data) => drawing(socket, data));
};

module.exports = drawSocket;
