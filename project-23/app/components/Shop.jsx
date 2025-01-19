'use client';

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Product from './Product';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '@/store/categorySlice';
import { fetchProducts } from '@/store/productSlice';
const All = {
  slug: 'All',
  url: 'https://dummyjson.com/products',
  name: 'All',
};
export default function Shop() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const allProducts = useSelector((state) => state.products.products);
  const categoryList = [All, ...categories];
  const [selectedCategory, setSelectedCategory] = useState(All);
  const [searchHandel, setSearchHandel] = useState('');
  const [sortBy, setSortBy] = useState('title'); 
  const [order, setOrder] = useState('asc'); 
  const [limit, setLimit] = useState(10);


  const finalUrl = `${selectedCategory.url}?limit=${limit}&skip=0&sortBy=${sortBy}&order=${order}`;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCategories());
    }
    dispatch(fetchProducts(finalUrl));
    console.log(finalUrl);
    console.log(allProducts);
  }, [status, dispatch, finalUrl]);


  useEffect(() => {
  dispatch(fetchProducts(`https://dummyjson.com/products/search?q=${searchHandel}`))
  }, [searchHandel])
  
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchHandel}
              onChange={(e) =>setSearchHandel(e.target.value)}
              className="pl-10 pr-4 py-2 w-full bg-gray-800 border border-gray-700 rounded-md text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div
          className="flex space-x-4 mb-6 pb-2 overflow-x-auto"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {categoryList.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category)} // Set selected category
              className={`whitespace-nowrap px-4 py-2 rounded-md transition-colors duration-200 ${
                selectedCategory.name === category.name
                  ? 'bg-gray-100 text-gray-900'
                  : 'bg-gray-800 text-gray-100 border border-gray-700 hover:bg-gray-700'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="mb-6 flex space-x-4">
          <div className="flex flex-col">
            <label htmlFor="orderBy" className="text-lg font-semibold mb-2">
              Order By
            </label>
            <select
              id="orderBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-100"
            >
              <option value="title">Title</option>
              <option value="price">Price</option>
              {/* Add more sorting criteria as needed */}
            </select>
          </div>

          {/* Sort Order Dropdown */}
          <div className="flex flex-col">
            <label htmlFor="sortOrder" className="text-lg font-semibold mb-2">
              Sort Order
            </label>
            <select
              id="sortOrder"
              value={order}
              onChange={(e) => setOrder(e.target.value)} // Update order option
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded text-gray-100"
            >
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {allProducts.map((product) => (
                <Product key={product.sku} product={product} />
              ))
              }
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end pr-4">
  <button
    onClick={() => setLimit(limit * 2)}
    className="px-4 py-2 bg-gray-100 text-gray-900 hover:bg-gray-200 rounded transition-colors duration-200"
  >
    Load More
  </button>
</div>
      </div>
      


    </div>

  );
}