import styled from 'styled-components/native'

import { RectButton } from 'react-native-gesture-handler'

import Button from '../../../components/Button'

export const Container = styled.View`
  flex: 1;
  background: #f1f1f1;
  padding: 30px;
  padding-bottom: 0;
`

export const NewHelpOrder = styled(Button)`
  margin-top: 5px;
`

export const HelpOrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 15px;
`

export const HelpOrder = styled(RectButton)`
  background: #fff;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.4);
`

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const Status = styled.View`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  align-items: center;
`

export const StatusText = styled.Text`
  margin-left: 5px;
  color: ${props => (props.answered ? '#42CB59' : '#999999')};
`

export const Question = styled.Text`
  margin-top: 10px;
  font-size: 14px;
  color: #666666;
`
