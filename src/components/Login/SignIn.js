import React, { Component } from 'react'

class SignIn extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }


  handleChange = e => {
    const { id, value } = e.target
    this.setState({
      [id]: value
    })
  }

  render = () => 
    <form onSubmit={e => {
      e.preventDefault()
      this.props.handleLogin(this.state)
    }}>
      <div className="inputs">
        <div className="login-title">Sign In</div>
        <label htmlFor="username">username</label>
        <input
          required
          id='username'
          value={this.state.username}
          onChange={this.handleChange}
        ></input>

        <label htmlFor="password">password</label>
        <input
          required
          id="password"
          type="password"
          value={this.state.password}
          onChange={this.handleChange}
        ></input>
      </div>

      <div className="buttons">
        <button 
          onClick={() => this.props.chandView('SIGNUP')}
        >create an account</button>
        <button type="submit">login</button>
      </div>
    </form>
}

export default SignIn