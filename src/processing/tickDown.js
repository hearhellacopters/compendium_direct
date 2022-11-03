import React from "react";

import Tick from "@pqina/flip";
import './tickDown.css'

export default class Flip extends React.Component {
  constructor(props) {
    super(props);
    this._tickRef = React.createRef();
  }

  componentDidMount() {
    this._tickInstance = Tick.DOM.create(this._tickRef.current, {
      value: this.props.value,
      view:
    // definition for top level tick element
    {
        children:[
            // presenter object
            {
                root: 'div',
                children: [
                    // presenter object
                    {
                        view: 'flip'
                    }
                ]
            }
        ]
    }
  });
}

  componentDidUpdate() {
    if (!this._tickInstance) return;
    this._tickInstance.value = this.props.value;
  }

  componentWillUnmount() {
    if (!this._tickInstance) return;
    Tick.DOM.destroy(this._tickRef.current);
  }

  render() {
    return (
      <div key={this._tickRef} ref={this._tickRef} className="tick">
      </div>
    );
  }
}
