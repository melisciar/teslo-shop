import { PropsWithChildren, useReducer } from 'react'
import { CartContext, cartReducer } from '.'
import { ICartProduct } from '@/interfaces'

export interface CartState {
  cart: ICartProduct[]
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
}

export const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

  const addProductToCart = (product: ICartProduct) => {
    console.log(product)
    const productInCart = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    )
    console.log(productInCart)
    if (!productInCart)
      return dispatch({
        type: 'Cart - Update cart',
        payload: [...state.cart, product],
      })

    // Acumular

    const updatedProducts = state.cart.map((p) => {
      if (p._id !== product._id || p.size !== product.size) return p

      p.quantity += product.quantity
      return p
    })
    return dispatch({ type: 'Cart - Update cart', payload: updatedProducts })
  }

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
