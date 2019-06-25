import React from "react";
import {Settings, Lobby, THSettings} from "../pokerapi/messages/ApiObjects";
import {PokerClient} from "../pokerapi/PokerClient";
import THSettingsTab from "./THSettingsTab";
import "../styles/Settings.css"

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
        <div id={"settingsContainer"}>
          {
            this.state.settings.gameMode === "texasholdem" &&
            <THSettingsTab
                settings={this.state.changedSettings as THSettings}
                onChange={(settings) => this.setState({changedSettings: settings})}
                canEdit={this.state.canEdit}
            />
          }
          <button disabled={!this.state.canEdit} onClick={() => this.saveSettings()}>Save</button>
        </div>
    );
  }

  private registerListeners() {

    this.props.api.on("lobby_update", (newLobby: Lobby) => {
      let canEdit = newLobby.yourId === newLobby.leader;
      if (canEdit) {
        this.setState({
          settings: newLobby.settings,
          somethingChanged: newLobby.settings !== this.state.changedSettings,
          canEdit: true
        });
      } else {
        this.setState({
          settings: newLobby.settings,
          changedSettings: newLobby.settings,
          somethingChanged: false,
          canEdit: false
        })
      }
    });
  }

  private saveSettings() {
    this.props.api.sendMessage("change_settings", this.state.changedSettings);
  }
}