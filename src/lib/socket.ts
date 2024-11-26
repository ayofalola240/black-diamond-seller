import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const initializeSocket = (): Socket => {
  if (!process.env.NEXT_PUBLIC_Backend_URL) {
    throw new Error("NEXT_PUBLIC_Backend_URL is not defined in environment variables.");
  }

  if (!socket) {
    try {
      socket = io(process.env.NEXT_PUBLIC_Backend_URL, {
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("Connected to the socket server:", socket?.id);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from the socket server");
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
      });
    } catch (error) {
      console.error("Failed to initialize socket:", error);
      throw error;
    }
  }

  return socket;
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket connection has not been initialized. Call initializeSocket first.");
  }
  return socket;
};
