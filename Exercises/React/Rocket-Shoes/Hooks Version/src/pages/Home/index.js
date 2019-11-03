import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { MdAddShoppingCart } from 'react-icons/md'

import api from '../../services/api'
import { formatPrice } from '../../util/format'
import { ProductList } from './styles'
import * as CartActions from '../../store/modules/cart/action'

export default function Home() {
  const [products, setProducts] = useState([])

  const amount = useSelector(state =>
    state.cart.reduce((sumAmount, product) => {
      sumAmount[product.id] = product.amount

      return sumAmount
    }, {})
  )

  const dispatch = useDispatch()

  useEffect(() => {
    async function getProducts() {
      const response = await api.get('products')

      const data = response.data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price),
      }))

      setProducts(data)
    }

    getProducts()
  }, [])

  function handleAddProduct(id) {
    dispatch(CartActions.addToCartRequest(id))
  }

  return (
    <ProductList>
      {products.map(product => (
        <li key={product.id}>
          <img src={product.image} alt={product.title} />
          <strong>{product.title}</strong>
          <span>{product.priceFormatted}</span>

          <button type="button" onClick={() => handleAddProduct(product.id)}>
            <div>
              <MdAddShoppingCart size={16} color="#fff" />{' '}
              {amount[product.id] || 0}
            </div>

            <span>ADICIONAR AO CARRINHO</span>
          </button>
        </li>
      ))}
    </ProductList>
  )
}
