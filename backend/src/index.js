import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import { app, server } from "./lib/socket.js";
import { fileURLToPath } from "url";

dotenv.config();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5001;

// --------------------
// 1️⃣ CORS
// Use CLIENT_URL env for production
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:4000",
    credentials: true,
  })
);

// --------------------
// 2️⃣ Middlewares
app.use(express.json());
app.use(cookieParser());

// --------------------
// 3️⃣ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// --------------------
//// --------------------
// 4️⃣ Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../../frontend/dist");

  // Serve static files
  app.use(express.static(frontendPath));

  // React SPA fallback
  app.get(/.*/, (req, res) => {
    try {
      res.sendFile(path.join(frontendPath, "index.html"));
    } catch (err) {
      console.error("Error serving frontend:", err);
      res.status(500).send("Server error");
    }
  });
}


// --------------------
// 5️⃣ Start Server
server.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
  connectDB();
});
