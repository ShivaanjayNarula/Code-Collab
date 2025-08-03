// WS Server Setup
import { Server } from "socket.io";

const PORT = process.env.PORT || 4001;
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:4000";

const io = new Server(PORT, {
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },
  pingTimeout: 30000000,
});

io.on("connection", (socket) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`New connection`);
  }

  // handle room-join
  socket.on("join-room", async (message) => {
    if (process.env.NODE_ENV !== "production") {
      console.log(
        `${socket.id} joined collab ${message.collabId} with username ${message.user}`
      );
    }
    socket.join(message.collabId);
    // broadcast new user joining
    socket.broadcast.to(message.collabId).emit("user-joined", message.user);

    // make a fetch request to update in the db
    try {
      await fetch(`${API_BASE_URL}/collab/activeHook`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUser: message.user,
          collabId: message.collabId,
        }),
      });
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error("crashed 32", e);
      }
    }

    socket.on("send-code-change", (codeChange) => {
      socket.broadcast
        .to(message.collabId)
        .emit("receive-code-change", codeChange);
      if (process.env.NODE_ENV !== "production") {
        console.log(`${codeChange.user} wrote: ${codeChange.code}`);
      }
    });

    socket.on("send-left-room", async (userLeft) => {
      if (process.env.NODE_ENV !== "production") {
        console.log(`${userLeft} left the room`);
      }

      socket.broadcast.to(message.collabId).emit("receive-left-room", userLeft);

      // fetch to update in db
      try {
        await fetch(`${API_BASE_URL}/collab/leftHook`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userLeft: userLeft,
            collabId: message.collabId,
          }),
        });
      } catch (e) {
        if (process.env.NODE_ENV !== "production") {
          console.error("crashed 62", e);
        }
      }
    });

    socket.on("lang-change", async (changedLang, changedByUser) => {
      if (process.env.NODE_ENV !== "production") {
        console.log(`${changedByUser} changed language to ${changedLang}`);
      }

      socket.broadcast
        .to(message.collabId)
        .emit("lang-change", changedLang, changedByUser);
    });
  });
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
