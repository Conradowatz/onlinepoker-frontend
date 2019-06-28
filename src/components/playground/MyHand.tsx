import {PokerClient} from "../../pokerapi/PokerClient";
import {Card, THNewRound, THPlayerAction} from "../../pokerapi/messages/ApiObjects";
import CardComponent from "./CardComponent";
import * as React from "react";
import chipBlue from "../../assets/chip_blue_sprite.png";
import chipRed from "../../assets/chip_red_sprite.png";
import "../../styles/playground/MyHand.css"

interface Props {
  api: PokerClient,
  myId: number
}

interface State {
  cards: Card[],
  money: number,
  bet: number
}

export default class MyHand extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      cards: [],
      money: 0,
      bet: 0
    };

    this.registerListeners();
  }

  render() {
    return (
        <div id={"myHand"}>
          <div id={"myStatus"}>
            <div id={"myMoney"}>
              <img src={chipBlue} alt={"money"}/>
              <p>{this.state.money}</p>
            </div>
            {this.state.bet > 0 &&
              <div id={"myBet"}>
                <img src={chipRed} alt={"bet"}/>
                <p>{this.state.bet}</p>
              </div>
            }
          </div>
          <div id={"myCards"}>
            {this.state.cards.map((c, i) =>
                <CardComponent hidden={false} value={c.value} color={c.color} key={i} highlighted={false}/>
            )}
          </div>
        </div>
    );
  }

  private registerListeners() {
    this.th_new_round = this.th_new_round.bind(this);
    this.props.api.addListener("th_new_round", this.th_new_round);
    this.th_player_action = this.th_player_action.bind(this);
    this.props.api.addListener("th_player_action", this.th_player_action);
  }

  componentWillUnmount(): void {
    this.props.api.removeListener("th_new_round", this.th_new_round);
    this.props.api.removeListener("th_player_action", this.th_player_action);
  }

  private th_new_round(message: THNewRound) {
    this.setState({
      cards: message.yourCards,
      money: message.players[message.yourIndex].money,
      bet: message.players[message.yourIndex].bet
    });
  }

  private th_player_action(message: THPlayerAction) {
    if (message.player.id===this.props.myId) {
      this.setState({
        cards: message.player.folded?[]:this.state.cards,
        money: message.player.money,
        bet: message.player.bet
      });
    }
  }
}