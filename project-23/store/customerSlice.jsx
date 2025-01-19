import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
    name: 'customer',
    initialState: {
        user: {
            userId: null,  // Store user ID
            name: null,
            email: null,
            phone: null,
        },
        addresses: [], // Store user addresses
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload.user;
            state.addresses = action.payload.addresses;
        },
        addAddress: (state, action) => {
            state.addresses.push(action.payload);
        },
        setAddresses: (state, action) => {
            state.addresses = action.payload;
        },
        logout: (state) => {
            state.user = { userId: null, name: null, email: null, phone: null };
            state.token = null;
            state.addresses = [];
        },
    },
});

// Export actions and reducer
export const { setUser, addAddress, setAddresses, logout } = customerSlice.actions;
export default customerSlice.reducer;
