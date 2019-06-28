import * as React from 'react';
import colorD from "../../assets/color_d.png";
import colorC from "../../assets/color_c.png";
import colorH from "../../assets/color_h.png";
import colorS from "../../assets/color_s.png";

import '../../styles/playground/CardComponent.css';

interface Props {
  hidden: boolean,
  value: string,
  color: string,
  highlighted: boolean
}

export default class CardComponent extends React.Component<Props> {
    render() {
        return (
            <div className={"cardContainer"}>
              { this.props.hidden && <div className={"Card_back"}/>}
              {!this.props.hidden &&
                <div className={this.props.highlighted?"Card_front highlighted":"Card_front"}>
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