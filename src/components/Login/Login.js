import React, { Component } from 'react'

class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: ''
    }
  }

  handleLogin = () => {
    
  }

  handleChange = (e) => {
    const {id, value} = e.target
    this.setState({
      [id]: value
    })
  }

  render = () => 
    <div className="Login">
      <form onSubmit={this.handleLogin}>
        <div className="inputs">
        <div className="login-title">Sign In</div>
          <label htmlFor="username">username</label>
          <input 
            id='username'
            value={this.state.username}
            onChange={this.handleChange}
          ></input>
          
          <label htmlFor="password">password</label>
          <input 
            id="password" 
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          ></input>
        </div>

        <div className="buttons">
          {/* <button>create account</button> */}
          <button type="submit">login</button>
        </div>
      </form>
    </div>
}

export default Login