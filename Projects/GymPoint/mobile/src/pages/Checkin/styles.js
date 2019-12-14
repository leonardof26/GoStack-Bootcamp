import styled from 'styled-components/native'

import Button from '../../components/Button'

export const Container = styled.View`
  flex: 1;
  background: #f1f1f1;
  padding: 30px;
`
export const CheckInButton = styled(Button)`
  margin-top: 5px;
`

export const CheckInList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  margin-top: 25px;
`

export const CkeckInInfo = styled.View`
  background: #fff;
  margin-bottom: 15px;
  padding: 20px;
  border-radius: 4px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(255, 255, 255, 0.8);
`

export const CheckInNumber = styled.Text`
  font-size: 14px;
  font-weight: bold;
`

export const CheckInDate = styled.Text``
