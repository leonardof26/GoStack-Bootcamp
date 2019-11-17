import React from 'react'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import { store } from '../store'

import DefaultLayout from '../pages/_layouts/default'

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  console.log(rest.path)
  const { signed } = store.getState().auth

  if (!signed && isPrivate) {
    return <Redirect to="/" />
  }

  if (signed && !isPrivate) {
    return <Redirect to="/students/list" />
  }

  const Layout = signed && DefaultLayout

  return (
    <Route
      {...rest}
      render={props => (
        <Layout>
          <Component {...props} />
        </Layout>
      )}
    />
  )
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
}

RouteWrapper.defaultProps = {
  isPrivate: false,
}
