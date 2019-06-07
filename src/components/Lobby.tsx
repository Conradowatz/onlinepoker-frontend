import * as React from 'react';

import '../styles/NameInput.css';
import {PokerClient} from "../pokerapi/PokerClient";

interface  State {
}

interface Props {
  api: PokerClient,
  id?: string
}

export default class Lobby extends React.Component<Props, State> {
    render() {
        return (
          <div>
          </div>
        )
    }
}