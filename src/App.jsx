import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {
        name: ''
      },
      messages: []
    };
  }

  addMessage(content, user) {
    if (!user) {
      user = "Anonymoose"
    }
    this.socket.send(JSON.stringify({type: "postMessage", username: user, content: content}));
  }

  changeUser(username, newUsername) {
    this.socket.send(JSON.stringify({type: "postNotification", content: `${username} has changed their name to ${newUsername}`}));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");
    console.log("Connected to Server");
    this.socket.onmessage = (event) => {
      // const data = event.data
      // switch (data.type) {
      //   case "incomingMessage":
      //     // handle incoming message
      //     break;
      //   case "incomingNotification":
      //     // handle incoming notification
      //     break;
      //   default:
      //     // show an error in the console if the message type is unknown
      //     throw new Error("Unknown event type " + data.type);
      // }

      this.setState({
        messages: this.state.messages.concat(JSON.parse(event.data))
      });
    }

  }

  render() {
    return (<div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage.bind(this)} changeUser={this.changeUser.bind(this)}/>
    </div>);
  }
}
export default App;
