import React from 'react'
import NavBar from './NavBar'
import MessageView from './MessageView'

const Chat = props => (

  <div className="Chat">

    <NavBar logout={props.logout}/>

    <MessageView
      messages={props.messages}
      lobby={props.lobby}
      sendMessage={props.sendMessage}
    />

  </div>
)

export default Chat