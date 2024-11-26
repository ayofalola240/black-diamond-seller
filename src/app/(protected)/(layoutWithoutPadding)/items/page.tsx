import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;
let retryAttempts = 0; // Track retry attempts
const maxRetries = 5; // Maximum number of retry attempts
const retryInterval = 5000; // Retry interval in milliseconds

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
        retryAttempts = 0; // Reset retry attempts on successful connection
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from the socket server");
        attemptReconnect();
      });

      socket.on("connect_error", (error) => {
        console.error("Socket connection error:", error.message);
        attemptReconnect();
      });
    } catch (error) {
      console.error("Failed to initialize socket:", error);
      throw error;
    }
  }

  return socket;
};

const attemptReconnect = () => {
  if (retryAttempts < maxRetries) {
    retryAttempts++;
    console.log(`Retrying to connect... Attempt ${retryAttempts} of ${maxRetries}`);
    setTimeout(() => {
      if (socket && !socket.connected) {
        socket.connect();
      }
    }, retryInterval);
  } else {
    console.error("Max retry attempts reached. Could not reconnect to the socket server.");
  }
};

export const getSocket = (): Socket => {
  if (!socket) {
    throw new Error("Socket connection has not been initialized. Call initializeSocket first.");
  }
  return socket;
};
