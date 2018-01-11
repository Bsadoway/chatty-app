import React, {Component} from 'react';

class Message extends Component {

  render() {

    if (this.props.type === 'incomingMessage') {
      return (
      <div className="message">
        <span className="message-username" style={{color:this.props.colour}}>{this.props.username}</span>
        <span className="message-content">{this.props.content}
          <p>{ this.props.image && <img src={this.props.image} alt='image'/> }</p>
        </span>
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
