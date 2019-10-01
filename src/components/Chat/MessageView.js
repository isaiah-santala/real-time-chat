import React from 'react'
import Messages from './Messages'
import Lobby from './Lobby'
import Write from './Write'

const MessageView = props => (

    <div>

    <div className="MessageView">

        <Messages
          messages={props.messages}
        />

        <Lobby
        />

      </div>

      <Write
        sendMessage={props.sendMessage}
      />

    </div>
)

export default MessageView