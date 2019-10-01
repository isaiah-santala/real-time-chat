import React, { Component } from 'react'
import Write from './Write'
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

      <Write 
        sendMessage={this.props.sendMessage} 
      />

    </div>
  )
} 

export default Messages