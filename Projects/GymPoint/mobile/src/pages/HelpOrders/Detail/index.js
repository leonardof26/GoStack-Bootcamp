import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/MaterialIcons'

import {
  Container,
  HelpDetail,
  QuestionDetail,
  QuestionHeader,
  Title,
  TextDetail,
  AnswerDetail,
} from './styles'

export default function HelpOrderDetail({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder')

  return (
    <Container>
      <HelpDetail>
        <QuestionDetail>
          <QuestionHeader>
            <Title>PERGUNTA</Title>
            <Text>{helpOrder.formattedData}</Text>
          </QuestionHeader>
          <TextDetail>{helpOrder.question}</TextDetail>
        </QuestionDetail>

        {helpOrder.answer && (
          <AnswerDetail>
            <Title>RESPOSTA</Title>
            <TextDetail>{helpOrder.answer}</TextDetail>
          </AnswerDetail>
        )}
      </HelpDetail>
    </Container>
  )
}

HelpOrderDetail.navigationOptions = ({ navigation }) => ({
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

HelpOrderDetail.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func.isRequired,
  }).isRequired,
}
