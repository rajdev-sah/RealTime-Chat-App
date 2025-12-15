import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";

import path from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { app,server } from "./lib/socket.js";
import { Server } from "socket.io";


dotenv.config();


const PORT = process.env.PORT || 5001;



// ✅ 1. CORS FIRST
app.use(cors({
  origin: "http://localhost:4000",
  credentials: true,
  
}));

// ✅ 2. Then JSON + cookies
app.use(express.json());
app.use(cookieParser());





// ✅ 3. Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.json(__dirname, "../frontend/dist")))


  app.get("*", (req,res) => {
    res.sendFile(path.json(__dirname, "../frontend", "dist", "index.html"));
  })
}

// ✅ 4. Start server
server.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
  connectDB();
});
