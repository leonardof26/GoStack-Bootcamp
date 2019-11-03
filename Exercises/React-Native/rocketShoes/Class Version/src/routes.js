import React from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import Header from './components/Header'
import Main from './pages/Main'
import Cart from './pages/Cart'

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Cart,
    },
    {
      defaultNavigationOptions: navigation => ({
        header: <Header {...navigation} />,
      }),
      cardStyle: {
        backgroundColor: '#191920',
      },
    }
  )
)

export default Routes
