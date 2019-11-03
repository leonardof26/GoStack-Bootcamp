import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Icon from 'react-native-vector-icons/MaterialIcons'
import api from '../../services/api'
import { formatPrice } from '../../util/format'
import * as CartActions from '../../store/modules/cart/action'

import {
  Container,
  ProductList,
  Product,
  ProducImage,
  Title,
  Price,
  AddToCartutton,
  CartIcon,
  ProductAmount,
  CartButtonText,
} from './styles'

class Main extends Component {
  state = {
    products: [],
  }

  async componentDidMount() {
    const response = await api.get('/products')

    const data = response.data.map(product => ({
      ...product,
      priceFormatted: formatPrice(product.price),
    }))

    this.setState({ products: data })
  }

  handleAddProduct = id => {
    const { addToCartRequest } = this.props

    addToCartRequest(id)
  }

  render() {
    const { products } = this.state
    const { amount } = this.props

    return (
      <Container>
        <ProductList
          horizontal
          data={products}
          keyExtractor={product => product.id}
          renderItem={({ item }) => (
            <Product>
              <ProducImage source={{ uri: item.image }} />
              <Title>{item.title}</Title>
              <Price>{item.priceFormatted}</Price>
              <AddToCartutton>
                <CartIcon>
                  <Icon name="shopping-cart" size={24} color="#fff" />
                  <ProductAmount>1</ProductAmount>
                </CartIcon>
                <CartButtonText>Adicionar</CartButtonText>
              </AddToCartutton>
            </Product>
          )}
        />
      </Container>
    )
  }
}

const mapStateToProps = state => ({
  amount: state.cart.reduce((amount, product) => {
    amount[product.id] = product.amount

    return amount
  }, {}),
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)
