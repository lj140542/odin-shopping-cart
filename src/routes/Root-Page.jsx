import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getCart, insertCart, clearCart, updateCart } from "../objects/cart";
import { useState, useEffect, useMemo, createContext } from "react";

export const CartContext = createContext(null);

export default function RootPage() {
  const [cart, setCart] = useState([]);
  const { cartItemCount, cartTotal } = useMemo(() => {
    if (!cart) return { cartItemCount: 0, cartTotal: 0 };
    let count = 0;
    let total = 0;
    cart.forEach(element => {
      count += element.quantity;
      total += element.quantity * element.item.price;
    });
    return { cartItemCount: count, cartTotal: total }
  }, [cart])

  const handleCartInteraction = async (type, parameters = null) => {
    switch (type) {
      case 'clear': return setCart(await clearCart());
      case 'update': {
        if (await updateCart(parameters.cartElementId, parameters.newQuantity)) return setCart(await getCart());
        else throw new Error("error while updating cart quantity");
      }
      case 'insert': {
        if (parameters.insertion == null) throw new Error("insertion parameter is null");
        else return setCart(await insertCart(parameters.insertion));
      }
      default: throw new Error("unknown type: " + type);
    }
  }

  useEffect(() => {
    const getCartData = async () => {
      setCart(await getCart())
    }
    getCartData();
  }, [])

  return (
    <CartContext.Provider value={{ cart, cartItemCount, cartTotal, handleCartInteraction }}>
      <Header />
      <main className="grid py-8 px-12 w-screen max-w-6xl">
        <Outlet></Outlet>
      </main>
      <Footer />
    </CartContext.Provider>
  );
}