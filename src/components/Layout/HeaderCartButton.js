import { useContext } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext);
  // The CartContext is managed by the 'closest' provider (in this case, that's the 'CartProvider' in app.js (it's the only provider))
  // The 'HeaderCartButton' will be re-evaluated whenever the CartContext changes

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  // Loops over all 'cartCtx.items', and on each iteration returns 'currentNumber + item.amount'
  // The starting 'currentNumber' number is 0 (the second argument)
  // On each subsequent iteration, 'currentNumber' will be the return from the previous loop

  return (
    <button className={classes.button} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>
        Your cart
      </span>
      <span className={classes.badge}>
        {numberOfCartItems}
      </span>
    </button>
  )
};

export default HeaderCartButton;
