import React from "react";
import {Settings, Lobby, THSettings} from "../pokerapi/messages/ApiObjects";
import {PokerClient} from "../pokerapi/PokerClient";
import THSettingsTab from "./THSettingsTab";
import "../styles/Settings.css"

interface State {
  changedSettings: Settings,
  somethingChanged: boolean
}

interface Props {
  api: PokerClient,
  lobby: Lobby
}

export default class SettingsTab extends React.Component<Props, State> {

  private settings: Settings;
  private canEdit: boolean;


  constructor(props: Props) {
    super(props);

    this.state = {
      changedSettings: Object.assign({}, props.lobby.settings),
      somethingChanged: false
    };
    this.settings = props.lobby.settings;
    this.canEdit = props.lobby.yourId === props.lobby.leader;
  }

  //TODO fix reset button
  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
    if (this.isEqual(prevProps.lobby.settings, this.props.lobby.settings)) return;
    this.settings = this.props.lobby.settings;
    this.canEdit = this.props.lobby.yourId === this.props.lobby.leader;

    if (this.canEdit) {
      this.setState({
        somethingChanged: !this.isEqual(this.settings, this.state.changedSettings)
      });
    } else {
      this.setState({
        changedSettings: this.settings,
        somethingChanged: false,
      })
    }
  }

  render() {
    return (
        <div id={"settingsContainer"}>
          {
            this.settings.gameMode === "texasholdem" &&
            <THSettingsTab
                settings={this.state.changedSettings as THSettings}
                onChange={(settings) => this.setState({changedSettings: settings, somethingChanged: !this.isEqual(settings, this.settings)})}
                canEdit={this.canEdit}
            />
          }
          <button disabled={!this.state.somethingChanged} onClick={() => this.saveSettings()}>Save</button>
          <button disabled={!this.state.somethingChanged} onClick={() => this.setState({somethingChanged: false, changedSettings: Object.assign({}, this.settings)})}>Reset</button>
        </div>
    );
  }

  private saveSettings() {
    this.props.api.sendMessage("change_settings", this.state.changedSettings);
  }

  private isEqual(s1: Settings, s2: Settings) {
    console.log(JSON.stringify(s1));
    console.log(JSON.stringify(s2));
    return JSON.stringify(s1)===JSON.stringify(s2);
  }
}