import React, { Component } from 'react'
import Messages from './Messages'
import Lobby from './Lobby'

import '../styles/styles.css'
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
      <div className="Chat">
        <Messages 
          messages={this.state.messages}
          sendMessage={this.sendMessage}
        />
        <Lobby/>
      </div>
    </div>
}

export default App;
