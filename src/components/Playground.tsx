import * as React from 'react';
import MyHand from "./MyHand";
import Card from "./Card";

import '../styles/Playground.css';
import NameInput from "./NameInput";
import LobbyChooser from "./LobbyChooser";

interface state {
    showNameInput: boolean,
    showLobbyChooser: boolean,
}

interface props {

}

export default class Playground extends React.Component<props, state> {
    constructor(props: props) {
        super(props);
        this.state = {
            showNameInput: false,
            showLobbyChooser: true
        };
    }
    render() {
        const {showNameInput, showLobbyChooser } = this.state;
        return (
            <div>
                <div id={'title'}>Texas Hold'em Poker</div>
                <div id={'playground'}>
                    { showNameInput && <NameInput/> }
                    { showLobbyChooser && <LobbyChooser/> }
                    <Card/>
                </div>
                <MyHand/>
            </div>
        );
    }
}