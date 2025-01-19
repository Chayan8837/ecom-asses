import axios from 'axios';

// Set base URL for Axios globally
axios.defaults.baseURL = 'http://localhost:3002'; // Update the port if needed

export const orderApis = {
  // Create an order
  createOrder: async (orderData) => {
    try {
      const response = await axios.post('/orders', orderData, {
        headers: { 'Content-Type': 'application/json' },
      });
      return response.data;
    } catch (error) {
      console.error('Error creating order:', error.response?.data || error.message);
      throw error;
    }
  },

  // Fetch all orders
  findAllOrders: async () => {
    try {
      const response = await axios.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error.message);
      throw error;
    }
  },

  // Fetch a specific order by ID
  findOrderById: async (id) => {
    try {
      const response = await axios.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching order with ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  // Cancel an order by ID
  cancelOrder: async (id) => {
    try {
      const response = await axios.patch(`/orders/cancel/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error canceling order with ID ${id}:`, error.response?.data || error.message);
      throw error;
    }
  },

  // Mark an order as delivered by ID
  markOrderAsDelivered: async (id) => {
    try {
      const response = await axios.patch(`/orders/deliver/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error marking order with ID ${id} as delivered:`, error.response?.data || error.message);
      throw error;
    }
  },

  // Find orders by user ID
  findOrdersByUserId: async (userId) => {
    try {
      const response = await axios.get(`/orders/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching orders for user with ID ${userId}:`, error.response?.data || error.message);
      throw error;
    }
  },
};
