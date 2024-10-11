import storage  from 'redux-persist/lib/storage';
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist';
  import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from './feature/api/baseApi/baseApi';
import authReducer from './feature/api/auth/authSlice'

  const persistConfig = {
    key: 'root',
    storage,
  };
  const persistedAuthReducer = persistReducer(persistConfig, authReducer);
  
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
        auth: persistedAuthReducer,
     
    },

   
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
    });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);