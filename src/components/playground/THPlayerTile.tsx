import React from "react";
import "../../styles/playground/THPlayerTile.css"
import {Card, THPlayer} from "../../pokerapi/messages/ApiObjects";
import CardComponent from "./CardComponent";
import chipBlue from "../../assets/chip_blue_sprite.png";
import chipRed from "../../assets/chip_red_sprite.png";

interface Props {
  player: THPlayer,
  showCards: boolean,
  isSmallBlind: boolean,
  isBigBlind: boolean,
  iActive: boolean,
  isWinner: boolean,
  winningCards: Card[]
}

export default class THPlayerTile extends React.Component<Props> {

  render() {
    return (
      <div className={this.getClassName()}>
        {this.getBlindText().length > 0 && <p className={"blind"}>{this.getBlindText()}</p>}
        <p className={"name"}>{this.props.player.name}</p>
        {!this.props.showCards &&
          <div className={"moneyContainer"}>
            <img src={chipBlue} alt={"money"} />
            <p className={"money"}>{this.props.player.money}</p>
          </div>
        }
        {!this.props.showCards &&
          <div className={"betContainer"}>
            {this.props.player.bet > 0 && <img src={chipRed} alt={"bet"}/>}
            {this.props.player.bet > 0 && <p className={"bet"}>{this.props.player.bet}</p>}
          </div>
        }
        {!this.props.showCards &&
          <p className={"status"}>{this.getStatus()}</p>
        }
        {this.props.showCards &&
          <div className={"cards"}>
            <CardComponent hidden={this.cardsHidden()} value={this.cardsHidden()?"":this.props.player.cards[0].value} color={this.cardsHidden()?"":this.props.player.cards[0].color} highlighted={this.cardsHidden()?false:this.checkCard(this.props.player.cards[0])}/>
            <CardComponent hidden={this.cardsHidden()} value={this.cardsHidden()?"":this.props.player.cards[1].value} color={this.cardsHidden()?"":this.props.player.cards[1].color} highlighted={this.cardsHidden()?false:this.checkCard(this.props.player.cards[1])}/>
          </div>
        }
      </div>
    );
  }

  private cardsHidden() {
    return this.props.player.cards.length !== 2;
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

  private getClassName() {
    let classes = "thPlayerTile";
    if (this.props.iActive) classes += " active";
    if (this.props.isWinner) classes += " winner";
    return classes;
  }

  private checkCard(card: Card):boolean {
    for (let c of this.props.winningCards) {
      if (card.value===c.value && card.color===c.color)
        return true;
    }
    return false;
  }
}