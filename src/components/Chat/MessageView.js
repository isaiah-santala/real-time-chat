import React from 'react'
import Messages from './Messages'
import Lobby from './Lobby'
import Write from './Write'

const MessageView = props => (

    <div>

    <div className="MessageView">

        <Messages
          user={props.user}
          messages={props.messages}
        />

        <Lobby
          lobby={props.lobby}
        />

      </div>

      <Write
        sendMessage={props.sendMessage}
      />

    </div>
)

export default MessageView