import * as React from 'react';

import '../styles/NameInput.css';
import {PokerClient} from "../pokerapi/PokerClient";
import {FormEvent} from "react";

interface  State {
    showNameInput: boolean
}

interface Props {
    api: PokerClient
}

export default class LobbyList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showNameInput: false
        }
    }
    render() {
        return (
            <div id={'inputContainer'}>
                <div id={'description'}>Beitrittscode: </div>
                <input onSubmit={(event) => this.handleLobbyChosen(event)} type="text"/>
                <div id={"lobbyButtons"}>
                    <button>Lobby erstellen</button>
                    <button>Lobby beitreten</button>
                </div>
            </div>
        )
    }

    handleLobbyChosen(event: FormEvent<HTMLInputElement>) {
        console.log("enter");
        console.log(event);
    }
}