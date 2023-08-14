 import { configureStore } from '@reduxjs/toolkit'
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {api} from './api/api';
import { rootReducer } from './reducers';

const persistConfig={
  key: 'grocery-store', 
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(api.middleware),

})

export const persistor = persistStore(store);