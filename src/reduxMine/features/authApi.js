import { api } from "../api/api";
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    count: 0,
    user: null,
  },
  reducers: {
    setCounting: (state, action) => {
      state.count += action.payload;
    },
    login: (state, action) => {
      state.user = action.payload; // Set the user data when logged in
    },
    logout: (state) => {
      state.user = null; // Clear the user data when logged out
    },
  },
});

export const { setCounting } =
  authSlice.actions;

export const authReducer = authSlice.reducer;

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `auth/signup/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['authUser'],
    }),
    login: builder.mutation({
      query: (data) => ({
        url: `auth/signin/`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['authUser'],
    }),
  }),
});

export const {
  useSignUpMutation,
  useLoginMutation,
} = authApi;

export const { login, logout } = authSlice.actions;
export const selectUser = (state) => state.auth.user; // Selector to get the user data

export default authSlice.reducer;