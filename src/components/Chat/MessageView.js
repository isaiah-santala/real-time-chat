import React from 'react'
import Messages from './Messages'
import Lobby from './Lobby'

const MessageView = props => (

    <div className="MessageView">

      <Messages
        messages={props.messages}
        sendMessage={props.sendMessage}
      />

      <Lobby
      />

    </div>
)

export default MessageView