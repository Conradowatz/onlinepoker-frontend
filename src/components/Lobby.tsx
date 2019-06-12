import * as React from 'react';

import '../styles/NameInput.css';
import {PokerClient} from "../pokerapi/PokerClient";
import {Lobby as ApiLobby} from "../pokerapi/messages/ApiObjects";
import Chat from "./Chat";
import SettingsTab from "./SettingsTab";

interface  State {
  lobby: ApiLobby,
  spectate: boolean,
  isGameStarted: boolean
}

interface Props {
  api: PokerClient,
  lobby: ApiLobby
}

export default class Lobby extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      lobby: props.lobby,
      spectate: !(props.lobby.players.hasOwnProperty(props.lobby.yourId)),
      isGameStarted: props.lobby.running
    }
  }

  render() {
    return (
        <div id={"lobbyContainer"}>

          {!this.state.isGameStarted && <SettingsTab api={this.props.api} lobby={this.state.lobby}/>}
          <Chat api={this.props.api} myId={this.state.lobby.yourId}/>
        </div>
    )
  }
  //<PlayerList />
  //           {this.state.isGameStarted && <Playground />}
}