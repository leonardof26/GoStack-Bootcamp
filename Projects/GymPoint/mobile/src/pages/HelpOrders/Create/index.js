import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '../../../services/api'

import { Container, QuestionInput, StandartButton } from './styles'

export default function HelpOrderCreate({ navigation }) {
  const [question, setQuestion] = useState('')

  const user = useSelector(state => state.user.profile)

  async function handleSubmit() {
    await api.post(`/students/${user.id}/help-orders`, { question })

    navigation.navigate('HelpOrderList')
  }

  return (
    <Container>
      <QuestionInput
        placeholder="Inclua seu pedido de auxilio"
        value={question}
        onChangeText={setQuestion}
        multiline
      />
      <StandartButton onPress={handleSubmit}>Enviar pedido</StandartButton>
    </Container>
  )
}

HelpOrderCreate.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack()
      }}
    >
      <Icon name="chevron-left" size={30} color="#EE4E62" />
    </TouchableOpacity>
  ),
})

HelpOrderCreate.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
}
