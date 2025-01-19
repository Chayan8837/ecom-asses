"use client";

import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "@/store/cartSlice"; 
import { useEffect } from "react";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { toast } from 'react-toastify';
import { cartApis } from "@/apis/cart-apis";
import { fetchCart } from "../../store/cartSlice";
export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const userId = useSelector((state) => state.customer.user.userId);

  const { getCart,removeProductFromCart } = cartApis; 

  useEffect(() => {
    const fetchCartItems = async () => {
      if (userId) {
        try {
          await dispatch(fetchCart());
          toast.success("fetch cart successfully")          
        } catch (error) {
          toast.error("Failed to fetch cart items!");
        }
      }
    };

    fetchCartItems();
  }, [userId, dispatch])
  useEffect(() => {
    console.log("Cart Items:", cart.items);
  }, [cart.items]);

  const handleRemove = async (id) => {
    dispatch(removeItem(id));
    toast.success("Item removed from cart");

    if (userId) {
      try {
        await removeProductFromCart(userId, id);
        toast.success("Item removed from db");
        console.log("removed from db successfully");
      } catch (error) {
        toast.error("Failed to remove item from cart in database!");
      }
  
  };}

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-2xl rounded-lg overflow-hidden h-[80vh]"
      >
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
          <h2 className="text-3xl font-extrabold text-white flex items-center">
            <ShoppingCart className="mr-2" />
            Your Cart
          </h2>
        </div>
        <div className="p-6">
          {cart.totalQuantity === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 text-center py-8"
            >
              Your cart is empty. Start shopping to add items!
            </motion.p>
          ) : (
            <><div className="h-[40vh] overflow-scroll">
              {cart.items.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-lg shadow"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                      <p className="text-gray-600">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
                
              ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mt-8 bg-gray-100 p-6 rounded-lg bottom-0 relative"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-semibold">Total Quantity:</span>
                  <span className="text-2xl font-bold text-indigo-600">{cart.totalQuantity}</span>
                </div>
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-700 font-semibold">Total Price:</span>
                  <span className="text-2xl font-bold text-indigo-600">${cart.totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  href="/checkout"
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white px-6 py-3 rounded-full font-semibold text-lg flex items-center justify-center hover:from-green-500 hover:to-blue-600 transition-all duration-300 shadow-lg"
                >
                  Proceed to Checkout
                  <ArrowRight className="ml-2" />
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
}

