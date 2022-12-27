import React, { useState } from 'react'
import { useQuery } from "react-query";
// ui components
import LinearProgress from '@mui/material/LinearProgress'
import Grid from '@mui/material/Grid';
import Drawer from '@mui/material/Drawer';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { StyleButtonComponents } from './styles/app.styles.ts';

// components
import Item from "./components/items.tsx";
import { Badge } from '@mui/material';
import Cart from './components/cart.tsx';


export type CartItemTypes = {
  id: number,
  category: string;
  description: string;
  image: string,
  price: number;
  title: string;
  amount: number
}

const getProducts = async (): Promise<CartItemTypes[]> =>
  await (await (await fetch('https://fakestoreapi.com/products')).json())

const App = () => {
  const { isLoading, isError, data } = useQuery<CartItemTypes[]>("products", getProducts)
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false)
  const [cartItem, setCartItems] = useState([] as CartItemTypes[])


  const handleAddCart = (checkedItem: CartItemTypes) => {
    setCartItems((prevState) => {
      const findProduct = prevState.find(item => item.id === checkedItem.id)
      if (findProduct) {
        return prevState.map((allProducts) => {
          if (allProducts.id === checkedItem.id) {
            return {
              ...allProducts,
              amount: allProducts.amount + 1
            }
          }
          return allProducts
        })
      }

      return [...prevState, { ...checkedItem, amount: 1 }]
    })
  }


  const handleRemoveCart = (id: number) => null

  if (isLoading) return <LinearProgress />
  if (isError) return <h1>Something went error</h1>

  return (
    <div>
      <Drawer anchor='right' open={isOpenCart} onClose={() => setIsOpenCart(false)}>
        Cart Goes here
        <Cart product={cartItem} handleAddCart={handleAddCart} handleRemoveCart={handleRemoveCart} />
      </Drawer>
      <StyleButtonComponents>
        <Badge badgeContent={cartItem.length} color="error">
          <AddShoppingCartIcon onClick={() => setIsOpenCart(true)} />
        </Badge>
      </StyleButtonComponents>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={8} sm={4}>
            <Item item={item} handleAddCart={handleAddCart} />
          </Grid>
        ))
        }
      </Grid>
    </div>
  )
}

export default App