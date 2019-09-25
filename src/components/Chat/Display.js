import React from 'react'

const Display = props => (

  <div className="Display">

    {props.messages.map((e, i) => 
        <div className="message" key={i}>
          <div className="m-name">{e.username}:</div>
          <div className="m-message">{e.message}</div>
        </div>
    )}

  </div>
)

export default Display