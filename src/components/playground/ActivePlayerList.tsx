import * as React from "react";
import {PokerClient} from "../../pokerapi/PokerClient";
import THPlayerTile from "./THPlayerTile";
import {
  Card,
  THCommunityCard, THEndRound,
  THNewRound,
  THPlayer,
  THPlayerAction
} from "../../pokerapi/messages/ApiObjects";
import "../../styles/playground/ActivePlayerList.css";
import Scrollbars from 'react-custom-scrollbars';

interface Props {
  api: PokerClient
}

interface State {
  players: THPlayer[],
  turn: number, //id of the player who's turn it is
  winners: number[], //ids of the players who won
  bigBlindPlayer: number,
  smallBlindPlayer: number,
  winnerCards: Card[]
}

export default class ActivePlayerList extends React.Component<Props, State> {

  private scrollContainer: Scrollbars | null;

  constructor(props: Props) {
    super(props);

    this.state = {
      bigBlindPlayer: 0,
      players: [],
      smallBlindPlayer: 0,
      turn: -1,
      winners: [],
      winnerCards: []
    };

    this.scrollContainer = null;
  }

  componentDidMount(): void {
    this.registerListeners();
  }

  render() {
    return (
      <div id={"playerScrollContainer"}>
        <Scrollbars ref={(s) => this.scrollContainer = s}>
          <div id={"playerContainer"}>
            { this.state.players.map((p) =>
                <THPlayerTile player={p} showCards={p.cards.length>0} key={p.id}
                              isWinner={this.state.winners.includes(p.id)}
                              iActive={this.state.turn===p.id}
                              isBigBlind={this.state.bigBlindPlayer===p.id}
                              isSmallBlind={this.state.smallBlindPlayer===p.id}
                              winningCards={this.state.winnerCards}/>)
            }
          </div>
        </Scrollbars>
      </div>
    );
  }

  private registerListeners() {
    this.th_new_round = this.th_new_round.bind(this);
    this.props.api.addListener("th_new_round", this.th_new_round);
    this.th_player_action = this.th_player_action.bind(this);
    this.props.api.addListener("th_player_action", this.th_player_action);
    this.th_community_card = this.th_community_card.bind(this);
    this.props.api.addListener("th_community_card", this.th_community_card);
    this.th_end_round = this.th_end_round.bind(this);
    this.props.api.addListener("th_end_round", this.th_end_round);
  }

  componentWillUnmount(): void {
    this.props.api.removeListener("th_new_round", this.th_new_round);
    this.props.api.removeListener("th_player_action", this.th_player_action);
    this.props.api.removeListener("th_community_card", this.th_community_card);
    this.props.api.removeListener("th_end_round", this.th_end_round);
  }

  private th_new_round(message: THNewRound) {
    this.setState({
      winners: [],
      players: message.players,
      bigBlindPlayer: message.bigBlindPlayer,
      smallBlindPlayer: message.smallBlindPlayer,
      winnerCards: []
    });
  }

  private th_player_action(message: THPlayerAction) {
    if (message.action==="turn") {
      this.setState({
        turn: message.player.id
      });
      if (this.scrollContainer !== null) {
        let ration = message.player.index/this.state.players.length;
        this.scrollContainer.scrollLeft(ration*this.scrollContainer.getScrollWidth());
      }
    } else {
      let players = this.state.players.slice();
      players[message.player.index] = message.player;
      this.setState({
        players: players,
        turn: -1
      })
    }
  }

  private th_community_card(message: THCommunityCard) {
    this.setState({
      players: message.players
    })
  }

  private th_end_round(message: THEndRound) {
    this.setState({
      players: message.players,
      winners: message.winners.map((p) => p.id),
      winnerCards: message.winningCards
    })
  }
}