import { ICartProduct } from "@/interfaces";
import { CartState } from ".";

type CartActionType =
  | { type: "Cart - LoadCart from cookies | storage"; payload: ICartProduct[] }
  | { type: "Cart - Add product"; payload: ICartProduct[] };

//Recibe un estado o acción y produce un nuevo estado
export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "Cart - LoadCart from cookies | storage":
      return {
        ...state,
      };

    default:
      return state;
  }
};
