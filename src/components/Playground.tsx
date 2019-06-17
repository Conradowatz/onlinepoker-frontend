import * as React from "react";
import "../styles/Playground.css";
import {
  Card, THAction,
  THCommunityCard, THEndRound,
  THNewRound,
  THPlayer,
  THPlayerAction,
  THStartGame,
  THYourTurn
} from "../pokerapi/messages/ApiObjects";
import {PokerClient} from "../pokerapi/PokerClient";


interface Props {
  startEvent: THStartGame,
  api: PokerClient
}

interface State {
  players: THPlayer[],
  myCards: Card[],
  communityCards: Card[],
  pot: number,
  turn: number,
  hand: number,
  smallBlind: number,
  bigBlind: number,
  smallBlindPlayer: number,
  bigBlindPlayer: number
}

export default class Playground extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      players: props.startEvent.players,
      myCards: [],
      communityCards: [],
      pot: 0,
      turn: 0,
      hand: 0,
      smallBlind: 0,
      bigBlind: 0,
      smallBlindPlayer: 0,
      bigBlindPlayer: 0
    };

    this.registerListeners();
  }

  render() {
    return (
      <div id={"playground"}>
        <div id={"roundInfo"}>
          <p className={"blinds"}>{this.state.smallBlind}/{this.state.bigBlind}</p>
          <p className={"hand"}>Hand: {this.state.hand}</p>
        </div>
        <div id={"actionButtons"}>
          <button>Call</button>
          <button>Fold</button>
          <button>Check</button>
          <button>Raise</button>
          <button>All In</button>
          <button>Give Up</button>
        </div>
      </div>
    );
  }

  private registerListeners() {

    this.props.api.on("th_new_round", (event: THNewRound) => {
      this.setState({
        players: event.players,
        myCards: event.yourCards,
        hand: event.hand,
        smallBlind: event.smallBlind,
        bigBlind: event.bigBlind,
        smallBlindPlayer: event.smallBlindPlayer,
        bigBlindPlayer: event.bigBlindPlayer
      });
    });

    this.props.api.on("th_player_action", (event: THPlayerAction) => {

    });

    this.props.api.on("th_your_turn", (event: THYourTurn) => {

    });

    this.props.api.on("th_community_card", (event: THCommunityCard) => {

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