import * as React from 'react';
import LobbyList from "./LobbyList";
import Lobby from "./Lobby";
import {PokerClient} from "../pokerapi/PokerClient";
import {CreateLobbyRequest, JoinLobbyRequest, JoinLobbyResponse, Lobby as ApiLobby, DisconnectEvent} from '../pokerapi/messages/ApiObjects';
import Dialog from "./Dialog";

interface State {
    showLobbyList: boolean,
    showLobby: boolean,
    lobby?: ApiLobby,
    shownError: string | null
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
            showLobby: false,
            shownError: null
        };

        this.api = new PokerClient("ws://localhost:8080", true);
        this.connectToServer();
    }
    render() {
        return (
                <div id={'game'}>
                    {
                      this.state.showLobbyList &&
                      <LobbyList
                          api={this.api}
                          onJoin={(id, name) => this.joinLobby(id, false, name)}
                          onSpectate={(id) => this.joinLobby(id, true)}/>
                    }
                    {
                      (this.state.showLobby && this.state.lobby !== undefined) &&
                      <Lobby api={this.api} lobby={this.state.lobby} onLeave={() => this.leftLobby()}/>
                    }
                    {
                      this.state.shownError !== null &&
                      <Dialog
                          title={"Error"}
                          message={"Connecting to lobby failed: " + this.state.shownError}
                          buttons={[<button onClick={() => this.setState({shownError: null})}>Ok</button>]} />
                      }
                </div>

        );
    }

  private connectToServer() {

    //successfully connected to the server
    this.api.on("ready", () => {
      this.setState({showLobbyList: true, showLobby: false});
      //DEBUG START
      let clr: CreateLobbyRequest = {
        name: "Coolio Lobby",
        hidden: false,
        playerName: "Mr Coolio"
      };
      this.api.sendMessage("create_lobby", clr);
      //DEBUG END
    });

    //an error occurred during the connection (but still connected)
    this.api.on("error", (error: Error) => {
      console.log(error);
      this.setState({shownError: error.message});
    });

    //the connection got closed
    this.api.on("close", () => {
      this.setState({
        showLobbyList: false,
        showLobby: false,
        shownError: this.state.shownError ? this.state.shownError : "Lost connection to the Server."
      });
    });

    //the server kicked us out
    this.api.on("disconnect", (event: DisconnectEvent) => {
      this.setState({
        showLobbyList: false,
        showLobby: false,
        shownError: event.reason
      });
    });
  }

  private joinLobby(id: string, specate: boolean, name?: string) {
      let request: JoinLobbyRequest = {
        id: id,
        playerName: name,
        spectate: specate
      };
    this.api.sendMessageCall("join_lobby", (_response => {
      let response = _response as JoinLobbyResponse;
      if (response.success && response.lobby !== undefined) {
        this.setState({
          showLobbyList: false,
          showLobby: true,
          lobby: response.lobby
        });
      } else if (response.reason !== undefined) {
        this.setState({
          shownError: response.reason
        })
      }
    }), request);
  }

  private leftLobby() {
    this.api.sendMessage("leave_lobby");
    this.setState({
      showLobby: false,
      showLobbyList: true
    })
  }
}