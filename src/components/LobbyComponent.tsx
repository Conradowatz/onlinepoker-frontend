import * as React from 'react';

import '../styles/Lobby.css';
import {PokerClient} from "../pokerapi/PokerClient";
import {THStartGame, Lobby} from "../pokerapi/messages/ApiObjects";
import Chat from "./Chat";
import SettingsTab from "./SettingsTab";
import PlayerList from "./PlayerList";
import Playground from "./playground/Playground";

interface  State {
  isLeader: boolean,
  spectate: boolean,
  isGameStarted: boolean,
  startEvent?: THStartGame
}

interface Props {
  api: PokerClient,
  lobby: Lobby,
  onLeave: () => void
}

export default class LobbyComponent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      isLeader: props.lobby.leader === props.lobby.yourId,
      spectate: !(props.lobby.players.hasOwnProperty(props.lobby.yourId)),
      isGameStarted: props.lobby.running
    };

    this.registerListeners();
  }

  render() {
    return (
        <div id={"lobbyContainer"} className={this.getClassName()}>
          {(!this.state.isGameStarted || this.state.spectate) &&
          <div className={"buttonRow"}>
            {!this.state.isGameStarted &&
              <button id={"startGame"} disabled={!this.state.isLeader}
                      onClick={() => this.startGame()}>Start Game</button>
            }
            <button id={"leaveLobby"} onClick={this.props.onLeave}>Leave Lobby</button>
            <p className={"lobbyName"}>{this.props.lobby.name}</p>
          </div>
          }
          <div id={"content"}>
            {!this.state.isGameStarted &&
              <SettingsTab api={this.props.api} lobby={this.props.lobby}/>
            }
            {this.state.isGameStarted &&
              <Playground api={this.props.api} startEvent={this.state.startEvent}
                          onLost={() => this.setState({spectate: true})} spectate={this.state.spectate}/>
            }
          </div>
          <Chat api={this.props.api} myId={this.props.lobby.yourId} spectate={this.state.spectate}/>
          {!this.state.isGameStarted &&
            <PlayerList players={Object.values(this.props.lobby.players)} api={this.props.api}/>
          }
        </div>
    )
  }

  private getClassName() {
    let name = "";
    if (this.state.isGameStarted) name += " playing";
    if (this.state.spectate) name += " spectate";
    return name;
  }

  private startGame() {
    this.props.api.sendMessage("start_game");
  }

  private registerListeners() {
    this.th_start = this.th_start.bind(this);
    this.props.api.addListener("th_start", this.th_start);
    this.lobby_update = this.lobby_update.bind(this);
    this.props.api.addListener("lobby_update", this.lobby_update);

  }

  componentWillUnmount(): void {
    this.props.api.removeListener("th_start", this.th_start);
    this.props.api.removeListener("lobby_update", this.lobby_update);
  }

  private th_start(message: THStartGame) {
    this.setState({
      startEvent: message,
      isGameStarted: true
    });
  }

  private lobby_update(message: Lobby) {
    this.setState({
      isLeader: message.leader === message.yourId
    });
  }
}