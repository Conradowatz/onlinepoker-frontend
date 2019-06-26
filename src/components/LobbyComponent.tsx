import * as React from 'react';

import '../styles/Lobby.css';
import {PokerClient} from "../pokerapi/PokerClient";
import {THStartGame, Lobby} from "../pokerapi/messages/ApiObjects";
import Chat from "./Chat";
import SettingsTab from "./SettingsTab";
import PlayerList from "./PlayerList";
import Playground from "./Playground";

interface  State {
  lobby: Lobby,
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
      lobby: props.lobby,
      spectate: !(props.lobby.players.hasOwnProperty(props.lobby.yourId)),
      isGameStarted: props.lobby.running
    };

    this.registerListeners();
  }

  render() {
    return (
        <div id={"lobbyContainer"} className={this.state.isGameStarted ? "playing" : ""}>
          {!this.state.isGameStarted &&
          <div className={"buttonRow"}>
            <button id={"startGame"} disabled={this.state.lobby.leader !== this.state.lobby.yourId}
                    onClick={() => this.startGame()}>Start Game
            </button>
            <button id={"leaveLobby"} onClick={this.props.onLeave}>Leave Loby</button>
            <p className={"lobbyName"}>{this.state.lobby.name}</p>
          </div>
          }
          <div id={"content"}>
            {!this.state.isGameStarted &&
              <SettingsTab api={this.props.api} lobby={this.state.lobby}/>
            }
            {this.state.isGameStarted && this.state.startEvent !== undefined &&
              <Playground api={this.props.api} startEvent={this.state.startEvent} leaveGame={this.props.onLeave}/>
            }
          </div>
          <Chat api={this.props.api} myId={this.state.lobby.yourId}/>
          {!this.state.isGameStarted &&
            <PlayerList players={Object.values(this.state.lobby.players)} api={this.props.api}/>
          }
        </div>
    )
  }

  private startGame() {
    this.props.api.sendMessage("start_game");
  }

  private registerListeners() {
    this.props.api.on("th_start", (startEvent: THStartGame) => {
      this.setState({
        startEvent: startEvent,
        isGameStarted: true
      });
    });
  }
}