import { api } from "../api/api";
import {createSlice} from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    count: 0
  },
  reducers: {
    setCounting: (state, action) => {
      state.count += action.payload;
    },
  },
});

export const {setCounting} =
  authSlice.actions;

export const authReducer = authSlice.reducer;

const authApi = api.injectEndpoints({ 
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data ) => ({
        url: '/auth/v1/user-signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['authUser'],
    }),
    login: builder.mutation({
      query: (data ) => ({
        url: '/auth/v1/user-login',
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