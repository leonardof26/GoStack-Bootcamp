import React from 'react'
import { Image } from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import Icon from 'react-native-vector-icons/MaterialIcons'
import logo from './assets/logo-esquerda.png'

import SignIn from './pages/SignIn'

import Checkin from './pages/Checkin'

import HelpOrderList from './pages/HelpOrders/List'
import HelpOrderCreate from './pages/HelpOrders/Create'
import HelpOrderDetail from './pages/HelpOrders/Detail'

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({ SignIn }),
        App: createBottomTabNavigator(
          {
            Teste: {
              screen: createStackNavigator(
                { Checkin },
                {
                  defaultNavigationOptions: {
                    headerTitle: <Image source={logo} />,
                  },
                }
              ),
              navigationOptions: {
                // eslint-disable-next-line react/prop-types
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="edit-location" size={20} color={tintColor} />
                ),
                tabBarLabel: 'Check-ins',
              },
            },
            HelpOrders: {
              screen: createStackNavigator(
                {
                  HelpOrderList,
                  HelpOrderCreate,
                  HelpOrderDetail,
                },
                {
                  defaultNavigationOptions: {
                    headerTitle: <Image source={logo} />,
                    headerLeftContainerStyle: { marginLeft: 20 },
                  },
                }
              ),
              navigationOptions: {
                // eslint-disable-next-line react/prop-types
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
                tabBarLabel: 'Pedir Ajuda',
              },
            },
          },
          {
            resetOnBlur: true,
            navigationOptions: { headerTitle: <Image source={logo} /> },
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999999',
              style: { backgroundColor: '#fff' },
            },
          }
        ),
      },
      { initialRouteName: signedIn ? 'App' : 'Sign' }
    )
  )
