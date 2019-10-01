import React, { Component } from 'react'

class Write extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  updateMessage = message => this.setState({ message })

  sendMessage = message => {
    this.props.sendMessage(message)
    this.setState({ message: '' })
  }

  render = () => (

    <form 
      className="Write"
      onSubmit={e => {
        e.preventDefault()
        this.sendMessage(this.state.message)
    }}>

      <textarea 
        required
        value={this.state.message}
        onChange={e => this.updateMessage(e.target.value)}
      ></textarea>

      <div className="buttons" >

        <button 
          type="submit"
        >send</button>

      </div>
      
    </form>
  )
}

export default Write