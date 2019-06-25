import * as React from 'react';

import '../styles/Dialog.css';
import Dialog from "./Dialog";

interface  State {
  playerName: string,
  lobbyName: string,
  hidden: boolean,
  isOk: boolean
}

interface Props {
  onCreate: (lobbyName: string, playerName: string, hidden:boolean) => void,
  onCancel: () => void
}

export default class CreateLobbyDialog extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      playerName: "",
      lobbyName: "",
      hidden: false,
      isOk: false
    };
  }

  render() {
    return (
        <Dialog
            children={
              <div>
                <p>Your Name:</p>
                <input
                    type="text"
                    value={this.state.playerName} onChange={(e) => this.checkPlayerName(e)}
                />
                <p>Lobby Name:</p>
                <input
                    type="text"
                    value={this.state.lobbyName} onChange={(e) => this.checkLobbyName(e)}
                />
                <p>Hidden:</p>
                <input type={"checkbox"} checked={this.state.hidden} onChange={(e) => this.setState({hidden: e.target.checked})}/>
              </div>
            }
            buttons={[
              <button
                  disabled={!this.state.isOk}
                  onClick={() => this.props.onCreate(this.state.playerName.trim(), this.state.lobbyName.trim(), this.state.hidden)}
                  key={1}>Join</button>,
              <button onClick={this.props.onCancel} key={0}>Cancel</button>
            ]}
        />
    )
  }

  private checkPlayerName(e: React.ChangeEvent<HTMLInputElement>) {
    let name = e.target.value.substr(0, 20);
    this.setState({
      playerName: name,
      isOk: this.checkOk(name, this.state.lobbyName)
    });
  }

  private checkLobbyName(e: React.ChangeEvent<HTMLInputElement>) {
    let name = e.target.value.substr(0, 20);
    this.setState({
      lobbyName: name,
      isOk: this.checkOk(this.state.playerName, name)
    });
  }

  private checkOk(playerName: string, lobbyName: string):boolean {
    let playerOk = playerName.trim().length >= 1 && playerName.trim().length <= 20;
    let lobbyOk = lobbyName.trim().length >= 1 && lobbyName.trim().length <= 20;
    return playerOk && lobbyOk;
  }
}