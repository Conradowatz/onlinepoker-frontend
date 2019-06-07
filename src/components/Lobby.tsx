import * as React from 'react';

import '../styles/NameInput.css';
import {PokerClient} from "../pokerapi/PokerClient";
import {Lobby as ApiLobby} from "../pokerapi/messages/ApiObjects";
import Chat from "./Chat";

interface  State {
  lobby: ApiLobby,
  spectate: boolean
}

interface Props {
  api: PokerClient,
  lobby: ApiLobby
}

export default class Lobby extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      lobby: this.props.lobby,
      spectate: !(this.props.lobby.yourId in this.props.lobby.players)
    }
  }

  render() {
    return (
        <div id={"lobbyContainer"}>
          <p>Lobby!</p>
          <Chat api={this.props.api} myId={this.state.lobby.yourId}/>
        </div>
    )
  }
}