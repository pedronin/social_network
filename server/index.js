import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";

import {
  loginValidation,
  registerValidation,
  postCreateValidation,
  commentCreateValidation,
} from "./validations.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";
import { UserController, ChatMessagesController } from "./controllers/index.js";

mongoose
  .connect(
    "mongodb+srv://admin:Plumbum333@cluster0.eu0ww6u.mongodb.net/social?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

// даем понять что такое json
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("www Hello Pedronin");
});

app.post("/auth/login", handleValidationErrors, UserController.login);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.getMe);

app.post("/auth/chats/create", UserController.createChat);
app.get("/auth/chats/:userId", UserController.getChatByUser);
app.post("/auth/network/:userId", UserController.toggleOnline);
app.get("/auth/users/:fullName", UserController.findUser);

app.post("/chat/create", ChatMessagesController.createChat);
app.post("/chat/message", ChatMessagesController.addMessage);
app.delete("/chat/messages/:chatId", ChatMessagesController.deleteMessage);
app.get("/chat/messages/:chatId", ChatMessagesController.getAll);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Bce ok");
});

//
//
//
//

import { WebSocketServer } from "ws";

const wss = new WebSocketServer(
  {
    port: 8080,
  },
  () => console.log(`WebSocketServer started on 8080`)
);

wss.on("connection", function connection(ws) {
  ws.on("message", function (msg) {
    msg = JSON.parse(msg);
    switch (msg.method) {
      case "connection":
        connectionHandler(ws, msg);
        break;
      case "message":
        broadcastConnection(ws, msg);
        break;
    }
  });
});

const connectionHandler = (ws, msg) => {
  ws.id = msg.id;
  broadcastConnection(ws, msg);
};

const broadcastConnection = (ws, msg) => {
  wss.clients.forEach((client) => {
    if (client.id === msg.id) {
      client.send(JSON.stringify(msg));
    }
  });
};
