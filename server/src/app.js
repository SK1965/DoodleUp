const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { handleSocketEvents } = require("./socket");

const startServer = (port) => {
  const app = express();
  const server = http.createServer(app);

  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // frontend URL
      methods: ["GET", "POST"]
    }
  });

  app.use(cors());
  app.use(express.json());

  // Handle all socket events
  handleSocketEvents(io);

  server.listen(port, () => {
    console.log(`🚀 Server running on http://localhost:${port}`);
  });
};

module.exports = { startServer };
