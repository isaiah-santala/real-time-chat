import React from 'react'

const NavBar = props => {

  return (

    <div className="NavBar buttons">

      <button 
        onClick={() => props.logout()}
      >logout</button>
      
    </div>
  )
}

export default NavBar
