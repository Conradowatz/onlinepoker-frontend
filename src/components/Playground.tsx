import * as React from 'react';
import MyHand from "./MyHand";

export default class Playground extends React.Component {
    render() {
        return (
            <div>
                <div id="title">Texas Hold'em Poker</div>
                <div id="playground"></div>
            <MyHand/>
            </div>
        );
    }
}