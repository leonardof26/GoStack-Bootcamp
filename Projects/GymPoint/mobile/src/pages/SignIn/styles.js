import { Platform } from 'react-native'
import styled from 'styled-components/native'

import Button from '../../components/Button'

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 30px;
`

export const Form = styled.View`
  align-self: stretch;
  margin-top: 50px;
`

export const Input = styled.TextInput.attrs({
  placeholderTextColor: '#999999',
})`
  margin-bottom: 10px;
  font-size: 15px;
  padding: 0 15px;
  height: 46px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  align-items: center;
`

export const StandartButton = styled(Button)`
  margin-top: 5px;
`
