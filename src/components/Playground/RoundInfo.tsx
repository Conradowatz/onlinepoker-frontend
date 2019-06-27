import * as React from "react";
import {PokerClient} from "../../pokerapi/PokerClient";
import {THNewRound} from "../../pokerapi/messages/ApiObjects";

interface Props {
  api: PokerClient
}

interface State {
  smallBlind: number,
  bigBlind: number,
  hand: number
}

export default class RoundInfo extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      smallBlind: 0,
      bigBlind: 0,
      hand: 0
    };

    props.api.on("th_new_round", (message: THNewRound) => {
      this.setState({
        smallBlind: message.smallBlind,
        bigBlind: message.bigBlind,
        hand: message.hand
      })
    });
  }

  render() {
    return (
        <div id={"roundInfo"}>
          <p className={"blinds"}>{this.state.smallBlind}/{this.state.bigBlind}</p>
          <p className={"hand"}>Hand: {this.state.hand}</p>
        </div>
    );
  }
}