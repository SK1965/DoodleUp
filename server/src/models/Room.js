const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  password: { type: String },
  createdAt: { type: Date, default: Date.now, expires: 604801 } // 7 days = 60*60*24*7
});

module.exports = mongoose.model("Room", RoomSchema);
