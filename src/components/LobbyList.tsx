import * as React from 'react';

import '../styles/NameInput.css';
import {PokerClient} from "../pokerapi/PokerClient";

interface  state {
}

interface props {
  api: PokerClient;
}

export default class LobbyList extends React.Component<props, state> {
    render() {
        return (
            <div id={'inputContainer'}>
                <div id={'description'}>Beitrittscode: </div>
                <input type="text"/>
                <div id={"lobbyButtons"}>
                    <button>Lobby erstellen</button>
                    <button>Lobby beitreten</button>
                </div>
            </div>
        )
    }
}