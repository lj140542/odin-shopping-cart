import PropTypes from 'prop-types'
import Icon from '@mdi/react';
import { mdiMinus, mdiPlus } from '@mdi/js';

export default function QuantitySelector({ quantity, quantityChangeHandler }) {
  const handleQuantityChange = (newValue) => {
    if (newValue > 99) return quantityChangeHandler(99);
    if (newValue < 1 || isNaN(newValue)) return quantityChangeHandler(1);
    return quantityChangeHandler(newValue);
  }

  return (
    <form className='grid grid-cols-3 justify-center items-center h-full'>
      <button className='flex justify-center items-center text-light-text dark:text-dark-text p-0'
        type="button" onClick={() => handleQuantityChange(quantity - 1)}>
        <Icon path={mdiMinus} size={1} />
      </button>
      <input className='text-center h-full rounded-lg'
        type="text" name="quantity" id="quantity" inputMode='numeric' value={quantity}
        onChange={(e) => handleQuantityChange(parseInt(e.target.value))} />
      <button className='flex justify-center items-center text-light-text dark:text-dark-text p-0'
        type="button" onClick={() => handleQuantityChange(quantity + 1)} >
        <Icon path={mdiPlus} size={1} />
      </button>
    </form>
  )
}

QuantitySelector.propTypes = {
  quantity: PropTypes.number.isRequired,
  quantityChangeHandler: PropTypes.func.isRequired,
}

