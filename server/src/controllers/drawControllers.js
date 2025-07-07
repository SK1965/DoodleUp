const Room = require("../models/Room");
const Drawing = require("../models/Drawing");

const createRoom = async (socket, { roomId, password }) => {
  try {
    const exists = await Room.findOne({ roomId });
    if (exists) {
      return socket.emit("room-error", { message: "Room already exists" });
    }

    const newRoom = new Room({ roomId, password });
    await newRoom.save();

    socket.join(roomId);
    socket.emit("room-created", { roomId });
    console.log(`✅ Room created: ${roomId}`);
  } catch (err) {
    console.error("❌ Error creating room:", err.message);
    socket.emit("room-error", { message: "Server error" });
  }
};

const joinRoom = async (socket, { roomId, password }) => {
  try {
    let room = await Room.findOne({ roomId });

    if (!room) {
      room = new Room({ roomId, password });
      await room.save();
    }

    socket.join(roomId);
    socket.emit("room-joined", { roomId });
    console.log(`✅ ${socket.id} joined ${roomId}`);

    const drawing = await Drawing.findOne({ room: room._id });
    if (drawing?.strokes?.length) {
      socket.emit("drawing-history", drawing.strokes);
    }
  } catch (err) {
    console.error("❌ join-room error:", err.message);
    socket.emit("room-error", { message: "Join failed" });
  }
};

const drawing = async (socket, { roomId, data }) => {
  socket.to(roomId).emit("drawing", { data });

  try {
    const room = await Room.findOne({ roomId });
    if (!room) return;

    await Drawing.findOneAndUpdate(
      { room: room._id },
      { $push: { strokes: data } },
      { upsert: true }
    );
  } catch (err) {
    console.error("❌ Drawing save error:", err.message);
  }
};

module.exports = { createRoom, joinRoom, drawing };
