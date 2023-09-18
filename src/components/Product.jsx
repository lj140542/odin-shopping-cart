
export default function Product({ product }) {
  return (
    <div className="product">
      <h3>{product.title}</h3>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <span>{product.price} <button type='button'>Add to cart</button></span>
    </div>
  )
}