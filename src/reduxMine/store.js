import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { api } from './api/api';
import { rootReducer } from './reducers';
import { authReducer } from './features/authApi';

const persistConfig = {
  key: 'grocery-store',
  storage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: {
    auth: authReducer, // Include the authentication reducer
    [api.reducerPath]: api.reducer,
    persistedReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),

})

export const persistor = persistStore(store);