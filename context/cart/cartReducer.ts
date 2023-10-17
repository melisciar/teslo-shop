import { ICartProduct } from '@/interfaces'
import { CartState } from '.'

type CartActionType =
  | { type: 'Cart - LoadCart from cookies | storage'; payload: ICartProduct[] }
  | { type: 'Cart - Update cart'; payload: ICartProduct[] }

//Recibe un estado o acción y produce un nuevo estado
export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  console.log(action.payload)
  switch (action.type) {
    case 'Cart - LoadCart from cookies | storage':
      return {
        ...state,
      }

    case 'Cart - Update cart':
      return {
        ...state,
        cart: [...action.payload],
      }

    default:
      return state
  }
}
