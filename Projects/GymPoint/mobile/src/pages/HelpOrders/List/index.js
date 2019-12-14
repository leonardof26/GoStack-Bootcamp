import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { withNavigationFocus } from 'react-navigation'
import { Text, View, ActivityIndicator } from 'react-native'

import { parseISO, formatRelative } from 'date-fns'
import pt from 'date-fns/locale/pt'

import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '../../../services/api'

import {
  Container,
  NewHelpOrder,
  HelpOrderList,
  HelpOrder,
  Header,
  Status,
  StatusText,
  Question,
} from './styles'

function HelpOrdersList({ navigation, isFocused }) {
  const [helpOrders, setHelpOrders] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(false)
  const [loading, setLoading] = useState(false)

  const user = useSelector(state => state.user.profile)

  async function loadOrders() {
    if (lastPage) {
      return
    }

    setLoading(true)

    const response = await api.get(`students/${user.id}/help-orders/${page}/10`)

    const orders = response.data.map(helpOrder => ({
      ...helpOrder,
      formattedData: formatRelative(parseISO(helpOrder.createdAt), new Date(), {
        locale: pt,
        addSuffix: true,
      }),
    }))

    setPage(page + 1)
    setHelpOrders([...helpOrders, ...orders])

    if (response.data.length === 0) {
      setLastPage(true)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (isFocused) {
      loadOrders()
    }
  }, [isFocused])

  function renderFooter() {
    if (!loading) return null
    return (
      <View>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <Container>
      <NewHelpOrder onPress={() => navigation.navigate('HelpOrderCreate')}>
        Novo pedido de auxilio
      </NewHelpOrder>
      <HelpOrderList
        data={helpOrders}
        onEndReached={loadOrders}
        onEndReachedThreshold={0.1}
        keyExtractor={item => String(item.id)}
        renderItem={({ item: helpOrder }) => (
          <HelpOrder
            onPress={() =>
              navigation.navigate('HelpOrderDetail', { helpOrder })
            }
          >
            <Header>
              <Status>
                <Icon
                  name="check-circle"
                  size={20}
                  color={helpOrder.answer ? '#42CB59' : '#999999'}
                />
                <StatusText answered={helpOrder.answer}>
                  {helpOrder.answer ? 'Respondido' : 'Sem Resposta'}
                </StatusText>
              </Status>
              <Text>{helpOrder.formattedData}</Text>
            </Header>
            <Question numberOfLines={3}>{helpOrder.question}</Question>
          </HelpOrder>
        )}
        ListFooterComponent={renderFooter}
      />
    </Container>
  )
}

export default withNavigationFocus(HelpOrdersList)

HelpOrdersList.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
}
