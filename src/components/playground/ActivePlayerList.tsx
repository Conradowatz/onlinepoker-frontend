import * as React from "react";
import {PokerClient} from "../../pokerapi/PokerClient";
import THPlayerTile from "./THPlayerTile";
import {
  THCommunityCard,
  THNewRound,
  THPlayer,
  THPlayerAction
} from "../../pokerapi/messages/ApiObjects";
import "../../styles/playground/ActivePlayerList.css"

interface Props {
  api: PokerClient
}

interface State {
  players: THPlayer[],
  turn: number,
  bigBlindPlayer: number,
  smallBlindPlayer: number
}

export default class ActivePlayerList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      bigBlindPlayer: 0,
      players: [],
      smallBlindPlayer: 0,
      turn: 0
    };

    this.registerListeners();
  }

  render() {
    return (
        <div id={"playerContainer"}>
          { this.state.players.map((p) =>
              <THPlayerTile player={p} showCards={false} key={p.id}
                            iActive={this.state.turn===p.id}
                            isBigBlind={this.state.bigBlindPlayer===p.id}
                            isSmallBlind={this.state.smallBlindPlayer===p.id}/>)
          }
        </div>
    );
  }

  private registerListeners() {

    this.props.api.on("th_new_round", (message: THNewRound) => {
      this.setState({
        players: message.players,
        bigBlindPlayer: message.bigBlindPlayer,
        smallBlindPlayer: message.smallBlindPlayer
      });
    });

    this.props.api.on("th_player_action", (message: THPlayerAction) => {
      if (message.action==="turn") {
        this.setState({
          turn: message.player.id
        });
      } else if (message.action==="giveup") {
        //todo find better method, e.g. givenup attribute
        this.setState({
          players: this.state.players.splice(message.player.index, 1)
        });
      } else {
        let players = this.state.players.slice();
        players[message.player.index] = message.player;
        this.setState({
          players: players
        })
      }
    });

    this.props.api.on("th_community_card", (message: THCommunityCard) => {
      this.setState({
        players: message.players
      })
    });
  }
}