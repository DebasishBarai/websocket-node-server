const express = require("express");
const http = require("http");
const webSocketServer = require("ws").WebSocketServer;

const app = express();

const port = process.env.PORT | 8000;

const server = http.createServer(app);

const wss = new webSocketServer({ server });

wss.on("connection", async (ws, req) => {
  ws.on("message", (message) => {
    console.log(`received: ${message}`);
    ws.send(`Hello, you sent -> ${message}`);
  });
});

app.get("/health", (req, res) => {
  res.json({
    msg: "I am healthy",
  });
});

server.listen(port);
