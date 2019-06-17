import React from "react";
import {Settings, THSettings} from "../pokerapi/messages/ApiObjects";

interface State {

}

interface Props {
  canEdit: boolean,
  onChange: (settings: Settings) => void,
  settings: THSettings
}

export default class THSettingsTab extends React.Component<Props, State> {

  private changedSettings: THSettings;

  constructor(props: Props) {
    super(props);

    this.changedSettings = props.settings;
  }


  render() {
    return (
        <div id={"settings-inner-container"}>
          <div className={"setting-row"}>
            <p className={"setting-title"}>Maximum Players</p>
            <input type={"number"} value={this.props.settings.maxPlayers} max={20} min={2} disabled={!this.props.canEdit} onChange={(e) => {this.changedSettings.maxPlayers=Number.parseInt(e.target.value); this.props.onChange(this.changedSettings);}}/>
          </div>
          <div className={"setting-row"}>
            <p className={"setting-title"}>Turn Time</p>
            <input type={"checkbox"} checked={this.props.settings.turnTime>0} disabled={!this.props.canEdit} onChange={(e) => {this.changedSettings.turnTime=e.target.checked?5:0; this.props.onChange(this.changedSettings);}}/>
            <input type={"number"} value={this.props.settings.turnTime} max={500} min={0} disabled={!this.props.canEdit || this.props.settings.turnTime===0} onChange={(e) => {this.changedSettings.turnTime=Number.parseInt(e.target.value); this.props.onChange(this.changedSettings);}}/>
          </div>
          <div className={"setting-row"}>
            <p className={"setting-title"}>Use Sidepots</p>
            <input type={"checkbox"} checked={this.props.settings.useSidepots} disabled={!this.props.canEdit} onChange={(e) => {this.changedSettings.useSidepots=e.target.checked; this.props.onChange(this.changedSettings);}}/>
          </div>
          <div className={"settings-row"}>
            <p className={"setting-title"}>Blinds</p>
            <input type={"range"} min={0} max={10} value={this.props.settings.blindsRate} disabled={!this.props.canEdit} onChange={(e) => {this.changedSettings.blindsRate=Number.parseInt(e.target.value); this.props.onChange(this.changedSettings);}}/>
            <input type={"checkbox"} checked={this.props.settings.blindsTimeInsteadOfHands} disabled={!this.props.canEdit} onChange={(e) => {this.changedSettings.blindsTimeInsteadOfHands = e.target.checked; this.props.onChange(this.changedSettings);}}/>
            </div>
        </div>
    );
  }
}