'use client'

import React, { use, useEffect, useState } from 'react'
import { User, Package, Heart, CreditCard, MapPin, Bell, LogOut, ChevronRight } from 'lucide-react'
import { useSelector } from 'react-redux'
import {orderApis} from "../../apis/order-apis"

const AccountSection = () => {
  const findOrdersByUserId= orderApis;
  const [activeSection, setActiveSection] = useState('profile')
  const user = useSelector((state) => state.customer.user);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user?.userId) {
          const data = await orderApis.findOrdersByUserId(user.userId)
         await  setOrders(data)
         console.log(data);
         
          console.log(orders);
          
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }

    fetchOrders()
  }, [user])


  useEffect(() => {
    console.log(orders.length);
    
  
   
  }, [])
  
  

  const accountOptions = [
    { id: 'profile', name: 'My Profile', icon: User },
    { id: 'orders', name: 'My Orders', icon: Package },
    { id: 'wishlist', name: 'My Wishlist', icon: Heart },
    { id: 'payments', name: 'Payment Methods', icon: CreditCard },
    { id: 'addresses', name: 'Addresses', icon: MapPin },
    { id: 'notifications', name: 'Notifications', icon: Bell },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">My Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="First Name" 
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <input 
                type="text" 
                placeholder="Last Name" 
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
              <input 
                type="tel" 
                placeholder="Phone" 
                className="w-full px-3 py-2 bg-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
              />
            </div>
            <button className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition duration-300">
              Save Changes
            </button>
          </div>
        )
      case 'orders':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">My Orders</h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-gray-800 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Order#{order.id}</span>
                    <div className='flex flex-col'>
                    <span className="text-gray-400">  {new Date(order.orderDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</span>

                    <span> {order.status}</span>
                    <span>Dilivery Date:</span>
                    <span className='text-green-500'>  {new Date(order.deliveryDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-gray-400">Order Size:  {order.products.length}</span>
                    <span className="mx-2">•</span>
                    <span className="text-gray-400">Total: ${order.totalOrderPrice}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      default:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{activeSection}</h2>
            <p>Content for {activeSection} goes here.</p>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/4">
            <nav className="space-y-2">
              {accountOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveSection(option.id)}
                  className={`w-full flex items-center justify-between px-4 py-2 rounded-md transition duration-300 ${
                    activeSection === option.id ? 'bg-gray-800' : 'hover:bg-gray-900'
                  }`}
                >
                  <div className="flex items-center">
                    <option.icon className="w-5 h-5 mr-3" />
                    <span>{option.name}</span>
                  </div>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ))}
              <button
                className="w-full flex items-center justify-between px-4 py-2 rounded-md text-red-500 hover:bg-gray-900 transition duration-300"
              >
                <div className="flex items-center">
                  <LogOut className="w-5 h-5 mr-3" />
                  <span>Logout</span>
                </div>
                <ChevronRight className="w-5 h-5" />
              </button>
            </nav>
          </div>
          <div className="w-full md:w-3/4 bg-gray-900 p-6 rounded-lg">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSection

