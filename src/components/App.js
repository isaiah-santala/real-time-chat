import React, { Component } from 'react'
import Messages from './Messages'
import Lobby from './Lobby'
import '../styles/styles.css'

const url = 'http://localhost:3001'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: 1,
      name: 'Bob',
      messages: []
    }
  }

  componentDidMount = () => this.fetchMessages()

  fetchMessages = () =>
    fetch(url + '/messages')
    .then(messages => messages.json())
    .then(messages => this.setState({ messages }))

  sendMessage = message => 
    fetch(url + '/messages/create', {
      method: 'POST',
      body: JSON.stringify({
        id: this.state.id,
        name: this.state.name,
        message
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(() => this.fetchMessages())
    .catch(err => console.log('err posting message' + err))

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
