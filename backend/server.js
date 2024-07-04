import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js"; // Corrected spelling of messageRoutes
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); // Middleware for parsing JSON payloads from req.body
app.use(cookieParser()); // Middleware for parsing cookies

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes); // Corrected spelling of messageRoutes
app.use("/api/users", userRoutes);

// Root route
// app.get("/", (req, res) => {
//   res.send("Hello World!!");
// });

app.listen(PORT, () => {
  connectToMongoDB(); // Connect to MongoDB on server start
  console.log(`Server running on port ${PORT}`);
});
