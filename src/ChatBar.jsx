import React, {Component} from 'react';

class ChatBar extends Component {
  constructor(props){
    super(props);

    this.state = {
      content: '',
      currentUser: this.props.currentUser,
      oldUserName: this.props.currentUser
    };
  }

  onContent(event) {
    this.setState({
      content: event.target.value
    });
  }

  onKeyPress(event){
    if(event.key === 'Enter'){
      // check to see if user has changed their name before they sent a message
      if(this.state.oldUserName !== this.state.currentUser){
        this.props.changeUser(this.state.oldUserName, this.state.currentUser);
        this.setState({oldUserName: this.state.currentUser});
      }
      this.props.addMessage(this.state.content, this.state.currentUser);
      event.target.value = '';
    }
  }

  onNewUser(event){
    this.setState({
      currentUser: event.target.value
    });
  }

  onUserChange(event){
    if(event.key === 'Enter'){
      this.props.changeUser(this.state.oldUserName, this.state.currentUser);
      this.setState({oldUserName: this.state.currentUser});
    }
  }

  render(){
    return (
      <footer className="chatbar">
        <input className="chatbar-username"
          defaultValue={this.state.currentUser}
          onKeyPress={this.onUserChange.bind(this)}
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
