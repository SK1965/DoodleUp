const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGO_URI)
.then(() => {
  console.log("✅ MongoDB connected");
  // Load app.js only after DB is connected
  const { startServer } = require("./src/app");
  startServer(PORT);
})
.catch((err) => {
  console.error("❌ MongoDB connection failed:", err.message);
  process.exit(1); // Exit if DB connection fails
});
