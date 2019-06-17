import * as React from "react";
import {Player} from "../pokerapi/messages/ApiObjects";
import PlayerTile from "./PlayerTile";

interface Props {
  players: Player[]
}

export default class PlayerList extends React.Component<Props> {

  render() {
    return (
      <div id={"playerList"}>
        {
          this.props.players.map(p => (
            <PlayerTile player={p} key={p.id}/>
          ))
        }
      </div>
    );
  }
}