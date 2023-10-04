import { useContext, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Icon from '@mdi/react'
import { mdiClose } from '@mdi/js'
import CartItem from './Cart-Item'
import { CartContext } from '../routes/Root-Page'

export default function Cart({ visible, visibleSetter }) {
  const { cart, cartItemCount, cartTotal, handleCartInteraction } = useContext(CartContext);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => visibleSetter(false));

  return (
    <div
      id="cart"
      ref={wrapperRef}
      className={
        "fixed top-0 right-0 " +
        "h-screen w-1/3 z-10 " +
        "bg-light-primary dark:bg-dark-primary backdrop-blur-md " +
        "p-4 " +
        "transition-transform duration-300 origin-right "
        + (visible ? " scale-x-1" : " scale-x-0")}
    >
      <div className='flex justify-between items-center'>
        <h2>Your Cart</h2>
        <button
          type="button" onClick={() => visibleSetter(false)}
          className="cursor-pointer p-4 text-light-text dark:text-dark-text hover:text-light-second dark:hover:text-dark-second"
        >
          <Icon path={mdiClose} size={1} />
        </button>
      </div>
      {(cart.length > 0)
        ?
        <>
          <h3 className='pt-2'>{cartItemCount} item(s)</h3>
          <div className='max-h-[75%] overflow-y-scroll pt-4'>
            <div id='cart-item-list' className='grid grid-rows-[min-content] auto-rows-min grid-cols-1 h-full items-start'>
              {cart.map(element => <CartItem key={element.id} item={element.item} quantity={element.quantity} />)}
            </div>
          </div>
          <hr />
          <span className='flex justify-between items-center w-full p-4'>
            <h3>TOTAL</h3>
            <h3>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cartTotal)}</h3>
          </span>
          <span className='flex justify-between items-center w-full'>
            <button
              className='text-light-second dark:text-dark-second underline hover:no-underline hover:scale-[1] px-0'
              type="button"
              onClick={() => { handleCartInteraction('clear') }}>
              EMPTY THE CART
            </button>
            <button className='bg-light-second dark:bg-dark-second' type="button">ORDER</button>
          </span>
        </>
        :
        <h3>It feels empty here..</h3>
      }
    </div>
  )
}

function useOutsideAlerter(ref, callback) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target))
        callback();
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback]);
}

Cart.propTypes = {
  visible: PropTypes.bool,
  visibleSetter: PropTypes.func,
};