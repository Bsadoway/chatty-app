import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      content: '',
      currentUser: this.props.currentUser
    };
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  onKeyPress(event){
    if(event.key === 'Enter'){
      this.props.addMessage(this.state.content, this.state.currentUser);
      event.target.value = '';
    }
  }

  onNewUser(event){
    this.setState({
      currentUser: event.target.value
    });
  }

  render(){
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          defaultValue={this.state.currentUser}
          onInput={this.onNewUser.bind(this)}
          placeholder="Your Name (Optional)" />
        <input className="chatbar-message"
          onKeyPress={this.onKeyPress.bind(this)}
          onInput={ this.onContent.bind(this) }
          placeholder="Type a message and hit ENTER"
        />
      </footer>
    );
  }
}

export default ChatBar;
