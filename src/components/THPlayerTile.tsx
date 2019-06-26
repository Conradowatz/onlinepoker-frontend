import React from "react";
import "../styles/THPlayerTile.css"
import {THPlayer} from "../pokerapi/messages/ApiObjects";
import CardComponent from "./CardComponent";

interface Props {
  player: THPlayer,
  showCards: boolean,
  isSmallBlind: boolean,
  isBigBlind: boolean,
  iActive: boolean
}

export default class THPlayerTile extends React.Component<Props> {

  private readonly cards_hidden: boolean;
  private readonly cards_values: string[];
  private readonly cards_colors: string[];
  private readonly status: string;
  private readonly blind: string;

  constructor(props: Props) {
    super(props);

    this.cards_hidden = props.player.cards.length !== 2;
    if (this.cards_hidden) {
      this.cards_colors = ["", ""];
      this.cards_values = ["", ""];
    } else {
      this.cards_colors = props.player.cards.map((c) => c.color);
      this.cards_values = props.player.cards.map((c) => c.value);
    }
    this.status = "waiting...";
    if (props.player.allIn) this.status = "All In";
    if (props.player.folded) this.status = "Folded";
    console.log("I am bb: " + props.isBigBlind);
    if (props.isSmallBlind) this.blind = "SB";
    else if (props.isBigBlind) this.blind = "BB";
    else this.blind = "XX";
  }

  render() {
    return (
      <div className={"thPlayerTile"}>
        {this.blind.length > 0 && <p className={"blind"}>{this.blind}</p>}
        <p className={"name"}>{this.props.player.name}</p>
        <p className={"money"}>{this.props.player.money}</p>
        {this.props.player.bet > 0 && <p className={"bet"}>{this.props.player.bet}</p>}
        <p className={"status"}>{this.status}</p>
        {this.props.showCards &&
          <div className={"cards"}>
            <CardComponent hidden={this.cards_hidden} value={this.cards_values[0]} color={this.cards_colors[0]}/>
            <CardComponent hidden={this.cards_hidden} value={this.cards_values[1]} color={this.cards_colors[1]}/>
          </div>
        }
      </div>
    );
  }

}