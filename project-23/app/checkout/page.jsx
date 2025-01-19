



'use client'

import React, { useEffect, useState } from 'react'
import { ChevronDown, ChevronUp, CreditCard, Truck } from 'lucide-react'
import { useSelector } from 'react-redux';
import Orderconfirmation from '../components/Order-confirmation';
import   {orderApis} from "../../apis/order-apis"
import { create } from 'domain';
import { toast } from 'react-toastify';




// '{
//   "userId": 1,
//   "name": "John Doe",
//   "phone": "1234567890",
//   "status": "pending",
//   "address": "123 Main St",
//   "products": [
//     { "productId": 1, "quantity": 2, "price": 50 },
//     { "productId": 2, "quantity": 1, "price": 100 }
// }']

const address = {
  name: "John Doe",
  street: "123 Main St",
  city: "Anytown",
  state: "State",
  zipCode: "12345",
  country: "Country",
  phone: "+1 234 567 8900"
}

export default function page() {
  const [isAddressOpen, setIsAddressOpen] = useState(true)
  const [isPaymentOpen, setIsPaymentOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const cartItems = useSelector((state) => state.cart);
  const [orderconfshow, setorderconfshow] = useState(false)
  const user = useSelector((state) => state.customer)
  const {createOrder}= orderApis;


  const [orderData, setOrderData] = useState({
    userId: user.user.userId,
    name: user.user.name,
    phone: user.user.phone,
    status: 'pending', // Fixed typo: 'panding' to 'pending'
    address: user.addresses[0]?.address || '', // Safe access to address
    products: cartItems.items.map(item => ({
      productId: item.id,
      quantity: item.quantity,
      price: parseInt(item.price), // Assuming price is a string, convert to number
    }))
  });;

  useEffect(() => {
    console.log(cartItems);
    console.log(user);

    console.log(orderData);
    
  }, [])
  const handleOrderSubmit = async () => {
    try {
      await createOrder(orderData);
      setorderconfshow(true);
      toast.success("Order created successfully")
      
    } catch (error) {
      console.error("Error creating order:", error);
      alert("There was an error creating the order.");
    }
  }

  


  const subtotal = cartItems.totalPrice;
  const discount = 10
  const shipping = subtotal > 100 ? 0 : 5.99
  const total = subtotal - discount + shipping

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
        {orderconfshow?(<Orderconfirmation/>):null}
      <header className=" ">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Checkout</h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            {/* Delivery Address Section */}
            <section className="bg-gray-800 shadow rounded-lg overflow-hidden">
              <div 
                className="px-4 py-5 sm:px-6 flex justify-between items-center cursor-pointer"
                onClick={() => setIsAddressOpen(!isAddressOpen)}
              >
                <h2 className="text-lg font-medium text-white">Delivery Address</h2>
                {isAddressOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </div>
              {isAddressOpen && (
                <div className="border-t border-gray-700 px-4 py-5 sm:p-0">
                  <dl className="sm:divide-y sm:divide-gray-700">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-400">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">{address.name}</dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-400">Address</dt>
                      <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">
                        {address.street}, {address.city}, {address.state} {address.zipCode}, {address.country}
                      </dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-400">Phone number</dt>
                      <dd className="mt-1 text-sm text-gray-200 sm:mt-0 sm:col-span-2">{address.phone}</dd>
                    </div>
                  </dl>
                </div>
              )}
            </section>

            {/* Payment Options Section */}
            <section className="bg-gray-800 shadow rounded-lg overflow-hidden">
              <div 
                className="px-4 py-5 sm:px-6 flex justify-between items-center cursor-pointer"
                onClick={() => setIsPaymentOpen(!isPaymentOpen)}
              >
                <h2 className="text-lg font-medium text-white">Payment Options</h2>
                {isPaymentOpen ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
              </div>
              {isPaymentOpen && (
                <div className="border-t border-gray-700 px-4 py-5 sm:px-6">
                  <div className="space-y-4">
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio text-gray-300 bg-gray-700 border-gray-600 focus:ring-gray-500"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                      />
                      <span className="flex items-center text-gray-200">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Credit/Debit Card
                      </span>
                    </label>
                    <label className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        className="form-radio text-gray-300 bg-gray-700 border-gray-600 focus:ring-gray-500"
                        name="paymentMethod"
                        value="cod"
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                      />
                      <span className="flex items-center text-gray-200">
                        <Truck className="h-5 w-5 mr-2" />
                        Cash on Delivery
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* Order Summary Section */}
          <div className="md:col-span-1">
            <section className="bg-gray-800 shadow rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium text-white">Order Summary</h2>
              </div>
              <div className="border-t border-gray-700 px-4 py-5 sm:p-6">
                <ul className="divide-y divide-gray-700">
                  {cartItems.items.map((item) => (
                    <li key={item.id} className="py-4 flex">
                      <img className="h-20 w-15 object-cover rounded" src={item.image || "/placeholder.svg"} alt={item.name} />
                      <div className="ml-3 flex-1">
                        <p className="text-sm font-medium text-gray-200">{item.name}</p>
                        <p className="text-sm text-gray-400">{item.brand}</p>
                        <p className="text-sm text-gray-400">Size: {item.size}, Color: {item.color}</p>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm font-medium text-gray-200">${item.price} x {item.quantity}</p>
                          <p className="text-sm font-medium text-gray-200">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <dl className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-400">Subtotal</dt>
                    <dd className="text-sm font-medium text-gray-200">${subtotal.toFixed(2)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-400">Discount</dt>
                    <dd className="text-sm font-medium text-green-400">-${discount.toFixed(2)}</dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-400">Shipping</dt>
                    <dd className="text-sm font-medium text-gray-200">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</dd>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-700 pt-4">
                    <dt className="text-base font-medium text-white">Total</dt>
                    <dd className="text-base font-medium text-white">${total.toFixed(2)}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <button onClick={handleOrderSubmit}
                  className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-150 ease-in-out">
                    Place Order
                  </button>
                 
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}


