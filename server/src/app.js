// app.js
const http = require("http");
const express = require("express");
const cors = require("cors");
const { setupSocket } = require("./sockets");

const startServer = (PORT) => {
  const app = express();
  const server = http.createServer(app);

  const io = require("socket.io")(server, {
    cors: {
      origin: process.env.CORS_ORIGIN || "*",
      methods: ["GET", "POST"]
    }
  });

  app.use(cors());
  app.use(express.json());

  setupSocket(io); // Attach all socket event listeners

  server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

module.exports = { startServer };
