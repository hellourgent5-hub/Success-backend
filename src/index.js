import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Load environment variables
dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not set in environment variables!");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });

// Health check route
app.get("/api/health", (req, res) => {
  res.json({
    status: "success",
    message: "✅ Success Backend is Live — MongoDB Connected!",
  });
});

// Example base route
app.get("/", (req, res) => {
  res.send("🚀 Welcome to Success Backend API");
});

// Start server
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
