import {PokerClient} from "../pokerapi/PokerClient";
import * as React from "react";
import {THYourTurn} from "../pokerapi/messages/ApiObjects";

interface Props {
  api: PokerClient,
  onGiveUp: () => void
}

interface State {
  availableOptions: string[],
  isGiveUpDialog: boolean,
  isRaiseDialog: boolean,
  isAllInDialog: boolean,
  timePercentage: number
}

export default class ActionButtonRow extends React.Component<Props, State> {

  private timerId?: number;
  private timeLeft: number;

  constructor(props: Props) {
    super(props);

    this.timeLeft = 0;
    this.state = {
      availableOptions: [],
      isGiveUpDialog: false,
      isRaiseDialog: false,
      isAllInDialog: false,
      timePercentage: 0
    };

    this.registerListeners();
  }

  render() {
    return (
      <div id={"actionButtonRow"}>
        <div id={"actionButtons"}>
          <button disabled={!this.state.availableOptions.includes("call")}>Call</button>
          <button disabled={!this.state.availableOptions.includes("fold")}>Fold</button>
          <button disabled={!this.state.availableOptions.includes("check")}>Check</button>
          <button disabled={!this.state.availableOptions.includes("raise")}>Raise</button>
          <button disabled={!this.state.availableOptions.includes("allin")}>All In</button>
          <button>Give Up</button>
        </div>
        <div id={"timeoutBar"}/>
      </div>
    );
  }

  private registerListeners() {

    this.props.api.on("th_your_turn", (message: THYourTurn) => {
      this.setState({
        availableOptions: message.options,
        timePercentage: message.timeout === 0 ? 0 : 100
      });
      if (message.timeout > 0) {
        this.timeLeft = message.timeout;
        this.timerId = window.setInterval(() => {
          this.timeLeft--;
          this.setState({
            timePercentage: (this.timeLeft/message.timeout)*100
          });
          if (this.timeLeft<=0 && this.timerId!==undefined) clearInterval(this.timerId);
        }, 1000);
      }
    });
  }
}