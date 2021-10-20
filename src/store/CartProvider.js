import { useReducer } from 'react';

import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if(action.type === 'ADD') {
    const updatedTotalAmount = state.totalAmount + (action.item.price * action.item.amount);

    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = { ...existingCartItem, amount: existingCartItem.amount + action.item.amount, };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
      // We use 'concat()' instead of 'push()', because concat returns a new array
      // 'push()' updates the existing array, which we don't want to do
      // You don't want to edit your old state snapshot, because it would get edited in memory without React knowing about it
      // Instead you want to create a brand new state object, and return that
    };

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === 'REMOVE') {
    const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
    const exisitingItem = state.items[existingCartItemIndex];
    const updatedTotalAmount = state.totalAmount - exisitingItem.price;
    let updatedItems;
    if (exisitingItem.amount === 1) {
      updatedItems = state.items.filter(item => item.id !== action.id);
    } else {
      const updatedItem = { ...exisitingItem, amount: exisitingItem.amount - 1 };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    };

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  };

  return defaultCartState
};
// 'cartReducer' is outside of the component function because it won't need anything from the component
// and because it shouldn't be recreated every time the component is re-evaluated

const CartProvider = props => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
  // The first array element returned by useReducer is your state snapshot ('cartState' here)
  // The second is the function that allows you to dispatch an action to the reducer ('dispatchCartAction')
  // The first argument of useReducer() points at your reducer function
  // The second argument is the initial state

  const addItemToCartHandler = (item) => {
    dispatchCartAction({
      type: 'ADD',
      item: item,
    });
  };

  const removeItemfromCartHandler = (id) => {
    dispatchCartAction({
      type: 'REMOVE',
      id: id,
    });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemfromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
};

export default CartProvider;
