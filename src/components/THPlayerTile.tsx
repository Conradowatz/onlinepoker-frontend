import React from "react";
import "../styles/THPlayerTile.css"
import {THPlayer} from "../pokerapi/messages/ApiObjects";
import CardComponent from "./CardComponent";

interface Props {
  player: THPlayer,
  showCards: boolean
}

export default class THPlayerTile extends React.Component<Props> {

  private readonly cards_hidden: boolean;
  private readonly cards_values: string[];
  private readonly cards_colors: string[];
  private readonly status: string;

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
    this.status = "";
    if (props.player.allIn) this.status = "All In";
    if (props.player.folded) this.status = "Folded";
  }

  render() {
    return (
      <div className={"thPlayerTile"}>
        <p className={"name"}>{"Name: "+this.props.player.name}</p>
        <p className={"money"}>{"Money: "+this.props.player.money}</p>
        {this.props.player.bet > 0 && <p className={"bet"}>{"Bet: "+this.props.player.bet}</p>}
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