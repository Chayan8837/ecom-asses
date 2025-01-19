import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [], // Cart items
  totalQuantity: 0, // Total quantity of items in the cart
  totalPrice: 0, // Total price of the items in the cart
  status: "idle", // loading state: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null, // Error message
};

// Thunk to fetch cart data
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      const userId = state.customer.user.userId; // Get userID from Redux state

      const cartResponse = await axios.get(`http://localhost:3002/cart/${userId}`);
      const cart = cartResponse.data;

      const productDetails = await Promise.all(
        cart.products.map(async (product) => {
          const productResponse = await axios.get(`https://dummyjson.com/products/${product.productId}`);
          return {
            id: product.productId,
            name: productResponse.data.title,
            price: (productResponse.data.price * (1 - productResponse.data.discountPercentage / 100)).toFixed(2),
            image: productResponse.data.thumbnail,
            quantity: 1,
            totalPrice: (productResponse.data.price * (1 - productResponse.data.discountPercentage / 100)).toFixed(2),
          };
        })
      );

      return {
        items: productDetails,
        totalQuantity: productDetails.length,
        totalPrice: productDetails.reduce((sum, product) => sum + parseFloat(product.totalPrice), 0),
      };
    } catch (error) {
      console.error("Error fetching cart:", error);
      return rejectWithValue(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += parseFloat(newItem.price);
      } else {
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          image: newItem.image,
          quantity: 1,
          totalPrice: parseFloat(newItem.price),
        });
      }

      state.totalQuantity += 1;
      state.totalPrice += parseFloat(newItem.price);
    },
    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalPrice -= existingItem.totalPrice;
        state.items = state.items.filter((item) => item.id !== id);
      }
    },
    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.totalPrice = action.payload.totalPrice;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch cart data";
      });
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
