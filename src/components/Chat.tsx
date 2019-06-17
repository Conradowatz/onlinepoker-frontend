import React from "react";
import {PokerClient} from "../pokerapi/PokerClient";
import {Player, ChatIn, ChatOut} from "../pokerapi/messages/ApiObjects";
import "../styles/Chat.css"
import Scrollbars from "react-custom-scrollbars"

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

  private chatContainer:Scrollbars|null;

  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: ""
    };

    this.chatContainer = null;
    this.registerListeners();
  }

  render() {
    return (
        <div id={"chatContainer"}>
          <Scrollbars id={"chatMessages"} autoHide ref={c => (this.chatContainer = c)}>
            {this.state.messages.map((message, index) =>
              <div className={"message"} key={index}>
                <span className={"message-from"}>{message.sender.name}: </span>
                <span className={"message-content"}>{message.message}</span>
              </div>
            )}
          </Scrollbars>
          <div id={"chatInputContainer"}>
            <input
                value={this.state.currentMessage} onChange={(e) => this.setState({currentMessage: e.target.value})}
                onKeyPress={(e) => {if (e.key === "Enter") this.sendMessage()}}
            />
            <button onClick={() => this.sendMessage()}>Send</button>
          </div>
        </div>
    );
  }

  componentDidUpdate(): void {
    // scroll down
    if (this.chatContainer !== null) {
      this.chatContainer.scrollToBottom();
    }
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