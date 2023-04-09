const express = require("express");
const { connection } = require("./Configs/db");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const cors = require("cors");
const server = http.createServer(app);

app.options("*", cors());
app.use(cors({ origin: "*" }));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("connection", socket.id);

  socket.on("hello", (data) => {
    // console.log(data);
    // socket.broadcast.emit("received", data);
  });

  socket.on("playerScore1", (data) => {
    console.log("player1", data);
    socket.broadcast.emit("updatedPlayer1Score", data);
  });

  socket.on("playerScore2", (data) => {
    console.log("player2", data);
    socket.broadcast.emit("updatedPlayer2Score", data);
  });

  socket.on("currentplayerstatus", (data) => {
    console.log("playerstatus", data);

    socket.broadcast.emit("currentPlayerStatuschanged", data);
  });

  socket.on("arrayChanged", (data) => {
    // console.log(data)

    socket.broadcast.emit("getArray", data);
  });
  socket.on("disconnect", () => console.log("connection closed", socket.id));
});

//socket.io.connect

server.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("Connected to Database");
  } catch (error) {
    console.log(error.message);
  }
  console.log(`Port runnning on ${process.env.PORT}`);
});
