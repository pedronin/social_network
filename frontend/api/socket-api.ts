import io, { Socket } from "socket.io-client";

export default class SocketApi {
  static socket: null | Socket = null;

  static createConnection(chatId: string) {
    this.socket = io("http://localhost:5555");

    this.socket.on("connect", () => {
      // console.log("connected");
    });

    this.socket.on("disconnect", (e) => {
      // console.log("disconnected");
    });
  }
}
