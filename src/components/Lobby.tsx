import * as React from 'react';

import '../styles/NameInput.css';
import {PokerClient} from "../pokerapi/PokerClient";

interface  state {
}

interface props {
  api: PokerClient;
}

export default class Lobby extends React.Component<props, state> {
    render() {
        return (
          <div>
          </div>
        )
    }
}