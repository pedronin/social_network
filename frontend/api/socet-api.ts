import io, { Socket } from "socket.io-client";

export default class SocketApi {
  static socket: null | Socket = null;

  static createConnection() {
    this.socket = io("http://localhost:5555/");
    console.log(this.socket);

    this.socket.on("connect", () => {
      console.log("connected");
    });

    this.socket.on("disconnect", (e) => {
      console.log("disconnected");
    });
  }
}
