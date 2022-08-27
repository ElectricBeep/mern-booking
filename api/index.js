import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

dotenv.config();

mongoose.connect(process.env.MONGO_URL, () => {
    console.log("Connected to MONGODB");
});
mongoose.connection.on("disconnected", () => {
    console.log("Disconnected from MONGODB");
});

//MIDDLEWARES
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    });
});

app.get("/", (req, res) => {
    res.send("APP IS RUNNING");
});

app.listen(process.env.PORT || 8800, () => {
    console.log("Connected to backend!");
});