import React, { Component } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'

class Login extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      view: 'LOGIN'
    }
  }

  chandView = view => this.setState({ view })

  render = () => 
    <div className="Login">
      {this.state.view === 'LOGIN' &&
        <SignIn 
          handleLogin={this.props.handleLogin}
          chandView={this.chandView}
        />}
      {this.state.view === 'SIGNUP' && 
        <SignUp 
          handleSignUp={this.props.handleSignUp}
          chandView={this.chandView}
        />}
    </div>
}

export default Login