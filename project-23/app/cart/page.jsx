import React from 'react'
import Cart from "../components/Cart"

const page = () => {
  return (
    <div className="flex bg-gray-900 ">
    
    <main className="flex-1 p-8 ">
      <div className="max-w-4xl mx-auto">
        <Cart />
      </div>
    </main>
  </div>
  )
}

export default page