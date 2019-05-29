import * as React from 'react';
import MyHand from "./MyHand";
import Card from "./Card";

import '../styles/Playground.css';

export default class Playground extends React.Component {
    render() {
        return (
            <div>
                <div id="title">Texas Hold'em Poker</div>
                <div id="playground">
                    <Card/>
                </div>
            <MyHand/>
            </div>
        );
    }
}