'use client'

import { useState } from 'react'
import { toast } from 'react-toastify';
import {customerApis} from "../../apis/costomer-apis"
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '@/store/customerSlice';
export default function AuthForms() {
    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector((state) => state.customer.user);
     
  const [activeTab, setActiveTab] = useState('login')
  const [loginData, setLoginData] = useState({ identifier: '', password: '' })
  const {register,login} = customerApis;

 
  const [registerData, setRegisterData] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, setErrors] = useState({})

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value })
  }

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value })
  }

  const handleLoginSubmit = async(e) => {
    e.preventDefault()
    try{
        const responce= await login(loginData);
        if ( responce.statusCode==400){
            toast.error(responce.message)
            
        }else {
        toast.success(responce.message)
        localStorage.setItem('userId', responce.userId)
       await dispatch(setUser({
            user:{
            userId: responce.userId,
            name: responce.user.name,
            email: responce.user.email,
            phone: responce.user.phone,
            },
            addresses: responce.user.addresses,
        
        }))
        
            router.push('/'); // Redirect only when the component is on the client
          

    
    
    }
       
         } catch (error) {
        console.error('Error logging in:', error)
  
    }
  }

  const handleRegisterSubmit = async(e) => {
    e.preventDefault()
    const newErrors = {}

    if (!registerData.email) newErrors.email = 'Email is required'
    if (!registerData.name) newErrors.name = 'Name is required'
    if (!registerData.phone) newErrors.phone = 'Phone is required'
    if (!registerData.password) newErrors.password = 'Password is required'
    if (registerData.password !== registerData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log('Register data:', registerData)
      // Here you would typically send the data to your backend
    }
     try {
        await register(registerData);
        console.log('User registered successfully');
      } catch (error) {}

  }

  return (
    <div className="flex justify-center bg-white h-screen text-black ">
    <div className="w-full max-w-md mx-auto space-y-6">
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 px-4 text-center ${activeTab === 'login' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('login')}
        >
          Login
        </button>
        <button
          className={`flex-1 py-2 px-4 text-center ${activeTab === 'register' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-500'}`}
          onClick={() => setActiveTab('register')}
        >
          Register
        </button>
      </div>
      
      {activeTab === 'login' && (
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">Email or Phone</label>
            <input
              id="identifier"
              name="identifier"
              type="text"
              placeholder="Email or Phone"
              value={loginData.identifier}
              onChange={handleLoginChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="login-password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="login-password"
              name="password"
              type="password"
              value={loginData.password}
              onChange={handleLoginChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Login
          </button>
        </form>
      )}

      {activeTab === 'register' && (
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Phone"
              value={registerData.phone}
              onChange={handleRegisterChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="register-password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="register-password"
              name="password"
              type="password"
              value={registerData.password}
              onChange={handleRegisterChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="confirm-password"
              name="confirmPassword"
              type="password"
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Register
          </button>
        </form>
      )}
    </div>
    </div>
  )
}

