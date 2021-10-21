import { useContext, useEffect, useState } from 'react';

import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import classes from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  // The CartContext is managed by the 'closest' provider (in this case, that's the 'CartProvider' in app.js (it's the only provider))
  // The 'HeaderCartButton' will be re-evaluated whenever the CartContext changes

  const { items } = cartCtx;
  // Object destructuring - This assigns the 'cartCtx.items' value to an 'items' const

  const numberOfCartItems = items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);
  // Loops over all 'cartCtx.items', and on each iteration returns 'currentNumber + item.amount'
  // The starting 'currentNumber' number is 0 (the second argument)
  // On each subsequent iteration, 'currentNumber' will be the return from the previous loop


  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    if (cartCtx.items.length === 0) {
      return;
    };
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => { setBtnIsHighlighted(false) }, 300); // Calls 'setBtnIsHighlighted(false)' after 300ms

    // Returning a function in useEffect, it is a 'clean-up function'
    // It's called automatically, immediately before useEffect is next called (after the rest of the component is re-rendered)
    // It's good practice to 'clean-up' any timers (or other side effects) that might be ongoing because you started them in useEffect
    return () => { clearTimeout(timer) };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
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
