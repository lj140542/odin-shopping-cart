import { Link } from "react-router-dom"
import { useState } from "react"
import Icon from '@mdi/react'
import { mdiCart } from '@mdi/js'
import Dropdown from "./Dropdown"
import Cart from "./Cart"

const shopOptions = [
  { name: 'All', description: "Take a look at all our products.", link: 'shop/all' },
  { name: 'Electronics', description: "Find the tech item that you don't need but absolutely want.", link: 'shop/electronics' },
  { name: 'Jewelery', description: "Put a ring on it!", link: 'shop/jewelery' },
  { name: "Men's clothing", description: "Looking for clothes that don't fit?", link: "shop/men's clothing" },
  { name: "Women's clothing", description: "All the garment that were most popular 5 years ago.", link: "shop/women's clothing" },
]

export default function Header() {
  const [cartVisible, setCartVisible] = useState(false);
  return (
    <>
      <nav className="
      flex justify-between items-center
      gap-4 w-screen max-w-6xl py-8 px-12 select-none"
      >
        <h1 className="text-5xl">Odin Boutique</h1>
        <div className="flex gap-16 items-center">
          <Link to="/" className="items-center gap-x-1 font-semibold leading-6 p-4">Home</Link>
          <Dropdown name="Shop" options={shopOptions} />
          <div
            className="cursor-pointer p-4 
          text-light-text dark:text-dark-text
          hover:text-light-second dark:hover:text-dark-second"
            onClick={() => setCartVisible(true)}
          >
            <Icon path={mdiCart} size={1} />
          </div>
        </div>
      </nav>
      <Cart visible={cartVisible} visibleSetter={setCartVisible} />
    </>
  )
}