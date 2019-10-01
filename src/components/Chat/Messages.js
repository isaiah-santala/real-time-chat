import React, { Component } from 'react'
import Display from './Display'

class Messages extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render = () => (

    <div className="Messages">

      <div
        className="messages-title"
      >Messages</div>

      <Display 
        messages={this.props.messages} 
      />

    </div>
  )
} 

export default Messages