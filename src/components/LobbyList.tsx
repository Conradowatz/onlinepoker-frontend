import * as React from 'react';
import {PokerClient} from "../pokerapi/PokerClient";
import {LobbyPreview, GetLobbiesResponse, CreateLobbyRequest, Lobby} from '../pokerapi/messages/ApiObjects';
import JoinLobbyDialog from "./JoinLobbyDialog";
import "../styles/LobbyList.css"
import "../styles/Dialog.css"
import refreshImg from "../assets/refresh.png"
import Scrollbars from "react-custom-scrollbars"
import CreateLobbyDialog from "./CreateLobbyDialog";

interface State {
  showJoinLobbyDialog: boolean,
  showCreateLobbyDialog: boolean,
  lobbies: LobbyPreview[]
}

interface Props {
  api: PokerClient,
  onJoin: (id: string, name: string) => void,
  onCreate: (pName: string, lName: string, hidden: boolean) => void,
  onSpectate: (id: string) => void
}

export default class LobbyList extends React.Component<Props, State> {

  private selectedLobby?: string;

  constructor(props: Props) {
    super(props);
    this.state = {
      showJoinLobbyDialog: false,
      showCreateLobbyDialog: false,
      lobbies: []
    };

    this.refreshLobbies();
  }

  render() {
    return (
      <div id={"lobbyListContainer"}>
        <div className={"buttonRow"}>
          <button onClick={() => this.setState({showCreateLobbyDialog: true})}>Create Lobby</button>
          <button disabled>Join hidden Lobby</button>
          <button id={"refresh"} onClick={(e) => this.refreshLobbies()}><img src={refreshImg} id={"refresh"} alt={"Refresh"}/></button>
        </div>
        <Scrollbars id={"lobbyList"}>
          <table className={"table"}>
            <thead>
            <tr>
              <th>NAME</th>
              <th>GAME MODE</th>
              <th>RUNNING</th>
              <th>PLAYERS</th>
              <th/>
            </tr>
            </thead>
            <tbody>
            {this.state.lobbies.map((lobby) =>
              <tr key={lobby.id}>
                <td>{lobby.name}</td>
                <td>{lobby.gameMode}</td>
                <td>{lobby.running ? "Yes" : "No"}</td>
                <td>{`${lobby.currentPlayers}/${lobby.maxPlayers}`}</td>
                <td>
                  {lobby.joinable && <button onClick={(e) => this.showJoinLobby(lobby.id)}>Join</button>}
                  <button onClick={(e) => this.props.onSpectate(lobby.id)}>Spectate</button>
                </td>
              </tr>
            )}
            </tbody>
          </table>
        </Scrollbars>
        {this.state.showJoinLobbyDialog &&
          <JoinLobbyDialog onJoin={(name) => this.joinLobby(name)} onCancel={() => this.setState({showJoinLobbyDialog: false})}/>
        }
        {this.state.showCreateLobbyDialog &&
          <CreateLobbyDialog onCreate={(pName, lName, hidden) => this.props.onCreate(pName, lName, hidden)} onCancel={() => this.setState({showCreateLobbyDialog:false})}/>
        }
      </div>
    )
  }

  private refreshLobbies() {
    this.props.api.sendMessageCall("get_lobbies", (_message) => {
      let message = _message as GetLobbiesResponse;
      this.setState({lobbies: message.lobbies});
    });
  }

  private showJoinLobby(id: string) {
    this.selectedLobby = id;
    this.setState({showJoinLobbyDialog: true});
  }

  private joinLobby(name: string) {
    this.setState({showJoinLobbyDialog: false});
    if (this.selectedLobby !== undefined) {
      this.props.onJoin(this.selectedLobby, name);
    }
  }
}