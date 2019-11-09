import React from 'react'
import { Link } from 'react-router-dom'

import Notifications from '../Notifications'
import logo from '~/assets/purpleLogo.svg'

import { Container, Content, Profile } from './styles'

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="GoBarber" />
          <Link to="/dashboard">DASHBOARD</Link>
        </nav>

        <aside>
          <Notifications />

          <Profile>
            <div>
              <strong>BBB-9E</strong>
              <Link to="/profile">Meu Perfil</Link>
            </div>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="BB-9E"
            />
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}
