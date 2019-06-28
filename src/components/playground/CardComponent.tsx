import * as React from 'react';
import colorD from "../../assets/color_d.png";
import colorC from "../../assets/color_c.png";
import colorH from "../../assets/color_h.png";
import colorS from "../../assets/color_s.png";

import '../../styles/playground/CardComponent.css';

interface props {
  hidden: boolean,
  value: string,
  color: string
}

export default class CardComponent extends React.Component<props> {
    render() {
        return (
            <div className={"cardContainer"}>
              { this.props.hidden && <div className={'Card_back'}/>}
              {!this.props.hidden &&
                <div className={'Card_front'}>
                  <p>{this.props.value}</p>
                  <img src={this.getColorImg()} alt={this.props.color}/>
                </div>
              }
            </div>
        )
    }

    getColorImg() {
      switch (this.props.color) {
        case "D": return colorD;
        case "C": return colorC;
        case "H": return colorH;
        default: return colorS;
      }
  }
}