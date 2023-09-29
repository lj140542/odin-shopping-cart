import {
  deleteCart,
  getCart,
  insertCart,
  updateCart,
  countCart,
  totalCart,
  clearCart
} from "../src/objects/cart";
import { describe, it, expect } from "vitest";

const items = [
  {
    item: {
      id: 1,
      name: "insertTest1"
    },
    quantity: 2
  },
  {
    item: {
      id: 2,
      name: "insertTest2"
    },
    quantity: 1
  }
];

describe("Cart", () => {
  it("should return an empty array when using the getCart function with an empty cart", async () => {
    const cart = await getCart();
    expect(cart).toStrictEqual([]);
  });

  it("should return the added item when adding an item to the cart", async () => {
    let item = { item: { id: 1, name: "insertTest" }, quantity: 1 };
    expect(await insertCart(item)).toMatchObject(item);
  });

  it("should return all the item in the cart when using getCart after adding items", async () => {
    await insertCart(items[0]);
    await insertCart(items[1]);

    const cart = await getCart();
    expect(cart.length).toBe(2);
    expect(cart[0]).toMatchObject(items[1]);
    expect(cart[1]).toMatchObject(items[0]);
  });

  it("should update the quantity of the item in the cart", async () => {
    const updateId = (await insertCart(items[0])).id;
    expect(await updateCart(updateId, 20)).toBe(true);

    const cart = await getCart();
    expect(cart[0].quantity).toBe(20);
  })

  it("should not update if the item id is not in the cart", async () => {
    await insertCart(items[0]);
    expect(await updateCart(-1, 20)).toBe(false);
  })

  it("should delete an item from the cart", async () => {
    await insertCart(items[0]);
    const deleteId = (await insertCart(items[1])).id;

    expect(await deleteCart(deleteId)).toEqual(true);
    const cart = await getCart();
    expect(cart.length).toBe(1);
    expect(cart[0]).toMatchObject(items[0]);
  });

  it("should not delete if the item id is not in the cart", async () => {
    await insertCart(items[0]);
    expect(await deleteCart(-1)).toEqual(false);
  });

  it("should add quantity if the added item is already in the cart", async () => {
    let cart;

    await insertCart(items[0]);
    cart = await getCart();
    expect(cart[0].quantity).toBe(items[0].quantity)

    await insertCart(items[0]);
    cart = await getCart();
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(items[0].quantity * 2);
  });

  it("should return the correct count regardless of the number of different items", async () => {
    let cart;

    await insertCart(items[0]);
    await insertCart(items[0]);
    cart = await getCart();
    expect(cart.length).toBe(1);
    expect(await countCart()).toBe(items[0].quantity * 2);

    await insertCart(items[1]);
    cart = await getCart();
    expect(cart.length).toBe(2);
    // here we use the second way to call countCart by providing the cart 
    expect(await countCart(cart)).toBe(items[0].quantity * 2 + items[1].quantity);
  });

  it("should return a total of 0 for an empty cart", async () => {
    expect(await totalCart(await getCart())).toBe(0);
  });

  it("should return the total amount of the cart", async () => {
    let total = items[0].item.price * 2 + items[1].item.price;
    await insertCart(items[0]);
    await insertCart(items[0]);
    await insertCart(items[1]);
    expect(await totalCart(await getCart())).toBe(total);
  });

  it("should reset all when clearing the cart", async () => {
    let cart;
    await insertCart(items[0]);
    await insertCart(items[0]);
    await insertCart(items[1]);
    cart = await clearCart(await getCart())
    expect(cart.length).toBe(0);
    expect(await countCart(cart)).toBe(0);
    expect(await totalCart(cart)).toBe(0);
  });
});