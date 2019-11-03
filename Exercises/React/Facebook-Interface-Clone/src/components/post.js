import React from 'react'

import './post.css'

function Post({ name, avatar, date, content }) {
  return (
    <div className="Post">
      <div className="headerContents">
        <img src={avatar} alt="user avatar" className="avatar" />
        <div className="datas">
          <p className="userName">{name}</p>
          <p className="datePost">{date}</p>
        </div>
      </div>
      <div className="postContents">
        {content}
      </div>
    </div>
  )
}

export default Post