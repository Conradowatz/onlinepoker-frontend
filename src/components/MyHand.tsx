import * as React from 'react';

import '../styles/MyHand.css';

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
                <button className="MyHand_btn" id="btnFold"></button>
                <button className="MyHand_btn" id="btnCheck"></button>
                <button className="MyHand_btn" id="btnRaise"></button>
                <div id="mySeat">
                    <div className="MyHand_card"></div>
                    <div className="MyHand_card"></div>
                    <div id="myCoins"><img id="chipImage" src="../assets/chip.png" alt={""}/>{this.state.myCoins}</div>
                </div>
            </div>

        )
    }
}