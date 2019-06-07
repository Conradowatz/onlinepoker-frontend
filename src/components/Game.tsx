import * as React from 'react';
import '../styles/Playground.css';
import LobbyList from "./LobbyList";
import Lobby from "./Lobby";
import {PokerClient} from "../pokerapi/PokerClient";
import {CreateLobbyRequest} from '../pokerapi/messages/ApiObjects';

interface State {
    showLobbyList: boolean,
    showLobby: boolean,
}

interface Props {

}

export default class Game extends React.Component<Props, State> {

    state: State;
    api: PokerClient;

    constructor(props: Props) {
        super(props);
        this.state = {
            showLobbyList: false,
            showLobby: false
        };

        this.api = new PokerClient("ws://localhost:8080", true);
        this.connectToServer();
    }
    render() {
        const {showLobbyList, showLobby } = this.state;
        return (
                <div id={'game'}>
                    { showLobbyList && <LobbyList api={this.api}/> }
                    { showLobby && <Lobby api={this.api}/> }
                </div>

        );
    }

  private connectToServer() {

    //successfully connected to the server
    this.api.on("ready", () => {
      this.setState({showLobbyList: true, showLobby: false});
      let clr: CreateLobbyRequest = {
        name: "Coolio Lobby",
        hidden: false,
        playerName: "Mr Coolio"
      };
      this.api.sendMessage("create_lobby", clr);
    });

    //an error occurred during the connection (but still connected)
    this.api.on("error", (error: Error) => {
      console.log(error);
    });

    //the connection got closed
    this.api.on("close", () => {
      console.log("closed");
      this.setState({showLobbyList: false, showLobby: false});
    });
  }
}