import React, { useRef, useEffect } from 'react'

const Display = ({ messages, user }) =>  {

  const bottom = useRef()

  const focusBottom = () => bottom.current.scrollIntoView()

  useEffect(focusBottom)

  const messageStyle = username => username === user.username ? 'self' : 'other'

  return (

    <div className="Display">

      {messages.map((e, i) =>
        <div className={"message " + messageStyle(e.username)} key={i}>
          <div className="m-name">{e.username}:</div>
          <div className="m-message">{e.message}</div>
        </div>
      )}

      <div ref={bottom}></div>

    </div>

  )
}

export default Display