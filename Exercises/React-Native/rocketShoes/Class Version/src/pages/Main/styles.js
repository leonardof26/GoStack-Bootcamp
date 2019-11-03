import styled from 'styled-components'
import { RectButton } from 'react-native-gesture-handler'

export const Container = styled.View``

export const ProductList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})`
  padding: 10px;
  margin: 15px;
  border-radius: 4px;
`

export const Product = styled.View`
  background: #fff;
  padding: 10px;
  margin: 15px;
  border-radius: 4px;
  width: 300px;
`

export const ProducImage = styled.Image`
  width: 250px;
  height: 250px;
`

export const Title = styled.Text.attrs({
  numberOfLines: 2,
})`
  margin: 0 5px;
  color: #333333;
  font-size: 20px;
`

export const Price = styled.Text`
  margin: 5px 5px;
  font-size: 25px;
  font-weight: bold;
`

export const AddToCartutton = styled(RectButton)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: #7159c1;
  margin: 7px 0;
  border-radius: 4px;
  overflow: hidden;
`

export const CartIcon = styled.ImageBackground`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: 12px;
  background: rgba(0, 0, 0, 0.1);
`

export const ProductAmount = styled.Text`
  margin-left: 5px;
  color: #fff;
`

export const CartButtonText = styled.Text`
  font-size: 20px;
  text-align: center;
  margin-right: 80px;
  color: #fff;
`
