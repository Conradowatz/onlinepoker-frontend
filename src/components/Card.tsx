import * as React from 'react';

import '../styles/Card.css';

interface  state {
}

interface props {

}

export default class Card extends React.Component<props, state> {
    render() {
        //const { myCoins } = this.state;
        return (
            <div className={'Card_card'}>
                    <div className={'Card_back'}></div>
                    <div className={'Card_front'}></div>
            </div>
        )
    }
}