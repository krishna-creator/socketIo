const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const port = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("chat", (msg) => {
    socket.broadcast.emit("recieved", msg);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
server.listen(port, () => {
  console.log("server running at", port);
});
