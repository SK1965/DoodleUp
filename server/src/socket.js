const Room = require("./models/Room");
const Drawing = require("./models/Drawing");

const socket = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 Socket connected: ${socket.id}`);
   
    socket.emmit("connected", {message : "welcome you are connected with ID " + socket.id});

    return socket;
  });
};

module.exports = { socket };

// Create room
