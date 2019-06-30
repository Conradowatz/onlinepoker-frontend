import * as React from "react";
import "../../styles/playground/Playground.css";
import {THPlayer, THStartGame} from "../../pokerapi/messages/ApiObjects";
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

    this.props.api.on("th_end_game", (event: THPlayer) => {

    });

  }

}