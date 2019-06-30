import * as React from "react";
import {Lobby, Player} from "../pokerapi/messages/ApiObjects";
import PlayerTile from "./PlayerTile";
import {PokerClient} from "../pokerapi/PokerClient";

interface Props {
  players: Player[],
  api: PokerClient
}

interface State {
  players: Player[]
}

export default class PlayerList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      players: props.players
    };
  }

  componentDidMount(): void {
    this.registerListeners();
  }

  render() {
    return (
      <div id={"playerList"}>
        {
          this.state.players.map(p => (
            <PlayerTile player={p} key={p.id}/>
          ))
        }
      </div>
    );
  }

  private registerListeners() {
    this.lobby_update = this.lobby_update.bind(this);
    this.props.api.addListener("lobby_update", this.lobby_update);
  }

  componentWillUnmount(): void {
    this.props.api.removeListener("lobby_update", this.lobby_update);
  }

  private lobby_update(message: Lobby) {
    this.setState({
      players: Object.values(message.players)
    });
  }
}