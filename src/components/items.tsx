import React from 'react'
import { CartItemTypes } from '../App'
import { Wrapper } from "../styles/item.stles.ts";
import Button from '@mui/material/Button';

type Props = {
  item: CartItemTypes,
  handleAddCart: (checkedItem: CartItemTypes) => void
}

const Items: React.FC<Props> = ({item, handleAddCart}): JSX.Element => {
  return (
    <Wrapper>
      <img src={item.image} alt={item.title} />
      <div>
        <h4>{item.title}</h4>
        <p>{item.category}</p>
        <p>{item.description}</p>
        <b>${item.price}</b>
      </div>
      <Button onClick={() => handleAddCart(item)}>Add to cart</Button>
    </Wrapper>
  )
}


export default Items