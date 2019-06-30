import * as React from "react";
import {PokerClient} from "../../pokerapi/PokerClient";
import CardComponent from "./CardComponent";
import {Card, THCommunityCard, THEndRound, THNewRound} from "../../pokerapi/messages/ApiObjects";
import chipPot from "../../assets/chip_pot_sprite.png";
import "../../styles/playground/TableCenter.css"

interface Props {
  api: PokerClient
}

interface State {
  communityCards: Card[],
  pot: number,
  winningHand: string,
  winningCards: Card[]
}

export default class TableCenter extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);

    this.state = {
      communityCards: [],
      pot: 0,
      winningHand: "",
      winningCards: []
    };
  }

  componentDidMount(): void {
    this.registerListeners();
  }

  render() {
    return (
        <div id={"tableCenter"}>
          <div id={"pot"}>
            <img src={chipPot} alt={"pot"}/>
            <p>{this.state.pot}</p>
          </div>
          <div id={"communityCards"}>
            {this.state.communityCards.map((c, i) =>
                <CardComponent hidden={false} key={i} value={c.value} color={c.color} highlighted={this.checkCard(c)}/>
            ).reverse()}
          </div>
          <p id={"winningHand"}>{this.state.winningHand}</p>
        </div>
    );
  }

  private registerListeners() {
    this.th_community_card = this.th_community_card.bind(this);
    this.props.api.addListener("th_community_card", this.th_community_card);
    this.th_end_round = this.th_end_round.bind(this);
    this.props.api.addListener("th_end_round", this.th_end_round);
    this.th_new_round = this.th_new_round.bind(this);
    this.props.api.addListener("th_new_round", this.th_new_round);
  }

  componentWillUnmount(): void {
    this.props.api.removeListener("th_community_card", this.th_community_card);
    this.props.api.removeListener("th_end_round", this.th_end_round);
    this.props.api.removeListener("th_new_round", this.th_new_round);
  }

  private th_community_card(message: THCommunityCard) {
    this.setState({
      communityCards: message.communityCards,
      pot: message.pot
    });
  }

  private th_end_round(message: THEndRound) {
    this.setState({
      winningCards: message.winningCards,
      winningHand: message.reason
    });
  }

  private th_new_round(message: THNewRound) {
    this.setState({
      pot: 0,
      communityCards: [],
      winningHand: "",
      winningCards: []
    })
  }

  private checkCard(card: Card):boolean {
    for (let c of this.state.winningCards) {
      if (card.value===c.value && card.color===c.color)
        return true;
    }
    return false;
  }
}