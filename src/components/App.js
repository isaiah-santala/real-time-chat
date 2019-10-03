import React, { Component } from 'react'
import '../styles.css'

import Login from './Login/Login'
import Chat from './Chat/Chat'

import { authenticateUser, postMessage, loginUser } from '../api'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userId: 0,
      username: '',
      messages: [],
      lobby: [],
      view: ''
    }
  }

  componentDidMount() {
    authenticateUser(this.changeView, this.loadMessages, this.setUser, this.loadLobby, this.setStateFromApi)
  }

  handleLogin = (loginType, userCredentials) => loginUser(loginType, userCredentials)

  loadMessages = messages => this.setState({ messages })

  changeView = view => this.setState({ view })

  setUser = user => this.setState({ user })

  loadLobby = lobby => this.setState({ lobby })

  sendMessage = message => postMessage({
      username: this.state.username,
      message: message
  })
  

  render = props => (

    <div className="App">

      {this.state.view === 'LOGIN' &&
        <Login
          handleLogin={this.handleLogin}
        />
      }

      {this.state.view === 'CHAT' &&
        <Chat
          messages={this.state.messages}
          lobby={this.state.lobby}
          sendMessage={this.sendMessage}
        />
      }

    </div>
  )
}

export default App;
