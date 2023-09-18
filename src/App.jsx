import { useEffect, useState } from 'react'
import Product from './components/Product'
import './App.css'

function App() {
  const [products, setProducts] = useState(null)

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json) => setProducts(json));
  }, [])

  if (!products) return <><h1>Welcome to the shop</h1><p>Loading...</p></>


  return (
    <>
      <div className='product'>
        {products.map(product => <Product key={product.id} product={product} />)}
      </div>
    </>
  )
}

export default App
