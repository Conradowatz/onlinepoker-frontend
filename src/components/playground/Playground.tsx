import * as React from "react";
import "../../styles/playground/Playground.css";
import {THPlayer, THPlayerAction, THStartGame} from "../../pokerapi/messages/ApiObjects";
import {PokerClient} from "../../pokerapi/PokerClient";
import ActionButtonRow from "./ActionButtonRow";
import RoundInfo from "./RoundInfo";
import ActivePlayerList from "./ActivePlayerList";
import TableCenter from "./TableCenter";
import MyHand from "./MyHand";


interface Props {
  startEvent?: THStartGame,
  spectate: boolean,
  api: PokerClient,
  onLost: () => void
}

export default class Playground extends React.Component<Props> {

  componentDidMount(): void {
    this.registerListeners();
  }

  render() {
    return (
      <div id={"playground"}>
        <RoundInfo api={this.props.api}/>
        <div id={"tableContainer"}>
          <div id={"table"}>
            <TableCenter api={this.props.api} />
          </div>
          <ActivePlayerList api={this.props.api} />
        </div>
        {!this.props.spectate &&
          <ActionButtonRow api={this.props.api} onGiveUp={() => this.props.onLost()} />
        }
        {!this.props.spectate && this.props.startEvent !== undefined &&
          <MyHand api={this.props.api} myId={this.props.startEvent.players[this.props.startEvent.yourIndex].id}/>
        }
      </div>
    );
  }

  private registerListeners() {

    this.th_end_game = this.th_end_game.bind(this);
    this.props.api.addListener("th_end_game", this.th_end_game);
    this.th_lost = this.th_lost.bind(this);
    this.props.api.addListener("th_lost", this.th_lost);
  }

  componentWillUnmount(): void {
    this.props.api.removeListener("th_end_game", this.th_end_game);
    this.props.api.removeListener("th_lost", this.th_lost);
  }

  private th_end_game(winner: THPlayer) {

  }

  private th_lost() {
    this.props.onLost();
  }

}