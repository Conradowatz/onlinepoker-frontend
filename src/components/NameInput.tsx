import * as React from 'react';

import '../styles/NameInput.css';

interface  state {
}

interface props {

}

export default class NameInput extends React.Component<props, state> {
    render() {
        return (
            <div id={'inputContainer'}>
                <div id={'description'}>Bitte gib deinen Namen ein: </div>
                <input type="text" onKeyPress={(event) => this.handleNameInput(event)}/>
            </div>
        )
    }
    handleNameInput(event: React.KeyboardEvent) {
        if(event.key === 'Enter'){
            console.log("enter");
        }
    }
}