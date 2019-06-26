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

    props.api.on("lobby_update", (lobby: Lobby) => {
      this.setState({
        players: Object.values(lobby.players)
      });
    });

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
}