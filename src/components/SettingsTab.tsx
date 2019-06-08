import React from "react";
import {Settings, Lobby, THSettings} from "../pokerapi/messages/ApiObjects";
import {PokerClient} from "../pokerapi/PokerClient";
import THSettingsTab from "./THSettingsTab";

interface State {
  settings: Settings,
  changedSettings: Settings,
  somethingChanged: boolean,
  canEdit: boolean
}

interface Props {
  api: PokerClient,
  lobby: Lobby
}

export default class SettingsTab extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      settings: this.props.lobby.settings,
      changedSettings: this.props.lobby.settings,
      somethingChanged: false,
      canEdit: props.lobby.yourId === props.lobby.leader
    };

    this.registerListeners();
  }

  render() {
    return (
        <div id={"settings-container"}>
          {
            this.state.settings.gameMode === "texasholdem" &&
            <THSettingsTab
                settings={this.state.changedSettings as THSettings}
                onChange={(settings) => this.setState({changedSettings: settings})}
                canEdit={this.state.canEdit}
            />
          }
        </div>
    );
  }

  private registerListeners() {

    this.props.api.on("lobby_update", (newLobby: Lobby) => {
      this.setState({
        settings: newLobby.settings,
        somethingChanged: newLobby.settings !== this.state.changedSettings,
        canEdit: newLobby.yourId === newLobby.leader
      });
    });
  }
}