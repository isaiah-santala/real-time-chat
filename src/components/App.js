import React, { Component } from 'react'
import '../styles.css'

import Login from './Login/Login'
import Chat from './Chat/Chat'

import { subscribeToMessages, postMessage } from '../api'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 0,
      name: 'Thomas',
      messages: []
    }

    subscribeToMessages(messages => this.setState({ messages }))
  }

  sendMessage = message => {
    postMessage(JSON.stringify({
      id: this.state.id,
      name: this.state.name,
      message: message
    }))
  }

  render = () => 
    <div className="App">
      <Login></Login>
      {/* <Chat 
        messages={this.state.messages}
        sendMessage={this.sendMessage}
      /> */}
    </div>
}

export default App;
