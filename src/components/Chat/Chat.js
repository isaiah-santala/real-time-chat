import React from 'react'
import Messages from './Messages'
import Lobby from './Lobby'

const Chat = (props) =>
  <div className="Chat">
    <Messages
      messages={props.messages}
      sendMessage={props.sendMessage}
    />
    <Lobby />
  </div>

export default Chat