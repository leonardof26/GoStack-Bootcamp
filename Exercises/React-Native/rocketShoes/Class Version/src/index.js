import React from 'react'
import { StatusBar } from 'react-native'
import { Provider } from 'react-redux'
import store from './store'

import Routes from './routes'
import NavigationService from './services/navigation'

import './config/ReactotronConfig'

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <Routes
        ref={navigatorRef => NavigationService.setNavigator(navigatorRef)}
      />
    </Provider>
  )
}
