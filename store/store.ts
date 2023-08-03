import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../store/pokemonSlice';
import pokemonInfoReducer from '../store/pokemonInfoSlice';

export const store = configureStore({
  reducer: {
    pokemonSlice: pokemonReducer,
    pokemonInfoSlice: pokemonInfoReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      immutableCheck: false, // following log stmt recommendation
      serializableCheck: false,
    });
  },
});
