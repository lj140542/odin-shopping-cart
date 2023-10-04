import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

export default function CartItem({ item, quantity }) {
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(item.price * quantity);

  return (
    <>
      <hr className='opacity-25 w-[95%] justify-self-center' />
      <div className='grid grid-cols-[1fr_2fr_1fr_1fr] gap-2
      items-center justify-center text-center p-4 text-sm'>
        <img src={`/${item.id}.png`} alt={item.title}
          className='aspect-square object-contain' />
        <Link to={'/product/' + item.id} className='underline'>{item.title}</Link>
        <span>{quantity}</span>
        <span>{price}</span>
      </div>
    </>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  quantity: PropTypes.number.isRequired,
}
