import * as React from 'react';

import '../styles/Dialog.css';
import Dialog from "./Dialog";

interface  State {
    name: string,
    isNameOk: boolean
}

interface Props {
    onJoin: (name: string) => void,
    onCancel: () => void
}

export default class JoinLobbyDialog extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            name: "",
            isNameOk: false
        };
    }

    render() {
        return (
            <Dialog
                children={
                    <div>
                        <p>Your Name:</p>
                        <input
                            type="text" autoFocus
                            onKeyPress={(e) => {if (e.key === "Enter") this.props.onJoin(this.state.name.trim())}}
                            value={this.state.name} onChange={(e) => this.checkName(e)}
                        />
                    </div>
                }
                buttons={[
                    <button disabled={!this.state.isNameOk} onClick={() => this.props.onJoin(this.state.name.trim())} key={1}>Join</button>,
                    <button onClick={this.props.onCancel} key={0}>Cancel</button>
                ]}
            />
        )
    }

    private checkName(e: React.ChangeEvent<HTMLInputElement>) {
        let name = e.target.value.substr(0, 20);
        this.setState({
            name: name,
            isNameOk: name.trim().length >= 1 && name.trim().length <= 20
        });
    }
}