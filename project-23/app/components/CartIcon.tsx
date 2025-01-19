'use client'

import { useCart } from '../hooks/useCart'
import Link from 'next/link'

export default function Cart() {
  const { cart, removeFromCart, total } = useCart()

  return (
    <div className="border p-4 rounded">
      <h2 className="text-xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} - ${item.price}</span>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="mt-4">
            <p className="font-bold">Total: ${total}</p>
            <Link href="/checkout" className="mt-2 bg-green-500 text-white px-4 py-2 rounded inline-block">
              Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  )
}

