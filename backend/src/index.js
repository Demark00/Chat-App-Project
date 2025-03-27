import express from "express";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser"; // Ensure body-parser is imported
import { app, server } from "./lib/socket.js";
import path from "path";

dotenv.config(); // Load environment
const PORT = process.env.PORT || 8000;
const __dirname = path.resolve();
app.use(express.json({ limit: '20mb' }));

// Increase the limit to 5MB (adjust as needed)
// app.use(bodyParser.json({ limit: '10mb' }));
// app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    connectDB();
});