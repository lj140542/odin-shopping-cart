import localforage from "localforage";

export async function getCart() {
  let cart = await localforage.getItem("cart");
  if (!cart) cart = [];
  return cart;
}

export async function insertCart(insertion) {
  let id = Math.random().toString(36).substring(2, 9);
  let newCartItem = { id, ...insertion };
  let cart = await getCart();

  // check if the product is already in the cart to add quantity to it
  let cartItemIndex = cart.findIndex(element => element.item.id == insertion.item.id);
  if (cartItemIndex == -1)
    cart.unshift(newCartItem);
  else
    cart[cartItemIndex].quantity += insertion.quantity;

  await set(cart);
  return cart;
}

export async function updateCart(id, quantity) {
  let cart = await getCart();
  let index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart[index].quantity = quantity;
    await set(cart);
    return true;
  }
  return false;
}

export async function deleteCart(id) {
  let cart = await getCart();
  let index = cart.findIndex(item => item.id === id);
  if (index > -1) {
    cart.splice(index, 1);
    await set(cart);
    return true;
  }
  return false;
}

export async function clearCart() {
  const cart = [];
  await set(cart);
  return cart;
}

async function set(cart) {
  return await localforage.setItem("cart", cart);
}