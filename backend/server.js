import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"; // Corrected spelling of messageRoutes
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";


const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // Middleware for parsing JSON payloads from req.body
app.use(cookieParser()); // Middleware for parsing cookies
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/messages", messageRoutes); // Corrected spelling of messageRoutes

server.listen(PORT, () => {
  connectToMongoDB(); // Connect to MongoDB on server start
  console.log(`Server running on port ${PORT}`);
});
