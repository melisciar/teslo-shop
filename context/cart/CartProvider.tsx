import { PropsWithChildren, useReducer, useEffect } from 'react'
import Cookie from 'js-cookie'
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

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get('cart')
        ? JSON.parse(Cookie.get('cart')!)
        : []
      dispatch({
        type: 'Cart - LoadCart from cookies | storage',
        payload: cookieProducts,
      })
    } catch (error) {
      dispatch({ type: 'Cart - LoadCart from cookies | storage', payload: [] })
    }
  }, [])

  useEffect(() => {
    Cookie.set('cart', JSON.stringify(state.cart))
  }, [state.cart])

  const addProductToCart = (product: ICartProduct) => {
    const productInCart = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    )
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
    dispatch({ type: 'Cart - Update cart', payload: updatedProducts })
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
