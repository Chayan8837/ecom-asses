"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, ShoppingCart, User } from 'lucide-react'
import { useSelector } from 'react-redux'


const Navbar = () => {
  const [userId, setUserId] = useState(null); 
  const user = useSelector((state) => state.customer.user);

    
  return (
    <nav className="bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className='flex'>
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              ShopNow
            </Link>
          </div>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-white hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="#" className="text-white hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Products
              </Link>
              <Link href="/#" className="text-white hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Categories
              </Link>
              <Link href="/#" className="text-white hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
                Deals
              </Link>
            </div>
          </div>
          </div>
          {/* User Account and Cart Icons */}
          <div className="flex items-center">
          <Link href={user.userId ? "/account" : "/auth"}>
            <button  className="ml-4 text-white hover:text-indigo-600">
              <User className="h-6 w-6" />
              <span className="sr-only">User account</span>
            </button>
            </Link>
           <Link href="/cart">
            <button  className="ml-4 text-white hover:text-indigo-600">
              <ShoppingCart className="h-6 w-6" />
              <span className="sr-only">Shopping cart</span>
            </button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open main menu</span>
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/" className="text-white hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
            Home
          </Link>
          <Link href="#" className="text-white hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
            Products
          </Link>
          <Link href="#" className="text-white hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
            Categories
          </Link>
          <Link href="#" className="text-white hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium">
            Deals
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="px-2">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 mb-4"
            />
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar

