import * as React from "react";
import {Player} from "../pokerapi/messages/ApiObjects";

interface Props {
  player: Player
}

export default class PlayerTile extends React.Component<Props> {

  render() {
    return (
      <div className={"playerTile"}>
        <p className={"name"}>{this.props.player.name}</p>
        <p className={"id"}>{this.props.player.id}</p>
      </div>
    );
  }
}