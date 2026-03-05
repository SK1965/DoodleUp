const { createRoom, joinRoom, drawing, clearRoom } = require("../controllers/drawControllers");

const drawSocket = (socket, io) => {
  socket.on("create-room", (data) => createRoom(socket, data));
  socket.on("join-room", (data) => joinRoom(socket, data));
  socket.on("drawing", (data) => drawing(socket, data));
  socket.on("clear-room", (data) => clearRoom(socket, data, io));
};

module.exports = drawSocket;
