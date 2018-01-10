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

    if(!user){
      user = "Anonymoose"
    }

    this.socket.send(JSON.stringify({username: user, content: content}));
  }

  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001", "protocolOne");
    console.log("Connected to Server");
    this.socket.onmessage = (event) => {
      this.setState({messages: this.state.messages.concat(JSON.parse(event.data))});
    }

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
