import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import QuantitySelector from './Quantity-Selector';

export default function CartItem({ id, item, quantity, quantityChangeHandler }) {
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price * quantity);

  return (
    <>
      <hr className='opacity-25 w-[95%] justify-self-center' />
      <div className='grid grid-cols-[20%_30%_30%_20%] gap-2
      items-center justify-center text-center p-4 text-sm'>
        <img src={`/${item.id}.png`} alt={item.title}
          className='aspect-square object-contain' />
        <Link to={'/product/' + item.id} className='underline'>{item.title}</Link>
        <span className='h-[50%]'><QuantitySelector quantity={quantity} quantityChangeHandler={(newQuantity) => quantityChangeHandler(id, newQuantity)} /></span>
        <span>{price}</span>
      </div>
    </>
  )
}

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
  quantityChangeHandler: PropTypes.func.isRequired,
}
