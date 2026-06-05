const express = require("express");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

app.get("/", (req, res) => {
  res.send("Socket server is running");
});

// Laravel ghadi y3ayet hna
app.post("/emit", (req, res) => {
  console.log("Laravel event received:", req.body);

  const { event, data } = req.body;

  io.emit(event, data);

  return res.json({
    success: true,
    message: "Event emitted",
    event,
    data,
  });
});

const PORT = process.env.PORT || 8300;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Socket.IO server running on port ${PORT}`);
});
