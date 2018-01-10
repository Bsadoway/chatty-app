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
      activeUserCount: 0,
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
    if (!username) {
      username = "Anonymoose"
    }
    this.socket.send(JSON.stringify({type: "postNotification", content: `${username} has changed their name to ${newUsername}`}));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");
    console.log("Connected to Server");
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if(data.type){
        this.setState({
          messages: this.state.messages.concat(data)
        });
      } else {
        this.setState({
          activeUserCount: data.size
        });
      }
    }
  }

  render() {
    return (<div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="user-count">{this.state.activeUserCount} users online</p>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage.bind(this)} changeUser={this.changeUser.bind(this)}/>
    </div>);
  }
}
export default App;
