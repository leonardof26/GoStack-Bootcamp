import React from 'react'

import './comment.css'

function Comment({ name, avatar, content }) {
  return (
    <div className="Comment">
      <div className="headerContents">
        <img src={avatar} alt="user avatar" className="avatar" />
      </div>
      <div className="anwserContents">
        <p>
          <span>
            {`${name} `}
          </span>
          {content}
        </p>
      </div>
    </div>
  )
}

export default Comment