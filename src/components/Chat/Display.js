import React, { Component } from 'react'

class Display extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidUpdate() {
    
  }

  render = props => (

    <div className="Display">

      {this.props.messages.map((e, i) =>
        <div className="message" key={i}>
          <div className="m-name">{e.username}:</div>
          <div className="m-message">{e.message}</div>
        </div>
      )}

    </div>
  )
}

export default Display