import React, { Component } from 'react'

import Post from './post.js'
import Comment from './comment.js'

import './postList.css'

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Rey Skywalker",
          avatar: "https://upload.wikimedia.org/wikipedia/en/a/af/Rey_Star_Wars.png"
        },
        date: "04 Jun 2019",
        content: "Which program do Jedi use to open PDF files?",
        comments: [
          {
            id: 1,
            author: {
              name: "Poe Dameron",
              avatar: "https://cdn.shopify.com/s/files/1/2510/6294/articles/poe_2048x2048.jpg?v=1527115987"
            },
            content: "Adobe Wan Kenobi"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Han Solo",
          avatar: "https://avatarfiles.alphacoders.com/949/94974.jpg"
        },
        date: "04 Jun 2019",
        content: "Which website did Chewbacca get arrested for creating?",
        comments: [
          {
            id: 1,
            author: {
              name: "Han Solo",
              avatar: "https://avatarfiles.alphacoders.com/949/94974.jpg"
            },
            content: "Wookieleaks"
          },
          {
            id: 2,
            author: {
              name: "Shewie",
              avatar: "https://www.hojeemdia.com.br/polopoly_fs/1.711510.1556898208!/image/image.jpg_gen/derivatives/landscape_653/image.jpg"
            },
            content: "Really, Han?"
          },
        ]
      },
      {
        id: 3,
        author: {
          name: "Han Solo",
          avatar: "https://avatarfiles.alphacoders.com/949/94974.jpg"
        },
        date: "04 Jun 2019",
        content: "Which website did Chewbacca get arrested for creating?",
        comments: [
          {
            id: 1,
            author: {
              name: "Han Solo",
              avatar: "https://avatarfiles.alphacoders.com/949/94974.jpg"
            },
            content: "Wookieleaks"
          },
          {
            id: 2,
            author: {
              name: "Shewie",
              avatar: "https://www.hojeemdia.com.br/polopoly_fs/1.711510.1556898208!/image/image.jpg_gen/derivatives/landscape_653/image.jpg"
            },
            content: "RROOOOOOOOOOOOOOOOOOAAAAAAAAAAARRRRRRRRRRRRRRRRRRRRRRRRRGKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK"
          },
        ]
      },
      {
        id: 4,
        author: {
          name: "Han Solo",
          avatar: "https://avatarfiles.alphacoders.com/949/94974.jpg"
        },
        date: "04 Jun 2019",
        content: "Which website did Chewbacca get arrested for creating?",
        comments: [
          {
            id: 1,
            author: {
              name: "Han Solo",
              avatar: "https://avatarfiles.alphacoders.com/949/94974.jpg"
            },
            content: "Wookieleaks"
          },
          {
            id: 2,
            author: {
              name: "Shewie",
              avatar: "https://www.hojeemdia.com.br/polopoly_fs/1.711510.1556898208!/image/image.jpg_gen/derivatives/landscape_653/image.jpg"
            },
            content: "RROOOOOOOOOOOOOOOOOOAAAAAAAAAAARRRRRRRRRRRRRRRRRRRRRRRRRGKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK"
          },
        ]
      },
    ]
  };

  render() {
    return (
      <div className="PostList">
        {this.state.posts.map(post => {
          return (
            <div className="Posts">
              <Post
                key={post.id}
                name={post.author.name}
                avatar={post.author.avatar}
                date={post.date}
                content={post.content}
              />
              {post.comments.map(comment => {
                return (
                  <Comment
                    key={comment.id}
                    name={comment.author.name}
                    avatar={comment.author.avatar}
                    content={comment.content}
                  />
                )
              })}
            </ div>
          )
        })}
      </div >
    )
  }
}

export default PostList