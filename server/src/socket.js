const Room = require("./models/Room");
const Drawing = require("./models/Drawing");

const handleSocketEvents = (io) => {
  io.on("connection", (socket) => {
    console.log(`🟢 Socket connected: ${socket.id}`);

    // Create room
    socket.on("create-room", async ({ roomId, password }) => {
      try {
        const exists = await Room.findOne({ roomId });
        if (exists) {
          socket.emit("room-error", { message: "Room already exists" });
        } else {
          const newRoom = new Room({ roomId, password });
          await newRoom.save();
          socket.join(roomId);
          socket.emit("room-created", { roomId });
          console.log(`✅ Room created: ${roomId}`);
        }
      } catch (err) {
        socket.emit("room-error", { message: "Error creating room" });
      }
    });

    // Join room
    socket.on("join-room", async ({ roomId, password }) => {
        try {
            let room = await Room.findOne({ roomId });

            // Create if not exists
            if (!room) {
            room = new Room({ roomId, password });
            await room.save();
            console.log(`🆕 Room created: ${roomId}`);
            }

            // Check password match
            socket.join(roomId);
            socket.emit("room-joined", { roomId });
            console.log(`✅ ${socket.id} joined room ${roomId}`);

            // Send history if available
            const drawing = await Drawing.findOne({ room: room._id });
            if (drawing && drawing.strokes.length > 0) {
            socket.emit("drawing-history", drawing.strokes);
            }

        } catch (err) {
            console.error("❌ join-room error:", err.message);
            socket.emit("room-error", { message: "Server error joining room" });
        }
    });


    // Drawing sync
    socket.on("drawing", async ({ roomId, data }) => {
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
            console.error("Error saving drawing:", err.message);
        }
    });


    // Disconnect
    socket.on("disconnect", () => {
      console.log(`🔴 Socket disconnected: ${socket.id}`);
    });
  });
};

module.exports = { handleSocketEvents };
