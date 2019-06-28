import React from "react";

interface State {

}

interface Props {
  title?: string,
  message?: string,
  children?: React.ReactElement,
  buttons: React.ReactElement[]
}

export default class Dialog extends React.Component<Props, State> {

  render() {
    return (
        <div className={"dialog"}>
          {this.props.title !== undefined && <h2>{this.props.title}</h2>}
          {this.props.message !== undefined && <p>{this.props.message}</p>}
          {this.props.children !== undefined && this.props.children}
          {this.props.buttons}
        </div>
    );
  }
}