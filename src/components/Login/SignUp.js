import React, { Component } from 'react'

class SignUp extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password1: '',
      password2: ''
    }
  }


  handleChange = e => {
    const { id, value } = e.target
    this.setState({
      [id]: value
    })
  }

  handleSubmit = credentials => {
    if (credentials.password1 !== credentials.password2) alert('passwords must match')
    else this.props.handleSignUp(credentials)
  }


  render = () =>
    <form onSubmit={e => {
      e.preventDefault()
      this.handleSubmit(this.state)
    }}>
      <div className="inputs">
        <div className="login-title">Sign Up</div>
        <label htmlFor="username">username</label>
        <input
          required
          id='username'
          value={this.state.username}
          onChange={this.handleChange}
        ></input>

        <label htmlFor="password1">password</label>
        <input
          required
          id="password1"
          type="password"
          value={this.state.password1}
          onChange={this.handleChange}
        ></input>

      <label htmlFor="password2">confirm password</label>
      <input
        required
        id="password2"
        type="password"
        value={this.state.password2}
        onChange={this.handleChange}
      ></input>
      </div>

      <div className="buttons">
        <button 
          onClick={() => this.props.chandView('LOGIN')}
        >return to login</button>
        <button type="submit">sign up</button>
      </div>
    </form>
}

export default SignUp