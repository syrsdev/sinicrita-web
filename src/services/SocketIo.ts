// src/services/socketIo.ts
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initSocket = (userId: number) => {
  if (!socket) {
    socket = io("http://localhost:8081", {
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      console.log("WebSocket connected");
      socket?.emit("register", userId);
    });

    socket.on("disconnect", () => {
      console.log("WebSocket disconnected");
    });
  }
  return socket;
};

export const getSocket = () => socket;
