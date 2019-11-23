import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import './config/ReactotronConfig'

import { ToastContainer } from 'react-toastify'
import 'bootstrap/dist/css/bootstrap.min.css'

import Routes from './routes'
import history from './services/history'

import { store, persistor } from './store'

import GlobalStyle from './styles/global'

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={3000} />
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
