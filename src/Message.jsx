import React, {Component} from 'react';

class Message extends Component {

  render() {
    const colour = this.props.colour;

    if (this.props.type === 'incomingMessage') {
      return (
      <div className="message">
        <span className="message-username" style={{color:colour}}>{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
      );
    }
    if (this.props.type === 'incomingNotification') {
      return (
      <div className="message system">
        {this.props.content}
      </div>
      );
    }
  }
}

export default Message;
