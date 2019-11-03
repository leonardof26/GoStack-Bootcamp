import React from 'react'

import Icon from 'react-native-vector-icons/MaterialIcons'
import {
  Container,
  Logo,
  BasketButton,
  Wrapper,
  BasketItensNumber,
} from './styles'

export default function Header() {
  return (
    <Wrapper>
      <Container>
        <Logo />
        <BasketButton>
          <Icon name="shopping-basket" size={24} color="#fff" />
          <BasketItensNumber>1</BasketItensNumber>
        </BasketButton>
      </Container>
    </Wrapper>
  )
}
