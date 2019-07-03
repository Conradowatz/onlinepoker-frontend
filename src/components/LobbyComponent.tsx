import * as React from 'react';

import '../styles/Lobby.css';
import {PokerClient} from "../pokerapi/PokerClient";
import {THStartGame, Lobby, THPlayer} from "../pokerapi/messages/ApiObjects";
import Chat from "./Chat";
import SettingsTab from "./SettingsTab";
import PlayerList from "./PlayerList";
import Playground from "./playground/Playground";

interface  State {
  isLeader: boolean,
  lobby: Lobby,
  spectate: boolean,
  lost: boolean,
  isGameStarted: boolean,
  startEvent?: THStartGame,
  playerCount: number
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
      lobby: props.lobby,
      playerCount: Object.getOwnPropertyNames(props.lobby.players).length,
      spectate: !(props.lobby.players.hasOwnProperty(props.lobby.yourId)),
      lost: false,
      isGameStarted: props.lobby.running
    };
  }

  componentDidMount(): void {
    this.registerListeners();
  }

  render() {
    return (
        <div id={"lobbyContainer"} className={this.getClassName()}>
          {(!this.state.isGameStarted || this.state.spectate || this.state.lost) &&
          <div className={"buttonRow"}>
            {!this.state.isGameStarted &&
              <button id={"startGame"} disabled={!this.state.isLeader || this.state.playerCount < 2}
                      onClick={() => this.startGame()}>Start Game</button>
            }
            <button id={"leaveLobby"} onClick={this.props.onLeave}>Leave Lobby</button>
            <p className={"lobbyName"}>{this.state.lobby.name}</p>
          </div>
          }
          <div id={"content"}>
            {!this.state.isGameStarted &&
              <SettingsTab api={this.props.api} lobby={this.state.lobby}/>
            }
            {this.state.isGameStarted &&
              <Playground api={this.props.api} startEvent={this.state.startEvent}
                          onLost={() => this.setState({lost: true})} spectate={this.state.spectate || this.state.lost}/>
            }
          </div>
          <Chat api={this.props.api} myId={this.props.lobby.yourId} spectate={this.state.spectate}/>
          {!this.state.isGameStarted &&
            <PlayerList players={Object.values(this.state.lobby.players)} api={this.props.api}/>
          }
        </div>
    )
  }

  private getClassName() {
    let name = "";
    if (this.state.isGameStarted) name += " playing";
    if (this.state.spectate || this.state.lost) name += " spectate";
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
    this.th_end_game = this.th_end_game.bind(this);
    this.props.api.addListener("th_end_game", this.th_end_game);

  }

  componentWillUnmount(): void {
    this.props.api.removeListener("th_start", this.th_start);
    this.props.api.removeListener("lobby_update", this.lobby_update);
    this.props.api.removeListener("th_end_game", this.th_end_game);
  }

  private th_start(message: THStartGame) {
    this.setState({
      lost: false,
      startEvent: message,
      isGameStarted: true
    });
  }

  private lobby_update(message: Lobby) {
    this.setState({
      isLeader: message.leader === message.yourId,
      lobby: message,
      playerCount: Object.getOwnPropertyNames(message.players).length,
    });
  }

  private th_end_game(winner: THPlayer) {

    this.setState({
      isGameStarted: false
    })

    //TODO Display Winner
  }
}