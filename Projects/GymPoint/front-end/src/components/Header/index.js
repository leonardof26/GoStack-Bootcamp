import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import { signOut } from '../../store/modules/auth/actions'

import logo from '../../assets/logo-direita.svg'

import { Container, Content, Profile } from './styles'

export default function Header({ path }) {
  const dispatch = useDispatch()
  const userName = useSelector(state => state.user.profile.name)

  function handleSignout() {
    dispatch(signOut())
  }

  return (
    <Container>
      <Content path={path}>
        <nav>
          <img src={logo} alt="GymPoint" />
          <Link
            to="/students/list"
            className={path.indexOf('students') !== -1 ? 'currentPage' : ''}
          >
            ALUNOS
          </Link>
          <Link
            to="/plans/list"
            className={path.indexOf('plans') !== -1 ? 'currentPage' : ''}
          >
            PLANOS
          </Link>
          <Link
            to="/memberships/list"
            className={path.indexOf('memberships') !== -1 ? 'currentPage' : ''}
          >
            MATRÍCULA
          </Link>
          <Link
            to="/helporders"
            className={path.indexOf('helporders') !== -1 ? 'currentPage' : ''}
          >
            PEDIDOS DE AUXÍLIO
          </Link>
        </nav>

        <aside>
          <Profile>
            <strong>{userName}</strong>
            <button type="button" onClick={handleSignout}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  )
}

Header.propTypes = {
  path: PropTypes.string.isRequired,
}
