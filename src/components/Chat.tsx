import React from "react";
import {PokerClient} from "../pokerapi/PokerClient";
import {Player, ChatIn, ChatOut} from "../pokerapi/messages/ApiObjects";

interface ChatMessage {
  sender: Player,
  message: string,
  fromMe: boolean
}

interface State {
  messages: ChatMessage[],
  currentMessage: string
}

interface Props {
  api: PokerClient,
  myId: number
}

export default class Chat extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: ""
    };

    this.registerListeners();
  }

  render() {
    return (
        <div id={"chat-container"}>
          <div id={"chat-messages"}>
            {this.state.messages.map((message, index) =>
              <div className={"message"} key={index}>
                <p className={"message-from"}>{message.sender.name}</p>
                <p className={"message-content"}>{message.message}</p>
              </div>
            )}
          </div>
          <div id={"chat-input-container"}>
            <input
                value={this.state.currentMessage} onChange={(e) => this.setState({currentMessage: e.target.value})}
                onKeyPress={(e) => {if (e.key === "Enter") this.sendMessage()}}
            />
            <button onClick={() => this.sendMessage()}>Send</button>
          </div>
        </div>
    );
  }

  private registerListeners() {
    this.props.api.on("chat_in", (response: ChatIn) => {
      this.setState(prevState => ({
        messages: [...prevState.messages, {
          sender: response.sender,
          message: response.message,
          fromMe: response.sender.id === this.props.myId
        }]
      }));
    });
  }

  private sendMessage() {
    if (this.state.currentMessage.trim().length > 0) {
      let request: ChatOut = {
        message: this.state.currentMessage
      };
      this.props.api.sendMessage("chat_out", request);
      this.setState({currentMessage: ""});
    }
  }
}