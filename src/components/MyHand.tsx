import * as React from 'react';

interface  state {
    myCoins: number;
}

interface props {

}

export default class MyHand extends React.Component<props, state> {
    constructor(props: MyHand) {
        super(props);
        this.state = {
            myCoins: 12345
        };
    }
    render() {
        //const { myCoins } = this.state;
        return (
            <div>
                <button className="btn" id="btnFold"></button>
                <button className="btn" id="btnCheck"></button>
                <button className="btn" id="btnRaise"></button>
                <div id="mySeat">
                    <div className="card"></div>
                    <div className="card"></div>
                    <div id="myCoins"><img id="chipImage" src="../assets/chip.png" alt={""}/>{this.state.myCoins}</div>
                </div>
            </div>

        )
    }
}