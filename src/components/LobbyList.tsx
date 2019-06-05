import * as React from 'react';

import '../styles/NameInput.css';

interface  State {
    showNameInput: boolean
}

interface Props {
}

export default class LobbyList extends React.Component<Props, State> {
    constructor(props) {
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

    handleLobbyChosen(event: {target: HTMLInputElement}) {
        console.log("enter");
        console.log(event.target.value);
    }
}