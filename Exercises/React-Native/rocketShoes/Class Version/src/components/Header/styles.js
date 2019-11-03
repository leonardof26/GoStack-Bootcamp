import styled from 'styled-components'

import logo from '../../assets/Images/logo.png'

export const Wrapper = styled.SafeAreaView`
  flex: 0;
  background: #191920;
  flex-direction: row;
`

export const Container = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  padding: 20px;
`

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 185px;
  height: 24px;
`

export const BasketButton = styled.TouchableOpacity`
  height: 24px;
  width: 24px;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`
export const BasketItensNumber = styled.Text`
  color: #fff;
  background: #7159c1;
  position: absolute;
  text-align: center;
  top: -8px;
  right: -8px;
  min-width: 18px;
  min-height: 18px;
  font-size: 12px;
  padding: 2px;
  border-radius: 9px;
  overflow: hidden;
`
