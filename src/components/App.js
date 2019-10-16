import React, { Component } from 'react'
import '../styles.css'

import Login from './Login/Login'
import Chat from './Chat/Chat'

import { authenticateUser, postMessage, loginUser, logout } from '../api'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user : {
        userId: 0,
        username: ''
      }, 
      messages: [],
      lobby: [],
      view: ''
    }
  }

  componentDidMount() {
    authenticateUser(this.setStateFromApi)
  }

  handleLogin = (loginType, userCredentials) => loginUser(loginType, userCredentials)

  setStateFromApi = (key, val) => this.setState({ [key] : val })

  sendMessage = message => postMessage({
      username: this.state.user.username,
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
          user={this.state.user}
          lobby={this.state.lobby}
          sendMessage={this.sendMessage}
          logout={logout}
        />
      }

    </div>
  )
}

export default App;
