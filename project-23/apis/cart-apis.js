import axios from 'axios';

// Set base URL if needed
axios.defaults.baseURL = 'http://localhost:3002';  // Update the port if needed

export const cartApis = {
    // Add product to cart
    addProductToCart: async (userId, productId) => {
        const addToCartData = {
            userId,
            productId,
        };

        try {
            const response = await axios.post('http://localhost:3002/cart/add', addToCartData, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding product to cart:', error);
            throw error;
        }
    },

    // Remove product from cart
    removeProductFromCart: async (userId, productId) => {
        const removeFromCartData = {
            userId,
            productId,
        };
console.log(removeFromCartData);

        try {
            const response = await axios.post('http://localhost:3002/cart/remove', removeFromCartData, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            console.error('Error removing product from cart:', error);
            throw error;
        }
    },

    // Get user's cart
    getCart: async (userId) => {
        try {
            console.log(userId);
            
            const response = await axios.get(`http://localhost:3002/cart/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching cart:', error);
            throw error;
        }
    },
};
