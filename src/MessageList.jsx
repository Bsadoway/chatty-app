import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
  render() {
    return (
      <main className="messages">
        {this.props.messages.map(message => (
          <Message
            key={message.id}
            type={message.type}
            username={message.username}
            content={message.content}
            colour={message.colour}
            image={message.image}/>
        ))}
      </main>
    );
  }
}

export default MessageList;
