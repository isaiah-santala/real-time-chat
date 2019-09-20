import React, { Component } from 'react'
import '../styles.css'

import Login from './Login/Login'
import Chat from './Chat/Chat'

import { subscribeToMessages, postMessage, postLogin } from '../api'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'Thomas',
      messages: []
    }

    subscribeToMessages(messages => this.setState({ messages }))
  }

  handleLogin = credentials => console.log(credentials)
  handleSignUp = credentials => console.log(credentials)

  sendMessage = message => {
    postMessage(JSON.stringify({
      username: this.state.username,
      message: message
    }))
  }

  render = () => 
    <div className="App">
      <Login 
        handleLogin={this.handleLogin}
        handleSignUp={this.handleSignUp}
      ></Login>
      {/* <Chat 
        messages={this.state.messages}
        sendMessage={this.sendMessage}
      /> */}
    </div>
}

export default App;
