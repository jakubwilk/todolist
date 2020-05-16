import React, { Component } from "react";

class ValidationMessage extends Component {
  render() {
    return (
      <div className={`message-box message-box-${this.props.type}`}>
        <p>{this.props.message}</p>
      </div>
    );
  }
}

export default ValidationMessage;