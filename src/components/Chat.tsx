import React from "react";
import {PokerClient} from "../pokerapi/PokerClient";
import {Player, ChatIn, ChatOut} from "../pokerapi/messages/ApiObjects";
import "../styles/Chat.css";
import {Picker} from 'emoji-mart';
import Scrollbars from "react-custom-scrollbars";
import 'emoji-mart/css/emoji-mart.css';

interface ChatMessage {
  sender: Player,
  message: string,
  fromMe: boolean
}

interface State {
  messages: ChatMessage[],
  currentMessage: string,
  pickerVisible: boolean
}

interface Props {
  api: PokerClient,
  myId: number,
  spectate: boolean,
}

export default class Chat extends React.Component<Props, State> {

  private chatContainer:Scrollbars|null;

  constructor(props: Props) {
    super(props);
    this.state = {
      messages: [],
      currentMessage: "",
      pickerVisible: false
    };

    this.chatContainer = null;
  }

  componentDidMount(): void {
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
                id={"chatInput"}
                value={this.state.currentMessage} onChange={(e) => this.setState({currentMessage: e.target.value})}
                onKeyPress={(e) => {if (e.key === "Enter") this.sendMessage()}} disabled={this.props.spectate}
            />
            <button onClick={this.togglePicker} id={"emojiBtn"}>😊</button>
            { this.state.pickerVisible && <Picker onSelect={this.addEmoji} /> }
            <button onClick={() => this.sendMessage()} disabled={this.props.spectate}>Send</button>
          </div>
        </div>
    );
  }

  togglePicker = () => {
    let { pickerVisible } = this.state;
    pickerVisible = !pickerVisible;
    this.setState({
      pickerVisible,
    })
  }

  addEmoji = (emoji: any) => {
    const { currentMessage } = this.state;
    const text = `${currentMessage}${emoji.native}`;
    console.log(currentMessage);
    console.log(emoji);
    this.setState({
      currentMessage: text
    });
  }

  componentDidUpdate(): void {
    // scroll down
    if (this.chatContainer !== null) {
      this.chatContainer.scrollToBottom();
    }
  }

  private registerListeners() {
    this.chat_in = this.chat_in.bind(this);
    this.props.api.addListener("chat_in", this.chat_in);
  }

  componentWillUnmount(): void {
    this.props.api.removeListener("chat_in", this.chat_in);
  }

  private chat_in(message: ChatIn) {
    this.setState(prevState => ({
      messages: [...prevState.messages, {
        sender: message.sender,
        message: message.message,
        fromMe: message.sender.id === this.props.myId
      }]
    }));
  }

  private sendMessage() {
    if (this.state.currentMessage.trim().length > 0) {
      let request: ChatOut = {
        message: this.state.currentMessage
      };
      this.props.api.sendMessage("chat_out", request);
      this.setState({currentMessage: ""});
    }
    this.setState({
      pickerVisible: false,
    })
  }
}