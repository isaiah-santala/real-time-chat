import React, { Component } from 'react'
import '../styles.css'

import Login from './Login/Login'
import Chat from './Chat/Chat'

import { authenticateUser, postMessage, loginExistingUser, signUpNewUser } from '../api'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: 'Thomas',
      messages: [],
      view: ''
    }
  }

  componentDidMount() {
    authenticateUser(this.changeView, this.loadMessages)
  }

  handleLogin = credentials => loginExistingUser(credentials)
  handleSignUp = credentials => signUpNewUser(credentials)

  loadMessages = messages => this.setState({ messages })
  changeView = view => this.setState({ view })

  sendMessage = message => {
    postMessage({
      username: this.state.username,
      message: message
    })
  }  

  render = () => 
    <div className="App">
      {this.state.view === 'LOGIN' && 
        <Login 
          handleLogin={this.handleLogin}
          handleSignUp={this.handleSignUp}
        ></Login>
      }
      {this.state.view === 'CHAT' &&
        <Chat 
          messages={this.state.messages}
          sendMessage={this.sendMessage}
        />
      }
    </div>
}

export default App;
