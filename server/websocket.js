import ws, { WebSocketServer } from "ws";

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
