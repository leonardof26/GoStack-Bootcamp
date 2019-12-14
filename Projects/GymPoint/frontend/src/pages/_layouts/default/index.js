import React from 'react'
import PropTypes from 'prop-types'

import { Wrapper } from './styles'
import Header from '../../../components/Header'

import history from '../../../services/history'

export default function DefaultLayout({ children }) {
  return (
    <Wrapper>
      <Header path={history.location.pathname} />
      {children}
    </Wrapper>
  )
}

DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
}
