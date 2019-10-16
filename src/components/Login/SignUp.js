import React, { Component } from 'react'

import { checkIfUsernameIsValid } from '../../api'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password1: '',
      password2: '',
      usernameIsValid: false
    }
  }

  usernameIsValid = () => this.setState({ usernameIsValid: true })

  handleChange = ({ target }) => this.setState({ [target.id]: target.value })

  handleChangeUserName = ({ target }) => this.setState({
    [target.id]: target.value,
    usernameIsValid: false
  }, () => checkIfUsernameIsValid(this.state.username, this.usernameIsValid))

  handleSubmit = (credentials) => {
    if (credentials.password1 !== credentials.password2) alert('passwords must match') 
    else this.props.handleLogin('NEW', credentials)
  }

  render = () => (

    <form onSubmit={e => {
      e.preventDefault()

      if (!this.state.usernameIsValid) alert('username taken')

      else this.handleSubmit({
        username: this.state.username,
        password: this.state.password1
      })
    }}>

      <div className="inputs">

        <div className="login-title">Sign Up</div>

        <label htmlFor="username">username</label>
        <input
          required
          id='username'
          type="text"
          autoComplete="username"
          className={this.state.usernameIsValid ? 'valid-input' : ''}
          value={this.state.username}
          onChange={this.handleChangeUserName}
        ></input>

        <label htmlFor="password1">password</label>
        <input
          required
          id="password1"
          type="password"
          autoComplete="new-password"
          value={this.state.password1}
          onChange={this.handleChange}
        ></input>

      <label htmlFor="password2">confirm password</label>
      <input
        required
        id="password2"
        type="password"
        autoComplete="new-password"
        value={this.state.password2}
        onChange={this.handleChange}
      ></input>
      </div>

      <div className="buttons">

        <button 
          type="submit"
        >sign up</button>

        <button 
          onClick={() => this.props.chandView('LOGIN')}
        >return to login</button>
        
      </div>

    </form>
  )
}

export default SignUp