const mongoose = require("mongoose");

const StrokeSchema = new mongoose.Schema({
  x0: Number, y0: Number, x1: Number, y1: Number, color: String, size: Number, mode: String
}, { _id: false });

const DrawingSchema = new mongoose.Schema({
  room: { type: String, required: true },
  strokes: [StrokeSchema],
  createdAt: { type: Date, default: Date.now, expires: 604800 }
});

module.exports = mongoose.model("Drawing", DrawingSchema);
