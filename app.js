import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000/", "http://127.0.0.1:5555", "http://localhost"],
        credentials: true,
    },
});

let userOnline = 0;

io.on("connection", function (socket) {
    socket.on("join", (param) => {
        console.log(`user joined`);
        userOnline++;
        io.emit("userOnline", userOnline);
    });

    socket.on("message", (param) => {
        console.log(`message: ${param}`);
        io.emit("message", param);
    });

    socket.on("disconnect", (param) => {
        console.log(`user disconnected`);
        userOnline--;
        io.emit("userOnline", userOnline);
    });
});

httpServer.listen(3000);
