import {EventEmitter} from "events";
import {
  ClientCommand,
  ClientMessage,
  Command,
  PokerMessage,
} from "./messages/PokerMessage";

export class PokerClient extends EventEmitter {

  wsClient: WebSocket;

  constructor(public address: string, public autoReconnect=false) {
    super();
    this.wsClient = new WebSocket(address, "poker1");

    this.registerListeners();
  }

  private registerListeners() {

    this.wsClient.onopen = (event) => {
      this.emit("ready");
    };

    //pipe incoming messages trough
    this.wsClient.onmessage = (message) => {
      let pokerMessage = JSON.parse(message.data);
      this.emit(pokerMessage.command, pokerMessage.data);
    };

    this.wsClient.onclose = (event) => {
      this.emit("close");
      if (this.autoReconnect) {
        setTimeout(() => {
          this.wsClient = new WebSocket(this.address, "poker1");
          this.registerListeners();
        }, 3000);
      }
    };
  }

  public sendMessage(command: ClientCommand | Command, message?: PokerMessage) {

    let cm:ClientMessage = {
      command: command,
      data: message
    };
    this.wsClient.send(JSON.stringify(cm));
    console.log(cm);
  }

  public sendMessageCall(command: ClientCommand | Command, callback: (message?: PokerMessage) => void, message?: PokerMessage) {
    this.sendMessage(command, message);
    this.once(command, (response: PokerMessage) => {
      callback(response);
    })
  }
}