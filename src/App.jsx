import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import NavBar from './NavBar.jsx';
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

  checkforUrl(message){
    const elements = message.content.split(' ');
    elements.forEach((item) =>{
      if(checkURL(item)){
        message.image = item;
        message.content = message.content.replace(item, '');
      }
    });
    return message;
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

    // handle incoming message if it is a normal message or a change to users connected
    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if(data.type){
        this.setState({
          messages: this.state.messages.concat(this.checkforUrl(data))
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
      <NavBar activeUserCount={this.state.activeUserCount}/>
      <MessageList messages={this.state.messages} />
      <ChatBar currentUser={this.state.currentUser.name} addMessage={this.addMessage.bind(this)} changeUser={this.changeUser.bind(this)}/>
    </div>);
  }
}

// checks if the message contains a picture url
function checkURL(url) {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
}
export default App;
