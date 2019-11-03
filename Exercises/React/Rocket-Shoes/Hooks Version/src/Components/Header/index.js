import React from 'react'
import { Link } from 'react-router-dom'
import { MdShoppingBasket } from 'react-icons/md'
import { useSelector } from 'react-redux'

import logo from '../../assets/Images/logo.svg'

import { Container, Cart } from './styles'

export default function Header() {
  const cartSize = useSelector(state => state.cart.length)

  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="rocketshoes" />
      </Link>

      <Cart to="/cart">
        <div>
          <strong>Meu Carrinho</strong>
          <span>{cartSize} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#fff" />
      </Cart>
    </Container>
  )
}
