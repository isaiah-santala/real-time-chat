import React, { Component } from 'react'
import Messages from './Messages'
import Lobby from './Lobby'
import '../styles/styles.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }
  }

  componentDidMount = () => this.fetchMessages()

  fetchMessages = () =>
    fetch('http://localhost:3001/messages')
    .then(messages => messages.json())
    .then(messages => messages.data)
    .then(messages => this.setState({ messages }))

  render = () => 
    <div className="App">
      <div className="Chat">
        <Messages messages={this.state.messages}/>
        <Lobby/>
      </div>
    </div>
}



export default App;
