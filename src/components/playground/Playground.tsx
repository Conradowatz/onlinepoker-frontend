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
  startEvent: THStartGame,
  spectate: boolean,
  api: PokerClient,
  leaveGame: () => void
}

interface State {

}

export default class Playground extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {

    };

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
          <ActionButtonRow api={this.props.api} onGiveUp={() => this.props.leaveGame()} />
        }
        {!this.props.spectate &&
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