export async function getProduct(productId) {
  try {
    const res = await fetch('https://fakestoreapi.com/products/' + productId);
    const product = await res.json();
    return product;
  }
  catch {
    throw new Error("An error occurred while searching for product information")
  }
}

export async function getProducts() {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    const product = await res.json();
    return product;
  }
  catch {
    throw new Error("An error occurred while searching for products")
  }
}

export async function getProductsFromCategory(categoryId) {
  try {
    const res = await fetch('https://fakestoreapi.com/products/category/' + categoryId);
    const product = await res.json();
    return product;
  }
  catch {
    throw new Error("An error occurred while searching for products from category")
  }
}