import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create an async thunk for fetching cart data
export const fetchCartData = createAsyncThunk('cart/fetchCartData', async (_, { getState }) => {
  try {
    // Get the access token from your browser's local storage
    const accessToken = localStorage.getItem('accessToken');

    const response = await fetch('http://localhost:5000/api/v1/cart/', {
      headers: {
        Authorization: `${accessToken}`, // Include the access token in the Authorization header
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data?.data || []; // Use response?.data?.data or an empty array as a fallback
  } catch (error) {
    throw error;
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // This array will hold the items in the cart.
    loading: 'idle',
    error: null,
  },
  reducers: {
    // Add reducers for modifying cart state if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCartData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCartData.fulfilled, (state, action) => {
        state.loading = 'fulfilled';
        state.items = action.payload;
      })
      .addCase(fetchCartData.rejected, (state, action) => {
        state.loading = 'rejected';
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;
