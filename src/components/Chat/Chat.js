import React from 'react'
import MessageView from './MessageView'

const Chat = props => (

  <div className="Chat">

    <MessageView
      messages={props.messages}
      lobby={props.lobby}
      sendMessage={props.sendMessage}
    />

  </div>
)

export default Chat