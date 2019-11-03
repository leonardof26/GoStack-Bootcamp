import React, { Component } from 'react'

import Header from '../../components/header'
import Body from '../../components/postList'

class MainPage extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Body />
      </div>
    )
  }
}

export default MainPage