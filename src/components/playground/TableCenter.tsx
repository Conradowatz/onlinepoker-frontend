import * as React from "react";
import {PokerClient} from "../../pokerapi/PokerClient";
import CardComponent from "./CardComponent";
import {Card, THCommunityCard} from "../../pokerapi/messages/ApiObjects";
import chipPot from "../../assets/chip_pot_sprite.png";
import "../../styles/playground/TableCenter.css"

interface Props {
  api: PokerClient
}

interface State {
  communityCards: Card[],
  pot: number
}

export default class TableCenter extends React.Component<Props, State>{

  constructor(props: Props) {
    super(props);

    this.state = {
      communityCards: [],
      pot: 0
    };

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
                <CardComponent hidden={false} key={i} value={c.value} color={c.color}/>
            )}
          </div>
        </div>
    );
  }

  private registerListeners() {

    this.props.api.on("th_community_card", (message: THCommunityCard) => {
      this.setState({
        communityCards: message.communityCards,
        pot: message.pot
      });
    });
  }
}