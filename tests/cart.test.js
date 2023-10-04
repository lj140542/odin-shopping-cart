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

  it("should return all the item in the cart when using getCart after adding items", async () => {
    await insertCart(items[0]);
    await insertCart(items[1]);

    const cart = await getCart();
    expect(cart.length).toBe(2);
    expect(cart[0]).toMatchObject(items[1]);
    expect(cart[1]).toMatchObject(items[0]);
  });

  it("should update the quantity of the item in the cart", async () => {
    let cart = await insertCart(items[0])
    const updateId = cart[0].id;
    expect(await updateCart(updateId, 20)).toBe(true);

    cart = await getCart();
    expect(cart[0].quantity).toBe(20);
  })

  it("should not update if the item id is not in the cart", async () => {
    await insertCart(items[0]);
    expect(await updateCart(-1, 20)).toBe(false);
  })

  it("should delete an item from the cart", async () => {
    await insertCart(items[0]);
    let cart = await insertCart(items[1]);

    const deleteId = cart[0].id

    expect(await deleteCart(deleteId)).toEqual(true);
    cart = await getCart();

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
});