import { useLoaderData } from 'react-router-dom';
import { getProduct } from '../objects/product';
import Product from '../components/Product'

export async function loader({ params }) {
  const product = await getProduct(params.productId);
  if (!product) {
    throw new Response("", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return { product };
}

export default function ProductPage() {
  const { product } = useLoaderData();

  return (
    <>
      <Product product={product} />
    </>
  )
}