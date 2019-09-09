import React from 'react'
import Messages from './Messages'
import Lobby from './Lobby'
import '../styles/styles.css'

function App() {
  return (
    <div className="App">
      <div className="Chat">
        <Messages></Messages>
        <Lobby></Lobby>
      </div>
    </div>
  )
}

export default App;
