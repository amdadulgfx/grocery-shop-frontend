import {combineReducers} from '@reduxjs/toolkit';
import cartReducer from '../reduxMine/features/cartSlice';
import { authReducer } from './features/authApi';
import { api } from './api/api';


// add the necessary reducers here //
export const rootReducer = combineReducers({
  auth: authReducer,
  [api.reducerPath]: api.reducer,
  cart: cartReducer,
});
