import React from 'react'

import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import App from './App'

import './config/reactotronConfig'

import { store, persistor } from './store'

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}
