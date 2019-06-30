import React from "react";
import {Settings, THSettings} from "../pokerapi/messages/ApiObjects";
import ToggleSwitch from "./ToggleSwitch";

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
        <table id={"settingsTable"}>
          <tbody>
            <tr>
              <td className={"title"}>Maximum Players</td>
              <td>
                <input type={"number"} value={this.props.settings.maxPlayers} max={20} min={2} disabled={!this.props.canEdit} onChange={(e) => {this.changedSettings.maxPlayers=Number.parseInt(e.target.value); this.props.onChange(this.changedSettings);}}/>
              </td>
            </tr>
            <tr>
              <td className={"title"}>Start Money</td>
              <td>
                <input type={"number"} value={this.props.settings.startMoney} max={10000} min={1} disabled={!this.props.canEdit} onChange={(e) => {this.changedSettings.startMoney=Number.parseInt(e.target.value); this.props.onChange(this.changedSettings);}}/>
              </td>
            </tr>
            <tr>
              <td className={"title"}>Turn Time</td>
              <td>
                <ToggleSwitch checked={this.props.settings.turnTime>0} disabled={!this.props.canEdit} onToggle={(checked) => {this.changedSettings.turnTime=checked?5:0; this.props.onChange(this.changedSettings);}}/>
              </td>
            </tr>
            <tr>
              <td/>
              <td>
                <input type={"number"} value={this.props.settings.turnTime} max={500} min={0} disabled={!this.props.canEdit || this.props.settings.turnTime===0} onChange={(e) => {this.changedSettings.turnTime=Number.parseInt(e.target.value); this.props.onChange(this.changedSettings);}}/>
              </td>
            </tr>
            <tr>
              <td className={"title"}>Use Sidepots</td>
              <td>
                <ToggleSwitch checked={this.props.settings.useSidepots} disabled={!this.props.canEdit} onToggle={(checked) => {this.changedSettings.useSidepots=checked; this.props.onChange(this.changedSettings);}}/>
              </td>
            </tr>
            <tr>
              <td className={"title"}>Blind Gain</td>
              <td>
                <div className={"slidecontainer"}>
                  <input type={"range"} className="slider" min={0} max={10} value={this.props.settings.blindsRate} disabled={!this.props.canEdit} onChange={(e) => {this.changedSettings.blindsRate=Number.parseInt(e.target.value); this.props.onChange(this.changedSettings);}}/>
                </div>
              </td>
            </tr>
          <tr>
            <td/>
            <td className={"flexrow"}>
              <p>use Hands</p><ToggleSwitch checked={this.props.settings.blindsTimeInsteadOfHands} disabled={!this.props.canEdit} onToggle={(checked) => {this.changedSettings.blindsTimeInsteadOfHands = checked; this.props.onChange(this.changedSettings);}}/><p>use Time</p>
            </td>
          </tr>
          </tbody>
        </table>
    );
  }
}