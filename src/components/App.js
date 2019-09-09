import React, { Component } from 'react'
import Messages from './Messages'
import Lobby from './Lobby'
import '../styles/styles.css'

import exampleMessages from '../example'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: exampleMessages
    }
  }

  render = () => 
    <div className="App">
      <div className="Chat">
        <Messages messages={this.state.messages}/>
        <Lobby/>
      </div>
    </div>
}



export default App;
