import {PokerClient} from "../pokerapi/PokerClient";
import * as React from "react";
import {THAction, THYourTurn} from "../pokerapi/messages/ApiObjects";
import Dialog from "./Dialog";

interface Props {
  api: PokerClient,
  smallBlind: number,
  money: number,
  bet: number,
  onGiveUp: () => void
}

interface State {
  availableOptions: string[],
  isGiveUpDialog: boolean,
  isRaiseDialog: boolean,
  isAllInDialog: boolean,
  timePercentage: number,
  value: number
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
      timePercentage: 0,
      value: props.smallBlind
    };

    this.registerListeners();
  }

  render() {
    return (
      <div id={"actionButtonRow"}>
        <div id={"actionButtons"}>
          <button disabled={!this.state.availableOptions.includes("call")}
            onClick={() => this.takeAction("call")}>Call</button>
          <button disabled={!this.state.availableOptions.includes("fold")}
            onClick={() => this.takeAction("fold")}>Fold</button>
          <button disabled={!this.state.availableOptions.includes("check")}
            onClick={() => this.takeAction("check")}>Check</button>
          <button disabled={!this.state.availableOptions.includes("raise")}
            onClick={() => this.setState({isRaiseDialog: true})}>{this.props.bet>0?"Raise...":"Bet..."}</button>
          <button disabled={!this.state.availableOptions.includes("allin")}
            onClick={() => this.setState({isAllInDialog: true})}>All In…</button>
          <button onClick={() => this.setState({isGiveUpDialog: true})}>Give Up…</button>
        </div>
        <div id={"timeoutBar"}/>
        {this.state.isGiveUpDialog &&
            <Dialog buttons={[
                <button onClick={() => this.props.onGiveUp()}>Give Up!</button>,
                <button onClick={() => this.setState({isGiveUpDialog: false})}>Cancel</button>
            ]} message={"Are you sure?"} title={"Give up..."}/>
        }
        {this.state.isRaiseDialog &&
        <Dialog buttons={[
          <button onClick={() => {this.takeAction("raise"); this.setState({isRaiseDialog: false})}}>{this.props.bet>0?"Raise":"Bet"}</button>,
          <button onClick={() => this.setState({isRaiseDialog: false})}>Cancel</button>
        ]} message={"How much do you want to bet?"} title={this.props.bet>0?"Raise...":"Bet..."}
        children={
          <div>
            <input type={"range"} min={this.props.smallBlind} max={this.props.money} value={this.state.value} onChange={(e) => this.setState({value: Number.parseInt(e.target.value)})}/>
            <input type={"number"} min={this.props.smallBlind} max={this.props.money} value={this.state.value} onChange={(e) => this.setState({value: Number.parseInt(e.target.value)})}/>
          </div>
        }/>
        }
        {this.state.isAllInDialog &&
        <Dialog buttons={[
          <button onClick={() => {this.takeAction("allin"); this.setState({isAllInDialog: false})}}>All In!</button>,
          <button onClick={() => this.setState({isAllInDialog: false})}>Cancel</button>
        ]} message={"You will bet all your chips. Are you sure?"} title={"All In..."}/>
        }
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

  private takeAction(action: "call"|"fold"|"check"|"raise"|"allin"|"giveup", value?: number) {
    let message:THAction = {
      action: action,
      value: value
    };
    this.props.api.sendMessage("th_action", message);
    this.setState({availableOptions: []});
  }
}