import React, { useRef, useEffect } from 'react'

const Display = ({ messages }) =>  {

  const bottom = useRef()

  const focusBottom = () => bottom.current.scrollIntoView()

  useEffect(focusBottom)

  return (

    <div className="Display">

      {messages.map((e, i) =>
        <div className="message" key={i}>
          <div className="m-name">{e.username}:</div>
          <div className="m-message">{e.message}</div>
        </div>
      )}

      <div ref={bottom}></div>

    </div>

  )
}

export default Display