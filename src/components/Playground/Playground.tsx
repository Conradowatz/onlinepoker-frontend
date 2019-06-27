import * as React from "react";
import "../../styles/Playground.css";
import {
  Card, THAction,
  THCommunityCard, THEndRound,
  THNewRound,
  THPlayer,
  THPlayerAction,
  THStartGame
} from "../../pokerapi/messages/ApiObjects";
import {PokerClient} from "../../pokerapi/PokerClient";
import CardComponent from "./CardComponent";
import THPlayerTile from "./THPlayerTile";
import ActionButtonRow from "./ActionButtonRow";
import RoundInfo from "./RoundInfo";
import ActivePlayerList from "./ActivePlayerList";


interface Props {
  startEvent: THStartGame,
  spectate: boolean,
  api: PokerClient,
  leaveGame: () => void
}

interface State {
  myIndex: number,
  myCards: Card[],
  communityCards: Card[],
  pot: number
}

export default class Playground extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      myIndex: props.startEvent.yourIndex,
      myCards: [],
      communityCards: [],
      pot: 0
    };

    this.registerListeners();
  }

  render() {
    return (
      <div id={"playground"}>
        <RoundInfo api={this.props.api}/>
        <div id={"tableContainer"}>
          <div id={"table"}>
            <div id={"communityCards"}>
              {this.state.communityCards.map((c, i) =>
                  <CardComponent hidden={false} key={i} value={c.value} color={c.color}/>
              )}
            </div>
          </div>
          <ActivePlayerList api={this.props.api} />
        </div>
        {!this.props.spectate &&
          <ActionButtonRow api={this.props.api} onGiveUp={() => this.props.leaveGame()} />
        }
        <div id={"myCards"}>
          {this.state.myCards.map((c, i) =>
              <CardComponent hidden={false} value={c.value} color={c.color} key={i}/>
          )}
        </div>
      </div>
    );
  }

  private registerListeners() {

    this.props.api.on("th_new_round", (event: THNewRound) => {
      this.setState({
        myCards: event.yourCards
      });
    });

    this.props.api.on("th_player_action", (event: THPlayerAction) => {

    });

    this.props.api.on("th_community_card", (event: THCommunityCard) => {
      this.setState({
        communityCards: event.communityCards
      });
    });

    this.props.api.on("th_end_round", (event: THEndRound) => {

    });

    this.props.api.on("th_end_game", (event: THPlayer) => {

    });

  }

  private takeAction(action: "call" | "fold" | "check" | "raise" | "allin" | "giveup", value?: number) {
    let request: THAction = {
      action: action,
      value: value
    };
    this.props.api.sendMessage("th_action", request);
  }

}