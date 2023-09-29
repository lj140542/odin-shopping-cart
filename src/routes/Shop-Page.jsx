import { useLoaderData } from "react-router-dom";
import { getProducts, getProductsFromCategory } from "../objects/product";
import Product from "../components/Product";

export async function loader({ params }) {
  let category = params.category;
  let products;
  if (category === "all")
    products = await getProducts();
  else
    products = await getProductsFromCategory(category);
  if (!products) {
    throw new Response("", {
      status: 404,
      statusText: "Category Not Found",
    });
  }
  category = category[0].toUpperCase() + category.slice(1);
  return { category, products };
}

export default function ShopPage() {
  const { category, products } = useLoaderData();

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(300px,_1fr))] 
        auto-rows-[60dvh] gap-8 gap-y-16 justify-center">
        {products.map(product => <Product key={product.id} product={product} card={true} />)}
      </div>
    </>
  )
}