import React from "react";
import "../../styles/playground/THPlayerTile.css"
import {THPlayer} from "../../pokerapi/messages/ApiObjects";
import CardComponent from "./CardComponent";

interface Props {
  player: THPlayer,
  showCards: boolean,
  isSmallBlind: boolean,
  isBigBlind: boolean,
  iActive: boolean
}

export default class THPlayerTile extends React.Component<Props> {

  render() {
    return (
      <div className={this.props.iActive?"thPlayerTile active":"thPlayerTile"}>
        {this.getBlindText().length > 0 && <p className={"blind"}>{this.getBlindText()}</p>}
        <p className={"name"}>{this.props.player.name}</p>
        <p className={"money"}>{this.props.player.money}</p>
        {this.props.player.bet > 0 && <p className={"bet"}>{this.props.player.bet}</p>}
        <p className={"status"}>{this.getStatus()}</p>
        {this.props.showCards &&
          <div className={"cards"}>
            <CardComponent hidden={this.props.player.cards.length !== 2} value={this.props.player.cards.length===2?this.props.player.cards[0].value:""} color={this.props.player.cards.length===2?this.props.player.cards[0].color:""}/>
            <CardComponent hidden={this.props.player.cards.length !== 2} value={this.props.player.cards.length===2?this.props.player.cards[1].value:""} color={this.props.player.cards.length===2?this.props.player.cards[1].color:""}/>
          </div>
        }
      </div>
    );
  }

  private getStatus():string {
    let status;
    if (this.props.iActive) status = "choosing..."; else status = "waiting...";
    if (this.props.player.allIn) status = "All In";
    if (this.props.player.folded) status = "Folded";
    return status;
  }

  private getBlindText():string {
    let blind;
    if (this.props.isSmallBlind) blind = "SB";
    else if (this.props.isBigBlind) blind = "BB";
    else blind = "";
    return blind;
  }

}