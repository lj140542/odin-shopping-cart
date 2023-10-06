import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import { CartContext } from '../routes/Root-Page';
import QuantitySelector from './Quantity-Selector';

export default function Product({ product, card }) {
  const [quantity, setQuantity] = useState(1);
  const { handleCartInteraction } = useContext(CartContext);
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.price);
  if (card) {
    return (
      <Link to={"/product/" + product.id} className="product-card group flex flex-col gap-4 
        cursor-pointer overflow-hidden rounded-xl shadow-md">
        <div className='flex relative justify-center h-[60%] min-h-[60%] w-full overflow-hidden rounded-xl
        bg-light-primary dark:bg-dark-primary p-8 
        after:hidden after:absolute after:-inset-0 after:h-full after:rounded-xl after:bg-[#ffffff25] group-hover:after:block'>
          <img src={`/${product.id}.png`} alt={product.title}
            className="h-full object-center object-contain" />
        </div>
        <div className='flex justify-between font-bold gap-4 px-4'>
          <span className='overflow-hidden whitespace-nowrap text-ellipsis'>{product.title}</span>
          <span>{price}</span>
        </div>
        <div className='px-4'>
          <p className='overflow-hidden text-ellipsis line-clamp-3 text-sm text-justify'>{product.description}</p>
        </div>
      </Link>
    )
  }
  return (
    <div className="product grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] auto-rows-[min(80%,_1fr)] gap-8 max-h-full self-center
     ">
      <div>
        <img src={`/${product.id}.png`} alt={product.title}
          className='h-full rounded-xl object-center object-contain' />
      </div>
      <div className='flex flex-col gap-4'>
        <h2>{product.title}</h2>
        <p className='text-2xl'>{price}</p>
        <p className='text-justify'>{product.description}</p>
        <div className='grid gap-8 items-center
          sm:grid-rows-2 sm:grid-cols-1 sm:justify-center
          lg:grid-cols-2 lg:grid-rows-1 lg:justify-between'>
          <QuantitySelector quantity={quantity} quantityChangeHandler={setQuantity} />
          <button
            className='bg-light-primary dark:bg-dark-primary text-light-text dark:text-dark-text'
            type='button'
            onClick={() => { 
              handleCartInteraction('insert', { item: product, quantity: quantity });
              setQuantity(1);
            }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    image: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  card: PropTypes.bool,
}

Product.defaultProps = {
  card: false,
};