import axios from 'axios';

// Set base URL if needed
axios.defaults.baseURL = 'http://localhost:3001';

export const customerApis = {
    register: async (userData) => {
        console.log(userData);
         // Example JSON data
        // "name": "Jane Doe",
        // "phone": "0987654321",
        // "email": "jane.doe@example.com",
        // "password": "newpassword123"


        try {
            const response = await axios.post('/customer/register', userData, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    },
    login: async (credentials) => {
        console.log(credentials);
        
        try {
            const response = await axios.post('/customer/login', credentials, {
                headers: { 'Content-Type': 'application/json' },
            });
            console.log(response.data);

            return response.data;
            
        } catch (error) {
            console.error('Error during login:', error);
            throw error;
        }
    },
    addAddress: async (addressData) => {
        try {
            const response = await axios.post('/customer/address', addressData, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            console.error('Error adding address:', error);
            throw error;
        }
    },
    updateAddress: async (id, addressData) => {
        try {
            const response = await axios.put(`/customer/address/${id}`, addressData, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        } catch (error) {
            console.error('Error updating address:', error);
            throw error;
        }
    },
    deleteUser: async (id) => {
        try {
            const response = await axios.delete(`/customer/user/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },
    getAddresses: async (userId) => {
        try {
            const response = await axios.get(`/customer/addresses/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching addresses:', error);
            throw error;
        }
    },
};
