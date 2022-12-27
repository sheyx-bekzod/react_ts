import React from 'react'
import { CartItemTypes } from '../App'
import { Wrapepr } from '../styles/cartItems.styles.ts';


interface Props {
  item: CartItemTypes;
  handleAddCart: (item: CartItemTypes) => void
  handleRemoveCart: (id: number) => void
}

export const CartItemProducts: React.FC<Props> = ({ item, handleRemoveCart, handleAddCart }) => {
  return (
    <>
      <Wrapepr>
        <h3>{item.title}</h3>
        <p>{item.price}</p>
        <p>{item.amount}</p>
      </Wrapepr>

    </>

  )
}


