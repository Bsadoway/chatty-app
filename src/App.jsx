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
      messages: [
        {
          id: 1,
          username: "bob",
          content: "has anyone seen my marbles?"
        }, {
          id: 2,
          username: "anonymouse",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
  }

  addMessage(content, user) {
    const newMessage = {
      id: Math.random(),
      username: user,
      content: content
    };
    this.socket.send(JSON.stringify({user: user, content:content}));
    // this.setState({messages: this.state.messages.concat(newMessage)});
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");
    console.log("Connected to Server");

  }

  render() {
    return (<div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage.bind(this)}/>
    </div>);
  }
}
export default App;
