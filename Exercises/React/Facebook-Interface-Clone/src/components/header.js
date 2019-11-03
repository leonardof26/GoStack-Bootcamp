import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

import logo from '../assets/facebook.png'

import './header.css'

function Header() {
  return (
    <div className="Header">
      <img src={logo} alt="logo" />
      <div className="userArea">
        <span>Meu perfil</span>
        <div className="userIcon">
          <FontAwesomeIcon icon={faUserCircle} />
        </div>
      </div>
    </div>
  )
}

export default Header