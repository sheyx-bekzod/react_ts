import React, { useEffect, useState } from 'react'
import { CartItemTypes } from '../App'
import { Wrapper } from '../styles/cart.styles.ts'
import { CartItemProducts } from './cartItem.tsx'

interface Props {
  product: CartItemTypes[]
  handleAddCart: (product: CartItemTypes) => void
  handleRemoveCart: (id: number) => void
}

const Cart: React.FC<Props> = ({ handleAddCart, handleRemoveCart, product }) => {
  const [totalPrice, setTotalProce] = useState<number>(0)
  useEffect(() => {
    setTotalProce(product.reduce((ack, item) => ack + item.amount * item.price, 0))
  }, [handleAddCart, product])

  return (
    <Wrapper>
      <h1>My cart</h1>
      {!product.length ? <h1>You haven't got porducts</h1> : null}
      {product?.map((item => (
        <CartItemProducts key={item.id}
          item={item} handleAddCart={handleAddCart} handleRemoveCart={handleRemoveCart} />
      )))}

      <h1>{totalPrice} $</h1>

    </Wrapper>
  )
}

export default Cart
