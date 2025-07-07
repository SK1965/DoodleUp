const drawSocket = require("./drawSocket");

const setupSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 New socket: ${socket.id}`);

    // You can namespace or modularize features
    drawSocket(socket, io);

    socket.on("disconnect", () => {
      console.log(`🔴 Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = { setupSocket };
