import * as React from "react";

interface Props {
  checked: boolean,
  onToggle: (checked: boolean) => void,
  disabled?: boolean
}

export default class ToggleSwitch extends React.Component<Props> {

  render() {
    return (
        <label className="switch">
          <input type="checkbox"
                 checked={this.props.checked}
                 onChange={(e) => this.props.onToggle(e.target.checked)}
                 disabled={this.props.disabled}/>
            <span className="switch-slider round"/>
        </label>
    );
  }
}

