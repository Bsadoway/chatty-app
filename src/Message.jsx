import React, {Component} from 'react';

class Message extends Component {
  render() {

    if (this.props.type === 'incomingMessage') {
      return (<div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>);
    }
    if (this.props.type === 'incomingNotification') {
      return (<div class="message system">
        {this.props.content}
      </div>);
    }
  }
}

  export default Message;

  // <div className="message system">
  //   Anonymous1 changed their name to nomnom.
  // </div>
