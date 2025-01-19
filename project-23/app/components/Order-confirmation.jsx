'use client'

import React, { useState, useEffect } from 'react'
import { CheckCircle, ShoppingBag } from 'lucide-react'
import Link from "next/link";
const Confetti = ({ count = 100 }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
            animationDelay: `${Math.random() * 5}s`,
            backgroundColor: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7d065'][Math.floor(Math.random() * 4)],
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
          }}
        />
      ))}
    </div>
  )
}

export default function Orderconfirmation() {
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showContinueShopping, setShowContinueShopping] = useState(false)
  const [count, setCount] = useState(3)

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prevCount) => prevCount - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      handlePlaceOrder()
    }
  }, [count])

  const handlePlaceOrder = () => {
    setShowConfirmation(true)
    setTimeout(() => setShowContinueShopping(true), 2000)
  }

  return (
    <div className="min-h-screen w-full backdrop-blur-sm bg-gray-900/80 text-gray-100 flex items-center justify-center px-4 fixed top-0">
      <div className="max-w-md w-full">
        {!showConfirmation ? (
          <div className="bg-gray-800 shadow-lg rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-6 text-white">Placing your order</h2>
            <p className="text-6xl font-bold text-green-400 mb-8 animate-pulse">{count}</p>
          </div>
        ) : (
          <div className="bg-gray-800 shadow-lg rounded-lg p-8 text-center relative overflow-hidden">
            <Confetti />
            <div className={`transition-all duration-1000 ease-out ${showConfirmation ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
              <CheckCircle className="w-24 h-24 mx-auto mb-6 text-green-400" />
              <h2 className="text-3xl font-bold mb-4 text-white">Order Placed!</h2>
              <p className="mb-8 text-gray-400">Thank you for your purchase. Your order has been successfully placed.</p>
              {showContinueShopping && (
            <Link href="/">
                <button
                  className="w-full bg-gray-700 text-white py-3 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Continue Shopping
                </button>
                </Link>
              )}
            </div>
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 opacity-10"></div>
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-blue-500 to-green-500 opacity-5"></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
