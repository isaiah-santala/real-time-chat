import React, { Component } from 'react'

class Write extends Component {
  constructor(props) {
    super(props)

    this.state = {
      message: ''
    }
  }

  updateMessage = message => this.setState({ message })

  sendMessage = () => {
    this.props.sendMessage(this.state.message)
    this.setState({ message: '' })
  }

  altEnterSubmit = e => {
    if (e.metaKey && e.keyCode === 13) {
      e.preventDefault()
      this.sendMessage()
    }
  }

  render = () => (

    <form 
      className="Write"
      onSubmit={e => {
        e.preventDefault()
        this.sendMessage()
    }}>

      <textarea 
        required
        value={this.state.message}
        onChange={e => this.updateMessage(e.target.value)}
        onKeyDown={e => this.altEnterSubmit(e)}
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