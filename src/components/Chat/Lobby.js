import React from 'react'

const Lobby = props => (

  <div className="Lobby">

    <div className="lobby-title">Lobby</div>

    <div>

      {props.lobby.map((e, i) => 
        <div 
          className="active-user"
          key={i}
        >username: 
        
          <div className="username">{e}</div>

        </div>
      )}

    </div>

  </div>
  
)

export default Lobby